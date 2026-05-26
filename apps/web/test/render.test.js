import assert from "node:assert/strict";
import { test } from "node:test";

import { renderApp } from "../src/main.js";

test("renderApp includes escaped app name and shared payload", () => {
  const html = renderApp({ appName: "<Starter>" });

  assert.match(html, /&lt;Starter&gt;/);
  assert.match(html, /&quot;service&quot;: &quot;web&quot;/);
  assert.doesNotMatch(html, /<Starter>/);
});
