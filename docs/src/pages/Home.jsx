import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AIChatModal from '../components/AIChatModal'

function Home() {
  const [time, setTime] = useState({ hours: '12', minutes: '38', period: 'AM' })
  const [date, setDate] = useState('July 13, 2020')
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)
  const [savedProgress, setSavedProgress] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // 讀取進度
    const progress = localStorage.getItem('care_progress')
    if (progress) {
      setSavedProgress(JSON.parse(progress))
    }

    const updateDateTime = () => {
      const now = new Date()
      let hours = now.getHours()
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12
      hours = hours ? hours : 12
      const options = { month: 'long', day: 'numeric', year: 'numeric' }
      const dateString = now.toLocaleDateString('zh-TW', options)

      setTime({ hours: String(hours).padStart(2, '0'), minutes, period: ampm })
      setDate(dateString)
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    window.showHelp = () => setIsAIChatOpen(true)
  }, [])

  const startOrContinue = () => {
    const targetPath = savedProgress ? savedProgress.path : '/page2'
    document.body.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
    document.body.style.opacity = '0'
    setTimeout(() => {
      navigate(targetPath)
      document.body.style.opacity = '1'
    }, 600)
  }

  const resetAndStart = (e) => {
    e.stopPropagation()
    if (window.confirm('確定要清除舊進度並從頭開始嗎？')) {
      localStorage.removeItem('care_progress')
      setSavedProgress(null)
      // 保持在首頁，不自動跳轉
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 h-screen flex flex-col font-sans transition-colors duration-500 overflow-hidden">
      <Header />
      <main className="flex-grow flex flex-col lg:flex-row px-8 py-10 gap-10 items-center justify-center max-w-7xl mx-auto w-full animate-fade-in-up">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start space-y-12">
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-primary dark:text-primary-light uppercase tracking-[0.4em] animate-fade-in">
              Medical Care Guide
            </h2>
            <div className="space-y-6">
              <h1 className="text-7xl lg:text-8xl font-black tracking-tighter clock-shadow leading-none flex items-baseline gap-4 text-slate-900 dark:text-white">
                <span>{time.hours}:{time.minutes}</span>
                <span className="text-3xl lg:text-4xl font-extrabold text-primary/60">{time.period}</span>
              </h1>
              <p className="text-2xl font-medium text-slate-500 dark:text-slate-400 border-l-4 border-primary/20 pl-6">
                {date}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {/* 今日任務 / 接續進度卡片 */}
            <div
              onClick={startOrContinue}
              className={`glass-card glass-card-hover rounded-2xl p-6 flex items-center gap-5 group cursor-pointer border-2 ${savedProgress ? 'border-primary shadow-lg shadow-primary/10' : 'border-white/50 dark:border-white/5'}`}
            >
              <div className={`p-4 rounded-2xl transition-transform group-hover:scale-110 ${savedProgress ? 'bg-primary text-white shadow-lg' : 'bg-primary/10 dark:bg-primary/20 text-primary'}`}>
                <span className="material-symbols-outlined text-3xl">
                  {savedProgress ? 'potted_plant' : 'medical_services'}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                  {savedProgress ? '接續上次進度' : '今日任務'}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    {savedProgress ? savedProgress.name : '鼻胃管灌食指引'}
                  </p>
                  {savedProgress && (
                    <button
                      onClick={resetAndStart}
                      className="text-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white px-2 py-1 rounded transition-colors"
                    >
                      重置
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 系統狀態卡片 */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 flex items-center gap-5 group cursor-pointer border border-white/50 dark:border-white/5">
              <div className={`${savedProgress ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'} p-4 rounded-2xl transition-transform group-hover:scale-110`}>
                <span className="material-symbols-outlined text-3xl">
                  {savedProgress ? 'pending_actions' : 'event_available'}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">系統狀態</p>
                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
                  {savedProgress ? '任務暫停中' : '運行正常'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={startOrContinue}
            className="btn-primary py-4 px-10 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/40 group mt-4 overflow-hidden relative"
          >
            <span className="relative z-10 flex items-center gap-3 text-lg">
              {savedProgress ? '接續照護流程' : '開始照護流程'}
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">
                {savedProgress ? 'resume' : 'arrow_forward'}
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>

        {/* Right Content: 3D Render Placeholder / Main Image */}
        <div
          onClick={startOrContinue}
          className="w-full lg:w-1/2 aspect-square lg:aspect-auto h-full max-h-[600px] rounded-[3rem] overflow-hidden relative group cursor-pointer shadow-premium animate-subtle-float"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700"></div>
          <img
            alt="Medical Care Visualization"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
            src="/5.jpg"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700"></div>

          {/* Floating Indicator */}
          <div className="absolute bottom-10 left-10 z-20 glass-card p-4 rounded-2xl flex items-center gap-3 pr-8 backdrop-blur-md">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-widest">Ready to Start</span>
          </div>
        </div>
      </main>
      <Footer />
      <AIChatModal isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </div>
  )
}

export default Home
