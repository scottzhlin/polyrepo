# UI Conventions Template

The starter avoids a full design system. Add concrete conventions when the
product has real screens.

## Principles

1. Use stable layout primitives before decorative styling.
2. Keep text legible and responsive.
3. Prefer named tokens over repeated raw values.
4. Document component states before implementation.

## Starter Tokens

| Token | Value | Purpose |
|---|---|---|
| `--color-text` | `#18181b` | Primary text |
| `--color-muted` | `#71717a` | Secondary text |
| `--color-border` | `#e4e4e7` | Borders |
| `--space-1` | `4px` | Small spacing |
| `--space-2` | `8px` | Default spacing |
| `--space-4` | `16px` | Section spacing |

## Component Checklist

- Empty state.
- Loading state.
- Error state.
- Keyboard and pointer behavior.
- Mobile and desktop layout.
- Accessible labels for non-text controls.
