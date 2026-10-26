---
title: Room Atmosphere 2D
description: 'One flat-lit pixel-art room plus a little 2.5D geometry, lit in real time.'
hide_title: true
hide_table_of_contents: true
portfolio:
  role: Independent creator
  links:
    demo: Try it
    source: Source code
  gallery:
    night: 'Night, 01:30: moonlight slants in through the window and leaves the window frame on the floor'
    flat: 'The unlit flat source image that the lighting is computed on top of'
---

## Overview {#overview}

A flat-lit pixel-art room gets direct light and shadows, light shafts, floating dust, drifting fog, soft focus, film grain and chromatic aberration in real time, plus a day/night switch. All it needs is a light 2.5D proxy geometry: window openings, wall and floor planes, and boxes for the furniture. Everything is drawn with WebGL2 and Canvas2D, with no 3D meshes.

## Inspiration {#inspiration}

Inspired by [@vux429's Threads post](https://www.threads.com/@vux429/post/De7EVP5GFse), which lights flat pixel art in Godot using only 2D geometry. This project recreates the same idea with web technology and uses none of that post's assets.

## Technique {#technique}

- Proxy geometry: one data set is drawn into four canvases (flat albedo, depth, normals and emissive) that act as a deferred-lighting G-buffer. Under perspective, a plane's depth is affine in screen space, so a single canvas gradient draws it exactly.
- Direct light and shadows: each pixel rebuilds its position from depth and casts an analytic shadow ray toward the light against the window openings and furniture boxes; jittered samples give soft penumbrae.
- Air: light shafts are ray-marched, with drifting fog and dust particles; post-processing adds soft focus, ACES tone mapping, vignette, film grain and chromatic aberration.
- Time of day: the time sets the light's direction and color, switching between day at 09:00 and night at 01:30.
- Editable: drag the furniture and the direct-light landing point and the lighting is recomputed live, showing it is calculated rather than painted.
- Source art: repainted by AI (Atlas Cloud nano-banana-pro edit) from the flat original, keeping the composition and the flat lighting; all light and shadow still come from the proxy geometry.

The code is open source under the MIT license.
