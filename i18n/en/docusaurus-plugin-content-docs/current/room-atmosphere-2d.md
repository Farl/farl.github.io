---
title: Lightfall
description: 'A flat-lit pixel painting plus a little 2.5D geometry: light through windows, branches and tracery, computed live.'
hide_title: true
hide_table_of_contents: true
portfolio:
  role: Independent creator
  links:
    demo: Try it
    source: Source code
  gallery:
    forest: 'Forest at 09:00: a low sun behind three layers of tree silhouettes, with light shafts fanning out from it'
    room: 'Room at 09:00: sunlight slants in through the window and lands on the rug'
---

## Overview {#overview}

A flat-lit pixel painting and a light 2.5D proxy geometry are enough to compute direct light and shadows, light shafts, floating dust, drifting fog, soft focus, film grain and chromatic aberration in real time, as the time moves from day to night. Everything is drawn with WebGL2 and Canvas2D, with no 3D meshes.

## Scenes {#scenes}

- Cloister: a gothic arcade whose stone tracery is projected onto the floor. The page opens on this scene.
- Forest: backlit, with a low sun hidden behind three layers of tree silhouettes and shafts fanning out from it.
- Room: sunlight comes in through the window and falls across the furniture and floor.

All three base paintings were repainted by AI (Atlas Cloud nano-banana-pro edit) from flat originals; the "AI art" toggle switches back to the flat version for comparison. All light and shadow still come from the proxy geometry.

## Inspiration {#inspiration}

Inspired by [@vux429's Threads post](https://www.threads.com/@vux429/post/De7EVP5GFse), which lights flat pixel art in Godot using only 2D geometry. This project recreates the same idea with web technology and uses none of that post's assets.

## Technique {#technique}

- Proxy geometry: one data set is drawn into four canvases (flat albedo, depth, normals and emissive) that act as a deferred-lighting G-buffer. Under perspective, a plane's depth is affine in screen space, so a single canvas gradient draws it exactly.
- Direct light and shadows: each pixel rebuilds its position from depth and casts a shadow ray toward the light against window openings, furniture boxes and cut-out silhouettes such as trees and tracery; jittered samples give soft penumbrae.
- Air: light shafts are ray-marched, with drifting fog and dust particles; post-processing adds soft focus, ACES tone mapping, vignette, film grain and chromatic aberration.
- Time of day: the time sets the light's direction and color; Play (T) lets the day run on its own.
- Editable: Edit (E) lets you drag the furniture and the direct-light landing point, and Show geometry (G) overlays the proxy geometry; the lighting is recomputed live, showing it is calculated rather than painted. The interface is in Chinese and English.

The code is open source under the MIT license.
