# Coastal Canines — website

A single-page marketing + booking site for Coastal Canines — dog training and
secure field hire by the sea in Ballycotton, East Cork (Instagram
@_coastalcanines). Services: secure field hire (off-lead play, 30 min–1 hr),
1:1 training, group sessions, dog socialising.
No build step, no frameworks — just `index.html`, `styles.css`, `script.js`.
Open `index.html` in a browser to preview it locally.

## Before it goes live — 4 things to do

### 1. Personalise the "About" section
In `index.html`, search for `EDIT ME`. Replace the two paragraphs with Mum's
real story (her name, her dogs, how long she's trained, any qualifications
like IMDT/APDT membership — those build trust). Also update the hero
eyebrow/tagline if she covers a specific area, e.g.
"Kind, modern dog training in [town / county]".

### 2. Swap the placeholder illustrations for real photos
There are two photo slots, both styled as polaroids:
- **Hero** (`hero-photo`): a great square-ish photo of a dog she's trained,
  ideally on the beach.
- **About** (`about-photo`): a portrait photo of Mum (with a dog!).

To swap: inside the `polaroid-img` div, delete the `<svg>…</svg>` block and
replace it with `<img src="assets/your-photo.jpg" alt="describe the photo">`.
Put the photos in the `assets/` folder. Update the handwritten captions too.

### 3. Activate the booking form (2 minutes)
The form emails booking requests via [formsubmit.co](https://formsubmit.co)
— free, no account needed.
1. In `script.js`, set `BOOKING_EMAIL` (top of the file) to Mum's email.
   It's currently set to josephhiggins91@gmail.com so it works out of the box.
2. Submit the form once yourself. FormSubmit sends a **one-time confirmation
   email** to that address — click the link in it.
3. Done. Every booking request now arrives as a tidy email table, and the
   sender's address is reply-to, so Mum just hits Reply.

If sending ever fails, the site automatically offers visitors a pre-filled
"email us directly" link as a fallback.

### 4. Testimonials (when she has them)
A ready-made "Kind words" section is in `index.html`, commented out
(search for `KIND WORDS`). When real client quotes exist, paste them in and
remove the `<!-- -->` comment markers.

## Where it lives online
**Preview URL: https://jo3vo.io/coastal/** — served from the jo3voSite repo
(Cloudflare Pages). The site was copied into
`E:\Projects\jo3voSite\public\coastal\`; pushing jo3voSite to GitHub main
auto-deploys it.

**To publish changes:** edit the files HERE (C:\Projects\coastal-canines is
the source of truth), then copy `index.html`, `styles.css`, `script.js` and
`assets/` into `E:\Projects\jo3voSite\public\coastal\` and push jo3voSite.

**When it's ready for real customers**, give it its own home:
1. **Netlify Drop** — drag this folder onto https://app.netlify.com/drop,
   or a proper domain (e.g. coastalcanines.ie) pointed at it.
2. Add the URL to the Instagram bio — that's where her customers will find it.
3. Optionally retire the /coastal path from jo3vo.io afterwards.

## Design notes
- Palette comes from her logo: powder blue + navy, plus warm sand and a
  coral accent for buttons.
- Fonts are Google Fonts (Fraunces + Karla), loaded in `index.html`.
- Colours live as CSS variables at the top of `styles.css` — change once,
  updates everywhere.
- `assets/ig-profile-small.jpg` is her Instagram logo (100×100 — too small
  for the site; if she has the original logo file, we can use it properly).
