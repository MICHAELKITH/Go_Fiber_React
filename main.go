package main

import (
	"log"

	"github.com/MICHAELKITH/todo_app/routes"
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	// Setup routes
	routes.SetupRoutes(app)

	log.Fatal(app.Listen(":4000"))
}
