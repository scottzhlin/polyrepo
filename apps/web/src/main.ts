import { createPlatformPayload, escapeHTML } from "../../../packages/shared/src/index.ts";

export function renderWebApp(options: { appName?: string } = {}): string {
  const appName = options.appName || process.env.PUBLIC_APP_NAME || "Polyrepo";
  const payload = createPlatformPayload("web", "desktop web shell");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHTML(appName)} Web</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 3rem; line-height: 1.5; }
      main { max-width: 760px; }
      code { background: #f4f4f5; padding: 0.15rem 0.35rem; border-radius: 4px; }
    </style>
  </head>
  <body>
    <main>
      <h1>${escapeHTML(appName)} Web</h1>
      <p>This TypeScript sample proves the workspace can share typed code across web targets.</p>
      <pre><code>${escapeHTML(JSON.stringify(payload, null, 2))}</code></pre>
    </main>
  </body>
</html>
`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.stdout.write(renderWebApp());
}
