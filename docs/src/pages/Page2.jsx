import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AIChatModal from '../components/AIChatModal'

function Page2() {
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem('care_progress')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.path === '/page2' && parsed.step) return parsed.step
    }
    return 1
  })
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    window.showHelp = () => setIsAIChatOpen(true)
    document.body.style.opacity = '1'
  }, [])

  useEffect(() => {
    localStorage.setItem('care_progress', JSON.stringify({
      path: '/page2',
      name: `準備與評估 (第 ${currentStep} 步)`,
      step: currentStep
    }))
  }, [currentStep])

  const steps = [
    {
      id: 1,
      title: '檢查環境與手部衛生',
      instruction: '確保灌食環境清潔，照護者需徹底清潔雙手以避免交叉感染。準備好灌食所需的毛巾。',
      image: '/washing_hands.png',
      icon: 'front_hand'
    },
    {
      id: 2,
      title: '協助調整姿勢',
      instruction: '協助患者採坐姿或半坐臥式（床頭抬高30-60度），可減少胃部不適或吸入性肺炎的風險。',
      image: '/bed_elevation.png',
      icon: 'airline_seat_recline_extra'
    },
    {
      id: 3,
      title: '覆蓋毛巾',
      instruction: '在患者胸前鋪上毛巾，以防止灌食過程中液體滴落弄髒衣服。',
      image: '/towel_prep.png',
      icon: 'dry_cleaning'
    },
    {
      id: 4,
      title: '連接鼻胃管接頭',
      instruction: '將鼻胃管的接頭穩固地連接到餵食裝置的餵食嘴上，確保連接緊密不鬆脫。',
      image: '/妝管.png',
      icon: 'settings_input_component'
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      document.body.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      document.body.style.opacity = '0'
      setTimeout(() => {
        navigate('/page3')
        document.body.style.opacity = '1'
      }, 600)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      navigate('/')
    }
  }

  const currentStepData = steps.find(s => s.id === currentStep)

  return (
    <div className="bg-background-light dark:bg-background-dark h-screen flex flex-col font-sans transition-colors duration-500 overflow-hidden">
      <Header showTime={true} />

      <main className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden max-w-[1600px] mx-auto w-full">
        {/* Left Side: Illustration Card */}
        <div className="glass-card rounded-3xl overflow-hidden relative shadow-premium flex items-center justify-center animate-fade-in group">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
          <img
            key={currentStepData.image}
            alt={currentStepData.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 animate-fade-in"
            src={currentStepData.image}
          />
          <div className="absolute bottom-10 left-10 z-20 glass-card px-6 py-4 rounded-2xl flex items-center gap-4 border border-white/40">
            <span className="material-symbols-outlined text-primary text-3xl">{currentStepData.icon}</span>
            <span className="font-bold text-slate-800 dark:text-white uppercase tracking-widest text-sm">Step {currentStep} Visual</span>
          </div>
        </div>

        {/* Right Side: Information & Navigation */}
        <div className="flex flex-col gap-8 h-full">
          {/* Main Info Card */}
          <div className="flex-1 glass-card rounded-3xl shadow-premium p-10 flex flex-col overflow-hidden animate-fade-in-up">
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-xs font-bold text-primary dark:text-primary-light uppercase tracking-[0.3em] mb-3">Procedure Guide</p>
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {currentStepData.title}
                </h2>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-4xl font-black text-primary/10 dark:text-primary/20 leading-none">0{currentStep}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stage</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center py-6">
              <div className="bg-white/60 dark:bg-slate-800/60 rounded-3xl p-8 border-2 border-primary/20 dark:border-primary/30 shadow-xl backdrop-blur-md">
                <div className="flex gap-6 items-start">
                  <div className="bg-primary p-4 rounded-xl text-white shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-2xl">lightbulb</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">操作指引</h3>
                    <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {currentStepData.instruction}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step Progress indicators at the bottom of card */}
            <div className="mt-auto space-y-6">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-400">
                <span>Progress</span>
                <span>{Math.round((currentStep / steps.length) * 100)}% Complete</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-700 ease-out shadow-[0_0_10px_rgba(52,130,185,0.5)]"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Bottom Button Bar */}
          <div className="flex items-center gap-6 animate-fade-in-up delay-200">
            <button
              onClick={handlePrev}
              className="btn-secondary h-16 flex-1 justify-center group"
            >
              <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">chevron_left</span>
              <span>上一步</span>
            </button>
            <button
              onClick={handleNext}
              className="btn-primary h-16 flex-[2] justify-center group shadow-xl shadow-primary/20"
            >
              <span className="text-lg">
                {currentStep === 4 ? '確認連接，開始抽吸' : '下一步'}
              </span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                {currentStep === 4 ? 'play_arrow' : 'chevron_right'}
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

export default Page2
