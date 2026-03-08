import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AIChatModal from '../components/AIChatModal'

function Page3() {
  const [currentStep, setCurrentStep] = useState(2)
  const [canFeed, setCanFeed] = useState(false)
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)
  const navigate = useNavigate()
  const hasNavigatedRef = useRef(false)

  useEffect(() => {
    window.showHelp = () => setIsAIChatOpen(true)
    document.body.style.opacity = '1'
  }, [])

  // 當分析狀態改變時，更新進度名稱
  useEffect(() => {
    let progressName = '抽取與辨識分析中'
    if (currentStep === 4) {
      progressName = canFeed ? '辨識完成：可餵食' : '辨識完成：不建議餵食'
    }

    localStorage.setItem('care_progress', JSON.stringify({
      path: '/page3',
      name: progressName,
      step: currentStep,
      canFeed: canFeed
    }))
  }, [currentStep, canFeed])

  useEffect(() => {
    console.log('Page3: 組件已載入，開始計時器')

    // Process timeline
    const t1 = setTimeout(() => {
      console.log('Page3: 移動到步驟 3')
      setCurrentStep(3)
    }, 3000)

    let jumpTimer = null
    const t2 = setTimeout(() => {
      const isSuccess = Math.random() > 0.5 // 50/50 成功機率
      console.log(`Page3: 移動到步驟 4，分析結果: ${isSuccess ? '成功' : '失敗'}`)

      setCurrentStep(4)
      setCanFeed(isSuccess)

      // 只有在成功的情況下才執行自動跳轉
      if (isSuccess) {
        jumpTimer = setTimeout(() => {
          if (hasNavigatedRef.current) return
          hasNavigatedRef.current = true

          document.body.style.transition = 'opacity 0.6s ease-in-out'
          document.body.style.opacity = '0'

          setTimeout(() => {
            navigate('/page4', { replace: false })
            setTimeout(() => {
              document.body.style.opacity = '1'
            }, 50)
          }, 600)
        }, 2000) // 延長一點時間讓用戶看清楚打勾
      }
    }, 7000)

    return () => {
      console.log('Page3: 清理計時器')
      clearTimeout(t1)
      clearTimeout(t2)
      if (jumpTimer) {
        clearTimeout(jumpTimer)
      }
    }
  }, [navigate]) // 需要 navigate 依賴

  // 監聽 canFeed 變化，確認狀態更新
  useEffect(() => {
    console.log('Page3: canFeed 狀態變化', { canFeed, currentStep })
  }, [canFeed, currentStep])

  const steps = [
    { id: 1, title: '準備抽取胃液', status: 'completed' },
    { id: 2, title: '抽取進行中', status: currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : 'pending' },
    { id: 3, title: '辨識胃液成分', status: currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : 'pending', subSteps: ['胃液量檢測', 'pH值分析'] },
    {
      id: 4,
      title: canFeed ? '辨識完成：可以餵食' : '等待辨識結果',
      status: canFeed ? 'completed' : (currentStep === 4 ? 'active' : 'pending')
    }
  ]

  // 調試：確認步驟4的狀態
  console.log('Page3: 步驟4狀態', {
    canFeed,
    currentStep,
    step4Status: steps[3].status,
    step4Title: steps[3].title
  })

  return (
    <div className="bg-background-light dark:bg-background-dark h-screen flex flex-col font-sans transition-colors duration-500 overflow-hidden">
      <Header showTime={true} />

      <main className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden max-w-[1600px] mx-auto w-full">
        {/* Left Side: Medical Visualization */}
        <div className="glass-card rounded-3xl overflow-hidden relative shadow-premium flex items-center justify-center animate-fade-in group">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent z-10"></div>
          <img
            alt="Stomach Analysis"
            className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
            src="/胃.jpg"
          />

          {/* HUD Overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center">
            <div className="w-64 h-64 border-2 border-primary/20 rounded-full animate-[spin_10s_linear_infinite] border-t-primary/60"></div>
            <div className="absolute w-48 h-48 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
          </div>

          <div className="absolute bottom-10 left-10 z-20 glass-card px-6 py-4 rounded-2xl flex items-center gap-4 border border-white/40">
            <span className="material-symbols-outlined text-primary text-3xl animate-pulse">monitoring</span>
            <span className="font-bold text-slate-800 dark:text-white uppercase tracking-widest text-sm">Real-time Analysis</span>
          </div>
        </div>

        {/* Right Side: Analysis Data */}
        <div className="relative glass-card rounded-3xl shadow-premium transition-all duration-500 flex flex-col h-full animate-fade-in-up">
          <div className="p-8 pb-0">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-primary dark:text-primary-light uppercase tracking-[0.3em] mb-3">Diagnostic System</p>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {currentStep < 4 ? '辨識與分析中' : (canFeed ? '分析完成' : '不建議餵食')}
                </h2>
              </div>
              {currentStep === 4 && (
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full border animate-fade-in ${canFeed
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                  }`}>
                  <span className={`w-2 h-2 rounded-full animate-pulse ${canFeed ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{canFeed ? 'Ready' : 'Warning'}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col p-8 min-h-0">
            <div className="flex flex-col justify-start items-center flex-1 pt-4">
              <div className="w-full max-w-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border-2 border-primary/20 dark:border-primary/30">
                <div className="space-y-8">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-6 relative">
                      {/* Timeline Connector */}
                      {index < steps.length - 1 && (
                        <div className={`absolute left-4 top-8 w-[2px] bottom-[-32px] -z-10 transition-colors duration-1000 ${step.status === 'completed' ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
                          }`}></div>
                      )}

                      <div className="flex-shrink-0 relative z-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${step.status === 'completed' ? (index === 3 && !canFeed ? 'bg-rose-500 text-white scale-110' : 'bg-primary text-white scale-110') :
                          step.status === 'active' ? 'bg-primary/20 text-primary border border-primary/50 animate-pulse' :
                            'bg-slate-100 dark:bg-slate-800 text-slate-400'
                          }`}>
                          <span className="material-symbols-outlined text-lg">
                            {step.status === 'completed' ? (index === 3 && !canFeed ? 'warning' : 'check') : step.status === 'active' ? 'refresh' : 'pending'}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 pt-0.5">
                        <p className={`text-xl font-bold tracking-tight transition-colors duration-500 ${step.status === 'completed' ? (index === 3 && !canFeed ? 'text-rose-500' : 'text-slate-400 line-through decoration-primary/30') :
                          step.status === 'active' ? 'text-slate-900 dark:text-white' :
                            'text-slate-400'
                          }`}>
                          {index === 3 ? (currentStep < 4 ? '等待辨識結果' : (canFeed ? '辨識完成：可以餵食' : '辨識完成：不建議餵食')) : step.title}
                        </p>

                        {step.subSteps && step.status === 'active' && (
                          <div className="flex gap-3 mt-4 animate-fade-in">
                            {step.subSteps.map((sub, idx) => (
                              <div key={idx} className="bg-primary/5 border border-primary/10 rounded-lg px-4 py-2 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                <span className="text-xs font-bold text-primary uppercase tracking-widest">{sub}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning Message Card */}
              {currentStep === 4 && !canFeed && (
                <div className="mt-8 w-full max-w-2xl bg-rose-50 dark:bg-rose-900/10 border-2 border-rose-500/20 rounded-2xl p-6 animate-fade-in">
                  <div className="flex gap-4">
                    <div className="bg-rose-500 p-4 rounded-xl text-white shadow-lg shadow-rose-500/20">
                      <span className="material-symbols-outlined text-3xl">error</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-rose-700 dark:text-rose-400 mb-2">診斷建議</h4>
                      <p className="text-xl text-rose-600 dark:text-rose-400/80 leading-relaxed font-bold">
                        檢測到殘餘胃液量過多或 pH 值異常。為避免吸入性肺炎風險，請暫緩餵食並諮詢專業醫護人員。
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto pt-8 pb-4 w-full">
            <div className="flex items-center justify-between gap-6 px-4">
              <button
                onClick={() => navigate('/page2')}
                className="btn-secondary h-16 flex-1 group"
              >
                <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">chevron_left</span>
                <span>重新開始</span>
              </button>

              <div className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">
                  {canFeed ? '正在自動導航...' : '檢測狀態停止'}
                </span>
                <div className="flex gap-1.5">
                  <div className={`w-8 h-1 rounded-full transition-all duration-700 ${currentStep >= 1 ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`} />
                  <div className={`w-8 h-1 rounded-full transition-all duration-700 ${currentStep >= 3 ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`} />
                  <div className={`w-8 h-1 rounded-full transition-all duration-700 ${currentStep >= 4 ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`} />
                </div>
              </div>

              <button
                onClick={() => {
                  if (canFeed) {
                    document.body.style.transition = 'opacity 0.6s ease-in-out'
                    document.body.style.opacity = '0'
                    setTimeout(() => {
                      navigate('/page4')
                      document.body.style.opacity = '1'
                    }, 600)
                  }
                }}
                className={`btn-primary h-16 flex-[1.5] group ${!canFeed && 'opacity-30 pointer-events-none'}`}
              >
                <span>下一步</span>
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AIChatModal isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </div>
  )
}

export default Page3
