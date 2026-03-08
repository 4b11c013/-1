import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AIChatModal from '../components/AIChatModal'

function Page8() {
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem('care_progress')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.path === '/page8' && parsed.step) return parsed.step
    }
    return 1
  })
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('care_progress', JSON.stringify({
      path: '/page8',
      name: `後置與護理 (第 ${currentStep} 步)`,
      step: currentStep
    }))
  }, [currentStep])

  const steps = [
    { number: 1, title: "取出注射器", englishTitle: "Step One", instruction: "請按照步驟指示進行操作", image: "/拔管.png" },
    { number: 2, title: "後置作業", englishTitle: "Step Two", instruction: "灌食後保持坐姿或半坐臥至少30分鐘", image: "/床頭抬高.jpg" },
    { number: 3, title: "清洗程序", englishTitle: "Step Three", instruction: "進行口腔清潔及鼻腔護理", images: ["/刷牙.png", "/清鼻.png"], image: "/刷牙.png" }
  ]

  useEffect(() => {
    window.showHelp = () => setIsAIChatOpen(true)
    document.body.style.opacity = '1'

    // 圖片輪播（步驟3）
    if (currentStep === 3) {
      const interval = setInterval(() => {
        // 這裡可以實現圖片輪播邏輯
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [currentStep])

  const changeStep = (direction) => {
    if (direction === 1 && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else if (direction === -1 && currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleNextStep = () => {
    if (currentStep === 3) {
      // 完成，清除進度並切換到首頁樣式
      localStorage.removeItem('care_progress')

      document.body.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      document.body.style.opacity = '0'
      setTimeout(() => {
        navigate('/')
        document.body.style.opacity = '1'
      }, 600)
    } else {
      changeStep(1)
    }
  }

  const currentStepData = steps[currentStep - 1]

  return (
    <div className="bg-background-light dark:bg-background-dark h-screen flex flex-col font-sans transition-colors duration-500 overflow-hidden text-slate-900 dark:text-white">
      <Header showTime={true} />

      <main className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden max-w-[1600px] mx-auto w-full">
        {/* Left Side: Illustration Card */}
        <div className="glass-card rounded-[3rem] overflow-hidden relative shadow-premium flex items-center justify-center animate-fade-in group bg-white/50 dark:bg-slate-900/50 border-2 border-white/50">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
          <img
            alt={currentStepData.title}
            className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
            src={currentStepData.image}
          />
          <div className="absolute bottom-10 left-10 z-20 glass-card px-8 py-5 rounded-3xl flex items-center gap-4 border-2 border-white/40 bg-white/90 backdrop-blur-xl shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">task_alt</span>
            </div>
            <div>
              <p className="text-xs font-black text-primary uppercase tracking-[0.3em]">Nursing Step</p>
              <p className="font-black text-slate-800 text-xl tracking-tight">{currentStepData.title}</p>
            </div>
          </div>
        </div>

        {/* Right Side: Step Control */}
        <div className="flex flex-col gap-6 h-full min-h-0">
          <div className="flex-1 glass-card rounded-[3rem] shadow-premium p-10 flex flex-col min-h-0 animate-fade-in-up">
            {/* Header with Step Indicator */}
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-xs font-black text-primary dark:text-primary-light uppercase tracking-[0.5em] mb-2">Final Stage</p>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  後置與護理
                </h2>
              </div>
              <div className="bg-primary/10 px-6 py-2 rounded-full border border-primary/20">
                <span className="text-sm font-black text-primary tracking-widest">{currentStep} / {steps.length}</span>
              </div>
            </div>

            {/* Instruction Card */}
            <div className="flex-1 flex flex-col justify-center gap-8 min-h-0">
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-[2.5rem] p-10 border-2 border-white/80 dark:border-slate-700 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10 group-hover:w-40 group-hover:h-40 transition-all duration-700"></div>

                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 relative">
                  {currentStepData.title}
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <span className="material-symbols-outlined text-4xl">info</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Instruction</p>
                      <p className="text-2xl font-bold text-slate-700 dark:text-slate-300 leading-tight">
                        {currentStepData.instruction}
                      </p>
                    </div>
                  </div>

                  {/* Visual Tip Badge */}
                  {currentStep === 2 && (
                    <div className="bg-amber-500/10 dark:bg-amber-500/20 rounded-2xl p-6 flex items-center gap-6 border-2 border-amber-500/20">
                      <span className="material-symbols-outlined text-amber-500 text-4xl animate-bounce-slow">timer</span>
                      <p className="text-xl font-black text-amber-700 dark:text-amber-500">固定姿勢：30分鐘</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar (Page4 Style) */}
              <div className="space-y-4 px-2">
                <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400">
                  <span>Current Progress</span>
                  <span className="text-primary tracking-[0.2em]">{Math.round((currentStep / steps.length) * 100)}% 完成</span>
                </div>
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 p-0.5">
                  <div
                    className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(52,130,185,0.6)] transition-all duration-700 ease-out"
                    style={{ width: `${(currentStep / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-6 animate-fade-in-up delay-200">
            <button
              onClick={() => changeStep(-1)}
              disabled={currentStep === 1}
              className={`btn-secondary h-20 flex-1 justify-center group ${currentStep === 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
              <span className="text-lg font-black tracking-widest pl-2">上一步</span>
            </button>
            <button
              onClick={handleNextStep}
              className="btn-primary h-20 flex-[2] justify-center group shadow-2xl shadow-primary/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-xl font-black tracking-widest">
                {currentStep === 3 ? '完成護理流程' : '下一步'}
              </span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 pl-3 text-2xl">
                {currentStep === 3 ? 'task_alt' : 'arrow_forward'}
              </span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <AIChatModal isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </div>
  )
}

export default Page8

