# Farl. Lee 作品網站

作品以 Markdown 維護。首頁保留個人主視覺，三個領域分頁由作品資料自動產生；作品內頁提供介紹、圖片、示範影片及圖紙下載。

## 本機預覽

使用 `.nvmrc` 指定的 Node.js 24 LTS；框架支援 Node.js 22 以上。可先執行 `nvm use`。

```sh
npm install
npm start
```

修改 Markdown 後，作品列表與內頁會自動更新。開發伺服器一次預覽一個語言；英文使用 `npm start -- --locale en`。同時瀏覽兩種語言時，先 `npm run build`，再 `npm run serve`：正體中文位於 `/`，英文位於 `/en/`。

```sh
npm test
npm run typecheck
npm run build
npm run serve
```

GitHub Pages workflow 會在 PR 與 main 執行測試、型別檢查及完整雙語建置，全部通過後才允許 main 發布。也可在 main 手動啟動 workflow；其他分支及 PR 只驗證，不部署。建置與部署分開授權，只有部署工作取得 Pages 寫入權限。

目前鎖定 Docusaurus 3.9.2；`package.json` 的 `serialize-javascript` override 指定安全修補版本 7.0.5 以上，避免舊建置工具帶入已知序列化漏洞；`qs` override 同樣指定已修補的相容版本。升級框架時可重新評估是否仍需要 override，並執行完整檢查。

## 新增作品

在 `docs/` 新增 `my-project.md`，網址即為 `/docs/my-project`。保留檔名就能保留網址。

```yaml
---
title: 我的作品
description: 用一句話說明作品是什麼，以及可以體驗什麼。
hide_title: true
hide_table_of_contents: true
portfolio:
  category: interaction
  group: visual
  cover: /img/works/my-project.webp
  cover_position: 50% 50%
  cover_fit: cover
  year: 2026
  role: 獨立開發
  featured: false
  order: 50
  links:
    - id: demo
      label: 體驗作品
      url: https://example.com/
  gallery:
    - id: detail
      src: /img/works/my-project-detail.webp
      alt: 描述這張圖呈現的畫面
  media_sources:
    - id: official
      label: 官方遊戲頁
      url: https://example.com/game
  videos: []
  downloads: []
---
```

接著直接寫 Markdown 內文，從 `## 作品介紹` 開始即可，不需重複作品標題或封面。作品摘要、角色和媒體只維護在 front matter 一次，分頁與內頁共用。

| 領域 category | 分組 group |
| --- | --- |
| `games` | `independent` 獨立作品、`team` 團隊作品、`browser` 網頁遊戲 |
| `interaction` | `visual` 影像與空間、`audio` 聲音與音樂、`generated` 生成式探索、`tools` 小工具 |
| `art` | `paper` 紙模型 |

`cover_fit: contain` 適合圖示與完整圖紙，`cover` 適合裁切鋪滿的場景畫面。

`order` 越小越早顯示；相同順序依正體中文來源名稱排列，中英文維持相同順序。沒有合適封面可用 `cover: null`，以名稱、年份與角色呈現。影片填入 YouTube 影片 ID，例如 `PyYck98zQkU`，使用者點選後才載入播放器。

## 圖片與原始下載

- 顯示用圖片放在 `static/img/works/`，建議 WebP、長邊約 1440px，挑選真正代表作品的畫面。
- 原始圖紙放在 `static/downloads/paper/`，保留原始解析度。
- 網址省略 `static`，例如 `/img/works/paper-horse.webp`。
- `gallery` 可放多張實際畫面，使用者可以放大及切換。
- 團隊作品的公開宣傳圖可用 `media_sources` 標示來源；參與角色仍以 `role` 清楚區分。
- 顯示縮圖與下載原檔分開，避免瀏覽作品時載入所有大型圖紙。

紙模型下載格式：

```yaml
downloads:
  - id: red-hare
    label: 赤兔戰馬
    version: 原版
    file: /downloads/paper/paper-horse-v0-2-12-red_orig.jpg
    preview: /img/works/sheet-paper-horse-v0-2-12-red_orig.webp
```

建置會檢查本機媒體是否存在、分類與作品網址是否有效；錯誤訊息會指出作品檔名。

## 多國語言維護

採用 Docusaurus 原生多國語言建置，不另設第二套路由或作品列表。正體中文原網址保持不變，英文網址增加 `/en/`。導覽列以語言名稱切換，保留目前頁面、篩選條件及段落位置。

- `portfolio.settings.json`：品牌名稱、社群分享圖片、預設語言、語言代碼及顯示名稱的唯一來源。
- `i18n/zh-Hant/code.json`、`i18n/en/code.json`：介面文字。使用相同的 `portfolio.*` ID 與 `{name}` 等替換變數。`src/portfolio/copy.ts` 提供型別檢查。
- `docs/`：正體中文內容及所有共用資料，包含分類、年份、排序、圖片、外部連結、圖紙及影片。
- `i18n/en/docusaurus-plugin-content-docs/current/`：同名英文 Markdown，僅維護標題、摘要、角色、圖片說明、連結名稱、圖紙名稱及內文。

新增上方範例作品時，同時新增英文 `my-project.md`：

```yaml
---
title: My project
description: A short description of the work and what visitors can explore.
hide_title: true
hide_table_of_contents: true
portfolio:
  role: Independent creator
  links:
    demo: Try it
  gallery:
    detail: Describe what this image shows
  media_sources:
    official: Official project page
---
```

接著寫英文內文。段落標題使用相同的固定錨點，例如中文 `## 作品介紹 {#overview}`、英文 `## Overview {#overview}`；標題文字可改，錨點保持一致，語言切換就能保留段落位置。翻譯檔不用複製圖片路徑、URL、分類或年份。若有下載，對應英文寫法為：

```yaml
portfolio:
  downloads:
    red-hare:
      label: Red Hare
      version: Original
```

每個 `links`、`gallery`、`downloads`、`media_sources` 項目都有固定 `id`，英文以此對應。ID 在同一欄位內不可重複；新增、重排或替換檔案時保留既有 ID，不要重新編號。換圖片或網址只需改 `docs/`，兩種語言自動共用更新。如果中文設定了自訂 `id`、`slug` 或 `parse_number_prefixes`，英文也須設定為相同值，以符合原生文件路由。

建置會拒絕缺少作品翻譯、遺留的翻譯檔、缺少媒體說明、重複 ID、修改結構的翻譯、自訂路由不一致、介面漏譯或變數不一致，錯誤訊息會指出作品與欄位。加入第三種語言時，在設定檔登記語言，建立同樣的字典與 Markdown 目錄，再執行完整檢查即可；共用素材及版型不需複製。

`lib/catalog.mjs` 沿用目前鎖定版本的 Docusaurus 文件路徑計算，升級 Docusaurus 時請執行 `npm test`、`npm run typecheck`、`npm run build`，並檢查自訂 ID、slug 與中英文切換。

## 調整網站外觀

- `src/portfolio/config.ts`：主視覺、分類入口、領域精選及聯絡方式；文字從語言字典讀取。分類的 `background.project` 從作品目錄讀取封面，`position`、`mobilePosition`、`fit` 及 `mobileFit` 控制桌面／手機構圖，換圖仍只需維護作品原始資料。
- `static/img/domain-mask.svg`：首頁分類入口的柔邊不對稱輪廓；CSS 的陰影與背景高度使用共用變數調整。
- `design-assets/hero-prompt.md`：首頁橫向背景的原圖、內建 imagegen 提示詞及輸出紀錄；手機沿用直式構圖。
- `src/css/custom.css`：色彩、字體、間距與響應式版面。
- `src/portfolio/components.tsx`：共用作品卡片、內頁、圖庫與下載元件。
- `lib/catalog.mjs`：從 Markdown 產生作品目錄，避免手動維護第二份列表。

內部設計文件放在 `docs/superpowers/`，不會成為公開網頁。
