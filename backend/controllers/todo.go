package controllers

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

type Todos struct {
	ID        int    `json:"id"`
	Completed bool   `json:"completed"`
	Body      string `json:"body"`
}

// In-memory todo storage
var todos []Todos

// GetTodo fetches all todos
func GetTodo(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(todos)
}

// AddTodo adds a new todo
func AddTodo(c *fiber.Ctx) error {
	todo := &Todos{}
	if err := c.BodyParser(todo); err != nil {
		log.Println("Error parsing body:", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	if todo.Body == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Todo body is required"})
	}

	todo.ID = len(todos) + 1
	todos = append(todos, *todo)
	return c.Status(fiber.StatusCreated).JSON(todo)
}

// UpdateTodo updates the completed status or body of a todo
func UpdateTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	update := &Todos{}

	if err := c.BodyParser(update); err != nil {
		log.Println("Error parsing body:", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	for i, todo := range todos {
		if fmt.Sprint(todo.ID) == id {
			// Optional updates
			if update.Body != "" {
				todos[i].Body = update.Body
			}
			todos[i].Completed = update.Completed
			return c.Status(fiber.StatusOK).JSON(todos[i])
		}
	}

	return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Todo not found"})
}

// DeleteTodo removes a todo
func DeleteTodo(c *fiber.Ctx) error {
	id := c.Params("id")

	for i, todo := range todos {
		if fmt.Sprint(todo.ID) == id {
			todos = append(todos[:i], todos[i+1:]...)
			return c.Status(fiber.StatusOK).JSON(fiber.Map{"success": true})
		}
	}

	return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Todo not found"})
}
