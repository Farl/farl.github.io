---
title: nest-cast
description: 對客廳的舊 Google Home Mini 說一句話，Mac 上的 Claude 就去做事，再從同一顆喇叭唸出結果。
hide_title: true
hide_table_of_contents: true
portfolio:
  category: interaction
  group: tools
  cover: /img/works/nest-cast.webp
  cover_fit: cover
  year: 2026
  role: 獨立開發
  featured: false
  order: 6
  links:
    - id: source
      label: 原始碼
      url: 'https://github.com/Farl/nest-cast'
  videos: []
---
## 作品介紹 {#overview}

對客廳的第一代 Google Home Mini 說「Hey Google，提醒我今天請機器人…」，Google 助理會把這句話寫進 Google Tasks。Mac 上的 Claude 發現這筆以「機器人」開頭的任務後，就去完成工作，再透過同一顆喇叭把結果唸出來，最後自動刪掉這筆任務。一句話下去，電腦做事、喇叭回話、清單自己清乾淨。

## 實測 {#results}

2026-11-08 在第一代 Google Home Mini 上實測成功：

- 「機器人要幫我查一個 AI 新聞」：上網搜尋後唸出一則新聞，從建立任務到唸完約 70 秒，大部分時間花在搜尋。
- 「發一則笑話到 Slack」被語音辨識聽成了「撥聞到 snake」：Claude 先在喇叭上說聽不懂，在電腦上確認後才把笑話私訊到自己的 Slack，唸出來，再刪掉任務。

新任務在一次輪詢內就會被接手：平常 5 秒，按過「門鈴」後 1 秒。最弱的一環是助理的語音辨識，所以聽不懂的指令不猜，先問。

## 做法 {#technique}

- 嘴巴：`nest-cast` 指令列工具透過區網的 Cast 協定控制喇叭，負責尋找裝置、調音量、播放與文字轉語音，長文字會切段播放。
- 耳朵：Nest 喇叭跑的是 Cast OS，沒有 ADB 也拿不到麥克風，所以改讓 Google 助理把話寫進 Google Tasks，Mac 端每幾秒查一次以「機器人」開頭的新任務。前綴用中文，是因為喇叭的助理設成繁體中文，中文詞比「Claude」好辨識得多。
- 門鈴（可選）：用 Matter 做一盞虛擬燈，說「Hey Google，打開機器人」就讓 Mac 改成每秒輪詢。
- 安全：傳訊息、刪除、付款這類對外動作，一律先在電腦上確認；任務在唸完回覆之後才刪，而且只刪標題以「機器人」開頭的任務。

封面是概念圖，由 AI 生成。
