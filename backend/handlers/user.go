package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/MICHAELKITH/todo_app/models"
	"github.com/MICHAELKITH/todo_app/config"
)

func RegisterUser(c *fiber.Ctx) error {
	user := new(models.User)
	if err := c.BodyParser(user); err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Invalid request"})
	}

	// Save user to the database
	if err := config.DB.Create(user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "Failed to register user"})
	}

	return c.Status(201).JSON(fiber.Map{"message": "User registered successfully"})
}
