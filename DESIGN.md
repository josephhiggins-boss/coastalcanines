# coastal-canines — Design

**Status: LOCKED.** The token layer here is the cleanest in the portfolio and is the
designated starting structure for new projects (see `C:\Projects\_design\PROJECT_PROFILES.md`).
Change values only with a reason recorded below.

**Direction:** warm, coastal, trustworthy — a local business run by a real person
**Refusing:** stock-photo SaaS-template look; a dog-training site lives or dies on looking real
**Density:** airy — marketing site, section rhythm over information density
**Tokens:** `styles.css` `:root` (OKLCH, warm-tinted neutrals)
**Type:** Fraunces (display, serif) / Karla (body) — deliberately not a default sans
**Accent:** coral `oklch(66% 0.15 40)` for CTAs only, against the sand/sea palette. Never
decorative — if it's coral, it's clickable
**Rhythm:** `--space-section: clamp(4.5rem, 10vw, 8rem)`
**Motion:** minimal — `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` on reveals and hovers only
**Broken rule:** none currently; the palette does the differentiating work

## Palette (locked)
| Token | Value | Role |
|---|---|---|
| `--sand` / `--sand-deep` | `oklch(97.5% .014 85)` / `oklch(93% .03 85)` | warm paper, dune shadow |
| `--sea-pale` / `--sea` / `--sea-deep` | `oklch(88% .045 245)` / `oklch(72% .085 245)` / `oklch(58% .1 250)` | brand blues, from the logo |
| `--ink` / `--ink-soft` | `oklch(30% .06 255)` / `oklch(42% .05 255)` | text — logo navy, never `#000` |
| `--coral` / `--coral-deep` | `oklch(66% .15 40)` / `oklch(58% .16 38)` | CTA only |
| `--white-warm` | `oklch(99% .008 85)` | surfaces |

## Reference research
**Partial — done for the "Before you visit" section (2026-08-12).** Studied secure dog-field
operators, the closest category match for the field-hire half of the business:
Foxes Farm Fields (rules/T&Cs page), Adlington Dog Field, The Dog Walking Fields,
Dog Walking Fields UK (FAQs), The Bark Park.

| Move | Taken from | Applied as |
|---|---|---|
| Group rules by **moment of the visit**, not legal category | Foxes Farm ("Arrival and departure") | `.visit-flow` — arriving → in the field → heading home → beyond the field |
| State **fence height** plainly; it is both reassurance and a filter | all five | `.visit-lead-line`, given display-italic prominence |
| Exclusive/private use is the selling point | The Dog Walking Fields | "The field is yours for your booking — no other dogs" |
| **Refused:** liability wall-of-small-print mixed into practical steps | Foxes Farm does this | practical steps kept scannable; risk notice isolated in `.visit-note--risk` |

Still outstanding for the *training* half:
- Direct: 2–3 dog trainers ranking on Google Maps in the target area
- Wildcard: an outdoors/adventure brand — for photography treatment and warmth

Bar to beat: looking like a person you'd trust with your dog, not a template.

## Non-negotiables
- **Real photos of real dogs and real clients.** Stock imagery is the fastest way to lose a
  local-service visitor. This outranks every other visual decision here.
- The booking form is the entire conversion path: single column, top-aligned labels, validate
  on blur, plain-language errors below the field, and a visible success state after
  FormSubmit returns. A form that silently succeeds is a bug.
- Contrast: re-check coral-on-sand and sea-on-sand at 4.5:1 whenever a shade moves. `--sea`
  on `--sand` is the pair most at risk.

## Measured contrast (2026-08-12, computed from the OKLCH tokens)
| Pair | Ratio | Verdict |
|---|---|---|
| `--ink-soft` on `--sand-deep` | 6.87:1 | pass |
| `--ink` on `--sand-deep` | 11.10:1 | pass |
| `--ink-soft` on `--white-warm` | 8.21:1 | pass |
| **`--sea-deep` on `--white-warm`** | **4.14:1** | **fails AA for body text** |
| `--ink` on the risk-note tint | 12.05:1 | pass |

**Consequence:** `--sea-deep` is only safe as text at ≥18.66px bold, or as a non-text
element (≥3:1). Anywhere it must carry normal-weight body text, step it toward ink:
`color-mix(in oklab, var(--sea-deep) 80%, var(--ink))` → 5.24:1. Applied in
`.visit-lead-line`. This confirms the warning above — re-run these numbers if a shade moves.

## Open UI debt
- Reference research done for field-hire/rules only; training-side refs still outstanding
- **No spacing token scale.** Values are ad-hoc rems chosen to match neighbours. Fine at this
  size, but a `--space-*` ramp should land before the page grows further
- "Before you visit" copy is Claire's own dictated wording, lightly tidied. One dictated
  sentence was cut off mid-thought ("…make sure that your dog is …") and is **deliberately
  omitted** rather than guessed — likely a vaccination requirement; confirm and add
- **Never re-add "force-free" / "no scary equipment" / "no dominance nonsense."** That was
  invented placeholder copy and is wrong for this trainer: Claire competes in IGP, which
  includes protection work, and "force-free" is a loaded factional term she did not claim.
  Her actual stated philosophy is "a positive environment, helping the dog understand the
  exercise" — use her words
- Liability wording is plain-English, not legally drafted. A disclaimer on a page does not
  by itself limit liability — public liability insurance is the real control
- Pre-launch TODOs live in `README.md` — check both before launch
- Form success/error states unverified against a real FormSubmit round-trip
- Not yet run through `C:\Projects\_design\SHIP_CHECKLIST.md`
