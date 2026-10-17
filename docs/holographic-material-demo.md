---
title: 全息材質實驗室
description: 用 WebGL 與 CSS 重現全息卡牌的箔光、彩虹與反光，並排對照兩種做法。
hide_title: true
hide_table_of_contents: true
portfolio:
  category: interaction
  group: visual
  cover: /img/works/holographic-material-demo.webp
  cover_position: 50% 50%
  cover_fit: cover
  year: 2026
  role: 獨立開發
  featured: false
  order: 2
  links:
    - id: demo
      label: 體驗作品
      url: 'https://holographic-material-demo.pages.dev/'
  gallery:
    - id: editor
      src: /img/works/holographic-material-demo-editor.webp
      alt: 對照台畫面：左側 WebGL 與 CSS 卡片並排，右側是圖層與彩虹層的參數面板
  videos: []
---
## 作品介紹 {#overview}

把實體全息卡牌的質感搬到網頁上。同一張卡片分別用 WebGL shader 和純 CSS 圖層各做一次，並排顯示、同步傾斜，方便比對兩種做法的效果與效能落差。

卡片由底層、邊框層、角色層組成，每一層都能疊加效果並即時調整參數，貼圖欄位也可以改用程序生成的雲紋背景。

## 效果 {#features}

- 七龍珠箔：沿溝紋方向計算閃光，支援同心圓、線性、棋盤格、菱形與圖片排列；CSS 版用同一條公式近似。
- 彩虹層：可調角度並沿條紋自動捲動的彩虹光帶，兩層可用 color-dodge 疊加。
- 表面反光：清漆高光加邊緣光，WebGL 與 CSS 共用公式。
- 共用遮罩：條紋、同心圓、棋盤格與圖片亮度，可反轉、可加波動。
- 視角控制：跟隨滑鼠、手動、左右或上下擺動、繞圈；光源固定在相機上方，只有卡片傾斜。
