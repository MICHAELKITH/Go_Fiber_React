package controllers

import (
	"log"
	"time"

	"github.com/MICHAELKITH/todo_app/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

// Secret key for JWT
var jwtSecret = []byte("your-secret-key")

// Signup handles user registration
func Signup(c *fiber.Ctx) error {
	type SignupRequest struct {
		Username string `json:"username" validate:"required,min=3"`
		Password string `json:"password" validate:"required,min=6"`
	}

	req := new(SignupRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	if req.Username == "" || req.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Username and password are required"})
	}

	// Check if user exists
	exists, err := models.UserExists(req.Username)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Database error"})
	}
	if exists {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error": "User already exists"})
	}

	// Create user
	err = models.CreateUser(req.Username, req.Password)
	if err != nil {
		log.Println("Error creating user:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create user"})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "User registered successfully"})
}

// Login handles user authentication
func Login(c *fiber.Ctx) error {
	type LoginRequest struct {
		Username string `json:"username" validate:"required"`
		Password string `json:"password" validate:"required"`
	}

	req := new(LoginRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	// Retrieve stored password
	storedPassword, err := models.GetUserPassword(req.Username)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid username or password"})
	}

	// Validate password
	if err := bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(req.Password)); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid username or password"})
	}

	// Generate JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": req.Username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		log.Println("Error generating token:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not generate token"})
	}

	return c.JSON(fiber.Map{"token": tokenString})
}

// Protected route
func Protected(c *fiber.Ctx) error {
	authHeader := c.Get("Authorization")
	if len(authHeader) <= len("Bearer ") {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token"})
	}
	tokenString := authHeader[len("Bearer "):]

	token, _ := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	claims := token.Claims.(jwt.MapClaims)
	username := claims["username"]

	return c.JSON(fiber.Map{
		"message":  "Access granted to protected route",
		"username": username,
	})
}
