# Carboniq Shader Playbook

Use `components/AuthShaderShowcase.tsx` as the baseline implementation.

## Current stack
- `Shader` root
- `SolidColor`
- `Group` with:
  - `Checkerboard`
  - `Ripples` (overlay)
  - `Blob`
  - `Ripples` masked by blob
  - `ChromaFlow` masked by blob
  - `CursorTrail`
  - `Ascii` with non-empty characters (`" .:-=+*#%@"`)
  - `Bulge`
- `TiltShift`
- `CRTScreen`

## Important constraints
- Never pass empty string to `Ascii.characters` (causes runtime error).
- Keep shader panel in a memoized client component for better tab performance.
- Prefer lazy loading (`next/dynamic` + `ssr: false`) in auth-heavy screens.
