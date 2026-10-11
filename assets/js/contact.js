// Contact form.
// To receive messages, set FORM_ENDPOINT to a form service URL (for example a
// Formspree form endpoint). Until then, the form tells visitors to email instead.
const FORM_ENDPOINT = "";
const CONTACT_EMAIL = '<a href="mailto:leah@bandellbookkeeping.com">leah@bandellbookkeeping.com</a>';

(() => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const button = form.querySelector('button[type="submit"]');

  // Preselect the package when arriving from a pricing card (contact.html#growth).
  const plan = form.elements.plan;
  const fromLink = location.hash.slice(1);
  if ([...plan.options].some((option) => option.value === fromLink)) plan.value = fromLink;

  const rules = {
    name: (value) => (value.trim() ? "" : "Enter your name."),
    email: (value) => {
      if (!value.trim()) return "Enter your email address.";
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Enter an email address like name@example.com.";
    },
  };

  function setError(name, message) {
    const input = form.elements[name];
    const error = document.getElementById(`${name}-error`);
    input.setAttribute("aria-invalid", message ? "true" : "false");
    error.textContent = message;
    error.hidden = !message;
  }

  // Validate when a field is left, and re-check as the visitor fixes an error.
  for (const name of Object.keys(rules)) {
    const input = form.elements[name];
    input.addEventListener("blur", () => {
      if (input.value) setError(name, rules[name](input.value));
    });
    input.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true") setError(name, rules[name](input.value));
    });
  }

  function showStatus(html) {
    status.innerHTML = html;
    status.hidden = false;
    status.focus();
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let firstInvalid = null;
    for (const [name, rule] of Object.entries(rules)) {
      const message = rule(form.elements[name].value);
      setError(name, message);
      if (message && !firstInvalid) firstInvalid = form.elements[name];
    }
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    if (!FORM_ENDPOINT) {
      showStatus(`<strong>Online messages aren't connected yet.</strong> Please email us at ${CONTACT_EMAIL} with the details above.`);
      return;
    }

    button.disabled = true;
    button.textContent = "Sending…";
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      showStatus("<strong>Thank you. Your message was sent.</strong> We'll reply by email to set up a time to talk.");
    } catch {
      showStatus(`<strong>Your message didn't go through.</strong> Please try again, or email us at ${CONTACT_EMAIL}.`);
    } finally {
      button.disabled = false;
      button.textContent = "Send message";
    }
  });
})();
