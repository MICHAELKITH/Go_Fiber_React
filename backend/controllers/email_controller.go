package controllers

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
)

func CheckEmailBreach(c *fiber.Ctx) error {
	email := c.Query("email")
	if email == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Email is required",
		})
	}
//api fectching 
	url := fmt.Sprintf("https://haveibeenpwned.com/api/v3/breachedaccount/%s", email)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to create request",
		})
	}

	req.Header.Set("hibp-api-key", os.Getenv("HIBP_API_KEY"))
	req.Header.Set("User-Agent", "55BlocksApp")

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to contact HIBP",
		})
	}
	defer res.Body.Close()

	if res.StatusCode == 404 {
		return c.JSON(fiber.Map{"breached": false})
	} else if res.StatusCode == 200 {
		return c.JSON(fiber.Map{"breached": true})
	}

	return c.Status(res.StatusCode).JSON(fiber.Map{
		"error": "Unexpected HIBP response",
	})
}
