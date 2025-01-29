package models

import (
	"context"

	"github.com/MICHAELKITH/todo_app/config"
	"golang.org/x/crypto/bcrypt"
)

// User represents a user in the database
type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// Check if a user exists in the database
func UserExists(username string) (bool, error) {
	var exists bool
	err := config.DBPool.QueryRow(context.Background(),
		"SELECT EXISTS (SELECT 1 FROM users WHERE username=$1)", username).Scan(&exists)
	return exists, err
}

// Create a new user in the database
func CreateUser(username, password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	_, err = config.DBPool.Exec(context.Background(),
		"INSERT INTO users (username, password) VALUES ($1, $2)", username, string(hashedPassword))
	return err
}

// Get a user's hashed password from the database
func GetUserPassword(username string) (string, error) {
	var storedPassword string
	err := config.DBPool.QueryRow(context.Background(),
		"SELECT password FROM users WHERE username=$1", username).Scan(&storedPassword)
	return storedPassword, err
}
