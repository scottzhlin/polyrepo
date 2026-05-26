package adminapi

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestAdminMeta(t *testing.T) {
	handler := NewHandler(Config{ServiceName: "admin-api"})
	request := httptest.NewRequest(http.MethodGet, "/admin/v1/meta", nil)
	response := httptest.NewRecorder()

	handler.ServeHTTP(response, request)

	if response.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", response.Code, http.StatusOK)
	}
	var body map[string]string
	if err := json.Unmarshal(response.Body.Bytes(), &body); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if body["service"] != "admin-api" {
		t.Fatalf("service = %q, want admin-api", body["service"])
	}
	if body["surface"] != "admin" {
		t.Fatalf("surface = %q, want admin", body["surface"])
	}
}
