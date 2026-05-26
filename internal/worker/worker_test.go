package worker

import "testing"

func TestRunOnceReturnsWorkerReport(t *testing.T) {
	report := RunOnce(Config{Name: "jobs-worker"})

	if report.Name != "jobs-worker" {
		t.Fatalf("name = %q, want jobs-worker", report.Name)
	}
	if report.Status != "idle" {
		t.Fatalf("status = %q, want idle", report.Status)
	}
}
