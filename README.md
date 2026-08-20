# Thanigaivel — Software Developer Portfolio

Full-screen slide-deck portfolio. Static site — no build step, no dependencies.

## Structure

```
index.html            All slides (hero, experience, 6 projects, skills, contact)
css/styles.css        Design system + deck engine styles
js/main.js            Slide navigation, carousel, next-project cards
assets/img/tillsee/   Real Tillsee app screenshots (15)
```

## Run

Open `index.html` in a browser, or serve the folder with any static server:

```
npx serve .
```

## Navigation

- Mouse wheel / trackpad scroll, `↑` `↓` `PageUp` `PageDown` `Space`, `Home` / `End`
- Touch: vertical swipe changes slides; horizontal swipe scrolls the screenshot carousel
- Dot rail (right edge) jumps to any slide; slides deep-link via `#s1`…`#s10`

## Deploy

Any static host (Vercel, Netlify, GitHub Pages) — upload the folder as-is.
