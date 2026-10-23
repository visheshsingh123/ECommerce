# WovenHours

A responsive clothing storefront prototype in the warm cream, charcoal, olive, and sand palette. Built with HTML, CSS, and JavaScript; no dependencies or build step.

## Run

```sh
cd /workspace/ECommerce
python3 -m http.server 3000 --bind 0.0.0.0
```

## Features

- Three-slide hero with previous, next, and pause controls; respects reduced-motion preferences.
- Eight demo products, women/men filters, search, and session-only favourites.
- Category grids, brand story, service highlights, newsletter mockup, and footer.
- Responsive mobile navigation and placeholder dialogs for future pages.

This is a visual demo: no Firebase, checkout, real subscriptions, or account storage. Product photography is illustrative and loaded from Unsplash; fonts load from Google Fonts, with system fallbacks. Network access to images.unsplash.com, fonts.googleapis.com, and fonts.gstatic.com is required for those assets.

## Validate

```sh
node --check app.js
curl -f http://127.0.0.1:3000/
```

Browser checks: hero navigation; women/men filters; search for “linen”; save/unsave a favourite; open and dismiss a future-page dialog; submit a valid demo email; mobile navigation; horizontal overflow at phone widths.
