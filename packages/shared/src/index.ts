export type Platform = "web" | "h5";

export type PlatformPayload = {
  platform: Platform;
  service: string;
  status: "ok";
};

export function createHealthPayload(serviceName: string): { service: string; status: "ok" } {
  if (!serviceName || typeof serviceName !== "string") {
    throw new TypeError("serviceName must be a non-empty string");
  }

  return {
    service: serviceName,
    status: "ok",
  };
}

export function createPlatformPayload(platform: Platform, service: string): PlatformPayload {
  if (platform !== "web" && platform !== "h5") {
    throw new TypeError("platform must be web or h5");
  }

  return {
    platform,
    service,
    status: "ok",
  };
}

export function escapeHTML(value: unknown): string {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
