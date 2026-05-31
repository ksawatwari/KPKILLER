import React from 'react';
import Link from 'next/link';
import { BookOpen, Target, Flame, Calendar, ArrowRight, LayoutDashboard, CheckCircle2, AlertTriangle, BarChart3, Clock, ChevronRight } from 'lucide-react';

const mockStats = {
  totalExams: 5,
  totalQuestions: 50,
  correctAnswers: 34,
  streak: 3,
  lastExam: 'วันนี้',
  byPart: [
    { part: 1, name: 'Conversation', correct: 9, total: 12 },
    { part: 2, name: 'Vocabulary', correct: 7, total: 14 },
    { part: 3, name: 'Reading', correct: 10, total: 13 },
    { part: 4, name: 'Structure', correct: 8, total: 11 }
  ],
  weakPoints: ['Phrasal verbs', 'Prepositions', 'Long reading'],
  strongPoints: ['Basic grammar', 'Everyday vocabulary'],
  recentExams: [
    { id: 1, date: 'วันนี้', score: 8, total: 10, difficulty: 'ปานกลาง' },
    { id: 2, date: 'เมื่อวาน', score: 6, total: 10, difficulty: 'ยาก' },
    { id: 3, date: '2 วันก่อน', score: 7, total: 10, difficulty: 'ง่าย' },
    { id: 4, date: '3 วันก่อน', score: 9, total: 10, difficulty: 'ปานกลาง' },
    { id: 5, date: '5 วันก่อน', score: 4, total: 10, difficulty: 'ยาก' },
  ]
};

export default function DashboardPage() {
  const totalPercentage = Math.round((mockStats.correctAnswers / mockStats.totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-white text-[#1B2A4A] selection:bg-[#C9A84C] selection:text-white pb-20">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shrink-0 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight uppercase">
            <span className="text-[#C9A84C]">ENG KP</span> <span className="text-[#1B2A4A]">KILLER</span>
          </Link>
          <div className="flex items-center gap-4 text-sm font-bold">
            <Link href="/learn" className="text-gray-500 hover:text-[#1B2A4A] transition-colors flex items-center gap-1">
              เรียน
            </Link>
            <div className="w-px h-4 bg-gray-300"></div>
            <Link href="/mock-exam" className="text-gray-500 hover:text-[#1B2A4A] transition-colors gap-1">
              สอบ
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto w-full px-4 pt-8 md:pt-12 space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-[#1B2A4A] flex items-center gap-2 mb-2">
            <LayoutDashboard className="w-8 h-8 text-[#C9A84C]" /> 
            แดชบอร์ดของคุณ
          </h1>
          <p className="text-gray-500 font-medium">ติดตามความคืบหน้าและประวัติการเรียนของคุณที่นี่</p>
        </div>

        {/* Section 1: Overview Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-bold mb-1">
              <Target className="w-4 h-4 text-[#C9A84C]" /> คะแนนรวม
            </div>
            <p className="text-2xl font-black text-[#1B2A4A]">
              {mockStats.correctAnswers}<span className="text-gray-400 text-sm">/{mockStats.totalQuestions}</span>
            </p>
            <p className="text-xs text-[#C9A84C] font-bold mt-1">{totalPercentage}% ความแม่นยำ</p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-bold mb-1">
              <BookOpen className="w-4 h-4 text-blue-500" /> สอบไปแล้ว
            </div>
            <p className="text-2xl font-black text-[#1B2A4A]">
              {mockStats.totalExams} <span className="text-gray-400 text-sm">ครั้ง</span>
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
            <div className="flex items-center gap-2 text-orange-600 text-sm font-bold mb-1">
              <Flame className="w-4 h-4" /> Streak
            </div>
            <p className="text-2xl font-black text-orange-600">
              {mockStats.streak} <span className="text-orange-400 text-sm font-medium">วันติด</span>
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-bold mb-1">
              <Calendar className="w-4 h-4 text-purple-500" /> สอบล่าสุด
            </div>
            <p className="text-xl font-bold text-[#1B2A4A] mt-1">
              {mockStats.lastExam}
            </p>
          </div>
        </section>

        {/* Section 2: คะแนนแต่ละ Part */}
        <section>
          <h2 className="text-xl font-bold text-[#1B2A4A] mb-6">🎯 ผลแยกตาม Part</h2>
          <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
            {mockStats.byPart.map((part) => {
              const percentage = Math.round((part.correct / part.total) * 100);
              let barColor = 'bg-[#C9A84C]'; // Default yellow
              let statusBadge = null;

              if (percentage < 60) {
                barColor = 'bg-red-500';
                statusBadge = (
                  <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md">
                    <AlertTriangle className="w-3 h-3" /> ควรเพิ่มเติม
                  </span>
                );
              } else if (percentage >= 80) {
                barColor = 'bg-green-500';
                statusBadge = (
                  <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                    <CheckCircle2 className="w-3 h-3" /> ดีมาก
                  </span>
                );
              } else {
                barColor = 'bg-yellow-500';
              }

              return (
                <div key={part.part} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#1B2A4A]">Part {part.part}: {part.name}</span>
                      {statusBadge}
                    </div>
                    <span className="font-bold font-mono text-gray-700">{percentage}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div className={`${barColor} h-full rounded-full transition-all`} style={{ width: `${percentage}%` }}></div>
                  </div>
                  
                  <p className="text-xs font-medium text-gray-400">
                    ตอบถูก {part.correct} จาก {part.total} ข้อ
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: AI วิเคราะห์ */}
        <section>
          <div className="bg-[#1B2A4A] rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-md">
             {/* Decorative Background Icon */}
            <div className="absolute -right-6 -bottom-6 opacity-5">
              <BarChart3 className="w-48 h-48 text-white" />
            </div>

            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6 relative z-10">
              📊 AI วิเคราะห์จุดอ่อน
            </h2>

            <div className="relative z-10 space-y-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-start">
                <span className="text-gray-400 font-bold w-20 shrink-0">จุดอ่อน:</span>
                <div className="flex flex-wrap gap-2">
                  {mockStats.weakPoints.map(wp => (
                    <span key={wp} className="bg-red-500/20 text-red-200 border border-red-500/30 text-sm font-medium px-3 py-1 rounded-full">
                      {wp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-start">
                <span className="text-gray-400 font-bold w-20 shrink-0">จุดแข็ง:</span>
                <div className="flex flex-wrap gap-2">
                  {mockStats.strongPoints.map(sp => (
                    <span key={sp} className="bg-green-500/20 text-green-200 border border-green-500/30 text-sm font-medium px-3 py-1 rounded-full">
                      {sp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 backdrop-blur-sm mt-4">
                <h3 className="text-[#C9A84C] font-bold mb-2 flex items-center gap-2">
                  💡 คำแนะนำจากน้องไกด์
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed font-medium">
                  แนะนำให้เน้น Part 2 เพิ่ม โดยเฉพาะ Phrasal verbs ลองทำข้อสอบเพิ่มอีก 10 ข้อต่อวัน จะช่วยให้ทำคะแนนทะลุเป้าได้แน่นอนค่ะ!
                </p>
              </div>

              <p className="text-xs text-gray-500 italic">
                (การวิเคราะห์จาก AI จริงจะมาเร็วๆ นี้)
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: ประวัติการสอบ */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#1B2A4A] flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" /> ประวัติการสอบ
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-bold">วันที่</th>
                    <th className="px-6 py-4 font-bold">ระดับ</th>
                    <th className="px-6 py-4 font-bold text-center">คะแนน</th>
                    <th className="px-6 py-4 font-bold w-32"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockStats.recentExams.map((exam) => {
                    let color = 'bg-yellow-500';
                    let textClass = 'text-yellow-600';
                    let bgClass = 'bg-yellow-50';
                    
                    if (exam.score >= 8) {
                      color = 'bg-green-500';
                      textClass = 'text-green-600';
                      bgClass = 'bg-green-50';
                    } else if (exam.score < 5) {
                      color = 'bg-red-500';
                      textClass = 'text-red-600';
                      bgClass = 'bg-red-50';
                    }

                    return (
                      <tr key={exam.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                          {exam.date}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md text-xs font-bold">
                            {exam.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full font-bold font-mono ${bgClass} ${textClass}`}>
                            {exam.score}/{exam.total}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                           <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div className={`${color} h-full rounded-full`} style={{ width: `${(exam.score / exam.total) * 100}%` }}></div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 5: CTA */}
        <section className="pt-8 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Link href="/mock-exam" className="flex-1">
              <button className="w-full bg-[#C9A84C] text-white hover:bg-[#b09340] font-bold py-4 px-8 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group">
                สอบต่อเลย 🎯
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            
            <Link href="/learn" className="flex-1">
              <button className="w-full bg-white text-[#C9A84C] border-2 border-[#C9A84C] hover:bg-[#C9A84C]/5 font-bold py-4 px-8 rounded-full shadow-sm transition-all flex items-center justify-center gap-2 group">
                กลับไปเรียน 📖
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
