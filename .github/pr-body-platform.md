## 🚀 Platform Evolution: Speaker Pages, Community Tools & Registry

### Description

Major platform expansion for COMPASS Detroit — adds unified speaker infrastructure, community tools, and event management capabilities. This is the foundational feature branch that subsequent work (testing, telemetry) builds upon.

### Changes

#### Speaker Infrastructure
- **Unified Speaker Registry** (`src/utils/speakerRegistry.js`): Cross-year speaker data aggregation with de-duplication, slug generation, alias handling, and filtering by year/category/track
- **Speaker Directory Page** (`src/pages/SpeakersDirectoryPage.jsx`): Searchable, filterable grid/list view of all speakers across all events
- **Speaker Profile Page** (`src/pages/SpeakerProfilePage.jsx`): Individual speaker pages with session history, social links, expertise badges, and avatar timeline

#### Community Platform
- **Community Platform Scaffold**: Member directory foundation for future community features
- **Newsletter System** (`src/pages/NewsletterStudioPage.jsx`): Custom newsletter creation tool with zero external dependencies

#### Internal Tools
- **Team Tools Dashboard** (`src/pages/ToolsPage.jsx`): Internal utilities hub for organizing team workflows

#### Integration
- Full route wiring in `App.jsx` with navigation and footer updates
- Speaker modal integration across event pages

#### Agent Skills
- Added project-specific skills: `caveman`, `cavecrew`, `cove`, `scraper`, `platformbuilder`
- Project rules in `.agents/GEMINI.md`

### Commits

| Type | Message |
|------|---------|
| `chore(agents)` | Add project skills and rules for agentic workflow |
| `feat(speakers)` | Add unified cross-year speaker registry |
| `feat(speakers)` | Add speaker profile and directory pages |
| `feat(community)` | Add community platform scaffold and member directory |
| `feat(newsletter)` | Add custom newsletter system (zero external deps) |
| `feat(tools)` | Add team tools dashboard and internal utilities |
| `feat(integration)` | Wire routes, navigation, footer, and speaker modal |
| `fix(lint)` | Fix eslint tailwind resolver and speaker deduplication |

### Verification

- [x] `npm run build` passes
- [x] `npm run lint` passes (exit 0)
- [x] All routes load correctly
- [x] Speaker data renders across all years (2023-2026)
