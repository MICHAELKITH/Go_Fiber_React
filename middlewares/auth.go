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
		return fiber.NewError(fiber.StatusUnauthorized, "Missing authorization token")
	}

	// Ensure token starts with "Bearer "
	if !strings.HasPrefix(authHeader, "Bearer ") {
		return fiber.NewError(fiber.StatusUnauthorized, "Invalid token format")
	}

	// Extract token after "Bearer "
	tokenString := strings.TrimPrefix(authHeader, "Bearer ")

	// Get secret key from environment variables
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		return fiber.NewError(fiber.StatusInternalServerError, "Server misconfiguration: Missing JWT secret")
	}

	// Debugging: Print token and secret (remove in production)
	fmt.Println("Received Token:", tokenString)
	fmt.Println("JWT_SECRET:", secret)

	// Parse the token
	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		// Ensure the token uses HMAC signing method
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fiber.NewError(fiber.StatusUnauthorized, "Invalid signing method")
		}
		return []byte(secret), nil
	})

	// Handle token parsing errors
	if err != nil {
		fmt.Println("JWT Parsing Error:", err)
		return fiber.NewError(fiber.StatusUnauthorized, "Invalid or expired token")
	}

	// Ensure the token is valid
	if !token.Valid {
		return fiber.NewError(fiber.StatusUnauthorized, "Invalid or expired token")
	}

	// Extract claims safely
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return fiber.NewError(fiber.StatusUnauthorized, "Invalid token claims")
	}

	// Check expiration time
	exp, ok := claims["exp"].(float64)
	if !ok {
		return fiber.NewError(fiber.StatusUnauthorized, "Token expiration time missing")
	}
	if time.Now().Unix() > int64(exp) {
		return fiber.NewError(fiber.StatusUnauthorized, "Token has expired")
	}

	// Extract user_id and username from claims safely
	if userID, ok := claims["user_id"].(float64); ok {
		c.Locals("user_id", int(userID)) // Convert float64 to int
	}
	if username, ok := claims["username"].(string); ok {
		c.Locals("username", username)
	}

	// Token is valid; proceed to the next handler
	return c.Next()
}
