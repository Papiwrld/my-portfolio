# Awagah Eugene Kwesi – Portfolio

A single-page, neon-drenched portfolio that highlights services, selected work, and contact details for Awagah Eugene Kwesi (Ghana-based frontend developer & UI/UX designer). Built with semantic HTML, custom CSS, and a light-touch JavaScript layer for micro-interactions.

## ✨ Experience highlights
- Hero with custom cursor, magnetic buttons, and tilt cards
- Aura-style animated background + glassmorphism cards
- Responsive sections (About, Services, Work, Contact)
- Accessibility touches: skip link, aria labels, custom focus states
- Optimized metadata for social sharing & SEO

## 🧱 Tech stack
- **HTML5** for structure & accessibility
- **CSS (Flexbox/Grid/Custom props)** for layout + styling
- **Vanilla JavaScript** for cursor, tilt, nav drawer, and interaction polish
- **Font Awesome + Google Fonts (Outfit, Space Grotesk)**

## 📁 Structure

```
my-portfolio/
├── index.html      # Main page markup
├── style.css       # Global styles, animations, responsive rules
├── script.js       # Interactions (cursor, tilt, mobile nav)
├── Images/         # Portfolio/media assets
├── robots.txt
├── sitemap.xml
├── LICENSE
└── README.md
```

> Note: PWA assets (manifest/service worker) were removed in this iteration. Reintroduce them only if offline install is required.

## 🚀 Getting started
1. Clone or download this repo
2. Open `index.html` in your browser, or run a static server:
   ```bash
   npx serve .
   # or
   python -m http.server 3000
   ```
3. Edit content/styles/scripts as needed and refresh

## 🔧 Customization guide
- **Branding:** update copy + images directly in `index.html`
- **Colors:** tweak CSS custom properties at the top of `style.css`
- **Projects/Services:** edit the respective sections in HTML and adjust images
- **Interactions:** all behavior lives in `script.js` (cursor, tilt, nav, magnetic buttons)

## 📌 Roadmap ideas
- Reinstate theme toggle with localStorage persistence
- Add scroll-triggered reveals or GSAP sequences
- Restore PWA shell (manifest + sw registration) for offline installs
- Integrate real contact endpoint (Google Apps Script, Formspree, etc.)

## 👨🏾‍💻 Author
- **Awagah Eugene Kwesi** – kwesieugene77@gmail.com | [LinkedIn](https://linkedin.com/in/eugene-awagah-86068a341) | [GitHub](https://github.com/Papiwrld) | [Instagram](https://instagram.com/papiwrld_)

Made with ❤️ in Ghana.
