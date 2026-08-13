# 大華醫事檢驗所｜Dahua Medical Laboratory

大華醫事檢驗所的品牌形象網站，以清楚的檢驗資訊、專業儀器與可理解的健康內容，協助訪客了解檢驗方向並開始預約諮詢。網站採用繁體中文、響應式設計與編輯型醫療品牌視覺，內容以彰化地區的健康檢查、專項檢驗、基因檢測與到院資訊為核心。

## 網站功能

目前網站是以首頁為主的一頁式靜態網站，主要功能如下：

| 區塊 | 說明 |
| --- | --- |
| 品牌首頁 | 顯示大華醫事檢驗所的品牌主張、檢驗服務與聯絡入口。 |
| 健康檢查 | 介紹基礎篩檢、完整健康評估與可依需求討論的檢查方向。 |
| 專項檢驗 | 展示過敏原、營養素、婚前及其他專項檢驗服務。 |
| 基因檢測 | 以分類與展開清單呈現基因檢測方向，協助訪客理解不同檢測用途。 |
| VIP 停車資訊 | 提供到院停車指引與停車場位置說明。 |
| 預約諮詢 | 透過表單整理稱呼、電話、方案與問題，並開啟 LINE 官方帳號進行後續聯繫。桌面版與手機版均保留備援流程。 |
| 社群入口 | 右下角固定提供 Facebook 官方頁與 LINE 官方帳號浮動按鈕，頁尾亦保留文字連結。 |

網站已移除衛教文章功能；為維持既有外部連結相容性，`/health-education` 會導回首頁，而不是顯示失效的文章頁。網站內容屬一般健康資訊，不能取代個別醫療專業建議。

## 技術棧

本專案是可獨立部署的 React 靜態前端，不依賴 Manus 專屬 runtime、Forge API 或後端服務。

| 類別 | 使用技術 |
| --- | --- |
| UI | React 19、TypeScript、Tailwind CSS 4 |
| 建置 | Vite 7 |
| 路由 | Wouter |
| 圖示與互動 | Lucide React、Radix UI、Framer Motion |
| 表單 | React Hook Form、Zod |
| 套件管理 | pnpm 10 |
| 部署 | Vercel、Netlify 或其他可提供靜態檔案與 SPA fallback 的平台 |

## 開始開發

需求環境為 Node.js 22.x 與 pnpm。安裝依賴並啟動本地開發伺服器：

```bash
pnpm install --frozen-lockfile
pnpm dev
```

常用指令如下：

```bash
# TypeScript 型別檢查
pnpm check

# 建立 production 靜態檔案
pnpm build

# 預覽 production build
pnpm preview

# 使用 Prettier 格式化
pnpm format
```

Vite 的前端根目錄是 `client/`，production output 會寫入 repo 根目錄的 `dist/public/`。`server/` 與 `shared/` 目錄保留作為模板相容結構，但目前部署內容是純前端靜態網站。

## Vercel 部署

專案根目錄已包含 `vercel.json`。將 GitHub repo 匯入 Vercel 後，使用以下設定即可部署：

| 設定 | 值 |
| --- | --- |
| Framework Preset | `Vite` |
| Root Directory | `/` |
| Install Command | `pnpm install --frozen-lockfile` |
| Build Command | `pnpm build` |
| Output Directory | `dist/public` |
| Production Branch | `main` |
| Environment Variables | 不需要 |

`vercel.json` 已設定 SPA rewrite，讓直接開啟深層網址時仍由 `index.html` 接手路由。部署完成後，建議至少檢查首頁、`/health-education` 相容性導向、`/images/` 圖片、manifest、LINE 預約流程與手機版浮動社群按鈕。

## 靜態資產

圖片已放在 `client/public/images/`，程式碼使用 `/images/...` 絕對路徑引用，不依賴任何 Manus storage proxy。新增圖片時請將檔案放入同一目錄，並在元件中使用可由一般靜態主機直接提供的路徑。

目前主要品牌資產包括：

```text
client/public/images/dahua-clinic-interior.jpg
client/public/images/dahua-hero-lab.jpg
client/public/images/dahua-mark.png
client/public/images/dahua-specimen-detail.jpg
client/public/images/dahua-vip-parking.jpg
client/public/images/dhlp1.webp
client/public/images/dhlp4.webp
```

## 專案結構

```text
client/
  index.html              # 網站 metadata、字體與 manifest 入口
  public/images/          # 可獨立部署的品牌圖片資產
  src/App.tsx             # 路由與全域 provider
  src/pages/Home.tsx      # 主要一頁式網站內容
  src/index.css           # 全域設計系統與響應式樣式
  src/components/         # UI 與錯誤處理元件
public output/
  dist/public/            # pnpm build 產生的部署檔案
vercel.json               # Vercel 建置與 SPA rewrite 設定
vite.config.ts            # Vite、React、Tailwind 與 alias 設定
package.json              # scripts 與依賴
pnpm-lock.yaml            # 鎖定依賴版本
```

## 品牌與設計方向

網站採用 **Evidence & Warmth** 視覺方向：以深墨藍、海玻璃綠與暖象牙色建立醫療專業感，同時透過 Noto Serif TC 標題、攝影圖片與編輯式留白保留溫度。所有內容與互動應維持清楚、可信、克制且容易理解的品牌語氣。

## 驗證狀態

在目前版本中，以下檢查已完成：

```bash
pnpm check
pnpm build
```

Production build 可能會顯示 JavaScript bundle 超過 500 kB 的非阻斷性提醒；這不會阻止部署。後續若需要改善首屏效能，可再將大型區塊拆分為 lazy-loaded chunks。

## License

本專案目前未設定公開授權條款。若要開放第三方使用，請在此補上正式 License 與品牌資產使用規則。
