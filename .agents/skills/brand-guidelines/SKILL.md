---
name: brand-guidelines
description: >
  Official COMPASS Detroit and Google DevFest 2026 brand guidelines, design tokens,
  typography, sticker icon system, role badges, and asset rules. Use whenever styling UI,
  designing social cards, creating marketing graphics, or auditing brand consistency.
---

# COMPASS Detroit & Google DevFest 2026 Brand Guidelines

Complete specification for visual identity, typography, color tokens, vector stickers, role badges, and accessibility across all COMPASS Detroit and DevFest digital properties.

---

## 1. Brand Tokens & Color Palette

### DevFest 2026 Core Google Palette
| Token | Hex | Text on Bg | Usage |
|---|---|---|---|
| `devfest-blue` | `#4285F4` | White | Main interactive, Google Blue anchor |
| `devfest-green` | `#34A853` | White | Success states, tech vitality |
| `devfest-yellow` | `#F9AB00` | Black / Gray 900 | Highlights, Detroit gold accent |
| `devfest-red` | `#EA4335` | White | Keynotes, high-priority badges |

### DevFest 2026 Halftones (High-Contrast Accents)
| Token | Hex | Text on Bg | Usage |
|---|---|---|---|
| `devfest-ht-blue` | `#57CAFF` | Gray 900 | Electric Cyan accent, glow borders |
| `devfest-ht-green` | `#5CDB6D` | Gray 900 | Spring Lime accent, active tags |
| `devfest-ht-yellow` | `#FFD427` | Gray 900 | Sunshine accent, attention markers |
| `devfest-ht-red` | `#FF7DAF` | Gray 900 | Coral Rose accent, VIP tags |

### DevFest 2026 Pastels (Soft Surfaces & Card Backgrounds)
| Token | Hex | Text on Bg | Usage |
|---|---|---|---|
| `devfest-pastel-blue` | `#C3ECF6` | Gray 900 | Soft sky container surfaces |
| `devfest-pastel-green` | `#CCF6C5` | Gray 900 | Soft mint container surfaces |
| `devfest-pastel-yellow` | `#FFE7A5` | Gray 900 | Soft cream pill badges |
| `devfest-pastel-red` | `#F8D8D8` | Gray 900 | Soft blush pill badges |

### Grayscale & Dark Surfaces
| Token | Hex | Usage |
|---|---|---|
| `devfest-off-white` | `#F0F0F0` | Clean light mode surface |
| `devfest-dark` | `#1E1E1E` | High-contrast dark mode surface |

### COMPASS Brand Tokens
| Token | Hex | Usage |
|---|---|---|
| `primary` | `#EFB403` | Main brand gold |
| `pumpkin` | `#FFA706` | Secondary sunrise orange |
| `burnt` | `#EE7D33` | Detroit brick orange |
| `lime` | `#00C605` | Success marker, growth |
| `indigo` | `#6366F1` | Ecosystem connections |
| `charcoal` | `#2A2A2A` | Dark neutral surfaces |

---

## 2. Typography System

- **Display & Futuristic Headings**: `font-orbitron` or `font-russell`
- **Body & Editorial Copy**: `font-inter` or `font-montserrat`
- **Badges & Monospace Track IDs**: `font-mono`

---

## 3. Vector Stickers & Monoline Glyphs

Asset Location: `src/assets/devfest2026/stickers/`

- **Monoline Glyphs**: `spark`, `brackets`, `gear`, `code`, `terminal`, `search`, `cube`, `diamond`, `cloud`, `circuit`, `star`, `tag`, `bulb`, `compass`, `heart`, `stack`, `globe`, `rocket`.
- **Bold Glyphs**: `stickers-bold-glyphs-sheet.png`, `sticker-devfest-badge.png`, `sticker-devfest-burst.png`.
- **Usage Rules**:
  - Always use vector or high-resolution transparent PNG.
  - Maintain aspect ratio.
  - No drop-shadow distortion on monoline outlines.

---

## 4. Role Badges & Lanyards

Asset Location: `src/assets/devfest2026/roles/`

| Role | Badge Asset | Primary Color |
|---|---|---|
| Speaker | `role-speaker.png` | `#4285F4` (Blue) |
| Organizer | `role-organizer.png` | `#EA4335` (Red) |
| Attendee | `role-attendee.png` | `#34A853` (Green) |
| Volunteer | `role-volunteer.png` | `#F9AB00` (Yellow) |
| Sponsor | `role-sponsor.png` | `#57CAFF` (Cyan) |
| VIP | `role-vip.png` | `#FF7DAF` (Coral) |
| Mentor | `role-mentor.png` | `#5CDB6D` (Lime) |
| Facilitator | `role-facilitator.png` | `#FFD427` (Gold) |
| Community Lead | `role-community.png` | `#6366F1` (Indigo) |
| Navigator | `role-navigator.png` | `#EFB403` (COMPASS Gold) |

---

## 5. Accessibility Requirements (WCAG 2.1 Level AA)

- Minimum **4.5:1** contrast ratio for standard text.
- Minimum **3.0:1** contrast ratio for large headings and interactive components.
- Never use emojis as decorative functional icons — use semantic React Icons or inline SVGs with `aria-hidden="true"` and visible or `sr-only` text labels.
- Keyboard focus rings must be visible (`focus:ring-2 focus:ring-primary focus:outline-none`).
- Provide alternative text (`alt`) on all images and logos.
