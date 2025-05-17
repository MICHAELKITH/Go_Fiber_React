package auth

import (
	"errors"
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/MICHAELKITH/todo_app/models"
)

// GenerateJWT creates a JWT token for a  user.
func GenerateJWT(user models.User) (string, error) {
	secret, exists := os.LookupEnv("JWT_SECRET")
	if !exists || secret == "" {
		log.Println("JWT_SECRET is not set")
		return "", errors.New("internal server error: missing JWT secret")
	}

	claims := jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email, // Use Email instead of Username
		"exp":     time.Now().Add(24 * time.Hour).Unix(), // Expires in 24 hours
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte(secret))
	if err != nil {
		log.Println("Error signing token:", err)
		return "", errors.New("failed to generate token")
	}

	return signedToken, nil
}
