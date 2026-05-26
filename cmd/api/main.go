package main

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/your-org/agentic-polyglot-starter/services/api"
)

func main() {
	addr := getenv("HTTP_ADDR", ":8080")
	serviceName := getenv("SERVICE_NAME", "agentic-polyglot-starter")

	server := &http.Server{
		Addr:              addr,
		Handler:           api.NewHandler(api.Config{ServiceName: serviceName}),
		ReadHeaderTimeout: 5 * time.Second,
	}

	errs := make(chan error, 1)
	go func() {
		slog.Info("api listening", "addr", addr)
		errs <- server.ListenAndServe()
	}()

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	select {
	case <-ctx.Done():
		shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		if err := server.Shutdown(shutdownCtx); err != nil {
			slog.Error("api shutdown failed", "error", err)
			os.Exit(1)
		}
	case err := <-errs:
		if !errors.Is(err, http.ErrServerClosed) {
			slog.Error("api exited", "error", err)
			os.Exit(1)
		}
	}
}

func getenv(name string, fallback string) string {
	value := os.Getenv(name)
	if value == "" {
		return fallback
	}
	return value
}
