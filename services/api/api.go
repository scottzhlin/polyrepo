package api

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/your-org/agentic-polyglot-starter/internal/buildinfo"
)

// Config contains runtime settings needed by the HTTP assembly layer.
type Config struct {
	ServiceName string
}

// NewHandler returns the public HTTP surface for the service.
func NewHandler(cfg Config) http.Handler {
	if cfg.ServiceName == "" {
		cfg.ServiceName = "agentic-polyglot-starter"
	}

	mux := http.NewServeMux()
	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
	})
	mux.HandleFunc("GET /v1/meta", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, map[string]string{
			"service": cfg.ServiceName,
			"version": buildinfo.Version,
			"time":    time.Now().UTC().Format(time.RFC3339),
		})
	})
	return mux
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(payload); err != nil {
		panic(err)
	}
}
