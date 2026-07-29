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
const BOOKING_EMAIL = "josephhiggins91@gmail.com"; // TODO: change to Mum's email

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
