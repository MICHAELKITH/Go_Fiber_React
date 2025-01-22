package main

import (
	"log"

	"github.com/MICHAELKITH/todo_app/routes"
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()


	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})
	// Setup routes
	routes.SetupRoutes(app)
	
	//app listening


	log.Fatal(app.Listen(":3000"))
}