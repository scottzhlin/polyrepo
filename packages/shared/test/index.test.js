import assert from "node:assert/strict";
import { test } from "node:test";

import { createHealthPayload, escapeHTML } from "../src/index.js";

test("createHealthPayload returns a stable status payload", () => {
  assert.deepEqual(createHealthPayload("starter"), {
    service: "starter",
    status: "ok",
  });
});

test("createHealthPayload rejects empty service names", () => {
  assert.throws(() => createHealthPayload(""), /serviceName/);
});

test("escapeHTML escapes common HTML-sensitive characters", () => {
  assert.equal(escapeHTML('<span title="x&y">'), "&lt;span title=&quot;x&amp;y&quot;&gt;");
});
