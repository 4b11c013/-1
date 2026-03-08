# PWA 應用安裝指南

這個專案已經配置為 Progressive Web App (PWA)，可以安裝到手機上作為原生應用使用。

## 📱 安裝方法

### Android 手機

1. **使用 Chrome 瀏覽器**打開網站
2. 瀏覽器會自動顯示**「安裝應用程式」**的提示
3. 或者點擊瀏覽器選單（三個點）→ **「安裝應用程式」**或**「新增至主畫面」**
4. 確認安裝後，應用程式圖示會出現在主畫面上

### iPhone/iPad

1. **使用 Safari 瀏覽器**打開網站
2. 點擊底部的**分享按鈕**（方框與向上箭頭）
3. 向下滾動，選擇**「加入主畫面」**
4. 確認後，應用程式圖示會出現在主畫面上

## ✨ PWA 功能特點

- ✅ **離線使用**：安裝後可以離線訪問已緩存的頁面
- ✅ **全螢幕體驗**：打開時像原生應用一樣全螢幕顯示
- ✅ **快速啟動**：從主畫面啟動，無需打開瀏覽器
- ✅ **自動更新**：Service Worker 會自動更新緩存內容

## 🔧 技術實現

### 已添加的文件

1. **manifest.json** - 應用程式清單文件
   - 定義應用名稱、圖示、主題顏色等

2. **service-worker.js** - Service Worker
   - 實現離線緩存功能
   - 自動緩存頁面和資源

3. **HTML Meta 標籤**
   - 所有頁面已添加 PWA 相關 meta 標籤
   - 支援 iOS Safari 的 Web App 模式

## 📝 注意事項

1. **HTTPS 要求**：PWA 需要在 HTTPS 環境下運行（localhost 除外）
2. **圖示要求**：建議使用 192x192 和 512x512 像素的圖示
3. **Service Worker**：首次訪問時會自動註冊，之後會自動更新

## 🚀 部署建議

### 本地測試
```bash
# 使用 Python 簡單伺服器
python -m http.server 8000

# 或使用 Node.js http-server
npx http-server -p 8000
```

### 生產環境
- 部署到支援 HTTPS 的伺服器（如 GitHub Pages、Netlify、Vercel 等）
- 確保所有資源路徑正確
- 測試 Service Worker 是否正常運作

## 📱 測試 PWA

1. 打開 Chrome DevTools → Application → Manifest
2. 檢查 Manifest 是否正確載入
3. 檢查 Service Worker 是否已註冊
4. 使用 Lighthouse 測試 PWA 分數

## 🎯 下一步優化

如果需要更進階的功能，可以考慮：
- 使用 **Capacitor** 或 **Cordova** 打包成原生應用
- 添加推送通知功能
- 實現背景同步
- 添加更多離線功能

