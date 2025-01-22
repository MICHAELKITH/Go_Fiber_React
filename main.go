package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

<<<<<<< HEAD
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})
=======
	// Setup routes
	routes.SetupRoutes(app)
	
	//app listening
>>>>>>> routes

	log.Fatal(app.Listen(":3000"))
}