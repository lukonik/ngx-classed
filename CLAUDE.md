# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NgxClassed is an Angular library for building type-safe, variant-based component styling utilities. It provides a `classed` function that creates computed signals for dynamic class generation based on variants and compound variants.

## Architecture

The project uses Nx workspace structure with:
- **Library code**: `packages/ngx-classed/` - Main library with core functionality
- **Demo app**: `apps/demo/` - Demonstration application
- **Core function**: `packages/ngx-classed/src/lib/classed.ts` - Main entry point that creates computed signals
- **Type definitions**: `packages/ngx-classed/src/lib/classed-types.ts` - TypeScript interfaces and types
- **Resolver modules**: `packages/ngx-classed/src/lib/resolvers/` - Logic for variant and compound variant resolution

The `classed` function returns a computed signal factory that:
1. Resolves base classes
2. Applies variant-specific classes via `resolveVariants`
3. Applies compound variant classes via `resolveCompoundVariants`

## Development Commands

### Building
- `nx build ngx-classed` - Build the library
- `nx build` - Build all projects
- `npx nx run-many -t build` - Build all projects (used in release)

### Testing
- `nx test ngx-classed` - Run library tests
- `nx test` - Run all tests

### Linting
- `nx lint ngx-classed` - Lint the library
- `nx lint` - Lint all projects

### Development Server
- `nx serve demo` - Run demo app at http://localhost:4200

## Key Files

- `packages/ngx-classed/src/lib/classed.ts` - Main library function
- `packages/ngx-classed/src/lib/resolvers/variants-resolver.ts` - Variant resolution logic
- `packages/ngx-classed/src/lib/resolvers/compound-variants-resolver.ts` - Compound variant resolution
- `packages/ngx-classed/src/lib/utils.ts` - Utility functions for class value coercion