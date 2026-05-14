# ADR 0001: Angular as frontend framework

**Status**: Accepted

## Context

Nomina is a personal Tauri desktop application. The UI consists of a file tree (left panel) and a metadata form (right panel). Lighter frameworks (Svelte, Vue) would reduce boilerplate for a tool of this scope.

## Decision

Use Angular as the frontend framework.

## Reasons

The developer is already proficient in Angular. Introducing a new framework for a personal tool trades short-term build complexity for a learning curve that adds no value here.

## Consequences

- Angular's build output requires `"baseHref": "./"` in the build config to work correctly with Tauri's asset serving.
- Bundle size will be larger than a Svelte or Vue equivalent, which is acceptable for a desktop app with no download constraint.
- The opinionated Angular project structure (modules, services, dependency injection) will be used throughout.
