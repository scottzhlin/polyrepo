import { createPlatformPayload } from "../../../packages/shared/src/index.ts";

export type MiniappConfig = {
  pages: string[];
  window: {
    navigationBarTitleText: string;
  };
  seed: ReturnType<typeof createPlatformPayload>;
};

export function createMiniappConfig(appName = "Polyrepo"): MiniappConfig {
  return {
    pages: ["pages/home/index", "pages/profile/index"],
    window: {
      navigationBarTitleText: appName,
    },
    seed: createPlatformPayload("miniapp", "mini program shell"),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.stdout.write(`${JSON.stringify(createMiniappConfig(), null, 2)}\n`);
}
