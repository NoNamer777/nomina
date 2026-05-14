# Nomina — Domain Glossary

## Rename Operation

A **Rename Operation** is a transformation applied to a file or folder's name. The only supported transformation is **snake_case normalization**: strip special characters, lowercase all characters (including the extension), and replace spaces and separators with underscores.

A **Staging Area** is the editable preview shown to the user before any files are touched on disk. It lists every proposed rename as a (current name → proposed name) pair. The user can override any proposed name inline before committing. The Staging Area is the only moment between selection and commit where the user can intervene.

A **Commit** is the act of applying all entries in the Staging Area to disk. Nothing is renamed until the user explicitly commits.

A **Conflict** occurs when two or more files in the same directory map to the same proposed name after snake_case normalization. Conflicts are resolved automatically by appending a numeric suffix (`_2`, `_3`, …) to the proposed name. Conflicts are surfaced in the Staging Area so the user can override the suffix if desired.

A **Rename Scope** defines which files and folders are affected by a Rename Operation. The default scope is **recursive**: the selected parent folder and all of its contents at every depth are included.

## Metadata Operation

A **Metadata Operation** is the act of reading or writing embedded tags within a media file. Metadata Operations are completely independent of Rename Operations — they share no state and neither triggers the other.

A **Tag** is a named field embedded in a media file's format-specific container (e.g. ID3 for MP3, Vorbis comments for FLAC, MP4 atoms for AAC). Examples: Artist, Album, Year, Genre, Title, Track Number.

**Bulk Edit** is a Metadata Operation mode where the same Tag value is written to multiple files simultaneously. Used for shared fields like Artist, Album, Year, Genre.

**Single-file Edit** is a Metadata Operation mode where all Tags for one file are displayed and edited individually. Used for track-specific fields like Title and Track Number.

## Supported File Formats

| Category  | Formats                                |
|:----------|:---------------------------------------|
| Audio     | MP3, FLAC, OGG, AAC, WAV, OPUS         |
| Video     | MP4, MKV, AVI                          |
| Image     | JPEG, PNG (album art; no tag editing)  |

Images are included in the Rename Scope but are not subject to Metadata Operations.

## UI Layout

The **Folder Input** is a text field at the top of the application window. The user types or pastes a folder path, or uses a folder picker dialog to populate it. It is the single entry point for both Rename and Metadata Operations.

The **File Tree** is the left panel. It displays the recursive contents of the folder currently loaded in the Folder Input. Each entry shows the proposed snake_case name (editable inline) alongside a checkbox. Unchecking an entry **excludes** it from the next Commit. The File Tree is also the Staging Area — it is the only place where proposed renames can be reviewed and overridden before committing.

The **Metadata Panel** is the right panel. It appears when one or more files are selected in the File Tree. It displays editable Tag fields for the selected file(s). When multiple files with differing values for the same Tag are selected, that field shows "(multiple values)" as placeholder text. Saving overwrites all selected files with the entered value.

A **Revert** action in the Metadata Panel discards all unsaved edits and restores the Tag values currently on disk for the selected files.

Files and folders can be loaded into the application via the Folder Input or by drag-and-drop onto the application window.

## Technology Stack

| Layer     | Choice                                 |
|:----------|:---------------------------------------|
| Shell     | Tauri                                  |
| Frontend  | Angular                                |
| Language  | TypeScript (frontend), Rust (backend)  |
