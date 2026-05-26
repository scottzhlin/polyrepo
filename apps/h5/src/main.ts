import { createPlatformPayload, escapeHTML } from "../../../packages/shared/src/index.ts";

export function renderH5App(options: { appName?: string } = {}): string {
  const appName = options.appName || process.env.PUBLIC_APP_NAME || "Polyrepo";
  const payload = createPlatformPayload("h5", "mobile-first h5 shell");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>${escapeHTML(appName)} H5</title>
  </head>
  <body>
    <main>
      <h1>${escapeHTML(appName)} H5</h1>
      <pre><code>${escapeHTML(JSON.stringify(payload, null, 2))}</code></pre>
    </main>
  </body>
</html>
`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.stdout.write(renderH5App());
}
