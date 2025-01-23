package middlewares

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

// AuthMiddleware validates the JWT token in the request header
func AuthMiddleware(c *fiber.Ctx) error {
	authHeader := c.Get("Authorization")
	if authHeader == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Missing authorization token"})
	}

	// Extract token from header (after "Bearer ")
	tokenString := authHeader[len("Bearer "):]

	// Parse the token
	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		// Use your secret key for validation
		return []byte("your-secret-key"), nil
	})

	if err != nil || !token.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid or expired token"})
	}

	// Token is valid; continue to the next handler
	return c.Next()
}
