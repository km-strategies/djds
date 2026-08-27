# DJDS — 10 Years of Designing Justice (campaign microsite)

A static prototype styled after the IDEO.org "Ten Year Impact" scroll experience,
built from DJDS's own brand guide and photography.

## What's here
- `index.html` — full page markup + copy
- `style.css` — all styling, using the exact palette/type from `DJDS_2026BrandGuidelines_v3.pdf`
- `script.js` — scroll reveals, animated stat counters, hero video controls, timeline spine draw-on-scroll (all vanilla JS, no dependencies)
- `assets/` — the photos/renderings you provided, resized and compressed for web
- `assets/video/` — the compressed hero background video (`hero-bg.mp4`, `hero-bg.webm`) and its poster frame (`hero-poster.jpg`), generated from your uploaded `VideoSample-DJDSsm.mp4`
- `assets/djds_project_map.gif` — the animated regional project map, used in the "Ten years, by the numbers" section

Open `index.html` in a browser to preview it as-is.

## Design notes
- **Colors** are pulled 1:1 from the brand guide: DJDS Teal `#0096AD`, Charcoal `#292928`,
  Orange `#F6921E`, plus the tertiary palette (Bright/Forest Green, Blue, Purple, Brown, Cork)
  used as section colors throughout the timeline and CTA cards.
- **Type**: Montserrat is used for all headers and body copy, per the guide. The guide reserves
  **VTC Bayard** specifically for the 10th-anniversary campaign mark — that's a licensed font
  I don't have access to, so I substituted **Anton** (a free, similarly bold condensed display
  face) for the big numerals and section headlines. Swap the `font-display` variable in
  `style.css` for VTC Bayard once you have a web-license/webfont file for it.
- **Signature motif — hand-drawn sketches**: your own architectural sketches
  (`RestoreOakland_FloorPlanSketch_BMP.tif` and the loose circles-and-arrows diagram) are now
  woven through the site as design elements, not just documentation:
  - Tinted, transparent versions of both sketches live in `assets/sketch-*.png` and appear as
    faint full-bleed watermarks behind the hero, partners, and timeline sections.
  - A small reusable SVG "sprite" (`#sk-circle`, `#sk-arrow`, `#sk-underline`, `#sk-mark`) at
    the top of `index.html` recreates the loose, wobbly pen-line quality of the originals —
    used as the hand-drawn underline beneath the hero headline, the circle "nodes" marking each
    year on the timeline, the arrow that follows "Read the project" links, and a small asterisk
    mark next to scroll hints. Because these are real SVG paths (not images), they scale
    perfectly and can be recolored per-section just by changing `currentColor`.
  - The chevron tile pattern from the LOVE Building's own facade is still used as a secondary
    accent (hero divider strip, card top-borders).
- **Vertical timeline**: replaced the earlier horizontal-scroll version with a vertical,
  alternating-sides timeline. A hand-drawn, slightly wobbly line (built from your sketch's loose
  line quality, not a straight vector) runs down the center and "draws" itself in as you scroll,
  using a scroll-linked `stroke-dashoffset` animation. Each year sits in a hand-drawn circle node
  on the spine, with cards alternating left/right — colors still rotate through the tertiary
  palette per entry.
- **Hero: full-bleed background video**. The top section now plays your supplied video
  (`VideoSample-DJDSsm.mp4`) on a continuous muted loop behind the "10 Years of Designing
  Justice" headline and lede copy, with a dark gradient overlay for text contrast. Details:
  - The source video was compressed for web delivery into two formats in `assets/video/`:
    `hero-bg.mp4` (H.264, ~2.5MB) and `hero-bg.webm` (VP9, ~1.7MB, tried first by browsers that
    support it). `hero-poster.jpg` is a still frame shown instantly while the video loads.
  - A visible pause/play button (bottom-right of the hero) lets visitors stop the loop — this
    is a WCAG accessibility requirement for any auto-playing content that runs longer than 5
    seconds, not optional polish.
  - The video **never autoplays** for visitors with `prefers-reduced-motion` enabled at the OS
    level; they see the poster frame instead. It also auto-pauses whenever scrolled out of view
    to save battery/bandwidth, and resumes when scrolled back — unless the visitor manually
    paused it, in which case their choice is respected.
  - The nav bar changed from sitting in normal document flow to `position: fixed`, floating
    translucently over the video so the video can run truly full-bleed under it; it gains a
    solid background once the page is scrolled. Anchor-link scrolling (`#impact`, `#timeline`,
    etc.) has `scroll-padding-top` set so jumping to a section doesn't tuck its heading under
    the fixed nav.

## A real bug I found and fixed while building this
While testing the new hero at mobile widths, its top spacing was silently collapsing to zero,
crowding the headline against the nav bar. Root cause: a mobile media-query rule (`.wrap{
padding: 0 20px; }`) used the `padding` **shorthand**, which resets `padding-top` and
`padding-bottom` to `0` even though only the left/right values were meant to change — and
because it appeared later in the stylesheet than the hero's own spacing rule, it won the
cascade at narrow screens. Fixed by switching that rule to the `padding-left`/`padding-right`
longhand properties instead, which only touch horizontal spacing. Worth knowing about if you
add your own `.wrap` overrides later — prefer the longhand properties unless you genuinely
want to reset all four sides.

## New: project map in the impact section
The "Ten years, by the numbers" section now includes your animated regional map
(`djds_project_map.gif`) in a card below the stat grid, alongside a static text legend listing
every region and project count. The legend exists for two reasons: it gives screen readers and
anyone who can't watch a looping GIF a way to get the same information, and it means the data
is still readable even if the GIF is slow to load or someone prints the page.

**Numbers worth double-checking**: the map's regions add up to **25 projects** (8 + 5 + 3 + 3 +
2 + 2 + 1 + 1), while the stat directly above it says **"50 projects completed nationwide."**
I left both as provided rather than guessing which is right or silently changing one to match
the other — but you'll likely want to reconcile them (e.g. "50" may include projects outside
the 8 mapped regions, or the map may only reflect a subset like active/current projects) before
this goes live, since having two different project counts a few inches apart on the page reads
as a mistake to visitors.

## Content still needed from you
Search the page for **`[Placeholder]`** and dashed **"Partner logo"** boxes — these mark spots
that still need real content before launch:
- The **`$XXXM+`** stat in the impact section — you flagged the $157M+ figure as unverified;
  the counter script now recognizes non-numeric placeholders like `XXX` and displays them with
  a dashed underline instead of animating, so it's visually obvious this needs a real number
  before launch (see `.stat-pending` in `style.css`).
- The "What's Next" quote from Deanna Van Buren and the three future-focus pillars
- Donate / Partner copy blocks
- Partner & funder logos (swap the dashed placeholder boxes in the `.logo-grid` for `<img>` tags)
- Real links for Donate, Partner, and social icons (currently `#`)

The 2016–2025 timeline (16 entries) now uses your latest copy, category tags, image sources, and
video embeds exactly as provided. I didn't invent any stats, quotes, or milestones beyond what
you sent — please don't publish the bracketed placeholder copy above as final.

## About the timeline's images and videos
- Several timeline images are hot-linked directly to `designingjustice.org` — that's fine since
  it's your own domain, but for reliability I'd recommend uploading those same files to this
  site's own Media Library and swapping in the local URLs, so the microsite doesn't depend on
  another site staying up.
- The 2020 NYT spotlight image is hot-linked to `static01.nytimes.com`. I've kept it as you
  specified, but hot-linking directly to another publisher's image CDN is fragile (the URL can
  expire or break) and may not be something the Times' terms permit long-term. Safer options:
  request a still/press image directly from DJDS's own coverage archive, use a screenshot of the
  article you have rights to reproduce, or link out to the NYT article instead of embedding its
  photo.
- The two 2018 entries now embed the actual YouTube videos (Five Keys Mobile Classroom and
  Deanna Van Buren's TED talk) via responsive `<iframe>` embeds (`.vtl-video` in `style.css`),
  rather than linking out.

## Getting this into WordPress
This was built as a portable, dependency-free HTML/CSS/JS bundle so you have options:

**Option A — Custom page template (recommended for full control)**
1. Copy `style.css` and `script.js` into your theme (or a child theme) and enqueue them
   only on this page (`wp_enqueue_style` / `wp_enqueue_script`, checked against `is_page()`).
2. Create `page-templates/campaign-10years.php`, paste the contents of `<body>` from
   `index.html` into it (keep the `get_header()` / `get_footer()` calls if you want your
   site's normal header/nav — or omit them for a true full-bleed microsite).
3. Upload everything in `assets/` to the Media Library (or keep them in the theme and
   reference the theme path), and update the `src="assets/..."` paths accordingly.
4. Assign the new template to a page from the WordPress editor.

**Option B — Page builder (Elementor / Bricks / Beaver Builder, etc.)**
1. Add a "Custom HTML" or "Code" block/widget for each major section (Hero, Stats,
   Timeline, etc.) and paste in the matching chunk of `index.html`.
2. Add `style.css` via the builder's "Custom CSS" panel or a Code Snippets plugin.
3. Add `script.js` the same way, or via a "Custom Code" / "Insert Headers and Footers" plugin.
4. Upload images from `assets/` to the Media Library and swap in the generated URLs.

**Option C — Full Site Editing (block theme)**
Convert each `<section>` into a block pattern using the Custom HTML block, and register
`style.css` as a block-style asset via `theme.json` or an `enqueue_block_assets` hook.

Either way, keep the CSS custom properties at the top of `style.css` (`:root { --teal: ... }`)
intact if you want a single place to retune the palette later.

## Known limitation of the QA screenshots (not a real bug)
While testing, screenshots were rendered with an old WebKit-based tool that has partial
CSS Grid support, which made a few sections appear stacked into a single column even at
desktop width. All layouts here use Grid/Flexbox that is fully supported in current Chrome,
Safari, Firefox, and Edge — verify in an actual browser and it will display as designed
(3-column stats, 3-column CTA cards, etc.).
