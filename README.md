# LiuTOS-web

流特 LiuTOS 的系統重灌與深度優化服務展示頁。十道工序、三次點擊，雙語（繁中 / EN），部署於 GitHub Pages。

## 開發

```bash
npm install
npm run dev
npm run build
npm run preview
```

`vite.config.js` 的 `base` 固定為 `/LiuTOS-web/`，對應 GitHub Pages 專案路徑。若改用自訂網域或把 repo 改名，這裡要一起改。

## 部署

```bash
npm run deploy
```

`scripts/deploy.mjs` 會 build、把 `dist` 與 `.nojekyll` 複製到暫存目錄，再以強制推送更新 `gh-pages` 分支。Pages 來源設為 **Deploy from a branch: gh-pages / (root)**。

原本規劃用 GitHub Actions，但該帳號的 Actions 目前因帳務問題被鎖，任何 workflow 都不會啟動，所以改走分支部署。帳務處理完後可改回 Actions：把 Pages Source 改成 GitHub Actions，補回 deploy workflow 即可，`vite.config.js` 不用動。

## 改內容

| 想改什麼 | 檔案 |
|---|---|
| 十道工序文字、終端機輸出、方案說明、按鈕文案、全站中英文 | `src/content.js` |
| 每一步的規格明細（右側資料表） | `src/facts.js` |
| 價目數字、加購單價 | `src/content.js` 的 `PRICES` |
| Discord 帳號 | `src/content.js` 的 `DISCORD_USER` |
| 色票、字體、間距、動效 | `src/styles.css` 開頭的 `:root` |
加購單價目前是 `null`，畫面顯示「單價另計」；填入數字後票卡與預約訊息會自動帶入。

## 設計約束

- 石墨黑 `#161a19` 底、表層 `#1b201e`、凹面 `#101413`，單一訊號色薄荷 `#95E6BD`。沒有漸層光暈、玻璃模糊、圓角、陰影。
- 中文 `Noto Sans TC`，數字與指令 `JetBrains Mono`。
- 頁面不放未經實測的幀數。所有示意圖表都標「示意」；registry 值取自實際腳本輸出。
- 第 1 步只寫「授權」，不顯示使用工具。

## 互動

- 工序釘屏：`ScrollTrigger` 判斷進度，`sticky` 負責固定，左側導軌可跳步。
- 文字渲染：左右分割拖曳（`clip-path` + range input）。
- 滑鼠加速：Canvas 重播同一段手部軌跡，加速曲線的落點偏移為 1.17 倍手部位移。
- `prefers-reduced-motion` 全站降級為靜態，Canvas 只畫最終狀態。
- 桌機且為精細指標裝置才啟用 Lenis 慣性滾動。

## 表單

沒有後端。表單只組出訊息，複製後到 Discord 貼上。要改成收單服務（例如 Formspree）只需改 `src/sections/Booking.jsx` 的送出函式。
