import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AIChatModal from '../components/AIChatModal'

function Page7() {
  const [flowRate, setFlowRate] = useState(15)
  const [totalVolume, setTotalVolume] = useState(250)
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)
  const [waterDetected, setWaterDetected] = useState(false)
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    window.showHelp = () => setIsAIChatOpen(true)
    document.body.style.opacity = '1'

    // 儲存進度
    localStorage.setItem('care_progress', JSON.stringify({
      path: '/page7',
      name: '最終潤濕管路'
    }))

    setTimeout(() => {
      setWaterDetected(true)
      if (videoRef.current) {
        videoRef.current.load()
        videoRef.current.addEventListener('canplay', function onCanPlay() {
          videoRef.current.removeEventListener('canplay', onCanPlay)
          videoRef.current.play().then(() => {
            if (imageRef.current) imageRef.current.style.opacity = '0'
            videoRef.current.style.opacity = '1'
            videoRef.current.style.pointerEvents = 'auto'
          })
        }, { once: true })
      }
    }, 2000)

    if (videoRef.current) {
      videoRef.current.addEventListener('ended', () => {
        setTimeout(() => {
          document.body.style.transition = 'opacity 0.6s ease-in-out'
          document.body.style.opacity = '0'
          setTimeout(() => {
            navigate('/page8')
            document.body.style.opacity = '1'
          }, 600)
        }, 500)
      })
    }
  }, [navigate])

  const adjustFlowRate = (change) => {
    setFlowRate(prev => Math.max(1, Math.min(100, prev + change)))
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 h-screen flex flex-col font-sans transition-colors duration-300">
      <Header showTime={true} />
      <main className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
        <div className="bg-card-light dark:bg-card-dark rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden relative group">
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
            <img
              ref={imageRef}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
              src="/到水.png"
              alt="Waiting for water"
            />
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out pointer-events-none"
              src="/灌水.mp4"
              muted
              playsInline
            />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {/* Instructions Section (Moved Up) */}
          <div className="flex-1 bg-card-light dark:bg-card-dark rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col p-8 relative overflow-hidden">
            <div className="mb-4">
              <h2 className="text-2xl font-medium text-slate-700 dark:text-slate-300">潤濕管路</h2>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 border-primary/20 dark:border-primary/30">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl">info</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">操作说明</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">请按照步驟指示進行操作</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flow Data Section (Moved Down) */}
          <div className="flex-[1.4] bg-card-light dark:bg-card-dark rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col p-8 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2">Flow Data</h3>
                <p className="text-2xl font-semibold text-slate-900 dark:text-white">流量監測</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center min-h-0">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 border-primary/20 dark:border-primary/30 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-primary text-2xl">speed</span>
                  </div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">流速</p>
                  <div className="flex items-center justify-center gap-6 mb-1">
                    <button onClick={() => adjustFlowRate(-1)} className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 flex items-center justify-center transition-colors active:scale-90">
                      <span className="material-symbols-outlined text-primary text-2xl font-bold">remove</span>
                    </button>
                    <p className="text-4xl font-bold text-slate-900 dark:text-white min-w-[60px] text-center">{flowRate}</p>
                    <button onClick={() => adjustFlowRate(1)} className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 flex items-center justify-center transition-colors active:scale-90">
                      <span className="material-symbols-outlined text-primary text-2xl font-bold">add</span>
                    </button>
                  </div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">ml/min</p>
                </div>
                <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 border-primary/20 dark:border-primary/30 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-primary text-2xl">water_drop</span>
                  </div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">總量</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{totalVolume}</p>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">ml</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AIChatModal isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </div>
  )
}

export default Page7

