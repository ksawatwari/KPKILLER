'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, AlertCircle, XCircle, Lightbulb, Zap, RefreshCw, BarChart3, LayoutDashboard } from 'lucide-react';

type Difficulty = 'easy' | 'medium' | 'hard';
type Mode = 'none' | 'guide' | 'god';

type Question = {
  id: string;
  part: string;
  question: string;
  choices: Record<string, string>;
  correct: string;
  difficulty: Difficulty;
};

const QUESTION_POOL: Question[] = [
  // Easy - Part 1 & 2
  { id: 'e1', part: 'Part 1: Conversation', question: 'A: "How are you doing today?" \nB: "__________"', choices: { A: 'I am doing my homework.', B: 'I am doing fine, thanks.', C: 'I do it every day.', D: 'How do you do?' }, correct: 'B', difficulty: 'easy' },
  { id: 'e2', part: 'Part 1: Conversation', question: 'A: "Would you like some coffee?" \nB: "__________"', choices: { A: 'Yes, I like it.', B: 'No, thank you.', C: 'I do some.', D: 'Yes, I do like.' }, correct: 'B', difficulty: 'easy' },
  { id: 'e3', part: 'Part 1: Conversation', question: 'A: "What time is it?" \nB: "__________"', choices: { A: 'It is a clock.', B: 'I have time.', C: 'It is half past ten.', D: 'Time is money.' }, correct: 'C', difficulty: 'easy' },
  { id: 'e4', part: 'Part 1: Conversation', question: 'A: "Where is the nearest bank?" \nB: "__________"', choices: { A: 'It is open at 9 AM.', B: 'It is on the corner of the street.', C: 'I need some money.', D: 'The bank is very big.' }, correct: 'B', difficulty: 'easy' },
  { id: 'e5', part: 'Part 1: Conversation', question: 'A: "Nice to meet you." \nB: "__________"', choices: { A: 'Nice to meet you too.', B: 'I meet you too.', C: 'Good to see.', D: 'How are you?' }, correct: 'A', difficulty: 'easy' },
  { id: 'e6', part: 'Part 2: Vocabulary', question: 'The word "huge" is closest in meaning to __________.', choices: { A: 'small', B: 'tiny', C: 'enormous', D: 'beautiful' }, correct: 'C', difficulty: 'easy' },
  { id: 'e7', part: 'Part 2: Vocabulary', question: 'My brother works in a hospital. He is a __________.', choices: { A: 'teacher', B: 'mechanic', C: 'doctor', D: 'farmer' }, correct: 'C', difficulty: 'easy' },
  { id: 'e8', part: 'Part 2: Vocabulary', question: 'I need to __________ my phone because the battery is low.', choices: { A: 'break', B: 'charge', C: 'sell', D: 'buy' }, correct: 'B', difficulty: 'easy' },
  { id: 'e9', part: 'Part 2: Vocabulary', question: 'We should __________ water to help the environment.', choices: { A: 'waste', B: 'pollute', C: 'save', D: 'drink' }, correct: 'C', difficulty: 'easy' },
  { id: 'e10', part: 'Part 2: Vocabulary', question: 'A place where you can borrow books is called a __________.', choices: { A: 'library', B: 'museum', C: 'park', D: 'cinema' }, correct: 'A', difficulty: 'easy' },
  
  // Medium - Part 3 & 4
  { id: 'm1', part: 'Part 4: Structure', question: 'If she __________ hard, she will pass the exam.', choices: { A: 'study', B: 'studies', C: 'studied', D: 'studying' }, correct: 'B', difficulty: 'medium' },
  { id: 'm2', part: 'Part 4: Structure', question: 'He __________ to Paris three times this year.', choices: { A: 'has been', B: 'went', C: 'goes', D: 'is going' }, correct: 'A', difficulty: 'medium' },
  { id: 'm3', part: 'Part 4: Structure', question: 'The book __________ by a famous author last year.', choices: { A: 'writes', B: 'wrote', C: 'was written', D: 'is written' }, correct: 'C', difficulty: 'medium' },
  { id: 'm4', part: 'Part 4: Structure', question: 'Neither the manager nor the employees __________ aware of the changes.', choices: { A: 'is', B: 'are', C: 'was', D: 'has been' }, correct: 'B', difficulty: 'medium' },
  { id: 'm5', part: 'Part 4: Structure', question: 'I look forward to __________ you soon.', choices: { A: 'see', B: 'seeing', C: 'saw', D: 'seen' }, correct: 'B', difficulty: 'medium' },
  { id: 'm6', part: 'Part 3: Reading', question: 'Main idea of a paragraph is usually found in the __________ sentence.', choices: { A: 'topic', B: 'supporting', C: 'concluding', D: 'detail' }, correct: 'A', difficulty: 'medium' },
  { id: 'm7', part: 'Part 3: Reading', question: '"The company implemented new policies to enhance productivity." What does "enhance" mean?', choices: { A: 'reduce', B: 'improve', C: 'maintain', D: 'ignore' }, correct: 'B', difficulty: 'medium' },
  { id: 'm8', part: 'Part 3: Reading', question: 'What is the purpose of skimming a text?', choices: { A: 'To find specific facts', B: 'To understand the general idea', C: 'To memorize the vocabulary', D: 'To correct grammar mistakes' }, correct: 'B', difficulty: 'medium' },
  { id: 'm9', part: 'Part 3: Reading', question: '"Therefore" is primarily used to indicate __________.', choices: { A: 'addition', B: 'contrast', C: 'result', D: 'time' }, correct: 'C', difficulty: 'medium' },
  { id: 'm10', part: 'Part 4: Structure', question: 'She asked me where __________.', choices: { A: 'did I live', B: 'I lived', C: 'do I live', D: 'I live' }, correct: 'B', difficulty: 'medium' },

  // Hard - All parts
  { id: 'h1', part: 'Part 1: Conversation', question: 'A: "I am really struggling with this project." \nB: "__________"', choices: { A: 'It serves you right.', B: 'Let me give you a hand.', C: 'I do not care at all.', D: 'You must do it.' }, correct: 'B', difficulty: 'hard' },
  { id: 'h2', part: 'Part 2: Vocabulary', question: 'The politician\'s speech was highly __________, causing a lot of arguments.', choices: { A: 'concise', B: 'controversial', C: 'appealing', D: 'informative' }, correct: 'B', difficulty: 'hard' },
  { id: 'h3', part: 'Part 4: Structure', question: 'Scarcely __________ the room when the phone rang.', choices: { A: 'he had entered', B: 'he entered', C: 'had he entered', D: 'did he enter' }, correct: 'C', difficulty: 'hard' },
  { id: 'h4', part: 'Part 3: Reading', question: 'Which of the following phrases indicates a counter-argument?', choices: { A: 'Furthermore, ...', B: 'As a result, ...', C: 'On the other hand, ...', D: 'Similarly, ...' }, correct: 'C', difficulty: 'hard' },
  { id: 'h5', part: 'Part 4: Structure', question: 'I would rather you __________ it right now.', choices: { A: 'do', B: 'did', C: 'done', D: 'have done' }, correct: 'B', difficulty: 'hard' },
  { id: 'h6', part: 'Part 2: Vocabulary', question: 'We need to __________ the root cause of the problem before jumping to conclusions.', choices: { A: 'deter', B: 'ascertain', C: 'obscure', D: 'replicate' }, correct: 'B', difficulty: 'hard' },
  { id: 'h7', part: 'Part 4: Structure', question: 'It is imperative that the documents __________ submitted by noon.', choices: { A: 'are', B: 'be', C: 'will be', D: 'is' }, correct: 'B', difficulty: 'hard' },
  { id: 'h8', part: 'Part 1: Conversation', question: 'A: "I couldn\'t agree with you more." \nThis means A __________.', choices: { A: 'disagrees completely', B: 'agrees partially', C: 'agrees completely', D: 'cannot agree' }, correct: 'C', difficulty: 'hard' },
  { id: 'h9', part: 'Part 3: Reading', question: 'In the sentence "He is an astute investor," "astute" is closest in meaning to:', choices: { A: 'shrewd', B: 'reckless', C: 'generous', D: 'novice' }, correct: 'A', difficulty: 'hard' },
  { id: 'h10', part: 'Part 4: Structure', question: 'Had I known about the traffic, I __________ an earlier train.', choices: { A: 'would catch', B: 'will catch', C: 'catch', D: 'would have caught' }, correct: 'D', difficulty: 'hard' },
];

export default function MockExamPage() {
  const [screen, setScreen] = useState<'setup' | 'exam' | 'result'>('setup');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [mode, setMode] = useState<Mode>('none');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // questionId -> selectedChoice

  const handleStartExam = () => {
    // Filter and shuffle
    const filtered = QUESTION_POOL.filter(q => q.difficulty === difficulty);
    
    // Fisher-Yates shuffle
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setQuestions(shuffled.slice(0, 10)); // Take 10 questions
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setConfirmed(false);
    setAnswers({});
    setScreen('exam');
    window.scrollTo({ top: 0 });
  };

  const handleConfirm = () => {
    if (!selectedAnswer) return;
    setConfirmed(true);
    setAnswers(prev => ({ ...prev, [questions[currentIndex].id]: selectedAnswer }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setConfirmed(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setScreen('result');
      window.scrollTo({ top: 0 });
    }
  };

  const handleRestart = () => {
    setScreen('setup');
    setDifficulty('medium');
    setMode('none');
    window.scrollTo({ top: 0 });
  };

  const currentQ = questions[currentIndex];
  const isCorrect = confirmed && selectedAnswer === currentQ.correct;

  // Calculate scores for result page
  const totalScore = questions.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
  
  // Stats by part
  const partStats: Record<string, { total: number, correct: number }> = {};
  questions.forEach(q => {
    const partName = q.part.split(':')[0]; // e.g. "Part 1"
    if (!partStats[partName]) {
      partStats[partName] = { total: 0, correct: 0 };
    }
    partStats[partName].total += 1;
    if (answers[q.id] === q.correct) {
      partStats[partName].correct += 1;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 text-[#1B2A4A] selection:bg-[#C9A84C] selection:text-white flex flex-col">
      {/* Navbar Minimal */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shrink-0">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href={screen === 'exam' ? '#' : '/'} onClick={(e) => {
            if (screen === 'exam') {
              e.preventDefault();
              if (window.confirm('กำลังทำข้อสอบอยู่ แน่ใจหรือไม่ว่าต้องการออก? (ข้อมูลจะไม่ถูกบันทึก)')) {
                window.location.href = '/';
              }
            }
          }} className="flex items-center gap-2 text-gray-500 hover:text-[#1B2A4A] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">กลับ</span>
          </Link>
          <span className="font-bold text-xl tracking-tight uppercase">
            <span className="text-[#C9A84C]">MOCK</span> <span className="text-[#1B2A4A]">EXAM</span>
          </span>
        </div>
      </nav>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 md:py-12 flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* SETUP SCREEN */}
          {screen === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <h1 className="text-3xl font-extrabold text-[#1B2A4A] mb-8 text-center">เลือกระดับความยาก</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <button 
                  onClick={() => setDifficulty('easy')}
                  className={`p-6 rounded-2xl border-2 transition-all text-left relative overflow-hidden group ${
                    difficulty === 'easy' ? 'border-[#C9A84C] bg-[#C9A84C]/5 shadow-md' : 'border-gray-200 bg-white hover:border-[#C9A84C]/50 hover:shadow-sm'
                  }`}
                >
                  <div className="text-4xl mb-4">🟢</div>
                  <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">ง่าย</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">เหมาะสำหรับคนเริ่มต้น ปูพื้นฐาน Vocabulary & Conversation</p>
                  {difficulty === 'easy' && <div className="absolute top-4 right-4"><CheckCircle2 className="w-6 h-6 text-[#C9A84C]" /></div>}
                </button>

                <button 
                  onClick={() => setDifficulty('medium')}
                  className={`p-6 rounded-2xl border-2 transition-all text-left relative overflow-hidden group ${
                    difficulty === 'medium' ? 'border-[#C9A84C] bg-[#C9A84C]/5 shadow-md' : 'border-gray-200 bg-white hover:border-[#C9A84C]/50 hover:shadow-sm'
                  }`}
                >
                  <div className="text-4xl mb-4">🟡</div>
                  <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">ปานกลาง</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">ใกล้เคียงข้อสอบจริงที่สุด เน้น Reading & Structure</p>
                  {difficulty === 'medium' && <div className="absolute top-4 right-4"><CheckCircle2 className="w-6 h-6 text-[#C9A84C]" /></div>}
                </button>

                <button 
                  onClick={() => setDifficulty('hard')}
                  className={`p-6 rounded-2xl border-2 transition-all text-left relative overflow-hidden group ${
                    difficulty === 'hard' ? 'border-[#C9A84C] bg-[#C9A84C]/5 shadow-md' : 'border-gray-200 bg-white hover:border-[#C9A84C]/50 hover:shadow-sm'
                  }`}
                >
                  <div className="text-4xl mb-4">🔴</div>
                  <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">ยาก</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">ท้าทาย เหมือนสอบจริงเลย รวมทุก Part พร้อมโจทย์หลอก</p>
                  {difficulty === 'hard' && <div className="absolute top-4 right-4"><CheckCircle2 className="w-6 h-6 text-[#C9A84C]" /></div>}
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-10">
                <h2 className="text-xl font-bold text-[#1B2A4A] mb-6">โหมดตัวช่วย (AI Mode)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => setMode('none')} 
                    className={`p-4 border-2 rounded-xl text-left transition-all ${mode === 'none' ? 'border-[#1B2A4A] bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <h3 className="font-bold text-[#1B2A4A] mb-1 flex items-center gap-2">
                       โหมดปกติ
                    </h3>
                    <p className="text-sm text-gray-500">สอบจับเวลาเหมือนจริง ไม่มีผู้ช่วย</p>
                  </button>
                  <button 
                    onClick={() => setMode('guide')} 
                    className={`p-4 border-2 rounded-xl text-left transition-all ${mode === 'guide' ? 'border-[#C9A84C] bg-[#C9A84C]/10' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <h3 className="font-bold text-[#1B2A4A] mb-1 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-[#C9A84C]" /> Guide Mode
                    </h3>
                    <p className="text-sm text-gray-500">น้องไกด์ให้ hints ทีละนิดหลังตอบ</p>
                  </button>
                  <button 
                    onClick={() => setMode('god')} 
                    className={`p-4 border-2 rounded-xl text-left transition-all ${mode === 'god' ? 'border-[#C9A84C] bg-[#C9A84C]/10' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <h3 className="font-bold text-[#1B2A4A] mb-1 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#C9A84C]" /> God Mode
                    </h3>
                    <p className="text-sm text-gray-500">น้องก็อดทำข้อสอบเป็นเพื่อน บอกทุกอย่าง</p>
                  </button>
                </div>
              </div>

              <div className="mt-auto flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStartExam}
                  className="bg-gradient-to-r from-[#C9A84C] to-[#E5C870] text-white font-bold text-lg py-4 px-12 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  เริ่มสอบเลย
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* EXAM SCREEN */}
          {screen === 'exam' && currentQ && (
            <motion.div
              key="exam"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold font-mono tracking-wider">
                      {currentIndex + 1}<span className="text-gray-400 text-lg">/10</span>
                    </h2>
                    <span className="bg-[#1B2A4A] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {currentQ.part.split(':')[0]}
                    </span>
                  </div>
                  {mode !== 'none' && (
                    <div className="flex items-center gap-1.5 text-sm font-bold text-[#C9A84C] bg-[#C9A84C]/10 px-3 py-1 rounded-full">
                      {mode === 'guide' ? <Lightbulb className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                      <span className="uppercase">{mode} MODE</span>
                    </div>
                  )}
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: `${(currentIndex / 10) * 100}%` }}
                    animate={{ width: `${((currentIndex + 1) / 10) * 100}%` }}
                    className="bg-[#C9A84C] h-full"
                  />
                </div>
              </div>

              {/* Question */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
                <p className="text-xl md:text-2xl font-semibold text-[#1B2A4A] leading-relaxed whitespace-pre-line mb-8">
                  {currentQ.question}
                </p>

                <div className="space-y-3">
                  {Object.entries(currentQ.choices).map(([key, value]) => {
                    const isSelected = selectedAnswer === key;
                    const isCorrectChoice = confirmed && key === currentQ.correct;
                    const isWrongChoice = confirmed && isSelected && !isCorrectChoice;

                    let buttonClass = 'bg-white border-gray-200 hover:border-[#C9A84C] text-gray-700 hover:bg-[#C9A84C]/5';
                    
                    if (confirmed) {
                      if (isCorrectChoice) {
                        buttonClass = 'bg-green-500 border-green-500 text-white shadow-md';
                      } else if (isWrongChoice) {
                        buttonClass = 'bg-red-500 border-red-500 text-white shadow-md';
                      } else {
                        buttonClass = 'bg-gray-50 border-gray-100 text-gray-400 opacity-60';
                      }
                    } else if (isSelected) {
                      buttonClass = 'bg-[#1B2A4A] border-[#1B2A4A] text-white shadow-md';
                    }

                    return (
                      <button
                        key={key}
                        onClick={() => !confirmed && setSelectedAnswer(key)}
                        disabled={confirmed}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${buttonClass}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex justify-center items-center font-bold text-sm shrink-0 border-2 ${
                            confirmed && (isCorrectChoice || isWrongChoice) ? 'border-white/30 text-white' : 
                            isSelected && !confirmed ? 'border-[#C9A84C] text-[#C9A84C] bg-white' : 
                            'border-gray-200 bg-gray-50 text-gray-500'
                        }`}>
                          {key}
                        </div>
                        <span className="text-lg font-medium">{value}</span>
                        {confirmed && isCorrectChoice && <CheckCircle2 className="w-6 h-6 text-white ml-auto" />}
                        {confirmed && isWrongChoice && <XCircle className="w-6 h-6 text-white ml-auto" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* After Confirm State */}
              <AnimatePresence>
                {confirmed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 mb-8"
                  >
                    <div className={`p-4 rounded-xl flex items-center gap-3 font-bold text-lg ${
                      isCorrect ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {isCorrect ? (
                        <><CheckCircle2 className="w-6 h-6" /> ✅ ถูกต้อง!</>
                      ) : (
                        <><XCircle className="w-6 h-6" /> ❌ ไม่ใช่นะ</>
                      )}
                    </div>

                    {/* AI Panels */}
                    {mode === 'guide' && (
                      <div className="bg-[#C9A84C]/10 border border-[#C9A84C] rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 opacity-10">
                          <Lightbulb className="w-32 h-32 text-[#C9A84C]" />
                        </div>
                        <h3 className="font-bold text-[#1B2A4A] text-lg flex items-center gap-2 mb-2 relative z-10">
                          <Lightbulb className="w-5 h-5 text-[#C9A84C]" /> 💡 น้องไกด์
                        </h3>
                        <p className="text-gray-700 relative z-10 leading-relaxed">
                          ข้อนี้ลองดู keyword สำคัญในประโยคก่อนนะ 😊<br/><br/>
                          <span className="text-sm font-medium text-gray-500">(hint จริงจะมาตอนต่อ AI)</span>
                        </p>
                      </div>
                    )}

                    {mode === 'god' && (
                      <div className="bg-[#1B2A4A] border border-[#1B2A4A] rounded-2xl p-6 relative overflow-hidden text-white">
                        <div className="absolute right-0 top-0 opacity-10 blur-sm">
                          <Zap className="w-40 h-40 text-[#C9A84C]" />
                        </div>
                        <h3 className="font-bold text-[#C9A84C] text-lg flex items-center gap-2 mb-3 relative z-10">
                          <Zap className="w-5 h-5" /> ⚡ น้องก็อด
                        </h3>
                        <p className="text-gray-200 relative z-10 leading-relaxed font-medium">
                          หนูเลือกข้อ {currentQ.correct} เลยนะพี่ เพราะข้อนี้มันวัดเรื่อง Grammar ชัดเจนมาก!<br/>
                          <span className="text-[#C9A84C] font-bold mt-2 block">Takeaway:</span> หมั่นทบทวนโครงสร้างประโยคบ่อยๆ น้า<br/><br/>
                          <span className="text-sm opacity-60 font-normal">(คำอธิบายจริงจะมาตอนต่อ AI)</span>
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="mt-auto flex justify-end pb-8">
                {!confirmed ? (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConfirm}
                    disabled={!selectedAnswer}
                    className="bg-[#1B2A4A] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-10 rounded-full shadow-md transition-all flex items-center gap-2 w-full md:w-auto justify-center"
                  >
                    ยืนยันคำตอบ
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="bg-[#C9A84C] text-white font-bold py-4 px-10 rounded-full shadow-md transition-all flex items-center gap-2 w-full md:w-auto justify-center"
                  >
                    {currentIndex < questions.length - 1 ? 'ข้อถัดไป' : 'ดูผลสอบ'}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}

          {/* RESULT SCREEN */}
          {screen === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center py-10"
            >
              <h1 className="text-3xl font-extrabold text-[#1B2A4A] mb-8 text-center">ผลการสอบ 🎯</h1>
              
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-xl w-full flex flex-col items-center mb-8">
                <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                  {/* CSS Circular Progress */}
                  <svg className="w-full h-full transform -rotate-90 absolute inset-0">
                    <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-gray-100" />
                    <motion.circle 
                      cx="96" cy="96" r="80" 
                      stroke="currentColor" 
                      strokeWidth="16" 
                      fill="transparent" 
                      strokeDasharray={2 * Math.PI * 80} 
                      initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 80 * (1 - totalScore / 10) }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="text-[#C9A84C]" 
                      strokeLinecap="round" 
                    />
                  </svg>
                  <div className="text-center relative z-10">
                    <p className="text-5xl font-black text-[#1B2A4A]">{totalScore}</p>
                    <p className="text-gray-400 font-bold tracking-widest uppercase text-sm mt-1">out of 10</p>
                  </div>
                </div>

                <div className="w-full space-y-3">
                  {Object.entries(partStats).map(([part, stats]) => (
                    <div key={part} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                      <span className="font-bold text-gray-700">{part}</span>
                      <span className="font-mono font-bold text-[#1B2A4A]">{stats.correct} / {stats.total}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Analysis Box */}
              <div className="w-full max-w-xl bg-indigo-50 border border-indigo-100 p-6 rounded-2xl mb-10 flex gap-4">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-indigo-900 mb-2">📊 AI วิเคราะห์</h3>
                  <p className="text-indigo-800/80 leading-relaxed font-medium">
                    &quot;จุดอ่อนของคุณคือเรื่อง {totalScore > 5 ? 'Vocabulary' : 'Structure (Grammar)'} แนะนำให้กลับไปทบทวนใน Part นี้นะคะ ส่วนใหญ่มักพลาดจุดเล็กๆ น้อยๆ&quot;
                    <br/><br/>
                    <span className="text-sm font-normal opacity-70">(ความสามารถจริงจะมาตอนต่อ AI — ข้อมูลนี้เป็น mock)</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRestart}
                  className="flex-1 bg-white border-2 border-gray-200 text-gray-700 font-bold py-4 px-8 rounded-full shadow-sm hover:border-gray-300 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  สอบอีกรอบ
                </motion.button>
                
                <Link href="/dashboard" className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#1B2A4A] text-white font-bold py-4 px-8 rounded-full shadow-md hover:bg-[#2A3F6D] transition-all flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    ไปหน้า Dashboard
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
