'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Target, CheckCircle2, BookOpen, Brain, ListChecks, ArrowRight, ChevronDown, Star, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        if (window.scrollY > 300) {
          setShowBackToTop((prev) => (prev ? prev : true));
        } else {
          setShowBackToTop((prev) => (!prev ? prev : false));
        }
        scrollTimeout = undefined as any;
      }, 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { question: "ซื้อแล้วดูได้นานแค่ไหน?", answer: "เข้าได้ตลอด ไม่มีหมดอายุ" },
    { question: "เหมาะกับคนที่อังกฤษไม่แข็งไหม?", answer: "เหมาะมาก เพราะเขียนแบบภาษาพูด ไม่ต้องมีพื้นฐานอะไรพิเศษ" },
    { question: "จ่ายเงินยังไง?", answer: "โอนผ่าน PromptPay แล้วแคปสลิปอัพโหลด รับโค้ดเข้าเรียนได้เลย" },
    { question: "ถ้าจ่ายแล้วมีปัญหาติดต่อใครได้?", answer: "ทักมาได้เลยที่ช่องทางติดต่อด้านล่าง (Line OA / Facebook Page)" }
  ];

  const painPoints = [
    { text: "เปิดหนังสือแล้วหลับ อ่านไม่จบสักที", seed: "Bella" },
    { text: "ไม่รู้จะเริ่มอ่านจากตรงไหนก่อน", seed: "Mia" },
    { text: "ทำข้อสอบเก่าแล้วยังไม่เข้าใจว่าผิดเพราะอะไร", seed: "Lily" }
  ];

  const solutions = [
    "ภาษาพูด ไม่มีศัพท์วิชาการให้งง",
    "ซอยสั้น อ่านจบแต่ละตอนใน 3 นาที",
    "ครบทั้ง 4 Part ของข้อสอบจริง",
    "มี Mock Exam + AI คู่หูช่วยวิเคราะห์จุดอ่อน",
    "จ่ายครั้งเดียว เข้าได้ตลอด ไม่มีหมดอายุ"
  ];

  const courseStructure = [
    { title: "Conversation", desc: "พูดคุยทั่วไป ทักทาย ถามตอบ", icon: <BookOpen className="w-8 h-8 text-[#1B2A4A]" /> },
    { title: "Vocabulary", desc: "คำศัพท์สำคัญ เทคนิคจำแบบไม่ลืม", icon: <ListChecks className="w-8 h-8 text-[#1B2A4A]" /> },
    { title: "Reading", desc: "อ่านเร็ว จับใจความ ไม่แปลทั้งดุ้น", icon: <Target className="w-8 h-8 text-[#1B2A4A]" /> },
    { title: "Structure", desc: "ไวยากรณ์ที่ออกสอบจริง ไม่มีนอกเรื่อง", icon: <Brain className="w-8 h-8 text-[#1B2A4A]" /> }
  ];

  const testimonials = [
    { text: "อ่านง่ายมาก ไม่น่าเบื่อเลย อ่านจบทั้งคอร์สภายใน 2 วัน", name: "น้องปลา", detail: "สอบผ่าน ก.พ. 68" },
    { text: "Part 3 เคยพังมาตลอด พอมาอ่านที่นี่เข้าใจเลยว่าต้องอ่านยังไง", name: "พี่โอ๋", detail: "ข้าราชการ กระทรวงการคลัง" },
    { text: "AI ช่วยบอกว่าจุดอ่อนตัวเองอยู่ตรงไหน ดีกว่าทำข้อสอบเองแล้วไม่รู้ว่าผิดอะไร", name: "น้องมิ้ว", detail: "นักศึกษาปี 4" }
  ];

  return (
    <div className="min-h-screen bg-white text-[#1B2A4A] selection:bg-[#C9A84C] selection:text-white overflow-x-hidden">
      {/* 1. Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#C9A84C]/20 shadow-sm smooth-scroll"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <BookOpen className="w-8 h-8 text-[#C9A84C] drop-shadow-sm" />
            </motion.div>
            <span className="font-bold text-2xl tracking-tight uppercase">
              <span className="text-[#C9A84C] drop-shadow-sm">ENG KP</span> <span className="text-[#1B2A4A]">KILLER</span>
            </span>
          </Link>
          <Link href="/payment">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(201,168,76,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex bg-gradient-to-r from-[#C9A84C] to-[#E5C870] text-white font-bold py-2.5 px-6 rounded-full transition-all duration-300 items-center gap-2 shadow-sm"
            >
              สมัครเลย
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </motion.nav>

      <main>
        {/* 2. Hero Section */}
        <section className="pt-24 pb-32 px-4 md:px-6 text-center max-w-4xl mx-auto relative overflow-visible">
          {/* Background decorations glowing */}
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-[#C9A84C]/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-[#1B2A4A]/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <motion.div 
            initial="hidden" 
            animate="visible"
            variants={staggerContainer}
            className="relative z-10"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 border border-[#C9A84C]/30 bg-[#C9A84C]/5 text-[#C9A84C] px-5 py-2 rounded-full mb-8 font-medium shadow-sm">
              <span className="text-xl animate-bounce">🔥</span> สอบ ก.พ. 69 ใกล้มาแล้ว!
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
              <span className="text-[#1B2A4A]">ฆ่าข้อสอบอังกฤษ ก.พ.</span><br className="hidden md:block"/> 
              <span className="text-[#C9A84C] drop-shadow-sm"> ให้ราบ ใน 1 คอร์ส</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-[#1B2A4A] mb-10 max-w-2xl mx-auto font-semibold leading-relaxed">
              ราคาเดียว ดูได้ตลอดชีพ จากคนสอบอังกฤษ ก.พ.<span className="text-[#C9A84C] font-bold drop-shadow-sm">ได้ 48 เต็ม 50</span>
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-6 mb-12">
              <div className="flex items-center gap-4 text-3xl md:text-5xl font-bold py-3 px-4">
                <span className="line-through text-gray-400 text-xl md:text-3xl font-normal decoration-red-500/70">590.-</span>
                <span className="text-[#C9A84C] drop-shadow-sm">199 บาท</span>
              </div>
              
              <Link href="/payment">
                <motion.div 
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(201,168,76,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#C9A84C] via-[#E5C870] to-[#C9A84C] text-white font-bold text-xl md:text-2xl py-4 px-12 rounded-full transition-all flex items-center justify-center gap-3 shadow-md cursor-pointer"
                >
                  สมัครเรียนเลย
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* 3. Pain Point Section */}
        <motion.section 
          id="pain-points" 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-24 bg-gray-50 px-4 md:px-6 relative border-y border-gray-100"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#1B2A4A]">
              รู้สึกแบบนี้ไหม?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {painPoints.map((point, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(27,42,74,0.1)", borderColor: "rgba(201,168,76,0.5)" }}
                  className="bg-white border border-gray-100 p-8 rounded-2xl flex flex-col items-center text-center shadow-sm transition-all cursor-default"
                >
                  <div className="w-24 h-24 flex items-center justify-center mb-6 bg-transparent">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${point.seed}&backgroundColor=transparent`} alt="Cute avatar" className="w-24 h-24 object-contain grayscale contrast-125 opacity-80 drop-shadow-sm" />
                  </div>
                  <p className="text-xl md:text-2xl font-medium text-gray-700">&quot;{point.text}&quot;</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 4. Solution Section */}
        <motion.section 
          id="solution" 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-24 px-4 md:px-6"
        >
          <div className="max-w-4xl mx-auto border border-[#C9A84C]/30 bg-gradient-to-b from-[#C9A84C]/5 to-transparent p-8 md:p-12 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-500">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center mb-12 flex flex-col items-center gap-4 text-[#C9A84C] drop-shadow-sm">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <BookOpen className="w-16 h-16 text-[#C9A84C]" />
              </motion.div>
              ENG KP Killer ต่างจากที่อื่นยังไง?
            </motion.h2>
            <div className="space-y-6 max-w-2xl mx-auto">
              {solutions.map((solution, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ x: 10, backgroundColor: "rgba(201,168,76,0.05)" }}
                  className="flex items-start gap-4 p-4 rounded-xl transition-colors cursor-default"
                >
                  <CheckCircle2 className="w-8 h-8 text-[#C9A84C] shrink-0 mt-1" />
                  <p className="text-xl md:text-2xl text-[#1B2A4A] font-medium">{solution}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 5. Course Structure Section */}
        <motion.section 
          id="content" 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-24 bg-gray-50 px-4 md:px-6 border-y border-gray-100 relative overflow-hidden"
        >
          {/* Subtle glow in background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-[#C9A84C]/5 blur-[100px] pointer-events-none"></div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#1B2A4A]">
              เนื้อหาในคอร์ส
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {courseStructure.map((module, index) => (
                <Link href="/learn" key={index} className="block">
                  <motion.div 
                    variants={fadeInUp}
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: "0 10px 30px rgba(201,168,76,0.1)",
                      borderColor: "rgba(201,168,76,0.5)"
                    }}
                    className="group relative bg-white border border-gray-200 p-8 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-sm h-full"
                  >
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-[#C9A84C] to-[#E5C870] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl flex items-center gap-1.5 opacity-90 group-hover:opacity-100 shadow-sm">
                      <span>🔒</span> ดูตัวอย่างฟรี
                    </div>
                    <motion.div 
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="w-16 h-16 bg-gradient-to-br from-[#E5C870] to-[#C9A84C] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow text-white"
                    >
                      {module.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3 text-[#1B2A4A]">Part {index + 1}: {module.title}</h3>
                    <p className="text-lg text-gray-600 font-medium">{module.desc}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 6. Social Proof Section */}
        <motion.section 
          id="reviews" 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-24 px-4 md:px-6 relative"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#C9A84C] drop-shadow-sm">
              เสียงจากคนที่ผ่านแล้ว
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((review, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  whileHover={{ y: -10, boxShadow: "0 15px 35px rgba(27,42,74,0.08)", borderColor: "rgba(201,168,76,0.3)" }}
                  className="bg-white border border-gray-100 p-8 rounded-2xl relative shadow-sm cursor-default transition-all"
                >
                  <div className="flex gap-1 mb-6 text-[#C9A84C]">
                    {[...Array(5)].map((_, i) => (
                      <motion.div key={i} whileHover={{ scale: 1.3, rotate: 10 }}>
                        <Star className="w-6 h-6 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-lg md:text-xl text-gray-700 mb-8 italic leading-relaxed">&quot;{review.text}&quot;</p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#C9A84C] to-[#E5C870] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-sm">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-[#1B2A4A] text-lg">{review.name}</p>
                      <p className="text-sm text-gray-500">{review.detail}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 7. Pricing Section */}
        <motion.section 
          id="pricing" 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-24 bg-gray-50 px-4 md:px-6 relative border-y border-gray-100"
        >
          {/* Glowing backdrops */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C9A84C]/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="max-w-md mx-auto relative z-10 bg-[#1B2A4A] border-2 border-[#C9A84C] rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(27,42,74,0.2)] hover:shadow-[0_25px_60px_rgba(27,42,74,0.3)] transition-shadow duration-500 text-white">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#C9A84C] to-[#E5C870] text-white font-bold px-6 py-2 rounded-full whitespace-nowrap shadow-md">
              ราคาพิเศษ เฉพาะช่วงก่อนสอบ
            </div>
            
            <div className="text-center mt-6 mb-8">
              <p className="text-gray-400 text-2xl line-through mb-2 decoration-red-500/70">590 บาท</p>
              <h3 className="text-6xl md:text-7xl font-extrabold text-[#C9A84C] tracking-tight drop-shadow-sm">
                199.-
              </h3>
              <p className="text-white mt-4 text-lg font-medium">จ่ายครั้งเดียว เข้าถึงได้ตลอดชีพ</p>
            </div>

            <div className="space-y-5 mb-10 border-t border-white/20 pt-8">
              {['เนื้อหา 4 Parts ครบจบ', 'Mock Exam จำลองสอบจริง', 'AI คู่หูช่วยวิเคราะห์จุดอ่อน', 'เข้าได้ตลอด ไม่มีหมดอายุ'].map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-7 h-7 text-[#C9A84C] shrink-0" />
                  <p className="text-lg text-white font-medium">{item}</p>
                </motion.div>
              ))}
            </div>

            <Link href="/payment" className="block w-full">
              <motion.div 
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(201,168,76,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-[#C9A84C] via-[#E5C870] to-[#C9A84C] text-white font-bold text-xl py-5 px-8 rounded-2xl flex justify-center items-center gap-2 shadow-md cursor-pointer"
              >
                สมัครเรียนเลย
              </motion.div>
            </Link>
          </div>
        </motion.section>

        {/* 8. FAQ Section */}
        <motion.section 
          id="faq" 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-24 px-4 md:px-6 bg-white"
        >
          <div className="max-w-3xl mx-auto">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#1B2A4A]">
              คำถามที่พบบ่อย
            </motion.h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className={`border ${openFaq === index ? 'border-[#C9A84C] shadow-md' : 'border-gray-200'} bg-white rounded-2xl overflow-hidden transition-all duration-300`}
                >
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
                  >
                    <span className={`text-lg md:text-xl font-bold pr-8 ${openFaq === index ? 'text-[#C9A84C]' : 'text-[#1B2A4A]'}`}>
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className={`w-6 h-6 shrink-0 ${openFaq === index ? 'text-[#C9A84C]' : 'text-gray-400'}`} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6"
                      >
                        <p className="text-gray-600 text-lg leading-relaxed pb-6 pt-2 border-t border-gray-100 font-medium">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>

      {/* 9. Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-14 px-4 md:px-6 relative overflow-hidden">
        {/* Glow behind footer logo */}
        <div className="absolute top-1/2 left-10 w-32 h-32 bg-[#C9A84C]/10 rounded-full blur-[50px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left relative z-10">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-[#C9A84C]" />
            <span className="font-bold text-2xl tracking-tight uppercase">
              <span className="text-[#C9A84C]">ENG KP</span> <span className="text-[#1B2A4A]">KILLER</span>
            </span>
          </div>
          
          <div className="flex gap-8 text-gray-500 font-medium">
            <motion.span whileHover={{ scale: 1.05, color: "#C9A84C" }} className="cursor-pointer transition-colors">Line OA: @ENGKPKILLER</motion.span>
            <motion.span whileHover={{ scale: 1.05, color: "#C9A84C" }} className="cursor-pointer transition-colors">Facebook Page</motion.span>
          </div>
          
          <p className="text-gray-400 text-sm font-medium">
            © {new Date().getFullYear()} ENG KP Killer. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 bg-[#1B2A4A] text-white rounded-full shadow-lg hover:bg-[#2A3F6D] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2"
            aria-label="Back to top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
