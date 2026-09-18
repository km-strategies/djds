# DJDS — 10 Years of Designing Justice (campaign microsite)

A static prototype styled after the IDEO.org "Ten Year Impact" scroll experience,
built from DJDS's own brand guide and photography.

## Most recent changes
- **Impact Stats section**: three changes —
  1. Removed the LOVE Building photo that sat beside the section heading (the file,
     `Love-Building2024_N4_crop.png`, is also deleted from `assets/` since nothing else used it).
  2. The project map card (GIF + region legend) is now hidden rather than deleted — it still
     has all its markup in `index.html`, just with an `is-hidden` class added
     (`display:none !important` in `style.css`). If you want it back, delete `is-hidden` from
     the `<div class="stats-map is-hidden" ...>` line and it reappears exactly as before, with
     no rebuilding needed.
  3. Added your new `DJDS_Microsite-Collage.png` as a full-bleed image banner at the very
     bottom of the section — it runs edge-to-edge, breaking out of the page's normal
     max-width container the way a hero image does, and its transparent background lets the
     section's teal show through the gaps between photos rather than showing a white box.

## Previous changes
- **Timeline overhaul**: expanded from 16 to **25 entries**, now spanning **2016–2026** (was
  2016–2025) — several 2019/2020 years split into more granular milestones (Atlanta Center for
  Equity, the Mobile Refuge Room patent, the Detroit land purchase, the LA County Youth Justice
  Working Group), three new 2023–2024 entries (the post-occupancy evaluation, the Pop-Up
  Village's transition to community ownership, and dropping the CTE TAY Hub / Gulf Coast entries
  that aren't in your latest content), and three brand-new 2025–2026 entries reaching a year
  further out than before (the MCI Concord prison feasibility study, youth-advocate workshops,
  and the Gateways Hospital behavioral-health partnership). The "2020 Spotlight" card's image
  is now your own `DeannaNYT.jpg` photo instead of a hot-linked New York Times CDN image — a
  direct improvement, since I'd flagged that hot-link as fragile/risky in an earlier round.
  Two entries reference images that weren't real files/URLs (noted inline below); those two
  cards are text-only for now. The timeline's eyebrow label and section heading date range are
  both updated to match.

## Previous changes
- **Partners + testimonials merged**: the quote carousel is no longer a separate dark section —
  it's now part of the "Partners" section itself, sitting below the logo grid on the same warm
  paper background, separated by a thin divider line. The carousel content moved into a light
  card (white background, subtle border and shadow) instead of the dark charcoal panel it had
  before, so text/accent colors switched from white/bright-green to charcoal/forest-green for
  contrast on the lighter surface. Functionality (auto-advance, arrows, dots, reduced-motion
  handling) is unchanged — this was a visual/structural change only.
- **Nav**: both "Donate" buttons (the nav bar and the "Give now" button in the CTA section)
  now link out to `https://designingjustice.org/donate/` in a new tab, instead of scrolling to
  the on-page giving section. Nav items (Impact / Timeline / What's Next / Donate) are now
  vertically centered against each other regardless of the Donate button's extra padding —
  previously they could sit slightly off from each other since the nav's flex children
  defaulted to stretching instead of centering.
- **Partners**: added a testimonial carousel (inside the Partners section — see above) cycling
  through your four supplied quotes (Judge Songhai Armstead, Michaela Pommels, Adam Menter,
  Adrienne Hogg). Auto-advances every 8 seconds, pauses on hover/focus, and has prev/next
  arrows plus clickable dots for manual control. It never auto-advances for visitors with
  `prefers-reduced-motion` set — they still get full manual control via the arrows/dots. This
  section uses a 4th real `<h2>` ("Partners in the work"), so it now also uses the VTC Bayard
  font like the other three headings, for consistency.
- **Timeline**: added your two-paragraph origin story (Deanna Van Buren, the Syracuse
  Peacemaking Center, the Fetzer Institute funding) as intro copy above the horizontal
  timeline track.
- **What's Next**: replaced the placeholder quote with Deanna Van Buren's real one. Because the
  real quote is a full paragraph rather than a short pull-quote, I sized it down from the huge
  display-font treatment the placeholder used (which would have rendered enormous and
  hard to read at that length) to a more readable size — still visually distinct from body
  copy, just not shouting. Attribution updated to match exactly what you sent ("Co-Founder &
  Executive Director" — the placeholder had said "Founder & Co-Executive Director").
- **Hero video**: also swapped again in this round — it now plays `DJDS_Edit_2.mp4` (replacing
  `DJDS_Edit_1.mp4`). Compressed the same way as always into `hero-bg.mp4`/`hero-bg.webm` with
  a fresh `hero-poster.jpg`. Worth knowing: Edit 1 and Edit 2 share the exact same opening frame
  and are very close in duration/file size, so it's worth a quick look to confirm the new file
  actually contains the footage you meant to swap in — I can only re-encode video in this
  environment, not play it back to verify content.

## Latest round of changes
- **Typography**: your real **VTC Bayard** webfont is now installed (`assets/fonts/`) and
  applied to the real `<h2>` headings on the page ("Infrastructure built with...",
  "A decade in motion", "Partners in the work", "Invest in the next decade..." — four as of
  the latest round, since the new testimonial carousel added one). Other display-style elements
  (the hero, stat numbers, timeline years, CTA card headings) still use Anton as a stand-in —
  see "Design notes" below for how to extend Bayard to those too, if you want it everywhere.
- **Nav**: logo swapped to `DJDS_FullLogo_White.png`, sized 30% larger (28px → 36px tall),
  background changed to solid `#0096AD`.
- **Hero**: the "10 Years of Designing Justice" text is now the `djds10LockUp_Horizontal@2x.png`
  logo image (kept inside an `<h1>` tag so the page still has one primary heading for
  accessibility/SEO — screen readers get its alt text). The hand-drawn underline and the
  chevron strip are removed. The background video is now your `DJDS_Edit_2.mp4`, compressed the
  same way as before (MP4 + WebM + poster frame).
- **Impact stats**: the LOVE Building photo now sits beside the section heading as a featured
  image with a caption.
- **Partners**: the `sketch-floorplan-teal.png` watermark is removed (and the file deleted,
  since nothing else used it).
- **Timeline**: back to a horizontal scrolling layout (was vertical in the last round), with
  all 16 cards' real content intact — category tags, photos, and the two YouTube embeds. Every
  card now uses a single accent color, `#76BC43`, instead of the rotating palette.
- **What's Next**: your 10th-anniversary visioning salon collage
  (`10thAnniv_Salon_Collage_web.jpg`, compressed from the original 12MB PNG down to ~510KB)
  now sits between the quote and the three future-focus pillars, with a caption.
- Removed several image files that were no longer referenced by anything on the page (old
  local copies of Restore Oakland/LOVE Building photos, replaced earlier by the
  `designingjustice.org`-hosted versions in your timeline content; two unused sketch-loop
  tint variants) — kept the deliverable lean.

## What's here
- `index.html` — full page markup + copy
- `style.css` — all styling, using the exact palette/type from `DJDS_2026BrandGuidelines_v3.pdf`
- `script.js` — scroll reveals, animated stat counters, hero video controls, horizontal
  timeline scroll-progress bar (all vanilla JS, no dependencies)
- `assets/` — the photos/renderings you provided, resized and compressed for web
- `assets/fonts/` — the real VTC Bayard webfont files (`.woff`, `.woff2`) from your
  `bayard-web.zip`
- `assets/video/` — the compressed hero background video (`hero-bg.mp4`, `hero-bg.webm`) and
  its poster frame (`hero-poster.jpg`), generated from your uploaded `DJDS_Edit_2.mp4`
- `assets/djds_project_map.gif` — the animated regional project map. Currently hidden (see
  "Most recent changes" above) but still present in the markup.
- `assets/DJDS_Microsite-Collage.png` — the full-bleed photo banner at the bottom of the
  "Ten years, by the numbers" section

Open `index.html` in a browser to preview it as-is.

## Design notes
- **Colors** are pulled 1:1 from the brand guide: DJDS Teal `#0096AD`, Charcoal `#292928`,
  Orange `#F6921E`, plus the tertiary palette (Bright/Forest Green, Blue, Purple, Brown, Cork).
- **Type**: Montserrat is used for all body copy, per the guide. **VTC Bayard**, the brand
  guide's reserved campaign typeface, is now the real font (not a stand-in) — but it's only
  wired up to the page's three `<h2>` headings, per your last request. Everything else that
  reads as "display" text (the stat numbers, the timeline years, the CTA card headings) still
  uses **Anton** as a free stand-in. If you'd like Bayard applied everywhere instead of just
  H2s, the fix is one line: in `style.css`, change `--font-display: 'Anton', sans-serif;` to
  `--font-display: 'VTC Bayard', 'Anton', sans-serif;` under `:root`.
- **Signature motif — hand-drawn sketches**: one of your architectural sketches (the loose
  circles-and-arrows diagram) still appears as a faint watermark behind the timeline section
  (`assets/sketch-loops-teal.png`). The floor-plan sketch watermark that used to sit behind the
  partners section has been removed per your last request, and its image file deleted since
  nothing else used it. The small hand-drawn SVG sprite (`#sk-circle`, `#sk-arrow`, `#sk-mark`)
  is still defined at the top of `index.html` and still used for the stat-card corner marks and
  the timeline's scroll hint — `#sk-underline` is no longer used anywhere (the hero headline it
  decorated was replaced by your logo lockup) but the symbol definition is harmless to leave in
  place if you want to reuse it elsewhere later.
- **Horizontal timeline**: the timeline scrolls horizontally again (it was briefly vertical in
  an earlier round). All 16 cards carry your real milestone copy, category tags, photos, and
  the two YouTube embeds (Five Keys Mobile Classroom, the TED talk). Every card now uses a
  single accent color, `#76BC43`, for its top border, tag pill, and year numeral — that
  replaced the earlier design where each card's color rotated through the tertiary palette.
- **Hero: full-bleed background video**. The top section plays your `DJDS_Edit_2.mp4` on a
  continuous muted loop, with the `djds10LockUp_Horizontal@2x.png` "10 Years of Designing
  Justice" logo and lede copy on top, and a dark gradient overlay for contrast. Details:
  - The source video was compressed for web delivery into two formats in `assets/video/`:
    `hero-bg.mp4` (H.264, ~7MB) and `hero-bg.webm` (VP9, ~4.2MB, tried first by browsers that
    support it). `hero-poster.jpg` is a still frame shown instantly while the video loads.
  - A visible pause/play button (bottom-right of the hero) lets visitors stop the loop — this
    is a WCAG accessibility requirement for any auto-playing content that runs longer than 5
    seconds, not optional polish.
  - The video **never autoplays** for visitors with `prefers-reduced-motion` enabled at the OS
    level; they see the poster frame instead. It also auto-pauses whenever scrolled out of view
    to save battery/bandwidth, and resumes when scrolled back — unless the visitor manually
    paused it, in which case their choice is respected.
  - The nav bar sits at `position: fixed` so the video can run truly full-bleed under it. It's
    solid `#0096AD` (teal) at all scroll positions now, rather than the translucent-over-video
    treatment from an earlier round. Anchor-link scrolling (`#impact`, `#timeline`, etc.) has
    `scroll-padding-top` set so jumping to a section doesn't tuck its heading under the nav.
  - The hero logo lockup (`djds10LockUp_Horizontal_2x.png`) is the **teal** version, not white
    — that's the exact file you named. It sits inside an `<h1>` tag (with descriptive alt text)
    rather than as a bare image, so the page keeps one semantic primary heading for
    accessibility and SEO even though there's no longer any heading *text* in the hero.

## A real bug I found and fixed while building this
While testing the hero at mobile widths, its top spacing was silently collapsing to zero,
crowding the headline against the nav bar. Root cause: a mobile media-query rule (`.wrap{
padding: 0 20px; }`) used the `padding` **shorthand**, which resets `padding-top` and
`padding-bottom` to `0` even though only the left/right values were meant to change — and
because it appeared later in the stylesheet than the hero's own spacing rule, it won the
cascade at narrow screens. Fixed by switching that rule to the `padding-left`/`padding-right`
longhand properties instead, which only touch horizontal spacing. Worth knowing about if you
add your own `.wrap` overrides later — prefer the longhand properties unless you genuinely
want to reset all four sides.

## Project map in the impact section
The "Ten years, by the numbers" section is back to your **static/animated GIF** map
(`djds_project_map.gif`) next to a static text legend, replacing the interactive iframe-embedded
version from the previous round. The legend exists for two reasons: it gives screen readers and
anyone who can't watch a looping GIF a way to get the same information, and it means the data
is still readable even if the GIF is slow to load or someone prints the page.

I removed `djds_project_map.html` (the interactive version) from `assets/` since nothing
references it anymore — if you want it back later, it's the file from your earlier upload and
the same iframe-embed approach described in prior versions of this README would apply.

**Numbers worth double-checking**: the map's eight regions add up to **25 projects** (8 + 5 + 3
+ 3 + 2 + 2 + 1 + 1), while the stat directly above it still says **"50 projects completed
nationwide."** I left both as provided rather than guessing which is right or silently changing
one to match the other — but you'll likely want to reconcile them before this goes live, since
two different project counts a few inches apart on the page reads as a mistake to visitors.

## Content still needed from you
Search the page for **`[Placeholder]`** and dashed **"Partner logo"** boxes — these mark spots
that still need real content before launch:
- The **`$XXXM+`** stat in the impact section — you flagged the $157M+ figure as unverified;
  the counter script now recognizes non-numeric placeholders like `XXX` and displays them with
  a dashed underline instead of animating, so it's visually obvious this needs a real number
  before launch (see `.stat-pending` in `style.css`).
- The three future-focus pillars in "What's Next" (the quote above them is now real)
- Donate / Partner copy blocks (the paragraph text inside those two CTA cards)
- Partner & funder logos (swap the dashed placeholder boxes in the `.logo-grid` for `<img>` tags)
- A real link for the "Start a conversation" Partner button and the three social icons
  (Instagram/LinkedIn/X) — currently `#`. Both Donate buttons are now live and point to
  `designingjustice.org/donate/`.

The 2016–2026 timeline (25 entries) now uses your latest copy, category tags, image sources, and
video embeds exactly as provided. Two entries note an image source that wasn't a usable file or
URL — "DJDS Purchases Land in Detroit" (2019, noted as "Image of LOVE letter with CAB on the
site") and "Pop-Up Village Transitions to Community Organization" (2024, noted as "Kaselah at
the pop-up, or something from the site") — so those two cards currently run text-only. Send the
actual image files when you have them and I'll drop them in. I didn't invent any stats, quotes,
or milestones beyond what you sent — please don't publish the bracketed placeholder copy above
as final.

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
  Deanna Van Buren's TED talk) via responsive `<iframe>` embeds (`.tl-video` in `style.css`),
  rather than linking out.
- `assets/djds_project_map.gif` is a plain image file — upload it to the WordPress Media
  Library like any other image, no special handling needed.

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
