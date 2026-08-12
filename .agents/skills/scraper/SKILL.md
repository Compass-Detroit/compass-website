---
name: scraper
description: >
  Speaker data collection and enrichment skill for COMPASS Detroit.
  Crawls GitHub repos, normalizes speaker data, de-duplicates records,
  and optimizes image assets. Use for bulk data operations across
  event repositories.
  Trigger: "scrape speakers", "collect data", "enrich profiles",
  "use scraper", or when bulk speaker data work is needed.
---

## Purpose

Collect, normalize, and enrich speaker data across all COMPASS Detroit event repositories and years.

## Data Sources

| Source | Repo | Format |
|--------|------|--------|
| DevFest 2023-2026 | `Compass-Detroit/compass-website` | `src/data/{year}/speakers.js` |
| IWD Summit | `Compass-Detroit/iwdsummit` | Speaker data in components |
| BHM Summit | `Compass-Detroit/BHM-website` | Speaker data in components |
| Pride MI | `Compass-Detroit/pridemi26` | Speaker data in components |

## Speaker Schema

Every speaker record must conform to this schema:

```javascript
{
  slug: string,           // URL-safe: lowercase, hyphens, no special chars
  name: string,           // Full display name
  avatar: string,         // Import path or URL
  bio: string | null,     // Full biography
  organization: string,   // Company or affiliation
  position: string,       // Job title
  twitter: string | null,
  linkedIn: string | null,
  github: string | null,
  url: string | null,
  mastodon: string | null,
  isGDE: boolean,
  isWTM: boolean,
  categories: string[],   // Normalized topic tags across all sessions
  yearsActive: number[],  // All years speaker presented
  sessions: SessionRecord[],
  slidesUrl: string | null,
  videoUrl: string | null,
  resources: Resource[],
  talkPhotos: string[],
  featured: boolean,
}
```

## De-duplication Rules

1. Match by exact name (case-insensitive)
2. If names match, merge:
   - Use latest year's avatar, bio, organization, position
   - Concatenate all sessions (tagged by year)
   - Union all tags into categories
   - Union all social links (prefer non-null)
3. Generate slug from canonical name: `name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')`

## Image Optimization

- Max dimensions: 600x600px for avatars
- Format: WebP preferred, JPEG acceptable
- Quality: 80%
- Use macOS `sips` for batch processing when available

## Workflow

1. Read all source data files
2. Parse into normalized schema
3. De-duplicate by name
4. Validate all required fields
5. Report: total unique speakers, speakers per year, missing data
6. Write consolidated registry

## Output

Report format:
```
Speakers: N unique across M years
Missing bios: [names]
Missing avatars: [names]
Duplicate names resolved: [name → years]
```
