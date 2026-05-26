package adminapi

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/your-org/polyrepo/internal/buildinfo"
)

// Config contains runtime settings for the admin HTTP service.
type Config struct {
	ServiceName string
}

// NewHandler returns the admin service HTTP surface.
func NewHandler(cfg Config) http.Handler {
	if cfg.ServiceName == "" {
		cfg.ServiceName = "admin-api"
	}

	mux := http.NewServeMux()
	mux.HandleFunc("GET /admin/healthz", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, map[string]string{"status": "ok", "surface": "admin"})
	})
	mux.HandleFunc("GET /admin/v1/meta", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, map[string]string{
			"service": cfg.ServiceName,
			"surface": "admin",
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
