package main

import (
	"log"

	"github.com/MICHAELKITH/todo_app/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()
	app.Use(logger.New())

	// Setup routes
	routes.SetupRoutes(app)

	log.Fatal(app.Listen(":4000"))
}
