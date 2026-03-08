function Footer() {
  return (
    <footer className="px-6 py-3 border-t border-slate-300 dark:border-slate-800 flex justify-between items-center text-xs font-medium text-slate-500 dark:text-slate-400 flex-shrink-0">
      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">wifi</span>
          <span>HOSPITAL_WLAN_5G</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">battery_5_bar</span>
          <span>98%</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span>System Secure • Serial: #MD-99201</span>
      </div>
    </footer>
  )
}

export default Footer

