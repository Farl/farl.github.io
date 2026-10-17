---
title: Holographic Material Lab
description: 'Holographic trading-card foil, rainbow and gloss recreated in WebGL and CSS, compared side by side.'
hide_title: true
hide_table_of_contents: true
portfolio:
  role: Independent creator
  links:
    demo: Try it
  gallery:
    editor: 'The comparison bench: WebGL and CSS cards side by side, with the layer and foil parameter panel on the right'
---

## Overview {#overview}

Brings the look of physical holographic trading cards to the web. The same card is built twice, once as a WebGL shader and once from pure CSS layers, shown side by side and tilted in sync so the two approaches can be compared for quality and cost.

Each card is made of base, border and character layers. Every layer can stack effects with live parameters, and any texture slot can use a procedurally generated cloud background.

## Effects {#features}

- Dragon Ball foil: glints follow the groove direction, with concentric, linear, checkerboard, diamond and image patterns; the CSS version approximates the same formula.
- Rainbow layer: an angled rainbow band that scrolls along its stripes; two layers can be stacked with color-dodge.
- Surface gloss: clear-coat highlight plus rim light, sharing one formula between WebGL and CSS.
- Shared masks: stripes, rings, checkerboard and image luminance, invertible and with optional waves.
- View control: follow pointer, manual, horizontal or vertical sway, and orbit; the light stays fixed above the camera while the card tilts.
