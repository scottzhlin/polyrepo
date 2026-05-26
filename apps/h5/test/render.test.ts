import assert from "node:assert/strict";
import { test } from "node:test";

import { renderH5App } from "../src/main.ts";

test("renderH5App renders a mobile-first H5 shell from shared TS code", () => {
  const html = renderH5App({ appName: "Starter" });

  assert.match(html, /viewport-fit=cover/);
  assert.match(html, /Starter H5/);
  assert.match(html, /&quot;platform&quot;: &quot;h5&quot;/);
});
