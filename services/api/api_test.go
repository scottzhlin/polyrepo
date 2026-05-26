package api

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHealthz(t *testing.T) {
	handler := NewHandler(Config{ServiceName: "test-service"})
	request := httptest.NewRequest(http.MethodGet, "/healthz", nil)
	response := httptest.NewRecorder()

	handler.ServeHTTP(response, request)

	if response.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", response.Code, http.StatusOK)
	}
	body := decodeJSON(t, response)
	if body["status"] != "ok" {
		t.Fatalf("status payload = %q, want ok", body["status"])
	}
}

func TestMeta(t *testing.T) {
	handler := NewHandler(Config{ServiceName: "test-service"})
	request := httptest.NewRequest(http.MethodGet, "/v1/meta", nil)
	response := httptest.NewRecorder()

	handler.ServeHTTP(response, request)

	if response.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", response.Code, http.StatusOK)
	}
	body := decodeJSON(t, response)
	if body["service"] != "test-service" {
		t.Fatalf("service = %q, want test-service", body["service"])
	}
	if body["version"] == "" {
		t.Fatal("version should be present")
	}
	if body["time"] == "" {
		t.Fatal("time should be present")
	}
}

func decodeJSON(t *testing.T, response *httptest.ResponseRecorder) map[string]string {
	t.Helper()
	var body map[string]string
	if err := json.Unmarshal(response.Body.Bytes(), &body); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	return body
}
