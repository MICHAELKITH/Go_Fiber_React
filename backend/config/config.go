package config

import (
    "context"
    "log"
    "github.com/jackc/pgx/v5/pgxpool"
)

var DBPool *pgxpool.Pool

// InitializeDB initializes the database connection pool
func InitializeDB(dsn string) {
    var err error
    DBPool, err = pgxpool.New(context.Background(), dsn)
    if err != nil {
        log.Fatalf("\033[31mUnable to connect to the database: %v\033[0m\n", err) 
    }
    log.Println("\033[36mDatabase connection established!\033[0m") 
}

// CloseDB closes the database connection pool
func CloseDB() {
    if DBPool != nil {
        DBPool.Close()
    }
}
