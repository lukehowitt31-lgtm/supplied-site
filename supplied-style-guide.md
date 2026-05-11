# Supplied — Brand & Styling Cheat Sheet

A self-contained reference for matching the visual style of `suppliedpackaging.com` in any side tool, microsite, or external app. Hand this whole file to Claude (or any LLM) as context.

---

## Identity in one line

Editorial-modern, warm-cream background, near-black text, single amber accent, tasteful italic serif highlights inside an otherwise geometric sans-serif. Generous whitespace, restrained shadows, full rounding on pills/buttons.

---

## 1. Colour palette

| Role | Hex | Notes |
|---|---|---|
| Background (cream) | `#FCFCFA` | Page bg — never pure white |
| White | `#FFFFFF` | Cards on cream, surfaces |
| Ink (primary text) | `#1A1A1A` | Near-black, never `#000` |
| Ink 80 | `#2A2A35` | Strong secondary text |
| Ink 60 | `#55556A` | Body / muted |
| Ink 40 | `#8A8A9D` | Captions, micro labels |
| Ink 20 | `#C5C5D0` | Disabled, dividers |
| Ink 10 | `#E9E9EF` | Borders, hairlines |
| Ink 05 | `#F4F4F7` | Subtle fills |
| **Amber (brand)** | `#E8791C` | Single accent — used sparingly |
| Amber bright | `#FF8C2A` | Hover/active highlight |
| Amber deep | `#C96510` | Pressed / fill-amber hover |
| Amber 10 | `#FEF4EA` | Tag bg, soft tints |
| Amber 05 | `#FFFAF5` | Whisper tint |
| Green | `#1B9E5A` / bg `#E6F7EE` | Sustainability / success |
| Blue | `#2563EB` / bg `#EFF6FF` | Info — used rarely |

**Rule**: there is essentially **one accent colour (amber)**. Green/blue only appear for sustainability or info pills. Avoid using amber on more than ~10% of the visible area.

---

## 2. Typography

Two fonts only, both via Google Fonts:

- **Sora** — geometric sans, the workhorse. All body, all headings (h1–h6), all UI.
  - Default weight 400, body 400/500, headings **800 (extra-bold)**
- **Fraunces** — display serif, used **only for italic accent words inside headings** (and a few decorative numerics, e.g. large stat numbers).
  - Pattern: split a heading and wrap one phrase: `<em class="font-fraunces">…</em>`

### Heading scale

```css
/* H1 / hero */
font-family: Sora;
font-weight: 800;
font-size: clamp(40px, 5.2vw, 72px);
line-height: 1.06;
letter-spacing: -0.03em;

/* H2 / section */
font-weight: 800;
font-size: clamp(28px, 3.4vw, 40px);
line-height: 1.12;
letter-spacing: -0.025em;

/* Body */
font-size: 15–16px;
line-height: 1.7;
color: #55556A; /* ink-60 */

/* Eyebrow / tag */
font-size: 11.5px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 1.8px;
```

**Italic accent rule**: HTML `<em>` defaults to italic; Fraunces is then applied — that's the only place serif/italic appears.

---

## 3. Layout

- Max content width: **1440px**, gutter **40px each side**.
- Narrow content width: **800px** (used for quotes, takeaways).
- Section vertical rhythm: `padding: 100px 0` on standard sections.
- Border radius scale:
  - Pills/buttons: fully rounded (`border-radius: 9999px`)
  - Cards: `28px`
  - Inner blocks: `24px`
  - Small chips: `12px`

---

## 4. Shadows

```css
--shadow-xs: 0 1px 2px rgba(0,0,0,0.04);
--shadow-sm: 0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03);
--shadow-md: 0 4px 16px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.03);
--shadow-lg: 0 12px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04);
--shadow-xl: 0 24px 64px rgba(0,0,0,0.10);

/* Amber glow on hover (CTA buttons): */
box-shadow: 0 8px 24px rgba(232,121,28,0.25);
```

---

## 5. Motion

Single signature easing:

```css
--ease-supplied: cubic-bezier(0.16, 1, 0.3, 1); /* fast-out, slow-in */
```

Default transition: `transition: all 300ms var(--ease-supplied);`

Standard entry animation (fade-up):

```css
@keyframes fu {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}
.af { animation: fu 0.8s ease forwards; }
```

---

## 6. Component patterns

### Tag (eyebrow pill) — used above almost every section heading

```html
<span style="
  display:inline-flex; align-items:center; gap:8px;
  padding:6px 14px; border-radius:9999px;
  font-size:11.5px; font-weight:600;
  text-transform:uppercase; letter-spacing:1.8px;
  background:#FEF4EA; color:#E8791C;
">Free packaging cost audit</span>
```

### Primary button (amber fill) — the main CTA

```html
<a href="…" style="
  display:inline-flex; align-items:center; gap:8px;
  padding:16px 36px; border-radius:9999px;
  font-family:Sora; font-weight:600; font-size:15px;
  background:#E8791C; color:#FFF;
  transition: all 300ms cubic-bezier(0.16,1,0.3,1);
">Request your audit <span>→</span></a>
<!-- Hover: bg #C96510, translateY(-2px), shadow 0 8px 24px rgba(232,121,28,0.25) -->
```

### Secondary button (ink fill)

- bg `#1A1A1A`, text white
- hover `#2A2A35`

### Outline button

- transparent bg, `1.5px` border `#E9E9EF`, text `#1A1A1A`
- hover bg `#F4F4F7`

### Section heading with accent

```html
<h2 style="font-family:Sora; font-weight:800;
           font-size:clamp(28px,3.4vw,40px);
           line-height:1.12; letter-spacing:-0.025em;
           color:#1A1A1A;">
  Cut packaging costs by
  <em style="font-family:Fraunces; font-style:italic;
             font-weight:500; color:#E8791C;">15–25%</em>
</h2>
```

### Card

- white bg
- `border: 1px solid #E9E9EF`
- `border-radius: 28px`
- `padding: 32–56px`
- `box-shadow: var(--shadow-sm)` at rest

---

## 7. Drop-in CSS block

You can paste this verbatim into any project — it's enough to reproduce the look in plain HTML/CSS.

```css
:root {
  /* Backgrounds */
  --bg: #FCFCFA;
  --surface: #FFFFFF;

  /* Ink scale */
  --ink: #1A1A1A;
  --ink-80: #2A2A35;
  --ink-60: #55556A;
  --ink-40: #8A8A9D;
  --ink-20: #C5C5D0;
  --ink-10: #E9E9EF;
  --ink-05: #F4F4F7;

  /* Brand accent */
  --amber: #E8791C;
  --amber-bright: #FF8C2A;
  --amber-deep:   #C96510;
  --amber-10: #FEF4EA;
  --amber-05: #FFFAF5;

  /* Status */
  --green: #1B9E5A; --green-10: #E6F7EE;
  --blue:  #2563EB; --blue-10:  #EFF6FF;

  /* Type */
  --font-sans: "Sora", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Fraunces", ui-serif, Georgia, serif;

  /* Motion */
  --ease: cubic-bezier(0.16, 1, 0.3, 1);

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.03);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04);

  /* Layout */
  --max: 1440px;
  --max-narrow: 800px;
  --gutter: 40px;
  --radius-card: 28px;
  --radius-pill: 9999px;
}

html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  font-size: 16px;
  line-height: 1.7;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-sans);
  font-weight: 800;
  letter-spacing: -0.025em;
  color: var(--ink);
}

em { /* the only place serif/italic appears */
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 500;
  color: var(--amber);
}

.container { max-width: var(--max); margin: 0 auto; padding: 0 var(--gutter); }
.container--narrow { max-width: var(--max-narrow); }

.tag {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 14px; border-radius: var(--radius-pill);
  background: var(--amber-10); color: var(--amber);
  font-size: 11.5px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 1.8px;
}

.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 30px; border-radius: var(--radius-pill);
  font-weight: 600; font-size: 14px;
  transition: all 300ms var(--ease);
  cursor: pointer; text-decoration: none; border: 0;
}
.btn--amber  { background: var(--amber); color: #fff; }
.btn--amber:hover { background: var(--amber-deep); transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(232,121,28,0.25); }
.btn--ink    { background: var(--ink); color: #fff; }
.btn--ink:hover { background: var(--ink-80); transform: translateY(-2px);
                  box-shadow: var(--shadow-lg); }
.btn--outline { background: transparent; color: var(--ink);
                border: 1.5px solid var(--ink-10); }
.btn--outline:hover { border-color: var(--ink-20); background: var(--ink-05); }

.card {
  background: var(--surface);
  border: 1px solid var(--ink-10);
  border-radius: var(--radius-card);
  padding: 32px;
  box-shadow: var(--shadow-sm);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-up { animation: fadeUp 0.8s var(--ease) both; }
```

---

## 8. Do / Don't

### Do

- Use `#FCFCFA` cream as the base, not white pages.
- Pair Sora 800 headings with one Fraunces italic accent phrase.
- Use amber on **one** element per viewport — the primary CTA or one accent word.
- Keep shadows soft, low-opacity, layered (two stacked shadows).
- Use full pill radius on buttons and tags.

### Don't

- Don't use pure black `#000` — always `#1A1A1A`.
- Don't add a second accent colour. Green/blue are only for sustainability/info badges.
- Don't italicise body text — italic == Fraunces == amber accent only.
- Don't use generic system fonts; load Sora + Fraunces from Google Fonts.
- Don't go above 1440px content width; keep 40px gutters minimum.

---

## 9. Google Fonts include

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,500&display=swap" rel="stylesheet">
```

---

## 10. Tailwind v4 token map (optional)

If the side tool uses Tailwind v4, these are the utility names exposed by the main site's `@theme` block — useful if you want consistent class names:

| Utility | Value |
|---|---|
| `bg-supplied-bg` | `#FCFCFA` |
| `bg-supplied-white` / `text-supplied-white` | `#FFFFFF` |
| `text-supplied-ink` | `#1A1A1A` |
| `text-supplied-ink-60` | `#55556A` (body) |
| `text-supplied-ink-40` | `#8A8A9D` (caption) |
| `border-supplied-ink-10` | `#E9E9EF` |
| `bg-supplied-ink-05` | `#F4F4F7` |
| `text-supplied-amber` / `bg-supplied-amber` | `#E8791C` |
| `bg-supplied-amber-10` | `#FEF4EA` (tag bg) |
| `bg-supplied-amber-deep` | `#C96510` (hover) |
| `font-sans` | Sora |
| `font-fraunces` | Fraunces (italic accent only) |
| `ease-supplied` | `cubic-bezier(0.16,1,0.3,1)` |
| `shadow-supplied-sm/md/lg` | layered low-opacity shadows |
