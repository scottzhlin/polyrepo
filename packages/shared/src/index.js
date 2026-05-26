export function createHealthPayload(serviceName) {
  if (!serviceName || typeof serviceName !== "string") {
    throw new TypeError("serviceName must be a non-empty string");
  }

  return {
    service: serviceName,
    status: "ok",
  };
}

export function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
