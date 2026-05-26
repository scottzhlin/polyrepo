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

	"github.com/your-org/polyrepo/services/adminapi"
)

func main() {
	addr := getenv("ADMIN_HTTP_ADDR", ":8081")
	serviceName := getenv("ADMIN_SERVICE_NAME", "admin-api")

	server := &http.Server{
		Addr:              addr,
		Handler:           adminapi.NewHandler(adminapi.Config{ServiceName: serviceName}),
		ReadHeaderTimeout: 5 * time.Second,
	}

	errs := make(chan error, 1)
	go func() {
		slog.Info("admin api listening", "addr", addr)
		errs <- server.ListenAndServe()
	}()

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	select {
	case <-ctx.Done():
		shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		if err := server.Shutdown(shutdownCtx); err != nil {
			slog.Error("admin api shutdown failed", "error", err)
			os.Exit(1)
		}
	case err := <-errs:
		if !errors.Is(err, http.ErrServerClosed) {
			slog.Error("admin api exited", "error", err)
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
