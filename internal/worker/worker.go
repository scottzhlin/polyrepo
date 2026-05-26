package worker

// Config contains settings for a background worker service.
type Config struct {
	Name string
}

// Report describes one worker run. Real products can add queue names,
// processed counts, retry counts, and timing metrics.
type Report struct {
	Name   string
	Status string
}

// RunOnce is a deterministic starter hook for background job processing.
func RunOnce(cfg Config) Report {
	if cfg.Name == "" {
		cfg.Name = "worker"
	}
	return Report{
		Name:   cfg.Name,
		Status: "idle",
	}
}
