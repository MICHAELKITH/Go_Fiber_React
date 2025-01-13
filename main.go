package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)
 type Todos struct{
	ID int `json:"id"`
	Completed bool `json:"completed"`
	Body string `json:"body"`

 }
func main() {
	app := fiber.New()

	//initial slice
	todos:=[]Todos{}

	


	app.Get("/api", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(todos)
	})

	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo := &Todos{}
		if err := c.BodyParser(todo); err !=nil{
			return err
		}
		if todo.Body== ""{
			return c.Status(400).JSON(fiber.Map{"error":"Todo is required"})
		}

		todo.ID= len(todos)+1
		todos = append(todos, *todo)
		return c.Status(200).JSON(todo)
	})

	//update a todo

	app.Patch("/api/todos/:id", func(c *fiber.Ctx) error{
		id := c.Params("id")

		for i, todo := range todos{
			if fmt.Sprint(todo.ID)== id{
				todos[i].Completed = !todos[i].Completed
				return c.Status(200).JSON(todos[i])
			}
		}

		return c.Status(400).JSON(fiber.Map{"error":"Todo is required"})
	})

	log.Fatal(app.Listen(":4000"))
}