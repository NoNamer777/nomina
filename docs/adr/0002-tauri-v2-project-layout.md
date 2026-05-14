# ADR 0002 — Tauri v2 with non-standard project layout

**Status**: Accepted

## Context

Nomina is a Tauri desktop app. Tauri requires a Rust crate (the "shell") that embeds the frontend and exposes native APIs, alongside a frontend project. The default `create-tauri-app` scaffold puts the Rust crate in `src-tauri/` co-located with the frontend at the repo root.

We wanted symmetric, self-contained roots for both sub-projects — neither should feel like a satellite of the other.

## Decision

Use **Tauri v2** (latest stable) with the following non-standard layout:

```
/
├── shell/              ← Tauri/Rust project root (replaces src-tauri/)
│   ├── src/            ← Rust source (main.rs, lib.rs)
│   ├── capabilities/
│   ├── Cargo.toml
│   ├── build.rs
│   └── tauri.conf.json
├── frontend/
│   └── src/            ← Angular source root
├── angular.json        ← Angular workspace config (project root = repo root)
├── tsconfig.json
└── package.json        ← single pnpm manifest for all JS dependencies
```

Tauri CLI is invoked from the repo root with `--manifest-path shell/Cargo.toml` so it locates `shell/tauri.conf.json` correctly. `frontendDist` in `tauri.conf.json` points to `../dist/nomina/browser` (the Angular output relative to `shell/`).

## Alternatives considered

- **Default layout** (`src-tauri/` + `src/`): Rejected because it makes the Rust shell feel subordinate to the frontend and Angular's `src/` clashes with convention.
- **Nx monorepo**: Rejected — community Tauri plugin, significant tooling overhead for a two-project repo.
- **Separate `package.json` per sub-project** (pnpm workspaces): Rejected — a single JS dependency tree is simpler; Angular and Tauri JS deps don't conflict.

## Consequences

- `tauri dev` and `tauri build` must always be run with `--manifest-path shell/Cargo.toml` (wrapped in root pnpm scripts).
- All Tauri documentation examples assume `src-tauri/` — mentally substitute `shell/` when following them.
- Angular CLI commands (`ng serve`, `ng build`) run from the repo root; `angular.json` is at root with `sourceRoot` pointing into `frontend/src`.
