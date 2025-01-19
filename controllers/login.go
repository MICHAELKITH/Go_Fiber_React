package controllers

import (
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

// User represents a user in the database
type User struct {
	Username string
	Password string
}

// Database simulation (in-memory)
var users = make(map[string]string)

// Secret key for JWT
var jwtSecret = []byte("your-secret-key")

// Signup handles user registration
func Signup(c *fiber.Ctx) error {
	// Request payload structure
	type SignupRequest struct {
		Username string `json:"username" validate:"required,min=3"`
		Password string `json:"password" validate:"required,min=6"`
	}

	// Parse the request body
	req := new(SignupRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	// Validate input (simple check, add a library like validator for better validation)
	if req.Username == "" || req.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Username and password are required"})
	}

	if _, exists := users[req.Username]; exists {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error": "User already exists"})
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Println("Error hashing password:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Unable to process password"})
	}

	// Store user in the "database"
	users[req.Username] = string(hashedPassword)
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "User registered successfully"})
}

// Login handles user authentication
func Login(c *fiber.Ctx) error {
	// Request payload structure
	type LoginRequest struct {
		Username string `json:"username" validate:"required"`
		Password string `json:"password" validate:"required"`
	}

	// Parse the request body
	req := new(LoginRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	// Check if user exists
	storedPassword, exists := users[req.Username]
	if !exists {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid username or password"})
	}

	// Validate password
	if err := bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(req.Password)); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid username or password"})
	}

	// Generate JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": req.Username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(), // Token valid for 24 hours
	})

	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		log.Println("Error generating token:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not generate token"})
	}

	return c.JSON(fiber.Map{"token": tokenString})
}

// Protected handles access to protected resources
func Protected(c *fiber.Ctx) error {
	// Get the Authorization header
	authHeader := c.Get("Authorization")
	if authHeader == "" || len(authHeader) <= len("Bearer ") {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Missing or invalid token"})
	}

	// Extract token from the Authorization header
	tokenString := authHeader[len("Bearer "):]
	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	// Check if the token is valid
	if err != nil || !token.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid or expired token"})
	}

	// Extract claims
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || claims["username"] == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token claims"})
	}

	username := claims["username"].(string)
	return c.JSON(fiber.Map{"message": "Access granted", "username": username})
}
