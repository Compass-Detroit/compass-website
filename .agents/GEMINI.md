# COMPASS Detroit — Project Rules

## Brand Identity

COMPASS Detroit is a 501(c)(3) nonprofit tech community building pathways in the Detroit tech ecosystem. We organize Michigan DevFest, IWD Innovation Summit, BHM Innovation Summit, Pride Innovation Summit, and year-round programs.

## Tech Stack

- **Framework**: React 18 + Vite 4 + Tailwind CSS 3.4
- **Router**: react-router-dom 6
- **Icons**: react-icons (io5, fa6 packages)
- **Analytics**: @vercel/analytics, @vercel/speed-insights
- **Deploy**: Vercel
- **Package Manager**: npm (pnpm-lock.yaml also tracked)

## Path Aliases

```
@ → ./src
@assets → ./src/assets
@components → ./src/components
```

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| primary | #efb403 | Main brand gold |
| charcoal | Tailwind gray-900 | Dark backgrounds |
| pumpkin | #FFA706 | Accent orange |
| burnt | #EE7D33 | Secondary orange |
| lime | #00C605 | Success, Detroit marker |
| indigo | #6366f1 | Links, interactive |

## Fonts

- `russell` — Display headings
- `orbitron` — Tech/futuristic accents
- `montserrat` — Body text
- `inter` — UI text
- `biorhyme` — Special display

## Dark Mode

Uses CSS custom properties toggled by ThemeProvider:
- `--surface`, `--surface-card`, `--border`
- `--text-primary`, `--text-secondary`, `--text-muted`

Always test both light and dark modes.

## Accessibility Requirements

- WCAG 2.1 Level AA compliance
- All interactive elements keyboard navigable
- Focus indicators visible
- Alt text on all images
- Aria labels on icon-only buttons
- Skip-to-content link (already in App.jsx)
- Color contrast ratio ≥ 4.5:1

## Code Conventions

- Default exports for pages and components
- PropTypes on all components
- No TypeScript (project uses JSX)
- Prefer functional components with hooks
- Use `useCallback` and `useMemo` for expensive operations
- Prefix event handlers with `handle` (handleClick, handleSubmit)

## Component Patterns

- Pages wrap content in `PageLayout` or `SiteLayout`
- Cards use `rounded-2xl` or `rounded-3xl`
- Modals use `fixed inset-0 z-40` with backdrop blur
- Hover effects: `transition-all hover:scale-[1.02] hover:-translate-y-0.5`
- Gradients: `bg-gradient-to-br from-X to-Y`

## Data Architecture

- Speaker data: `src/data/{year}/speakers.js`
- Team data: `src/data/{year}/team.js`
- Partner data: `src/data/{year}/partners.js`
- Event metadata: `src/data/previousEventsData.js`
- Utilities: `src/utils/eventData.js`, `src/utils/speakerRegistry.js`

## Git Conventions

- Conventional Commits enforced via commitlint
- Format: `type(scope): description`
- Types: feat, fix, docs, style, refactor, test, chore
- Husky pre-commit hooks active

## Performance Budgets

- Build time: < 10s
- LCP: < 2.5s
- Bundle size per page: < 200KB (gzipped)
- Images: max 500KB, prefer WebP

## Speaker Data Privacy

- Email addresses: NEVER display on public pages
- Social links: display only if provided
- Bio: display as-is, do not modify
- Photos: use provided headshot only, respect photographer credits

## Agentic Workflow

This project uses three core agent skills:
- **caveman**: Ultra-compressed communication (65% token reduction)
- **cavecrew**: Coordinated multi-agent delegation (investigator → builder → reviewer)
- **cove**: Idiomatic, boilerplate-free code generation

Additional project skills:
- **scraper**: Speaker data collection and enrichment
- **platformbuilder**: Community platform development patterns
