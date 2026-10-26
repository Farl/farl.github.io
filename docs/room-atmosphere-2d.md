---
title: 房間光影 Room Atmosphere 2D
description: 一張平光像素畫，加上 2.5D 幾何資料，就能即時打光。
hide_title: true
hide_table_of_contents: true
portfolio:
  category: interaction
  group: visual
  cover: /img/works/room-atmosphere-2d.webp
  cover_position: 50% 50%
  cover_fit: cover
  year: 2026
  role: 獨立開發
  featured: false
  order: 3
  links:
    - id: demo
      label: 體驗作品
      url: 'https://farl.github.io/room-atmosphere-2d/'
    - id: source
      label: 原始碼
      url: 'https://github.com/Farl/room-atmosphere-2d'
  gallery:
    - id: night
      src: /img/works/room-atmosphere-2d-night.webp
      alt: 夜間 01:30，月光從窗戶斜射進房間，地板上留下窗框的光斑
    - id: flat
      src: /img/works/room-atmosphere-2d-flat.webp
      alt: 未打光的平光原圖，作為光影計算的底圖
  videos: []
---
## 作品介紹 {#overview}

把一張平光的像素房間，靠一份很輕量的 2.5D 代理幾何（窗戶開口、牆與地板平面、家具方盒），即時加上直射光與陰影、光束、浮塵、流動霧、柔焦、膠片顆粒與色散，並能切換日夜。整個畫面用 WebGL2 與 Canvas2D 完成，沒有任何 3D 網格。

## 靈感來源 {#inspiration}

效果靈感來自 [@vux429 的 Threads 貼文](https://www.threads.com/@vux429/post/De7EVP5GFse)：他在 Godot 裡用純 2D 幾何運算替平光像素圖打光。這個作品用網頁技術重現同樣的思路，沒有使用該貼文的任何素材。

## 做法 {#technique}

- 代理幾何：同一份資料畫成平光原圖、深度、法線與自發光四張 Canvas，當作延遲光照的 G-buffer；透視下平面的深度在螢幕上是仿射的，一條 Canvas 漸層就能畫準。
- 直射光與陰影：每個像素從深度重建位置，往光源對窗戶開口和家具方盒做解析式 shadow ray，多次抖動取樣得到柔和半影。
- 空氣：光束以 ray-march 累積，搭配流動霧與浮塵粒子；後製有柔焦、ACES 色調、暗角、膠片顆粒與色散。
- 時間軸：日夜時間決定光的方向與顏色，可在 09:00 日間與 01:30 夜間之間切換。
- 可編輯：拖曳家具與直射光落點，光影跟著即時重算，證明畫面是算出來的，不是畫上去的。
- 原圖：由 AI（Atlas Cloud nano-banana-pro edit）依平光原圖重繪，構圖不變、維持平光，光影仍完全由代理幾何計算。

程式碼以 MIT 授權公開。
