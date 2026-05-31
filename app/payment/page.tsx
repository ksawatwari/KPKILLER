'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft, Upload, Check, Copy, AlertCircle, Smartphone, CheckCircle2, ChevronRight, FileImage } from 'lucide-react';

export default function PaymentPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [shake, setShake] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [settings, setSettings] = useState({
    isOpen: true,
    courseName: 'ENG KP KILLER',
    specialPrice: '199',
    accountName: 'นาย สมมติ รักเรียน',
    accountNumber: '099-XXX-XXXX',
    qrCodeImg: ''
  });

  React.useEffect(() => {
    const saved = localStorage.getItem('kp_killer_settings');
    if (saved) {
      // eslint-disable-next-line
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleNextStep1 = () => {
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
        setError('');
      } else {
        setError('กรุณาอัพโหลดไฟล์รูปภาพ (jpg/png) เท่านั้น');
        triggerShake();
      }
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !file) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วนและแนบสลิป');
      triggerShake();
      return;
    }
    // Form is valid
    setError('');
    setStep(3);
    window.scrollTo(0, 0);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('KP69-A1B2-C3D4').then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    });
  };

  const steps = [
    { num: 1, title: 'สแกนจ่าย' },
    { num: 2, title: 'อัพโหลดสลิป' },
    { num: 3, title: 'รับโค้ด' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-[#1B2A4A] selection:bg-[#C9A84C] selection:text-white">
      {/* Navbar Minimal */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
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

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {!settings.isOpen ? (
          <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-[#1B2A4A] mb-4">ปิดรับสมัครชั่วคราว</h1>
            <p className="text-gray-500 mb-8">ขณะนี้ยังไม่เปิดรับชำระเงิน กรุณาติดตามประกาศหน้าแฟนเพจ</p>
            <Link href="/" className="inline-flex items-center justify-center bg-[#C9A84C] hover:bg-[#b09340] text-white font-bold py-3 px-8 rounded-full transition-colors shadow-sm gap-2">
              <ArrowLeft className="w-5 h-5" />
              กลับหน้าหลัก
            </Link>
          </div>
        ) : (
          <>
            {/* Step Indicator */}
            <div className="mb-10">
              <div className="flex items-center justify-between max-w-2xl mx-auto relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#C9A84C] -z-10 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${((step - 1) / 2) * 100}%` }}
                ></div>
                
                {steps.map((s, i) => (
                  <div key={s.num} className="flex flex-col items-center gap-2 bg-gray-50 px-2">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                        step >= s.num 
                          ? 'bg-[#C9A84C] text-white shadow-md' 
                          : 'bg-white text-gray-400 border-2 border-gray-200'
                      }`}
                    >
                      {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                    </div>
                    <span className={`text-xs md:text-sm font-medium ${step >= s.num ? 'text-[#1B2A4A]' : 'text-gray-400'}`}>
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Container */}
            <div className="max-w-lg mx-auto">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center"
                  >
                    <h1 className="text-2xl font-bold mb-6 text-[#1B2A4A]">สแกน QR เพื่อชำระเงิน</h1>
                    
                    <div className="bg-[#1B2A4A] text-white w-64 h-64 mx-auto rounded-2xl flex flex-col items-center justify-center gap-4 mb-6 relative overflow-hidden shadow-md">
                      {/* Decorative corners for QR feel */}
                      <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-white/30 rounded-tl-lg"></div>
                      <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-white/30 rounded-tr-lg"></div>
                      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-white/30 rounded-bl-lg"></div>
                      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-white/30 rounded-br-lg"></div>
                      
                      {settings.qrCodeImg ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={settings.qrCodeImg} alt="QR Code" className="w-[85%] h-[85%] object-contain" />
                      ) : (
                        <>
                          <Smartphone className="w-16 h-16 text-[#C9A84C]" />
                          <p className="font-mono text-gray-300 uppercase tracking-widest text-sm">[ QR PromptPay ]</p>
                        </>
                      )}
                    </div>
                    
                    <div className="space-y-2 mb-8 bg-gray-50 p-4 rounded-xl">
                      <p className="text-gray-500 font-medium text-sm">ชื่อบัญชี: <span className="text-[#1B2A4A] font-semibold">{settings.accountName}</span></p>
                      <p className="text-gray-500 font-medium text-sm">พร้อมเพย์: <span className="text-[#1B2A4A] font-semibold">{settings.accountNumber}</span></p>
                      <div className="pt-3 mt-3 border-t border-gray-200">
                        <p className="text-gray-500 font-medium text-sm">ยอดที่ต้องชำระ</p>
                        <p className="text-4xl font-extrabold text-[#C9A84C] mt-1">{settings.specialPrice}.-</p>
                      </div>
                    </div>

                    <button 
                      onClick={handleNextStep1}
                      className="w-full bg-[#C9A84C] hover:bg-[#b09340] text-white font-bold py-4 px-8 rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      โอนแล้ว ไปอัพโหลดสลิป
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  x: shake ? [-10, 10, -10, 10, 0] : 0
                }}
                transition={{ duration: shake ? 0.4 : 0.3 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
              >
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-[#1B2A4A] mb-2">อัพโหลดสลิปการโอนเงิน</h1>
                  <p className="text-gray-500 font-medium">กรุณากรอกข้อมูลให้ครบ เพื่อรับโค้ดเข้าเรียน</p>
                </div>
                
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 text-sm font-medium border border-red-100"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อ-นามสกุล</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="กรอกชื่อและนามสกุล"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">เบอร์โทรศัพท์</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="กรอกเบอร์โทรศัพท์ 10 หลัก"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">หลักฐานการโอนเงิน</label>
                    
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg" 
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />

                    {!previewUrl ? (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-200 rounded-2xl p-8 hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-colors cursor-pointer flex flex-col items-center justify-center text-center gap-3 bg-gray-50"
                      >
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400">
                          <Upload className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#1B2A4A]">คลิกหรือลากไฟล์สลิปมาวางที่นี่</p>
                          <p className="text-gray-400 text-sm mt-1">รองรับไฟล์ JPG, PNG</p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50 flex justify-center p-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={previewUrl} alt="Slip preview" className="max-h-64 object-contain rounded-lg" />
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                            setPreviewUrl(null);
                          }}
                          className="absolute top-2 right-2 bg-white/90 backdrop-blur text-red-500 p-2 rounded-full shadow-sm hover:bg-red-50 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full bg-[#C9A84C] hover:bg-[#b09340] text-white font-bold py-4 px-8 rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      ส่งสลิป และรับโค้ด
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <p className="text-center text-sm text-gray-500 font-medium mt-4 flex items-center justify-center gap-1">
                      <span className="text-[#C9A84C]">⚡</span> รับโค้ดได้เลยหลังส่งสลิป
                    </p>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </motion.div>
                </div>
                
                <h1 className="text-3xl font-bold text-[#1B2A4A] mb-2">🎉 ได้รับโค้ดแล้ว!</h1>
                <p className="text-gray-500 font-medium mb-8">นำโค้ดด้านล่างไปกรอกที่หน้าปลดล็อกเนื้อหา</p>
                
                <div className="bg-[#1B2A4A] rounded-2xl p-6 mb-6 shadow-md relative overflow-hidden group">
                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                  
                  <p className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wide">Activation Code</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#C9A84C] tracking-widest font-mono mb-6">
                    KP69-XXXX-XXXX
                  </p>
                  
                  <button 
                    onClick={copyToClipboard}
                    className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      isCopied 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-5 h-5" />
                        คัดลอกแล้ว!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        คัดลอกโค้ด
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex gap-3 text-left mb-8">
                  <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-yellow-800">
                    <span className="font-bold text-yellow-900">คำเตือน:</span> กรุณาบันทึกหรือคัดลอกโค้ดนี้ไว้ เพราะจะแสดงเพียงครั้งเดียวเท่านั้น
                  </p>
                </div>
                
                <Link href="/unlock" className="block">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#1B2A4A] text-white font-bold py-4 px-8 rounded-full transition-shadow hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    ไปกรอกโค้ดเพื่อเข้าเรียน
                    <ChevronRight className="w-5 h-5 text-[#C9A84C]" />
                  </motion.div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </>
        )}
      </main>
    </div>
  );
}
