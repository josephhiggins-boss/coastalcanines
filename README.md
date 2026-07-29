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

### 4. Connect the field-hire calendar (Cal.com — free)
The booking section is already built to hold a real slot-picker. Until it's
connected, visitors just see the enquiry form (no broken tabs, nothing looks
unfinished). To switch it on:

1. Sign up at https://cal.com with **hello@coastalcanines.ie** (or any email)
   and pick the username `coastalcanines` — that makes the link
   `cal.com/coastalcanines`.
2. Connect her Google/Apple/Outlook calendar when prompted. This is the bit
   that matters: Cal.com then blocks out times she's already busy, so it can
   never double-book the field.
3. Create an event type for the field:
   - Title: **Secure Field Hire**
   - Duration: **60 min** (add a 30 min one too if she wants the option)
   - Add a buffer (10–15 min) between bookings so one dog is gone before the
     next arrives — important for reactive dogs.
   - Set her real availability (e.g. Mon–Sat 08:00–19:00).
   - Under Advanced, add a booking question: **Dog's name & age**.
4. Copy the event's link — it looks like `coastalcanines/secure-field-hire`.
5. In `script.js`, set `CAL_LINK` to that value (WITHOUT `https://cal.com/`):
   ```js
   const CAL_LINK = "coastalcanines/secure-field-hire";
   ```
6. Commit and push. The "Book the field" tab appears automatically, and
   `coastalcanines.ie/#book-field` deep-links straight to it.

Cal.com's free plan covers all of this and sends confirmation + reminder
emails to both her and the customer automatically.

### 5. Testimonials (when she has them)
A ready-made "Kind words" section is in `index.html`, commented out
(search for `KIND WORDS`). When real client quotes exist, paste them in and
remove the `<!-- -->` comment markers.

## Where it lives online
**Canonical: https://coastalcanines.ie** — GitHub Pages from the repo
`josephhiggins-boss/coastalcanines` (this folder IS that repo; `CNAME` file
holds the domain). To publish changes: commit here and `git push`. Done.

**DNS — all records live in GoDaddy** (nameservers were switched back to
GoDaddy's defaults so the DNS Records editor works).

Website (GitHub Pages):
| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | josephhiggins-boss.github.io |

After DNS resolves, enable "Enforce HTTPS" in the repo's Pages settings
(GitHub provisions the certificate automatically, can take up to a day).

Email records (MX + SPF + DKIM + DMARC) come from whichever mail provider is
chosen — see "Custom email" below. They sit alongside the A records above
without conflicting: different record types, different jobs.

**Check everything at once:** `bash check-dns.sh` prints delegation, website
records, mail records and live HTTP status for both hostnames.

## Custom email (hello@coastalcanines.ie)
Recommended: **iCloud+ Custom Email Domain** — included with any paid iCloud
plan (from €0.99/mo, which most iPhone users already pay for photo backup),
and it works natively in the iPhone Mail app for both sending and receiving.
Set up at: iPhone Settings → [name] → iCloud → iCloud Mail → Custom Email
Domain. Apple then displays the exact MX/TXT records to paste into GoDaddy.

Alternatives: Google Workspace (~€102/yr, adds shared Calendar + Drive) or
Zoho Mail free (€0, but no IMAP on the free tier, so Zoho's own app only).

Whichever is chosen, add its **SPF, DKIM and DMARC** records too — without
them, replies and booking confirmations land in customers' spam.

Then update `BOOKING_EMAIL` at the top of `script.js` to the new address and
submit the form once to click FormSubmit's confirmation link.

**Temporary preview: https://jo3vo.io/coastal/** — a copy in
`E:\Projects\jo3voSite\public\coastal\` (Cloudflare Pages). Retire it once
the .ie domain is live (delete that folder and push jo3voSite).

When live, put https://coastalcanines.ie in the Instagram bio — that's where
her customers will find it.

## Design notes
- Palette comes from her logo: powder blue + navy, plus warm sand and a
  coral accent for buttons.
- Fonts are Google Fonts (Fraunces + Karla), loaded in `index.html`.
- Colours live as CSS variables at the top of `styles.css` — change once,
  updates everywhere.
- `assets/ig-profile-small.jpg` is her Instagram logo (100×100 — too small
  for the site; if she has the original logo file, we can use it properly).
