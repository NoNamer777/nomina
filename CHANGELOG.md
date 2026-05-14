# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Domain glossary (`CONTEXT.md`) defining core concepts: Rename Operation, Staging Area, Commit, Conflict, Metadata Operation, Tag, and UI layout
- ADR 0001 recording the decision to use Angular as the frontend framework
- ADR 0002 recording the decision to use Tauri v2 with a non-standard project layout (`shell/` + `frontend/`)
- `CHANGELOG.md` following Keep a Changelog format
- `.editorconfig` enforcing UTF-8, LF line endings, 4-space indentation, and 120-character line length
- `.gitattributes` enforcing LF line endings for all text files including Rust (`.rs`) and TOML sources
- `.gitignore` excluding IDE directories, `node_modules/`, Angular build output, and Tauri/Rust build artefacts (`shell/target/`, `shell/gen/`)
- `package.json` — single pnpm manifest at the repo root covering all JavaScript dependencies (Angular 21, Tauri v2 JS bindings, Prettier)
- `pnpm-lock.yaml` — deterministic lockfile for reproducible installs
- `angular.json` — Angular 21 workspace configuration with `sourceRoot` at `frontend/src/` and SCSS as the inline style language; `OnPush` change detection set as the default schematic
- `tsconfig.json`, `tsconfig.app.json` — TypeScript project references for the Angular application
- `frontend/src/` — Angular 21 standalone application bootstrap (root component, app config, router)
- `frontend/public/favicon.ico` — default application icon
- `shell/Cargo.toml` — Rust crate for the Tauri shell, with `tauri-plugin-fs`, `tauri-plugin-dialog`, and `lofty` as dependencies
- `shell/tauri.conf.json` — Tauri v2 configuration; bundle identifier `org.eu.nl.oscarwellner.nomina`, initial window 1200×800
- `shell/capabilities/default.json` — Tauri v2 capability grant for `core:default`, `fs:default`, and `dialog:default`
- `shell/src/main.rs`, `shell/src/lib.rs` — Tauri application entry points with `fs` and `dialog` plugins registered
- `shell/build.rs` — Tauri build script
- `rust-toolchain.toml` — pins the Rust toolchain to stable via mise/rustup
- `rustfmt.toml` — Rust formatter configuration (edition 2024, 120-character line width)
- `.prettierrc` — Prettier configuration (single quotes, 120-character line width, SCSS/Angular HTML overrides, `prettier-plugin-organize-imports`)
