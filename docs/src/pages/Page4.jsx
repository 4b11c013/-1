import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AIChatModal from '../components/AIChatModal'

function Page4() {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    window.showHelp = () => setIsAIChatOpen(true)
    document.body.style.opacity = '1'

    // 儲存進度
    localStorage.setItem('care_progress', JSON.stringify({
      path: '/page4',
      name: '食材準備與處理'
    }))
  }, [])

  const handleComplete = () => {
    document.body.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
    document.body.style.opacity = '0'
    setTimeout(() => {
      navigate('/page5')
      document.body.style.opacity = '1'
    }, 600)
  }

  return (
    <div className="bg-background-light dark:bg-background-dark h-screen flex flex-col font-sans transition-colors duration-500 overflow-hidden">
      <Header showTime={true} />

      <main className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden max-w-[1600px] mx-auto w-full">
        {/* Left Side: Success State (Liquid) */}
        <div className="glass-card rounded-[3rem] overflow-hidden relative shadow-premium flex items-center justify-center animate-fade-in group bg-white/50 dark:bg-slate-900/50 border-2 border-white/50">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-10 pointer-events-none"></div>
          <img
            alt="Final Blended Liquid"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            src="/food_liquid.png"
          />
          <div className="absolute bottom-10 left-10 z-20 glass-card px-8 py-5 rounded-3xl flex items-center gap-4 border-2 border-primary/20 bg-white/90 backdrop-blur-xl shadow-2xl">
            <span className="material-symbols-outlined text-primary text-4xl animate-pulse">check_circle</span>
            <div>
              <p className="text-xs font-black text-primary uppercase tracking-[0.3em]">Goal Appearance</p>
              <p className="font-black text-slate-800 text-xl tracking-tight">目標狀態：無顆粒液體</p>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Menu */}
        <div className="flex flex-col gap-6 h-full min-h-0">
          <div className="flex-1 glass-card rounded-[3rem] shadow-premium p-10 flex flex-col min-h-0 animate-fade-in-up">
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-xs font-black text-primary dark:text-primary-light uppercase tracking-[0.5em] mb-2">Preparation</p>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  食材清單 (對照圖)
                </h2>
              </div>
              <div className="flex flex-col items-end gap-1 opacity-20">
                <span className="text-5xl font-black text-primary dark:text-white leading-none">04</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-6 min-h-0 overflow-hidden">
              {/* Ingredients Row - FLEXIBLE VISUAL CARDS */}
              <div className="grid grid-cols-3 gap-5 flex-[3] min-h-0">
                <div className="flex flex-col h-full gap-3 group">
                  <div className="flex-1 glass-card rounded-[2.5rem] overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-lg relative bg-white">
                    <img src="/food_rice.png" alt="Rice" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="bg-amber-500/10 dark:bg-amber-500/20 py-2.5 rounded-2xl text-center">
                    <p className="text-base font-black text-amber-700 dark:text-amber-500">五穀/米飯</p>
                  </div>
                </div>

                <div className="flex flex-col h-full gap-3 group">
                  <div className="flex-1 glass-card rounded-[2.5rem] overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-lg relative bg-white">
                    <img src="/food_protein.png" alt="Protein" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="bg-rose-500/10 dark:bg-rose-500/20 py-2.5 rounded-2xl text-center">
                    <p className="text-base font-black text-rose-700 dark:text-rose-500">肉/魚/蛋</p>
                  </div>
                </div>

                <div className="flex flex-col h-full gap-3 group">
                  <div className="flex-1 glass-card rounded-[2.5rem] overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-lg relative bg-white">
                    <img src="/food_veg.png" alt="Veg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="bg-emerald-500/10 dark:bg-emerald-500/20 py-2.5 rounded-2xl text-center">
                    <p className="text-base font-black text-emerald-700 dark:text-emerald-500">時鮮/蔬菜</p>
                  </div>
                </div>
              </div>

              {/* Action Rules - FLEXIBLE ICONS */}
              <div className="grid grid-cols-2 gap-5 flex-[1.2] min-h-0">
                <div className="glass-card bg-primary/5 dark:bg-primary/20 rounded-[2rem] p-4 flex items-center justify-center gap-5 border-2 border-primary/20 shadow-lg">
                  <span className="material-symbols-outlined text-primary text-4xl">blender</span>
                  <p className="text-xl font-black text-slate-800 dark:text-white">全面攪碎</p>
                </div>
                <div className="glass-card bg-amber-500/5 dark:bg-amber-500/20 rounded-[2rem] p-4 flex items-center justify-center gap-5 border-2 border-amber-500/20 shadow-lg">
                  <span className="material-symbols-outlined text-amber-500 text-4xl">thermometer</span>
                  <p className="text-xl font-black text-slate-800 dark:text-white">38°C 溫熱</p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-400">
                <span>Task Progress</span>
                <span>Ready for Next Step</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-full shadow-[0_0_10px_rgba(52,130,185,0.5)]"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 animate-fade-in-up delay-200">
            <button
              onClick={() => navigate('/page3')}
              className="btn-secondary h-16 flex-1 justify-center group"
            >
              <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">chevron_left</span>
              <span>上一步</span>
            </button>
            <button
              onClick={handleComplete}
              className="btn-primary h-16 flex-[2] justify-center group shadow-xl shadow-primary/20"
            >
              <span className="text-lg">下一步</span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">chevron_right</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <AIChatModal isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </div>
  )
}

export default Page4
