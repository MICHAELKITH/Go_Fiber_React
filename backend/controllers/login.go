package controllers

import (
    "fmt"
    "log"
    "os"
    "strings"
    "time"

    "github.com/joho/godotenv"
    "github.com/MICHAELKITH/todo_app/models"
    "github.com/gofiber/fiber/v2"
    "github.com/golang-jwt/jwt/v5"
    "golang.org/x/crypto/bcrypt"

    "github.com/stripe/stripe-go/v74"
    "github.com/stripe/stripe-go/v74/checkout/session"
)
// Load environment variables
func init() {
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: Failed to load .env file")
	}
}

// Get JWT secret dynamically
func getJWTSecret() []byte {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		log.Println("Warning: JWT_SECRET is not set")
	}
	return []byte(secret)
}

// Signup handles user registration
func Signup(c *fiber.Ctx) error {
	type SignupRequest struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	req := new(SignupRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	// Trim whitespace
	req.Name = strings.TrimSpace(req.Name)
	req.Email = strings.TrimSpace(req.Email)
	req.Password = strings.TrimSpace(req.Password)

	// Validate input
	if len(req.Name) < 3 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Name must be at least 3 characters long"})
	}
	if !strings.Contains(req.Email, "@") {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid email address"})
	}
	if len(req.Password) < 6 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Password must be at least 6 characters long"})
	}

	// Check if user already exists
	exists, err := models.UserExists(req.Email)
	if err != nil {
		log.Println("Database error:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Database error"})
	}
	if exists {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error": "User already exists"})
	}

	// Create user
	if err := models.CreateUser(req.Name, req.Email, req.Password); err != nil {
		log.Println("Error creating user:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create user"})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "User registered successfully"})
}

// Login handles user authentication
func Login(c *fiber.Ctx) error {
	type LoginRequest struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	req := new(LoginRequest)
	if err := c.BodyParser(req); err != nil {
		log.Println("Error parsing request:", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	// Trim spaces
	req.Email = strings.TrimSpace(req.Email)
	req.Password = strings.TrimSpace(req.Password)

	log.Println("Login attempt:", req.Email)

	// Retrieve user details
	user, err := models.GetUserByEmail(req.Email)
	if err != nil {
		log.Println("User not found:", req.Email)
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid email or password"})
	}

	log.Println("User found:", user.Email)

	// Validate password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		log.Println("Password mismatch for:", req.Email)
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid email or password"})
	}

	log.Println("Password matched successfully for:", req.Email)

	// Generate JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":    user.ID,
		"email": user.Email,
		"exp":   time.Now().Add(24 * time.Hour).Unix(),
	})

	tokenString, err := token.SignedString(getJWTSecret())
	if err != nil {
		log.Println("Error generating token:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not generate token"})
	}

	log.Println("Token generated successfully for:", req.Email)

	return c.JSON(fiber.Map{"token": tokenString})
}

// Protected route
func Protected(c *fiber.Ctx) error {
	authHeader := c.Get("Authorization")
	if !strings.HasPrefix(authHeader, "Bearer ") {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token format"})
	}

	// Extract and trim token
	tokenString := strings.TrimSpace(strings.TrimPrefix(authHeader, "Bearer "))

	claims := jwt.MapClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (interface{}, error) {
		// Ensure token uses the correct signing method
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}
		return getJWTSecret(), nil
	})

	// Token validation
	if err != nil || !token.Valid {
		log.Println("Token parsing error:", err)
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid or expired token!"})
	}

	// Validate expiration time
	exp, ok := claims["exp"].(float64)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token format!"})
	}

	if time.Now().Unix() > int64(exp) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Token has expired!"})
	}

	// Extract email from token
	email, ok := claims["email"].(string)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token payload"})
	}

	return c.JSON(fiber.Map{
		"message": "Access granted to protected route",
		"email":   email,
	})
}

// POST /create-checkout-session
func CreateCheckoutSession(c *fiber.Ctx) error {
    var req struct {
        PlanName  string  `json:"planName"`
        PlanPrice float64 `json:"planPrice"`
    }
    if err := c.BodyParser(&req); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }

    stripe.Key = os.Getenv("STRIPE_SECRET_KEY")
    params := &stripe.CheckoutSessionParams{
        PaymentMethodTypes: stripe.StringSlice([]string{"card"}),
        LineItems: []*stripe.CheckoutSessionLineItemParams{
            {
                PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
                    Currency: stripe.String("usd"),
                    ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
                        Name: stripe.String(req.PlanName),
                    },
                    UnitAmount: stripe.Int64(int64(req.PlanPrice * 100)),
                },
                Quantity: stripe.Int64(1),
            },
        },
        Mode:       stripe.String(string(stripe.CheckoutSessionModePayment)),
        SuccessURL: stripe.String("http://localhost:3000/success"),
        CancelURL:  stripe.String("http://localhost:3000/cancel"),
    }
    s, err := session.New(params)
    if err != nil {
        log.Println("Stripe session error:", err)
        return c.Status(500).JSON(fiber.Map{"error": "Stripe error"})
    }
    return c.JSON(fiber.Map{"id": s.ID})
}