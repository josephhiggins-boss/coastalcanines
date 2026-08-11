/* ============================================================
   Coastal Canines — site behaviour
   ============================================================ */

/* ------------------------------------------------------------
   BOOKING FORM SETUP — the one thing you must configure.
   Set BOOKING_EMAIL to the address that should receive booking
   requests. The form sends via formsubmit.co (free, no account):
   the FIRST submission emails a one-time confirmation link to
   this address — click it once and everything works after that.
   ------------------------------------------------------------ */
const BOOKING_EMAIL = "clare@coastalcanines.ie";

/* ------------------------------------------------------------
   FIELD-HIRE CALENDAR — real slot booking via Cal.com (free).
   Leave this as "" and the site quietly shows just the enquiry
   form, exactly as before — visitors never see a broken tab.
   Once the Cal.com account exists, put the booking link here,
   WITHOUT the https://cal.com/ part. See README, step 5.
   Example: "coastalcanines/field-hire"
   ------------------------------------------------------------ */
const CAL_LINK = "";

/* ---------- reveal on scroll ---------- */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

/* ---------- footer year ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- field-hire calendar (Cal.com inline embed) ---------- */
function initCalendar() {
  if (!CAL_LINK) return; // not connected yet — enquiry form stands alone

  const tabs = document.getElementById("booking-tabs");
  const tabField = document.getElementById("tab-field");
  const tabEnquiry = document.getElementById("tab-enquiry");
  const panelField = document.getElementById("panel-field");
  const panelEnquiry = document.getElementById("panel-enquiry");

  // Cal.com loader snippet
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  Cal("init", { origin: "https://cal.com" });
  Cal("inline", {
    elementOrSelector: "#cal-embed",
    calLink: CAL_LINK,
    config: { layout: "month_view", theme: "light" },
  });
  Cal("ui", {
    hideEventTypeDetails: false,
    layout: "month_view",
    cssVarsPerTheme: { light: { "cal-brand": "#d96a45" } },
  });

  // reveal the tabs, calendar first
  tabs.hidden = false;
  panelField.hidden = false;
  panelEnquiry.hidden = true;

  const copyField = document.getElementById("copy-field");
  const copyEnquiry = document.getElementById("copy-enquiry");

  function select(which) {
    const field = which === "field";
    tabField.setAttribute("aria-selected", String(field));
    tabEnquiry.setAttribute("aria-selected", String(!field));
    panelField.hidden = !field;
    panelEnquiry.hidden = field;
    // the intro copy follows the tab
    copyField.hidden = !field;
    copyEnquiry.hidden = field;
  }
  select("field");
  tabField.addEventListener("click", () => select("field"));
  tabEnquiry.addEventListener("click", () => select("enquiry"));

  // deep link: coastalcanines.ie/#book-field opens the calendar tab
  if (location.hash === "#book-field") select("field");
}
initCalendar();

/* ---------- booking form ---------- */
const form = document.getElementById("booking-form");
const feedback = form.querySelector(".form-feedback");
const submitBtn = form.querySelector(".btn-submit");

function showFeedback(kind, html) {
  feedback.innerHTML = `<div class="msg msg--${kind}">${html}</div>`;
  feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // native validation with friendly UI
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const times = data.getAll("times").join(", ") || "No preference given";

  const payload = {
    _subject: `🐾 Booking request from ${data.get("name")} — Coastal Canines`,
    _template: "table",
    _captcha: "false",
    // makes "Reply" in the inbox go straight to the customer
    _replyto: data.get("email"),
    "Name": data.get("name"),
    "Email": data.get("email"),
    "Phone": data.get("phone") || "Not given",
    "Dog": data.get("dog"),
    "Service": data.get("service"),
    "Preferred times": times,
    "Notes": data.get("notes") || "—",
  };

  submitBtn.disabled = true;
  submitBtn.classList.add("is-sending");
  feedback.innerHTML = "";

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${BOOKING_EMAIL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    form.reset();
    showFeedback(
      "ok",
      "🐾 <strong>Request sent!</strong> Thanks — you'll hear back within a day or two to sort out a time. Give your dog a treat from us in the meantime."
    );
  } catch (err) {
    const subject = encodeURIComponent(`Booking request — Coastal Canines`);
    const body = encodeURIComponent(
      `Name: ${payload["Name"]}\nEmail: ${payload["Email"]}\nPhone: ${payload["Phone"]}\nDog: ${payload["Dog"]}\nService: ${payload["Service"]}\nPreferred times: ${payload["Preferred times"]}\nNotes: ${payload["Notes"]}`
    );
    showFeedback(
      "err",
      `Something went wrong sending your request. You can <a href="mailto:${BOOKING_EMAIL}?subject=${subject}&body=${body}">email us directly instead</a> — your details are already filled in.`
    );
  } finally {
    submitBtn.disabled = false;
    submitBtn.classList.remove("is-sending");
  }
});
