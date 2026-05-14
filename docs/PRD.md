# Nomina — Product Requirements Document

## Overview

Nomina is a personal Tauri desktop application for bulk-renaming files and folders to snake_case and editing embedded audio/video metadata. It is a personal tool, not designed for distribution, with an opinionated and minimal feature set.

---

## Goals

- Quickly normalize file and folder names to snake_case across an entire directory tree
- Read and edit embedded media tags (artist, album, year, etc.) for audio and video files
- Preview all changes before anything touches the disk

## Non-Goals

- User-defined naming formats or templates
- Tag-driven renaming (deriving file names from metadata)
- Support for document metadata (PDF, Office)
- Image metadata editing (EXIF/XMP)
- Multi-user or networked use

---

## Technology Stack

| Layer    | Choice                                |
|----------|---------------------------------------|
| Shell    | Tauri                                 |
| Frontend | Angular                               |
| Language | TypeScript (frontend), Rust (backend) |

---

## Features

### 1. File Renaming

#### Transformation

All file and folder names are normalized to **snake_case**:

- All characters are lowercased, including the file extension
- Spaces and separators are replaced with underscores
- Special characters are stripped

#### Scope

- Renaming is **recursive by default**: the selected parent folder and all of its contents at every depth are included
- The parent folder itself is also renamed

#### Staging Area

- Before any files are touched, a full preview of all proposed renames is shown in the File Tree
- Each entry displays the proposed name as an **editable inline field** — the user can override any proposed name before committing
- Each entry has a **checkbox**; unchecking an entry excludes it from the commit
- Nothing is renamed until the user clicks **Commit**

#### Conflict Resolution

- When two or more files in the same directory map to the same proposed name, a numeric suffix is automatically appended (`_2`, `_3`, …)
- Conflicts are surfaced in the Staging Area so the user can manually override the suffix if desired

#### File Selection

- Folder picker dialog (top input field)
- Drag and drop a folder onto the application window

---

### 2. Metadata Editing

#### Supported Formats

| Category | Formats                                  |
|----------|------------------------------------------|
| Audio    | MP3, FLAC, OGG, AAC, WAV, OPUS           |
| Video    | MP4, MKV, AVI                            |
| Image    | JPEG, PNG (rename only — no tag editing) |

#### Editing Modes

- **Single-file edit**: all tags for one file are shown and editable individually (e.g., Title, Track Number)
- **Bulk edit**: when multiple files are selected, shared fields (e.g., Artist, Album, Year, Genre) can be set across all selected files simultaneously

#### Mixed Values

When multiple files with differing values for the same tag are selected, the field displays `(multiple values)` as placeholder text. Entering a value overwrites all selected files.

#### Revert

A **Revert** action discards all unsaved edits in the Metadata Panel and restores the tag values currently on disk for the selected files.

#### Independence

Metadata editing is completely independent of renaming. The two features share no state and neither trigger the other.

#### File Selection

- Selecting files in the File Tree populates the Metadata Panel
- Drag and drop files or folders onto the application window

---

## UI Layout

```
┌─────────────────────────────────────────────────────┐
│  [ Folder path input                    ] [Browse]  │
├──────────────────────────┬──────────────────────────┤
│                          │                          │
│  File Tree               │  Metadata Panel          │
│  (Staging Area)          │  (shown when ≥1 file     │
│                          │   is selected)           │
│  ☑ parent_folder/        │                          │
│    ☑ sub_folder/         │  Artist   [____________] │
│      ☑ track_01.mp3      │  Album    [____________] │
│      ☑ track_02.mp3      │  Year     [____________] │
│      ☑ cover.jpg         │  Genre    [____________] │
│    ☑ another_file.flac   │  Title    [____________] │
│                          │  Track #  [____________] │
│                          │                          │
├──────────────────────────┼──────────────────────────┤
│  [Commit Renames]        │  [Commit]  [Revert]      │
└──────────────────────────┴──────────────────────────┘
```

### Panels

**Folder Input** — text field at the top of the window. Accepts a typed/pasted path or a folder picker dialog. Drives both the File Tree and the Metadata Panel.

**File Tree** (left panel) — displays the recursive contents of the loaded folder. Each entry shows the proposed snake_case name as an editable inline field, alongside a checkbox to include/exclude it from the next commit. Selecting one or more files in the File Tree populates the Metadata Panel.

**Metadata Panel** (right panel) — displays editable tag fields for the currently selected file(s). Hidden when no files are selected.

### Actions

| Action            | Location             | Behaviour                                           |
|-------------------|----------------------|-----------------------------------------------------|
| Commit Renames    | Below File Tree      | Applies all checked, proposed renames to disk       |
| Commit (metadata) | Below Metadata Panel | Writes edited tags to disk for selected files       |
| Revert            | Below Metadata Panel | Discards unsaved metadata edits, restores from disk |
