package main

import (
    "bytes"
    "fmt"
    "net/http"
    "net/url"
)

const baseURL = "https://tinypesa.com/api/v1/"

// initTransaction initializes an M-Pesa transaction
func initTransaction(amount string, msisdn string) {
    formData := url.Values{
        "amount": {amount},
        "msisdn": {msisdn},
    }

    client := &http.Client{}
    req, err := http.NewRequest("POST", baseURL+"express/initialize", bytes.NewReader([]byte(formData.Encode())))
    if err != nil {
        fmt.Println("Error creating request:", err)
        return
    }

    req.Header.Add("Accept", "application/json")
    req.Header.Add("Apikey", "UX0bRhL3c20") // Replace with your actual API key
    req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

    // Debugging: Print request details
    fmt.Println("Request URL:", req.URL)
    fmt.Println("Request Headers:", req.Header)
    fmt.Println("Request Body:", formData.Encode())

    res, err := client.Do(req)
    if err != nil {
        fmt.Println("Error sending request:", err)
        return
    }
    defer res.Body.Close()

    // Debugging: Print response status
    fmt.Println("Response Status:", res.Status)

    if res.StatusCode != http.StatusOK {
        fmt.Println("Error:", res.Status)
    } else {
        fmt.Println("Check Phone for STK Push")
    }
}

func main() {
    // Example usage of initTransaction
    amount := "10"         // Amount to be transacted
    msisdn := "0714707147" // Phone number to receive the STK push

    initTransaction(amount, msisdn)
}