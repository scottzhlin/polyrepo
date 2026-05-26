export type Platform = "web" | "h5" | "miniapp";

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
  if (platform !== "web" && platform !== "h5" && platform !== "miniapp") {
    throw new TypeError("platform must be web, h5, or miniapp");
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
