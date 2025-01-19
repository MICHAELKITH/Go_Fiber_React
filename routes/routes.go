package routes

import (
	"github.com/MICHAELKITH/todo_app/controllers"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {

	app.Get("/api/todos", controllers.GetTodo)
	app.Post("/api/todos", controllers.AddTodo)
	app.Patch("/api/todos:id", controllers.UpdateTodo)
	app.Delete("/api/todos:id", controllers.DeleteTodo)
	
}

