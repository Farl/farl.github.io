---
title: 光隙 · Lightfall
description: 一張平光像素畫，加上一點 2.5D 幾何資料，即時算出穿過窗戶、樹梢與窗花的光。
hide_title: true
hide_table_of_contents: true
portfolio:
  category: interaction
  group: visual
  cover: /img/works/lightfall-cloister.webp
  cover_position: 50% 50%
  cover_fit: cover
  year: 2026
  role: 獨立開發
  featured: false
  order: 3
  links:
    - id: demo
      label: 體驗作品
      url: 'https://farl.github.io/lightfall/'
    - id: source
      label: 原始碼
      url: 'https://github.com/Farl/lightfall'
  gallery:
    - id: forest
      src: /img/works/lightfall-forest.webp
      alt: 樹林場景，09:00 的低角度陽光從三層樹影後方照來，光束呈放射狀散開
    - id: room
      src: /img/works/lightfall-room.webp
      alt: 房間場景，09:00 的陽光從窗戶斜射進來，落在地毯上
  videos: []
---
## 作品介紹 {#overview}

一張平光的像素畫，加上一份很輕量的 2.5D 代理幾何，就能即時算出直射光與陰影、光束、浮塵、流動霧、柔焦、膠片顆粒與色散，並隨時間從白天走到夜晚。整個畫面用 WebGL2 與 Canvas2D 完成，沒有任何 3D 網格。

## 場景 {#scenes}

- 迴廊：哥德式拱廊，石造窗花的圖案投影在地板上。開啟頁面時預設是這個場景。
- 樹林：逆光的低角度太陽藏在三層樹影後方，光束從太陽的位置放射狀散開。
- 房間：陽光從窗戶照進房間，落在家具與地板上。

三個場景的原圖都由 AI（Atlas Cloud nano-banana-pro edit）依平光原圖重繪，可以用「AI 原圖」切換回平光版本比較；光影仍完全由代理幾何計算。

## 靈感來源 {#inspiration}

效果靈感來自 [@vux429 的 Threads 貼文](https://www.threads.com/@vux429/post/De7EVP5GFse)：他在 Godot 裡用純 2D 幾何運算替平光像素圖打光。這個作品用網頁技術重現同樣的思路，沒有使用該貼文的任何素材。

## 做法 {#technique}

- 代理幾何：同一份資料畫成平光原圖、深度、法線與自發光四張 Canvas，當作延遲光照的 G-buffer；透視下平面的深度在螢幕上是仿射的，一條 Canvas 漸層就能畫準。
- 直射光與陰影：每個像素從深度重建位置，往光源對窗戶開口、家具方盒與樹影、窗花這類剪影做 shadow ray，多次抖動取樣得到柔和半影。
- 空氣：光束以 ray-march 累積，搭配流動霧與浮塵粒子；後製有柔焦、ACES 色調、暗角、膠片顆粒與色散。
- 時間軸：時間決定光的方向與顏色；按「播放」（T）讓一天自動流動。
- 可編輯：開啟「編輯」（E）可以拖曳家具與直射光落點，「顯示幾何」（G）疊出代理幾何，光影跟著即時重算，證明畫面是算出來的。介面有中文與英文。

程式碼以 MIT 授權公開。
