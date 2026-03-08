# React 專案設置指南

這個專案已經轉換為 React 專案，使用 Vite 作為構建工具。

## 📦 安裝依賴

```bash
npm install
```

## 🚀 開發模式

```bash
npm run dev
```

這會啟動開發伺服器，通常運行在 `http://localhost:3000`

## 🏗️ 構建生產版本

```bash
npm run build
```

構建的文件會輸出到 `dist` 目錄。

## 📁 專案結構

```
版1/
├── public/                 # 靜態資源（圖片、字體等）
│   ├── 5.jpg
│   ├── 胃.jpg
│   ├── fonts/
│   └── ...
├── src/
│   ├── components/         # React 組件
│   │   ├── Header.jsx      # 頁首組件
│   │   ├── Footer.jsx      # 頁尾組件
│   │   └── AIChatModal.jsx # AI 聊天模態窗口
│   ├── pages/              # 頁面組件
│   │   ├── Home.jsx        # 首頁
│   │   ├── Page2.jsx       # 步驟指引頁面
│   │   ├── Page3.jsx       # 抽取胃液頁面
│   │   └── ...
│   ├── App.jsx             # 主應用組件（路由配置）
│   ├── main.jsx            # 應用入口
│   └── index.css           # 全局樣式
├── index.html              # HTML 模板
├── package.json            # 專案配置
├── vite.config.js          # Vite 配置
├── tailwind.config.js      # Tailwind CSS 配置
└── postcss.config.js       # PostCSS 配置
```

## 🔧 技術棧

- **React 18** - UI 框架
- **React Router** - 路由管理
- **Vite** - 構建工具
- **Tailwind CSS** - 樣式框架
- **PWA** - 支援離線使用

## 📝 主要功能

1. **路由系統** - 使用 React Router 管理頁面導航
2. **組件化** - Header、Footer、AIChatModal 等可重用組件
3. **狀態管理** - 使用 React Hooks 管理狀態
4. **PWA 支援** - 可安裝到手機/iPad
5. **AI 聊天** - 整合 AI 助手功能

## 🎨 樣式配置

Tailwind CSS 配置在 `tailwind.config.js` 中，包含：
- 自定義顏色（primary, background-light 等）
- 自定義字體（Zodiak, Outfit, Inter）
- 深色模式支援

## 📱 PWA 功能

專案已配置為 PWA，支援：
- 離線使用
- 安裝到主畫面
- Service Worker 緩存

## 🚀 部署

### 構建生產版本

```bash
npm run build
```

### 部署到靜態託管

構建後，將 `dist` 目錄部署到：
- GitHub Pages
- Netlify
- Vercel
- 或其他靜態託管服務

## 📝 注意事項

1. **靜態資源**：確保 `public` 目錄中的所有資源（圖片、字體等）都正確放置
2. **路由**：如果部署到子路徑，需要在 `vite.config.js` 中設置 `base` 選項
3. **環境變數**：可以創建 `.env` 文件來管理環境變數

## 🔄 從 HTML 遷移到 React

所有原有的 HTML 頁面都已轉換為 React 組件：
- `index.html` → `src/pages/Home.jsx`
- `page2.html` → `src/pages/Page2.jsx`
- `page3.html` → `src/pages/Page3.jsx`
- 等等...

所有功能都保持不變，但現在使用 React 的組件化方式組織代碼。

