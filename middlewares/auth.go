package middlewares

import (
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

// AuthMiddleware validates the JWT token in the request header.
func AuthMiddleware(c *fiber.Ctx) error {
	authHeader := c.Get("Authorization")
	if authHeader == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Missing authorization token"})
	}

	// Ensure token starts with "Bearer "
	if !strings.HasPrefix(authHeader, "Bearer ") {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token format"})
	}

	// Extract token after "Bearer " and remove any extra quotes
	tokenString := strings.Trim(strings.TrimPrefix(authHeader, "Bearer "), "\"")
	fmt.Println("Received Token:", tokenString) // Debugging log

	// Get secret key from environment variables
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Server misconfiguration: Missing JWT secret"})
	}

	// Parse the token with claims
	claims := jwt.MapClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fiber.NewError(fiber.StatusUnauthorized, "Invalid signing method")
		}
		return []byte(secret), nil
	})

	// Handle token parsing errors
	if err != nil || !token.Valid {
		fmt.Println("Token parsing error:", err) // Debugging log
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid or expired token!"})
	}

	// Extract and validate expiration time
	exp, ok := claims["exp"].(float64)
	if !ok || time.Now().Unix() > int64(exp) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Token has expired"})
	}

	// Extract user_id and email safely
	if id, ok := claims["id"].(float64); ok {
		c.Locals("user_id", int(id))
	} else {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	if email, ok := claims["email"].(string); ok {
		c.Locals("email", email)
	} else {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid email"})
	}

	// Token is valid; proceed to the next handler
	return c.Next()
}
