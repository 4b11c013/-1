import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function SettingsModal({ isOpen, onClose }) {
    const modalRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose()
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen, onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />

                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20 dark:border-white/5"
                    >
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">系統設定</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">System Settings</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors"
                            >
                                <span className="material-symbols-outlined text-slate-500">close</span>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-8">
                            {/* Sound Setting */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-2xl">volume_up</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 dark:text-slate-200">系統提示音</p>
                                        <p className="text-xs text-slate-400">操作完成時的音效回饋</p>
                                    </div>
                                </div>
                                <div className="w-14 h-7 bg-primary rounded-full relative p-1 cursor-pointer">
                                    <div className="w-5 h-5 bg-white rounded-full shadow-sm absolute right-1"></div>
                                </div>
                            </div>

                            {/* Language Setting */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-amber-500 text-2xl">language</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 dark:text-slate-200">介面語言</p>
                                        <p className="text-xs text-slate-400">當前：繁體中文</p>
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300">
                                    更改
                                </button>
                            </div>

                            {/* Brightness Simulation */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-sky-500 text-2xl">light_mode</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 dark:text-slate-200">面版亮度</p>
                                        <p className="text-xs text-slate-400">模擬機器顯示屏亮度</p>
                                    </div>
                                </div>
                                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                                    <div className="absolute inset-y-0 left-0 w-3/4 bg-primary shadow-[0_0_10px_rgba(52,130,185,0.5)]"></div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-8 py-6 bg-slate-50 dark:bg-slate-800/50 flex justify-end">
                            <button
                                onClick={onClose}
                                className="btn-primary py-2 px-8 text-sm"
                            >
                                完成
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default SettingsModal
