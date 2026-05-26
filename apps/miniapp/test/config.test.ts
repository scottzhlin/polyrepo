import assert from "node:assert/strict";
import { test } from "node:test";

import { createMiniappConfig } from "../src/main.ts";

test("createMiniappConfig returns a mini program app shell", () => {
  const config = createMiniappConfig("Demo Miniapp");

  assert.deepEqual(config.pages, ["pages/home/index", "pages/profile/index"]);
  assert.equal(config.window.navigationBarTitleText, "Demo Miniapp");
  assert.equal(config.seed.platform, "miniapp");
});
