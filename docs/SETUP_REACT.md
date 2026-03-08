# React 專案設置步驟

## 🚀 快速開始

### 1. 安裝 Node.js
確保您已安裝 Node.js (版本 18 或更高)
```bash
node --version
```

### 2. 安裝依賴
```bash
npm install
```

### 3. 移動靜態資源到 public 目錄

**重要！** 需要將以下文件/文件夾移動到 `public` 目錄：

```bash
# 創建 public 目錄（如果不存在）
mkdir public

# 移動圖片文件
mv *.jpg *.png *.mp4 public/ 2>/dev/null || true

# 移動字體文件夾
mv fonts public/ 2>/dev/null || true

# 移動其他資源
mv "LOGO 去背.png" public/ 2>/dev/null || true
mv manifest.json public/ 2>/dev/null || true
mv service-worker.js public/ 2>/dev/null || true
```

或者手動將以下內容複製到 `public` 目錄：
- 所有 `.jpg`, `.png`, `.mp4` 文件
- `fonts/` 文件夾
- `LOGO 去背.png`
- `manifest.json`
- `service-worker.js`

### 4. 啟動開發伺服器
```bash
npm run dev
```

瀏覽器會自動打開 `http://localhost:3000`

## 📝 注意事項

1. **靜態資源路徑**：所有圖片、字體等資源現在應該從 `/` 開始（例如 `/5.jpg` 而不是 `5.jpg`）

2. **路由**：使用 React Router，所有頁面路由都在 `src/App.jsx` 中定義

3. **組件結構**：
   - `src/components/` - 可重用組件
   - `src/pages/` - 頁面組件

4. **樣式**：使用 Tailwind CSS，配置在 `tailwind.config.js`

## 🔧 如果遇到問題

### 圖片無法顯示
- 確保圖片在 `public` 目錄中
- 檢查路徑是否以 `/` 開頭（例如 `/5.jpg`）

### 字體無法載入
- 確保 `fonts` 文件夾在 `public` 目錄中
- 檢查 `src/index.css` 中的字體路徑

### 路由不工作
- 確保使用 `useNavigate()` 而不是 `window.location.href`
- 檢查 `src/App.jsx` 中的路由配置

## 📦 構建生產版本

```bash
npm run build
```

構建的文件會在 `dist` 目錄中。

## 🎉 完成！

現在您的專案已經轉換為 React 專案了！

