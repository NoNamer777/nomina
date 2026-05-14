# shell

Tauri v2 / Rust shell for Nomina. Hosts the Angular webview, exposes native filesystem and dialog APIs, and handles all file I/O and metadata operations.

## Structure

```
shell/
├── capabilities/
│   └── default.json   # Permission grants (core, fs, dialog)
├── src/
│   ├── main.rs        # Binary entry point
│   └── lib.rs         # Tauri builder, plugin registration, command handler
├── build.rs           # tauri-build codegen step
├── Cargo.toml         # Rust dependencies
└── tauri.conf.json    # Tauri v2 configuration
```

## Key dependencies

| Crate                  | Purpose                                                                     |
|:-----------------------|:----------------------------------------------------------------------------|
| `tauri`                | Desktop app runtime and webview host                                        |
| `tauri-plugin-fs`      | Read directory trees, read and write files                                  |
| `tauri-plugin-dialog`  | Native folder/file picker                                                   |
| `lofty`                | Read and write audio/video tags (MP3, FLAC, OGG, AAC, WAV, OPUS, MP4, MKV)  |

## Commands

| Command            | Directory | Description                                                  |
|:-------------------|:----------|:-------------------------------------------------------------|
| `pnpm shell:start` | repo root | Start Tauri in dev mode (also starts the Angular dev server) |
| `pnpm shell:build` | repo root | Build a production bundle for the current platform           |
| `cargo fmt`        | `shell/`  | Format Rust source with rustfmt                              |
| `cargo clippy`     | `shell/`  | Lint Rust source                                             |

## Adding a Tauri command

1. Define the function in `shell/src/lib.rs` and annotate it with `#[tauri::command]`.
2. Register it in the `invoke_handler` inside `run()`.
3. Call it from Angular via `@tauri-apps/api/core` `invoke()`.

## Configuration

`tauri.conf.json` notable settings:

- **identifier**: `org.eu.nl.oscarwellner.nomina`
- **devUrl**: `http://localhost:4200` (Angular dev server)
- **frontendDist**: `../dist/nomina/browser` (Angular production build output)
- **beforeDevCommand**: starts the Angular dev server via pnpm before opening the webview
- **window**: 1200×800 initial size, no CSP restriction during development
