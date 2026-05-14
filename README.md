# Nomina

A personal Tauri desktop app for bulk-renaming files and folders to snake_case and editing audio/video metadata.

## Requirements

| Tool                         | Version  | Notes                                      |
|:-----------------------------|:---------|:-------------------------------------------|
| [mise](https://mise.jdx.dev) | 2026.5.8 | manages Node, pnpm, and Rust               |
| Node                         | ~24.15   | pinned via `package.json` `engines`        |
| pnpm                         | 11.1.1   | pinned via `package.json` `packageManager` |
| Rust                         | 1.95.0   | pinned via `rust-toolchain.toml`           |

After cloning, run `mise install` to provision all runtimes, then:

```sh
pnpm install
```

## Project layout

```
/
├── frontend/          # Angular 21 application
│   ├── public/        # Static assets (favicon, etc.)
│   └── src/           # TypeScript source
├── shell/             # Tauri v2 / Rust shell
│   ├── capabilities/  # Tauri permission grants
│   ├── src/           # Rust source
│   └── tauri.conf.json
├── angular.json       # Angular workspace config (root = repo root)
├── tsconfig.json      # TypeScript project references
└── package.json       # Single pnpm manifest for all JS deps
```

See [`frontend/README.md`](frontend/README.md) and [`shell/README.md`](shell/README.md) for sub-project details.

## Development

Start the Tauri app (spawns the Angular dev server automatically):

```bash
pnpm shell:start
```

Or run the Angular dev server in isolation (useful for UI work without launching a native window):

```bash
pnpm frontend:start   # http://localhost:4200
```

## Building

```bash
pnpm shell:build      # production Tauri bundle
```

## Formatting

```bash
pnpm format:check                             # check JS/TS/HTML/SCSS with Prettier
pnpm format:write                             # auto-fix with Prettier
cargo fmt --manifest-path shell/Cargo.toml    # format Rust
```
