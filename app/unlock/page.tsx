'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft, Key, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export default function UnlockPage() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [shake, setShake] = useState(false);
  const [confetti, setConfetti] = useState<{left: number, color: string, duration: number, delay: number}[]>([]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setStatus('loading');
    
    setTimeout(() => {
      if (code.trim().toUpperCase().startsWith('KP')) {
        const colors = ['#C9A84C', '#E5C870', '#1B2A4A', '#4ADE80'];
        const items = Array.from({ length: 40 }).map(() => ({
          left: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: 1 + Math.random() * 2.5,
          delay: Math.random() * 1.5
        }));
        setConfetti(items);
        setStatus('success');
      } else {
        setStatus('error');
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value.toUpperCase());
    if (status === 'error') {
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-[#1B2A4A] selection:bg-[#C9A84C] selection:text-white flex flex-col relative overflow-hidden">
      {/* Navbar Minimal */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shrink-0">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-[#1B2A4A] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">กลับหน้าหลัก</span>
          </Link>
          <span className="font-bold text-xl tracking-tight uppercase">
            <span className="text-[#C9A84C]">ENG KP</span> <span className="text-[#1B2A4A]">KILLER</span>
          </span>
        </div>
      </nav>

      {/* Confetti Animation (CSS only) */}
      {status === 'success' && confetti.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
           {confetti.map((item, i) => (
             <div
               key={i}
               className="absolute w-3 h-3 rounded-sm opacity-0"
               style={{
                 left: `${item.left}%`,
                 top: `-20px`,
                 backgroundColor: item.color,
                 animation: `confetti-fall ${item.duration}s linear forwards`,
                 animationDelay: `${item.delay}s`
               }}
             />
           ))}
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}} />

      <main className="flex-1 flex flex-col items-center justify-center p-4 z-10 w-full mb-16 md:mb-0">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h1 className="text-3xl font-bold text-[#1B2A4A] mb-2">ปลดล็อกสำเร็จ!</h1>
                  <p className="text-gray-500 font-medium mb-8">ยินดีต้อนรับสู่ ENG KP Killer 🎉</p>
                  
                  <Link href="/learn" className="block">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#C9A84C] hover:bg-[#b09340] text-white font-bold py-4 px-8 rounded-full transition-shadow hover:shadow-lg flex items-center justify-center gap-2 shadow-sm"
                    >
                      เข้าเรียนได้เลย
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Key className="w-10 h-10 text-[#C9A84C]" />
                  </div>
                  <h1 className="text-2xl font-bold text-[#1B2A4A] mb-2">กรอกโค้ดเพื่อเข้าเรียน</h1>
                  <p className="text-gray-500 font-medium mb-8 text-sm md:text-base">นำโค้ดที่ได้รับหลังชำระเงินมากรอกด้านล่าง</p>
                  
                  <form onSubmit={handleUnlock}>
                    <motion.div
                      animate={{ x: shake ? [-10, 10, -10, 10, 0] : 0 }}
                      transition={{ duration: shake ? 0.4 : 0.3 }}
                      className="mb-8"
                    >
                      <input
                        type="text"
                        value={code}
                        onChange={handleInputChange}
                        disabled={status === 'loading'}
                        placeholder="เช่น KP69-XXXX-XXXX"
                        className={`w-full px-6 py-4 rounded-xl border-2 text-center text-xl md:text-2xl tracking-widest font-mono font-bold uppercase transition-all bg-gray-50 focus:bg-white outline-none placeholder:tracking-normal placeholder:font-sans placeholder:font-medium placeholder:text-gray-300 ${
                           status === 'error' 
                             ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-4 focus:ring-red-500/20' 
                             : 'border-gray-200 text-[#1B2A4A] focus:border-[#C9A84C] focus:ring-4 focus:ring-[#C9A84C]/20'
                        }`}
                      />
                      {status === 'error' && (
                        <p className="text-red-500 text-sm font-medium mt-3">
                          โค้ดไม่ถูกต้องหรือถูกใช้งานแล้ว กรุณาตรวจสอบอีกครั้ง
                        </p>
                      )}
                    </motion.div>
                    
                    <button
                      type="submit"
                      disabled={status === 'loading' || !code.trim()}
                      className="w-full bg-[#C9A84C] hover:bg-[#b09340] disabled:opacity-70 disabled:hover:bg-[#C9A84C] text-white font-bold py-4 px-8 rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          กำลังตรวจสอบ...
                        </>
                      ) : (
                        "ปลดล็อกเนื้อหา 🔓"
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Bottom Links */}
          {status !== 'success' && (
            <div className="mt-8 flex flex-row items-center justify-center gap-4 text-sm font-medium">
              <Link href="/payment" className="text-gray-500 hover:text-[#C9A84C] transition-colors text-center">
                ยังไม่มีโค้ด?<br className="md:hidden" /> คลิกเพื่อชำระเงิน
              </Link>
              <div className="w-px h-8 bg-gray-300"></div>
              <a href="#" className="text-gray-500 hover:text-[#1B2A4A] transition-colors text-center">
                มีปัญหา?<br className="md:hidden" /> ติดต่อเรา
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
