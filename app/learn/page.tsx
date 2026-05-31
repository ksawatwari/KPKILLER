'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Lock, CheckCircle2, ChevronDown, ChevronRight, Lightbulb, Star, BookOpen, ArrowLeft, ArrowRight, LayoutDashboard } from 'lucide-react';

// --- Mock Data ---
type Lesson = { id: string; title: string; isFree: boolean };
type Part = { id: string; title: string; lessons: Lesson[] };

const COURSE_PARTS: Part[] = [
  { 
    id: '1', title: 'Part 1: Conversation', 
    lessons: [
      { id: '1-1', title: 'การทักทายและการตอบรับ', isFree: true },
      { id: '1-2', title: 'การถามทางและการบอกทาง', isFree: false },
      { id: '1-3', title: 'การซื้อขายและการต่อรอง', isFree: false },
      { id: '1-4', title: 'สถานการณ์ในที่ทำงาน', isFree: false },
    ]
  },
  { 
    id: '2', title: 'Part 2: Vocabulary', 
    lessons: [
      { id: '2-1', title: 'คำศัพท์หมวดการทำงาน', isFree: false },
      { id: '2-2', title: 'คำศัพท์หมวดท่องเที่ยว', isFree: false },
      { id: '2-3', title: 'Synonym ที่ออกสอบบ่อย', isFree: false },
      { id: '2-4', title: 'Phrasal Verb ต้องรู้', isFree: false },
    ]
  },
  { 
    id: '3', title: 'Part 3: Reading', 
    lessons: [
      { id: '3-1', title: 'เทคนิค Skimming', isFree: false },
      { id: '3-2', title: 'เทคนิค Scanning', isFree: false },
      { id: '3-3', title: 'การหา Main Idea', isFree: false },
      { id: '3-4', title: 'การตีความจาก Context', isFree: false },
    ]
  },
  { 
    id: '4', title: 'Part 4: Structure', 
    lessons: [
      { id: '4-1', title: 'Tenses ครบจบในตอนเดียว', isFree: false },
      { id: '4-2', title: 'If-Clause 4 แบบ', isFree: false },
      { id: '4-3', title: 'Active & Passive Voice', isFree: false },
      { id: '4-4', title: 'Subject-Verb Agreement', isFree: false },
    ]
  },
];

export default function LearnPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedParts, setExpandedParts] = useState<string[]>(['1']);
  const [currentLesson, setCurrentLesson] = useState<string>('1-1');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const isUnlocked = false; // Mock status

  const togglePart = (partId: string) => {
    setExpandedParts(prev => 
      prev.includes(partId) ? prev.filter(id => id !== partId) : [...prev, partId]
    );
  };

  // Flatten lessons for easy navigation
  const allLessons = useMemo(() => COURSE_PARTS.flatMap(p => p.lessons), []);
  const currentIndex = allLessons.findIndex(l => l.id === currentLesson);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const isLastLesson = currentIndex === allLessons.length - 1;

  const currentLessonData = allLessons[currentIndex];
  const isLocked = !isUnlocked && !currentLessonData?.isFree;

  const handleLessonChange = (lessonId: string) => {
    setCurrentLesson(lessonId);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex h-screen bg-white text-[#1B2A4A] overflow-hidden selection:bg-[#C9A84C] selection:text-white">
      
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div 
        className={`fixed md:static inset-y-0 left-0 w-72 md:w-80 bg-gray-50 border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 shrink-0 bg-white">
          <Link href="/" className="font-bold text-xl tracking-tight uppercase hover:opacity-80 transition-opacity">
            <span className="text-[#C9A84C]">ENG KP</span> <span className="text-[#1B2A4A]">KILLER</span>
          </Link>
          <button className="md:hidden text-gray-500" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-gray-200">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Link href="/" className="flex items-center justify-center gap-2 w-full bg-white border border-gray-200 hover:border-[#C9A84C] hover:text-[#C9A84C] text-gray-600 font-bold py-3 rounded-xl transition-all shadow-sm text-sm">
              <ArrowLeft className="w-4 h-4" />
              หน้าหลัก
            </Link>
            <Link href="/dashboard" className="flex items-center justify-center gap-2 w-full bg-[#1B2A4A] text-white hover:bg-[#2A3F6D] font-bold py-3 rounded-xl transition-all shadow-sm text-sm">
              <LayoutDashboard className="w-4 h-4 text-[#C9A84C]" />
              แดชบอร์ด
            </Link>
          </div>

          {COURSE_PARTS.map((part) => {
            const isExpanded = expandedParts.includes(part.id);
            const partLessons = part.lessons;
            const completedCount = partLessons.filter(l => completedLessons.includes(l.id)).length;
            const progress = (completedCount / partLessons.length) * 100;

            return (
              <div key={part.id} className="mb-4">
                <button 
                  onClick={() => togglePart(part.id)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 transition-colors text-left"
                >
                  <div>
                    <h2 className="font-bold text-[#1B2A4A] text-sm">{part.title}</h2>
                    <div className="w-full mt-2 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#C9A84C] h-full transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />}
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-1"
                    >
                      <div className="pr-2 pl-4 py-1 space-y-1 border-l-2 border-gray-100 ml-4">
                        {partLessons.map((lesson) => {
                          const isActive = currentLesson === lesson.id;
                          const isCompleted = completedLessons.includes(lesson.id);
                          const locked = !isUnlocked && !lesson.isFree;

                          return (
                            <button
                              key={lesson.id}
                              onClick={() => handleLessonChange(lesson.id)}
                              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-start gap-2 transition-colors ${
                                isActive 
                                  ? 'bg-[#C9A84C]/10 text-[#C9A84C] font-semibold' 
                                  : 'hover:bg-gray-100 text-gray-600'
                              }`}
                            >
                              <div className="shrink-0 mt-0.5">
                                {isCompleted ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                ) : locked ? (
                                  <Lock className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <BookOpen className={`w-4 h-4 ${isActive ? 'text-[#C9A84C]' : 'text-gray-400'}`} />
                                )}
                              </div>
                              <span className={`text-sm leading-tight ${isActive ? 'text-[#C9A84C]' : 'text-gray-700'}`}>
                                {lesson.title}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <div className="mt-8">
            <Link href="/mock-exam" className="w-full bg-[#1B2A4A] text-white font-bold py-4 rounded-xl shadow-md hover:bg-[#2A3F6D] transition-all flex items-center justify-center gap-2 group">
              ทดลองสอบ Mock Exam
              <ArrowRight className="w-5 h-5 text-[#C9A84C] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        
        {/* Topbar Mobile */}
        <div className="md:hidden h-16 flex items-center px-4 border-b border-gray-200 shrink-0 sticky top-0 bg-white/90 backdrop-blur z-30">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 mr-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold truncate text-[#1B2A4A]">{currentLessonData?.title}</span>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto relative scroll-smooth p-6 md:p-10 lg:p-16">
          <div className="max-w-3xl mx-auto pb-24">
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1B2A4A] mb-8 leading-tight">
              {currentLessonData?.title}
            </h1>

            {/* If Locked -> Show blurred preview + Overlay */}
            <div className={`relative transition-all duration-500 ${isLocked ? 'blur-sm select-none pointer-events-none grayscale-[0.3]' : ''}`}>
              
              {currentLesson === '1-1' || isLocked ? (
                <div className="space-y-8 text-gray-700 leading-relaxed text-lg pb-10">
                  <p>
                    สวัสดีค่าทุกคน วันนี้เราจะมาเรียนรู้เรื่องการทักทายและการตอบรับกันนะคะ เรื่องนี้เป็นพื้นฐานที่สำคัญมากก ในข้อสอบก.พ. มักจะโผล่มาให้เราเห็นในพาร์ท Conversation อยู่เรื่อยๆ และเอาจริงๆ มันก็เป็นเรื่องใกล้ตัวที่เราใช้กันในชีวิตประจำวันด้วย
                  </p>
                  <p>
                    เคล็ดลับในการทำข้อสอบพาร์ทนี้คือ <strong>&quot;ดูบริบท (Context)&quot;</strong> ค่ะ ไม่ว่าจะเป็นสถานการณ์นั้นเกิดที่ไหน คุยกับใคร สนิทกันแค่ไหน (Formal vs Informal) ถ้าเราจับจุดนี้ได้ ข้อสอบหลอกอะไรมาเราก็ไม่หวั่นค่ะ!
                  </p>

                  {/* Tips Box */}
                  <div className="bg-[#C9A84C]/10 border border-[#C9A84C] rounded-2xl p-6 shadow-[0_4px_20px_-10px_rgba(201,168,76,0.3)] flex gap-4 mt-8">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 border border-[#C9A84C]/30 shadow-sm">
                      <Lightbulb className="w-6 h-6 text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="text-xl text-[#1B2A4A] font-bold mb-2">KP Tip 💡</h3>
                      <p className="text-md font-medium text-gray-700">
                        ถ้าเจอคำถามจำพวก &quot;How do you do?&quot; ให้ตอบกลับไปเลยว่า &quot;How do you do?&quot; ห้ามตอบ I&apos;m fine นะคะ อันนี้ข้อสอบหลอกบ่อยมาก! มันใช้สำหรับการทักทายครั้งแรกที่เป็นทางการมากๆ เท่านั้นค่ะ
                      </p>
                    </div>
                  </div>

                  {/* Highlight Box */}
                  <div className="bg-[#1B2A4A]/5 border border-[#1B2A4A]/10 rounded-2xl p-6 mt-8 flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">
                    <div className="w-12 h-12 bg-[#1B2A4A] rounded-full flex items-center justify-center shrink-0 shadow-sm">
                      <Star className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="text-[#1B2A4A] font-bold mb-1">Focus Point</h3>
                      <p className="text-gray-600 text-base">จำไว้เสมอว่าการกล่าวคำอำลา บางครั้งข้อสอบจะให้รูปประโยคยาวๆ เช่น I&apos;m afraid I have to go now. หรือ It&apos;s been nice talking to you.</p>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6 border-b border-gray-100 pb-4">ตัวอย่างประโยคที่ออกสอบบ่อย 📝</h2>
                    
                    <div className="space-y-4">
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-xl font-bold text-[#1B2A4A] mb-1">Q: How are things going with you?</p>
                        <p className="text-gray-500">แปล: ช่วงนี้เป็นยังไงบ้าง?</p>
                        <p className="mt-3 text-[#C9A84C] font-semibold">A: Couldn&apos;t be better. (ดีมากเลย / ดีกว่านี้ไม่ได้แล้ว)</p>
                      </div>
                      
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-xl font-bold text-[#1B2A4A] mb-1">Q: Long time no see. What have you been up to?</p>
                        <p className="text-gray-500">แปล: ไม่เจอกันนานเลย ช่วงนี้ทำอะไรอยู่?</p>
                        <p className="mt-3 text-[#C9A84C] font-semibold">A: Just the usual. (ก็เรื่อยๆ / เหมือนเดิม)</p>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-xl font-bold text-[#1B2A4A] mb-1">Q: Give my regards to your parents.</p>
                        <p className="text-gray-500">แปล: ฝากความคิดถึงถึงพ่อแม่คุณด้วยนะ</p>
                        <p className="mt-3 text-[#C9A84C] font-semibold">A: I will, thanks. (ได้เลย ขอบคุณนะ)</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center flex flex-col items-center justify-center">
                  <div className="text-7xl mb-6">🚀</div>
                  <h2 className="text-2xl font-bold text-gray-800">เนื้อหากำลังจะมาเร็วๆ นี้</h2>
                  <p className="text-gray-500 mt-2">ทีมงานกำลังตั้งใจเรียบเรียงข้อมูลให้เข้าใจง่ายที่สุด</p>
                </div>
              )}
            </div>

            {/* Locked Status Overlay */}
            {isLocked && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-sm p-4">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 max-w-sm w-full text-center"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1B2A4A] mb-2">เนื้อหานี้ถูกล็อก 🔒</h3>
                  <p className="text-gray-500 mb-6">สมัครคอร์สเรียนเพื่อปลดล็อกเนื้อหาทั้งหมดและเข้าถึงอัพเดทใหม่ๆ ตลอดชีพ</p>
                  
                  <Link href="/payment" className="block w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#C9A84C] to-[#E5C870] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                      ซื้อคอร์ส 199 บาท
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            )}

          </div>
        </div>

        {/* Navigation Bottom Footer */}
        <div className="h-20 border-t border-gray-200 bg-white shrink-0 flex items-center justify-between px-4 md:px-10 z-30">
          {prevLesson ? (
            <button 
              onClick={() => handleLessonChange(prevLesson.id)}
              className="flex items-center gap-2 text-gray-600 hover:text-[#1B2A4A] font-semibold transition-colors px-4 py-2 hover:bg-gray-50 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">ก่อนหน้า</span>
            </button>
          ) : (
            <div className="w-24"></div> // Placeholder
          )}

          <div className="text-xs font-bold text-gray-400 font-mono tracking-widest hidden md:block">
            {currentLessonData?.id}
          </div>

          {!isLastLesson ? (
            <button 
               onClick={() => handleLessonChange(nextLesson!.id)}
               className="flex items-center gap-2 text-[#C9A84C] hover:text-[#b09340] font-bold transition-colors px-4 py-2 hover:bg-[#C9A84C]/5 rounded-lg"
            >
              <span className="hidden sm:inline">ถัดไป</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <Link href="/mock-exam">
              <button className="flex items-center gap-2 text-white bg-[#1B2A4A] hover:bg-[#2A3F6D] font-bold transition-colors px-6 py-2.5 rounded-full shadow-sm">
                ไปทำ Mock Exam
                <ArrowRight className="w-4 h-4 text-[#C9A84C]" />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
