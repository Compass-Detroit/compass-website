---
name: platformbuilder
description: >
  Community platform development skill for COMPASS Detroit.
  Covers auth flows, database schema design, API endpoints,
  real-time features, and profile/content management.
  Trigger: "build platform", "community features", "auth",
  "database", "use platformbuilder", or when building
  community platform infrastructure.
---

## Purpose

Guide the development of COMPASS Detroit's custom community platform — a tailored social/professional network for the Detroit tech ecosystem.

## Architecture

Self-hosted, custom-built stack:

```
┌─────────────────────────────────────────────┐
│  Frontend (React + Vite + Tailwind)         │
│  - Profile cards, directory, spaces         │
│  - Interactive builders, editors            │
│  - Newsletter studio                        │
├─────────────────────────────────────────────┤
│  API Layer (Self-hosted)                    │
│  - REST endpoints for CRUD                  │
│  - WebSocket for real-time                  │
│  - File upload/processing                   │
├─────────────────────────────────────────────┤
│  Database (Self-hosted)                     │
│  - PostgreSQL for structured data           │
│  - File storage for media                   │
│  - Full-text search                         │
├─────────────────────────────────────────────┤
│  Infrastructure (NAS/Server)               │
│  - Custom email sending engine              │
│  - Image processing pipeline               │
│  - Backup and monitoring                    │
└─────────────────────────────────────────────┘
```

## Database Schema Patterns

### Members
```sql
members (
  id UUID PRIMARY KEY,
  slug VARCHAR UNIQUE,
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE,
  avatar_url TEXT,
  title VARCHAR,
  organization VARCHAR,
  bio TEXT,
  skills TEXT[],
  social_links JSONB,
  is_speaker BOOLEAN DEFAULT false,
  speaker_slug VARCHAR REFERENCES speakers(slug),
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

### Subcommittees
```sql
subcommittees (
  id UUID PRIMARY KEY,
  name VARCHAR UNIQUE,
  description TEXT,
  lead_member_id UUID REFERENCES members(id),
  created_at TIMESTAMPTZ
)
```

### Newsletter
```sql
subscribers (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  name VARCHAR,
  interests TEXT[],
  status VARCHAR DEFAULT 'active',
  subscribed_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ
)

newsletters (
  id UUID PRIMARY KEY,
  subject VARCHAR,
  content_html TEXT,
  content_json JSONB,
  sent_at TIMESTAMPTZ,
  recipient_count INTEGER
)
```

## API Conventions

- RESTful endpoints: `/api/v1/{resource}`
- JSON request/response bodies
- Error format: `{ error: string, code: string, details?: object }`
- Auth: Bearer token or API key for internal tools
- Rate limiting on public endpoints
- CORS configured for known domains

## Security Checklist

- [ ] Input validation at all boundaries
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (sanitize HTML)
- [ ] CSRF tokens for state-changing requests
- [ ] Rate limiting on auth endpoints
- [ ] Email verification for signups
- [ ] Password hashing (bcrypt/argon2)
- [ ] HTTPS enforcement
- [ ] SPF/DKIM/DMARC for email sending

## Component Patterns

- Profile cards: glassmorphism, hover animations
- Forms: progressive disclosure, inline validation
- Lists: virtualized for performance, search + filter
- Real-time: WebSocket for live updates
- File upload: drag-and-drop with preview

## Quality Gates

Before shipping any platform feature:
1. Works on mobile (375px)
2. Dark mode tested
3. Accessibility: keyboard navigable, screen reader tested
4. Performance: < 3s LCP
5. Input validation complete
6. Error states handled
