package models

import (
	"context"

	"github.com/MICHAELKITH/todo_app/config"
	"golang.org/x/crypto/bcrypt"
)

// User struct represents a user in the database.
type User struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password,omitempty"` // Omitting password in JSON responses
}

// Check if a user exists in the database.
func UserExists(email string) (bool, error) {
	var exists bool
	err := config.DBPool.QueryRow(context.Background(),
		"SELECT EXISTS (SELECT 1 FROM users WHERE email=$1)", email).Scan(&exists)
	return exists, err
}

// CreateUser inserts a new user into the database.
func CreateUser(name, email, password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	_, err = config.DBPool.Exec(context.Background(),
		"INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", name, email, string(hashedPassword))
	return err
}

// GetUserByEmail retrieves a user by email.
func GetUserByEmail(email string) (User, error) {
	var user User
	err := config.DBPool.QueryRow(context.Background(),
		"SELECT id, name, email, password FROM users WHERE email=$1", email).
		Scan(&user.ID, &user.Name, &user.Email, &user.Password)

	return user, err
}
