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

// Initial slice
var todos []Todos

// GetTodo fetches all todos
func GetTodo(c *fiber.Ctx) error {
	return c.Status(200).JSON(todos)
}

// AddTodo adds a new todo
func AddTodo(c *fiber.Ctx) error {
	todo := &Todos{}
	if err := c.BodyParser(todo); err != nil {
		log.Println("Error parsing body:", err)
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}
	if todo.Body == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Todo body is required"})
	}

	todo.ID = len(todos) + 1
	todos = append(todos, *todo)
	return c.Status(201).JSON(todo)
}

// UpdateTodo toggles the completed status of a todo
func UpdateTodo(c *fiber.Ctx) error {
	id := c.Params("id")

	for i, todo := range todos {
		if fmt.Sprint(todo.ID) == id {
			todos[i].Completed = !todos[i].Completed
			return c.Status(200).JSON(todos[i])
		}
	}

	return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
}

// DeleteTodo removes a todo
func DeleteTodo(c *fiber.Ctx) error {
	id := c.Params("id")

	for i, todo := range todos {
		if fmt.Sprint(todo.ID) == id {
			todos = append(todos[:i], todos[i+1:]...)
			return c.Status(200).JSON(fiber.Map{"success": true})
		}
	}

	return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
}


