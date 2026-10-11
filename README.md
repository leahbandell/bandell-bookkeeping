# Bandell Bookkeeping & Co.

Website for [bandellbookkeeping.com](https://bandellbookkeeping.com): plain HTML and CSS, published with GitHub Pages from the `main` branch. Any change pushed to `main` goes live within a few minutes.

| File | What it is |
| --- | --- |
| `index.html` | Home: services, how it works, who we work with, and a pricing summary |
| `pricing.html` | Monthly packages, one-time services and add-ons, and pricing questions |
| `contact.html` | Consultation request form and contact details |
| `assets/css/styles.css` | All styles, including the black, white, and gold colors and dark mode |
| `assets/js/contact.js` | Contact form validation and sending |
| `assets/img/` | Logo (dark and light versions) and favicon |
| `CNAME` | Tells GitHub Pages to serve the site at bandellbookkeeping.com |

To receive contact form messages, set `FORM_ENDPOINT` in `assets/js/contact.js` to a form service URL (for example a Formspree form). Until then, the form asks visitors to email instead.
