import assert from "node:assert/strict";
import { test } from "node:test";

import { renderWebApp } from "../src/main.ts";

test("renderWebApp includes escaped app name and shared web payload", () => {
  const html = renderWebApp({ appName: "<Starter>" });

  assert.match(html, /&lt;Starter&gt; Web/);
  assert.match(html, /&quot;platform&quot;: &quot;web&quot;/);
  assert.doesNotMatch(html, /<Starter>/);
});
