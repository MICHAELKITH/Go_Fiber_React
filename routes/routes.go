package routes

import (
	"github.com/MICHAELKITH/todo_app/controllers"
	"github.com/MICHAELKITH/todo_app/middlewares"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	// Public routes
	app.Post("/signup", controllers.Signup)
	app.Post("/login", controllers.Login)

	// Group protected routes
	protected := app.Group("/api", middlewares.AuthMiddleware)
	protected.Get("/todos", controllers.GetTodo)
	protected.Post("/todos", controllers.AddTodo)
	protected.Patch("/todos/:id", controllers.UpdateTodo)
	protected.Delete("/todos/:id", controllers.DeleteTodo)

	// Example protected route
	app.Get("/protected", middlewares.AuthMiddleware, controllers.Protected)
}
