---
title: More Sliding Puzzle
description: >-
  A childhood toy for my niece became a sliding puzzle you can make from any
  image.
hide_title: true
hide_table_of_contents: true
portfolio:
  role: Independent developer
  links:
    link-1: Play in browser
    link-2: App Store
    link-3: Google Play
  gallery:
    scene-1: More Sliding Puzzle gameplay and image cropping
    scene-2: More Sliding Puzzle gameplay and image cropping
---

## It started with a toy {#從一個玩具開始}

The idea for this little game came from a childhood toy I gave my niece: a 15-puzzle with a rabbit on it. I showed her how to solve it once, and she picked it up straight away. Later, I wanted to race her to see who could finish first, but I could not make a second copy of the toy. Even with two copies, we would have had to play over a video call. How could we compare our times reliably? That was the starting point for More Sliding Puzzle.

Building a sliding puzzle with a changeable image is fairly straightforward. The interesting challenge was that different images can be divided very differently depending on the board dimensions. I spent time making the puzzle work with images of any aspect ratio and letting players choose which part of the image to use. Even a quick snapshot can become a puzzle in a few steps.

Because I wanted to recreate the feeling of the original toy, I used physically based rendering (PBR) for the tiles. The lighting also responds to the device’s tilt, making the puzzle feel more like a physical object. Reflections added a pleasing material quality, but could also make the image harder to read. I made compromises throughout the visuals to keep the puzzle easy to play while retaining a sense of realism.
