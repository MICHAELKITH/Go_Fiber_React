package main

import (
	"fmt"
	"log"
	"os"

	"github.com/MICHAELKITH/todo_app/config"
	"github.com/MICHAELKITH/todo_app/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv" 
)

func main() {
	// Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		log.Printf("Error loading .env file: %v", err)
	}

	// Get DB credentials from environment variables
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	// Validate required environment variables
	if dbUser == "" || dbPassword == "" || dbHost == "" || dbPort == "" || dbName == "" {
		log.Fatal("Missing required environment variables for database connection")
	}

	// Build the connection string
	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s", dbUser, dbPassword, dbHost, dbPort, dbName)

	// Initialize the database connection
// Database connection
    config.InitializeDB(dsn)
	defer config.CloseDB()

	// Initialize the Fiber app
	app := fiber.New()
	app.Use(logger.New())

	// Setup routes
	routes.SetupRoutes(app)

	// Start the server
	port := ":4000"
	log.Printf("Starting server on port %s...", port)
	log.Fatal(app.Listen(port))
}
