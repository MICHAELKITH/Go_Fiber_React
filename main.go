package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
)
 type Todos struct{
	id int
	completed bool
	desc string

 }
func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	app.Patch("/:id", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	log.Fatal(app.Listen(":8000"))
}