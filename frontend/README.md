# frontend

Angular 21 application for Nomina. Runs inside the Tauri webview in production, or in a browser during development.

## Structure

```
frontend/
├── public/          # Static assets copied verbatim to the build output
└── src/
    ├── main.ts      # Application bootstrap
    ├── styles.scss  # Global stylesheet
    ├── index.html   # HTML shell (base href="./" for Tauri asset serving)
    └── core/
        ├── config/
        │   ├── app.config.ts  # ApplicationConfig (providers)
        │   └── app.routes.ts  # Top-level route definitions
        └── root/
            └── root.ts        # Root component
```

## Commands

All commands are run from the **repo root**.

| Command                | Description                                      |
|:-----------------------|:-------------------------------------------------|
| `pnpm frontend:start`  | Start the dev server at `http://localhost:4200`  |
| `pnpm frontend:build`  | Production build → `dist/nomina/browser/`        |
| `pnpm format:write`    | Format all TS/HTML/SCSS with Prettier            |

## Generating components

```sh
pnpm ng g c path/to/my-component
```

Angular schematics are configured to use OnPush change detection and SCSS by default (see `angular.json` → `schematics`).

## Notes

- `base href` is set to `./` (relative) so Tauri can serve assets from the filesystem without a web server.
- All component stylesheets use SCSS. The global stylesheet is `frontend/src/styles.scss`.
- Import order is enforced automatically by `prettier-plugin-organize-imports` on format.
