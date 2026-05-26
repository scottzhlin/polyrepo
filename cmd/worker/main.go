package main

import (
	"encoding/json"
	"log/slog"
	"os"

	"github.com/your-org/ai-coding-polyglot-monorepo-template/internal/worker"
)

func main() {
	report := worker.RunOnce(worker.Config{Name: getenv("WORKER_NAME", "jobs-worker")})
	if err := json.NewEncoder(os.Stdout).Encode(report); err != nil {
		slog.Error("encode worker report", "error", err)
		os.Exit(1)
	}
}

func getenv(name string, fallback string) string {
	value := os.Getenv(name)
	if value == "" {
		return fallback
	}
	return value
}
