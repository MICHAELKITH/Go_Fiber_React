package controllers

import (
    "fmt"
    "log"

    "github.com/gofiber/fiber/v2"
)

// Add a UserID field to Todos struct
type Todos struct {
    ID        int    `json:"id"`
    Completed bool   `json:"completed"`
    Body      string `json:"body"`
    UserID    string `json:"user_id"` // Add this field
}

// Initial slice
var todos []Todos

// GetTodo fetches all todos for the logged-in user
func GetTodo(c *fiber.Ctx) error {
    userID := c.Locals("user_id")
    if userID == nil {
        return c.Status(401).JSON(fiber.Map{"error": "Unauthorized"})
    }

    userTodos := []Todos{}
    for _, todo := range todos {
        if todo.UserID == userID {
            userTodos = append(userTodos, todo)
        }
    }
    return c.Status(200).JSON(userTodos)
}

// AddTodo adds a new todo for the logged-in user
func AddTodo(c *fiber.Ctx) error {
    userID := c.Locals("user_id")
    if userID == nil {
        return c.Status(401).JSON(fiber.Map{"error": "Unauthorized"})
    }

    todo := &Todos{}
    if err := c.BodyParser(todo); err != nil {
        log.Println("Error parsing body:", err)
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
    }
    if todo.Body == "" {
        return c.Status(400).JSON(fiber.Map{"error": "Todo body is required"})
    }

    todo.ID = len(todos) + 1
    todo.UserID = userID.(string)
    todos = append(todos, *todo)
    return c.Status(201).JSON(todo)
}

// UpdateTodo toggles the completed status of a todo (only if owned by user)
func UpdateTodo(c *fiber.Ctx) error {
    userID := c.Locals("user_id")
    if userID == nil {
        return c.Status(401).JSON(fiber.Map{"error": "Unauthorized"})
    }
    id := c.Params("id")

    for i, todo := range todos {
        if fmt.Sprint(todo.ID) == id && todo.UserID == userID {
            todos[i].Completed = !todos[i].Completed
            return c.Status(200).JSON(todos[i])
        }
    }

    return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
}

// DeleteTodo removes a todo (only if owned by user)
func DeleteTodo(c *fiber.Ctx) error {
    userID := c.Locals("user_id")
    if userID == nil {
        return c.Status(401).JSON(fiber.Map{"error": "Unauthorized"})
    }
    id := c.Params("id")

    for i, todo := range todos {
        if fmt.Sprint(todo.ID) == id && todo.UserID == userID {
            todos = append(todos[:i], todos[i+1:]...)
            return c.Status(200).JSON(fiber.Map{"success": true})
        }
    }

    return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
}