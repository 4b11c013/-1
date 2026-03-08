import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import SettingsModal from './SettingsModal'

function Header({ showTime = false }) {
  const [time, setTime] = useState({ hours: 12, minutes: '38', period: 'AM' })
  const [date, setDate] = useState('')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isPowerOff, setIsPowerOff] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      let hours = now.getHours()
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12
      hours = hours ? hours : 12
      const options = { month: 'long', day: 'numeric', year: 'numeric' }
      const dateString = now.toLocaleDateString('en-US', options)

      setTime({ hours: String(hours).padStart(2, '0'), minutes, period: ampm })
      setDate(dateString)
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
  }

  const handlePowerOff = () => {
    // 直接切換狀態，不再操作 body opacity，避免閃爍
    setIsPowerOff(true)
  }

  const handleWakeUp = () => {
    // 直接切換狀態
    setIsPowerOff(false)
  }

  return (
    <>
      {/* 模擬關機黑屏層 */}
      <div
        onClick={handleWakeUp}
        className={`fixed inset-0 bg-black z-[9999] cursor-pointer flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${isPowerOff ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="text-white/5 flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-6xl">touch_app</span>
          <p className="text-sm font-light tracking-[0.5em] uppercase">Click to Wake Up</p>
        </div>
      </div>
      <header className="p-4 flex justify-between items-center w-full flex-shrink-0 relative z-[60]">
        <div className="flex items-center gap-2">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img src="/LOGO 去背.png" alt="Care Logo" className="h-16 object-contain" />
          </div>
        </div>

        {showTime && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="text-center">
              <div className="flex items-baseline gap-2 justify-center">
                <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {time.hours}:{time.minutes}
                </span>
                <span className="text-lg font-medium text-slate-600 dark:text-slate-400">
                  {time.period}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* Dark Mode */}
          <button
            className="w-12 h-12 flex items-center justify-center border-2 border-slate-300 dark:border-slate-700 rounded-full hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors bg-transparent group"
            onClick={toggleDarkMode}
          >
            <span className="material-symbols-outlined block dark:hidden text-xl transition-transform group-hover:rotate-12">dark_mode</span>
            <span className="material-symbols-outlined hidden dark:block text-xl transition-transform group-hover:rotate-12 text-amber-500">light_mode</span>
          </button>

          {/* AI Helper */}
          <button
            className="w-12 h-12 flex items-center justify-center border-2 border-slate-300 dark:border-slate-700 rounded-full hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors bg-transparent group"
            onClick={() => window.showHelp?.()}
          >
            <span className="material-symbols-outlined text-xl transition-transform group-hover:scale-110">psychology</span>
          </button>

          {/* Settings */}
          <button
            className="w-12 h-12 flex items-center justify-center border-2 border-slate-300 dark:border-slate-700 rounded-full hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors bg-transparent group"
            onClick={() => setIsSettingsOpen(true)}
          >
            <span className="material-symbols-outlined text-xl transition-transform group-hover:rotate-45">settings</span>
          </button>

          {/* Power / Home */}
          <button
            className="w-12 h-12 flex items-center justify-center border-2 border-slate-300 dark:border-slate-700 rounded-full hover:bg-red-500/10 transition-colors text-red-500 bg-transparent group"
            onClick={handlePowerOff}
          >
            <span className="material-symbols-outlined text-xl transition-transform group-hover:scale-110">power_settings_new</span>
          </button>
        </div>
      </header>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  )
}

export default Header

