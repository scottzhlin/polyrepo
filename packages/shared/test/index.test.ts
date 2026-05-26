import assert from "node:assert/strict";
import { test } from "node:test";

import { createHealthPayload, createPlatformPayload, escapeHTML } from "../src/index.ts";

test("createHealthPayload returns a stable status payload", () => {
  assert.deepEqual(createHealthPayload("starter"), {
    service: "starter",
    status: "ok",
  });
});

test("createHealthPayload rejects empty service names", () => {
  assert.throws(() => createHealthPayload(""), /serviceName/);
});

test("createPlatformPayload identifies web and h5 targets", () => {
  assert.deepEqual(createPlatformPayload("h5", "mobile shell"), {
    platform: "h5",
    service: "mobile shell",
    status: "ok",
  });
});

test("escapeHTML escapes common HTML-sensitive characters", () => {
  assert.equal(escapeHTML('<span title="x&y">'), "&lt;span title=&quot;x&amp;y&quot;&gt;");
});
