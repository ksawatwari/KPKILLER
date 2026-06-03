'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, Receipt, Key, BookOpen, Settings, LogOut, Menu, X, 
  TrendingUp, Users, Copy, AlertTriangle, ChevronDown, ChevronRight, 
  Plus, GripVertical, Trash2, Save, Eye, EyeOff, LayoutDashboard,
  Lightbulb, Star
} from 'lucide-react';

// --- Types ---
type MenuType = 'overview' | 'slips' | 'codes' | 'course' | 'settings';
type BlockType = 'text' | 'tips' | 'highlight' | 'example';

interface ExampleSentence {
  en: string;
  th: string;
}

interface Block {
  id: string;
  type: BlockType;
  content: string;
  examples?: ExampleSentence[];
}

export default function AdminPanelPage() {
  const [activeMenu, setActiveMenu] = useState<MenuType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Course Content States
  const [expandedParts, setExpandedParts] = useState<number[]>([1]);
  const [activeLesson, setActiveLesson] = useState<string | null>('1-1');
  const [lessonTitle, setLessonTitle] = useState('การทักทายและการตอบรับ');
  const [blocks, setBlocks] = useState<Block[]>([
    { id: 'b1', type: 'text', content: 'สวัสดีค่าทุกคน วันนี้เราจะมาเรียนรู้เรื่องการทักทายและการตอบรับกันนะคะ' },
    { id: 'b2', type: 'tips', content: 'ตอบ How do you do กลับเมื่อมีคนทักทายครั้งแรก' }
  ]);
  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Slips Modal
  const [showSlipModal, setShowSlipModal] = useState(false);

  // Code Modal
  const [showCodeModal, setShowCodeModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'overview': return <OverviewTab />;
      case 'slips': return <SlipsTab setShowSlipModal={setShowSlipModal} />;
      case 'codes': return <CodesTab setShowCodeModal={setShowCodeModal} />;
      case 'course': return <CourseTab />;
      case 'settings': return <SettingsTab showToast={showToast} />;
      default: return <OverviewTab />;
    }
  };

  // --- Course Tab Component ---
  const CourseTab = () => (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Left Tree */}
      <div className="w-full lg:w-1/3 lg:border-r border-gray-200 lg:h-[calc(100vh-64px)] overflow-y-auto p-4 bg-gray-50/50">
        <h2 className="text-xl font-bold text-[#1B2A4A] mb-4">สารบัญคอร์ส</h2>
        
        {/* Mock Parts */}
        {[1, 2, 3, 4].map((partNum) => {
          const isExpanded = expandedParts.includes(partNum);
          return (
            <div key={partNum} className="mb-4">
              <div 
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-[#C9A84C] transition-colors"
                onClick={() => setExpandedParts(prev => prev.includes(partNum) ? prev.filter(p => p !== partNum) : [...prev, partNum])}
              >
                <span className="font-bold text-[#1B2A4A]">Part {partNum}</span>
                {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
              </div>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="pl-6 pr-2 py-2 border-l-2 border-gray-100 ml-4 mt-2 space-y-2">
                      <div className={`p-2 rounded-lg cursor-pointer flex items-center justify-between group ${activeLesson === `${partNum}-1` ? 'bg-[#C9A84C]/10 text-[#C9A84C]' : 'hover:bg-gray-100 text-gray-600'}`} onClick={() => setActiveLesson(`${partNum}-1`)}>
                        <span className="text-sm font-medium">ตอนที่ {partNum}-1 Demo Lesson</span>
                        <div className="text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">FREE</div>
                      </div>
                      <div className={`p-2 rounded-lg cursor-pointer flex items-center justify-between group ${activeLesson === `${partNum}-2` ? 'bg-[#C9A84C]/10 text-[#C9A84C]' : 'hover:bg-gray-100 text-gray-600'}`} onClick={() => setActiveLesson(`${partNum}-2`)}>
                        <span className="text-sm font-medium">ตอนที่ {partNum}-2 Demo Lesson</span>
                        <div className="text-[10px] font-bold bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">LOCKED</div>
                      </div>
                      <button className="text-sm font-medium text-gray-400 hover:text-[#C9A84C] flex items-center gap-1 mt-2">
                        <Plus className="w-4 h-4" /> เพิ่มตอน
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
        <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-bold hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors flex justify-center items-center gap-2 mt-4">
          <Plus className="w-5 h-5" /> เพิ่ม Part
        </button>
      </div>

      {/* Right Editor */}
      <div className="w-full lg:w-2/3 lg:h-[calc(100vh-64px)] overflow-y-auto bg-white p-4 lg:p-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">กำลังแก้ไข</span>
            <h2 className="text-2xl font-bold text-[#1B2A4A] mt-1">{activeLesson ? `ตอนที่ ${activeLesson}` : 'เลือกตอนเพื่อแก้ไข'}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="px-4 py-2 bg-gray-100 text-gray-600 font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              {isPreviewMode ? <><EyeOff className="w-4 h-4"/> Edit</> : <><Eye className="w-4 h-4"/> Preview</>}
            </button>
            <button 
              onClick={() => showToast('บันทึกแล้ว ✅')}
              className="px-4 py-2 bg-[#C9A84C] text-white font-bold rounded-lg hover:bg-[#b09340] transition-colors flex items-center gap-2 shadow-sm"
            >
              <Save className="w-4 h-4" /> บันทึก
            </button>
          </div>
        </div>

        {activeLesson ? (
          isPreviewMode ? (
            <div className="max-w-2xl mx-auto space-y-6 pb-20">
              <h1 className="text-3xl font-extrabold text-[#1B2A4A]">{lessonTitle}</h1>
              {blocks.map(b => (
                <div key={b.id}>
                  {b.type === 'text' && <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{b.content}</p>}
                  {b.type === 'tips' && (
                    <div className="bg-[#C9A84C]/10 border border-[#C9A84C] rounded-2xl p-6 flex gap-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 border border-[#C9A84C]/30"><Lightbulb className="w-6 h-6 text-[#C9A84C]" /></div>
                      <div>
                        <h3 className="text-xl text-[#1B2A4A] font-bold mb-2">KP Tip 💡</h3>
                        <p className="text-md font-medium text-gray-700 whitespace-pre-line">{b.content}</p>
                      </div>
                    </div>
                  )}
                  {b.type === 'highlight' && (
                    <div className="bg-[#1B2A4A]/5 border border-[#1B2A4A]/10 rounded-2xl p-6 flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#1B2A4A] rounded-full flex items-center justify-center shrink-0"><Star className="w-5 h-5 text-[#C9A84C]" /></div>
                      <div>
                        <h3 className="text-[#1B2A4A] font-bold mb-1">Focus Point</h3>
                        <p className="text-gray-600">{b.content}</p>
                      </div>
                    </div>
                  )}
                  {b.type === 'example' && (
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                      {b.examples?.map((ex, i) => (
                        <div key={i} className="mb-4 last:mb-0">
                          <p className="text-xl font-bold text-[#1B2A4A] mb-1">Q: {ex.en}</p>
                          <p className="text-[#C9A84C] font-semibold">แปล: {ex.th}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6 pb-20">
              {/* Title Input */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <label className="block text-sm font-bold text-gray-700 mb-2">ชื่อตอน</label>
                <input 
                  type="text" 
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  className="w-full text-xl font-bold text-[#1B2A4A] border-b-2 border-gray-200 focus:border-[#C9A84C] outline-none pb-2 transition-colors" 
                />
              </div>

              {/* Block List */}
              {blocks.map((block, index) => (
                <div key={block.id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex gap-3 group relative">
                  <div className="cursor-grab text-gray-300 hover:text-gray-500 mt-2 shrink-0"><GripVertical className="w-5 h-5" /></div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded text-gray-600 uppercase">
                        {block.type === 'text' && 'TEXT'}
                        {block.type === 'tips' && '💡 KP Tip'}
                        {block.type === 'highlight' && '⭐ Focus Point'}
                        {block.type === 'example' && '📝 ตัวอย่างประโยค'}
                      </span>
                    </div>

                    {(block.type === 'text' || block.type === 'tips' || block.type === 'highlight') && (
                      <textarea
                        value={block.content}
                        onChange={(e) => {
                          const newBlocks = [...blocks];
                          newBlocks[index].content = e.target.value;
                          setBlocks(newBlocks);
                        }}
                        placeholder="พิมพ์เนื้อหาที่นี่..."
                        className="w-full min-h-[100px] p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#C9A84C] outline-none resize-y"
                      />
                    )}

                    {block.type === 'example' && (
                      <div className="space-y-3">
                        {block.examples?.map((ex, exIndex) => (
                          <div key={exIndex} className="flex gap-2 items-start bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <div className="flex-1 space-y-2">
                              <input 
                                type="text" 
                                placeholder="EN: ตัวอย่างประโยค" 
                                value={ex.en}
                                onChange={(e) => {
                                  const newBlocks = [...blocks];
                                  if(newBlocks[index].examples) newBlocks[index].examples![exIndex].en = e.target.value;
                                  setBlocks(newBlocks);
                                }}
                                className="w-full px-3 py-2 text-sm rounded bg-white border border-gray-200 focus:border-[#C9A84C] outline-none" 
                              />
                              <input 
                                type="text" 
                                placeholder="TH: คำแปล" 
                                value={ex.th}
                                onChange={(e) => {
                                  const newBlocks = [...blocks];
                                  if(newBlocks[index].examples) newBlocks[index].examples![exIndex].th = e.target.value;
                                  setBlocks(newBlocks);
                                }}
                                className="w-full px-3 py-2 text-sm rounded bg-white border border-gray-200 focus:border-[#C9A84C] outline-none text-[#C9A84C]" 
                              />
                            </div>
                            <button onClick={() => {
                              const newBlocks = [...blocks];
                              newBlocks[index].examples?.splice(exIndex, 1);
                              setBlocks(newBlocks);
                            }} className="p-2 text-gray-400 hover:text-red-500 rounded"><X className="w-4 h-4"/></button>
                          </div>
                        ))}
                        <button onClick={() => {
                          const newBlocks = [...blocks];
                          if(!newBlocks[index].examples) newBlocks[index].examples = [];
                          newBlocks[index].examples!.push({en: '', th: ''});
                          setBlocks(newBlocks);
                        }} className="text-sm font-bold text-[#C9A84C] flex items-center gap-1 hover:underline"><Plus className="w-4 h-4"/> เพิ่มประโยค</button>
                      </div>
                    )}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setBlocks(blocks.filter((_, i) => i !== index))}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Block */}
              <div className="relative">
                <button 
                  onClick={() => setShowBlockMenu(!showBlockMenu)}
                  className="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 font-bold hover:border-[#C9A84C] hover:text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-colors flex justify-center items-center gap-2"
                >
                  <Plus className="w-5 h-5" /> เพิ่ม Block
                </button>
                {showBlockMenu && (
                  <div className="absolute top-14 left-0 w-full bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                       <button onClick={() => { setBlocks([...blocks, { id: Date.now().toString(), type: 'text', content: '' }]); setShowBlockMenu(false); }} className="p-3 text-left hover:bg-gray-50 rounded-lg border border-gray-100 font-bold text-gray-700 text-sm">TEXT</button>
                       <button onClick={() => { setBlocks([...blocks, { id: Date.now().toString(), type: 'tips', content: '' }]); setShowBlockMenu(false); }} className="p-3 text-left hover:bg-gray-50 rounded-lg border border-gray-100 font-bold text-gray-700 text-sm flex items-center gap-1">💡 TIPS BOX</button>
                       <button onClick={() => { setBlocks([...blocks, { id: Date.now().toString(), type: 'highlight', content: '' }]); setShowBlockMenu(false); }} className="p-3 text-left hover:bg-gray-50 rounded-lg border border-gray-100 font-bold text-gray-700 text-sm flex items-center gap-1">⭐ HIGHLIGHT</button>
                       <button onClick={() => { setBlocks([...blocks, { id: Date.now().toString(), type: 'example', content: '', examples: [{en: '', th: ''}] }]); setShowBlockMenu(false); }} className="p-3 text-left hover:bg-gray-50 rounded-lg border border-gray-100 font-bold text-gray-700 text-sm flex items-center gap-1">📝 EXAMPLE</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <BookOpen className="w-16 h-16 mb-4 opacity-20" />
            <p>เลือก Part และตอนด้านซ้ายเพื่อเริ่มแก้ไข</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-[#1B2A4A] flex overflow-hidden">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 30 }} 
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-gray-100 shrink-0">
          <Link href="/admin/panel" className="font-bold text-xl tracking-tight uppercase">
            <span className="text-[#C9A84C]">ADMIN</span> <span className="text-[#1B2A4A]">PANEL</span>
          </Link>
          <button className="lg:hidden absolute top-6 right-6 text-gray-400" onClick={() => setSidebarOpen(false)}><X className="w-5 h-5"/></button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 space-y-1">
          <MenuBtn active={activeMenu === 'overview'} onClick={() => { setActiveMenu('overview'); setSidebarOpen(false); }} icon={<BarChart className="w-5 h-5" />} label="ภาพรวม" />
          <MenuBtn active={activeMenu === 'slips'} onClick={() => { setActiveMenu('slips'); setSidebarOpen(false); }} icon={<Receipt className="w-5 h-5" />} label="สลิป" />
          <MenuBtn active={activeMenu === 'codes'} onClick={() => { setActiveMenu('codes'); setSidebarOpen(false); }} icon={<Key className="w-5 h-5" />} label="โค้ด" />
          <MenuBtn active={activeMenu === 'course'} onClick={() => { setActiveMenu('course'); setSidebarOpen(false); }} icon={<BookOpen className="w-5 h-5" />} label="เนื้อหาคอร์ส" />
          <MenuBtn active={activeMenu === 'settings'} onClick={() => { setActiveMenu('settings'); setSidebarOpen(false); }} icon={<Settings className="w-5 h-5" />} label="ตั้งค่าเว็บ" />
        </div>

        <div className="p-4 border-t border-gray-100 shrink-0">
          <Link href="/admin">
            <button className="w-full flex items-center justify-center gap-2 p-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-colors">
              <LogOut className="w-5 h-5" /> ออกจากระบบ
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar Mobile */}
        <div className="lg:hidden h-16 bg-white border-b border-gray-200 flex items-center px-4 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-gray-600"><Menu className="w-6 h-6" /></button>
          <span className="font-bold ml-2">จัดการหลังบ้าน</span>
        </div>
        
        {/* Main Area */}
        <div className="flex-1 overflow-auto bg-gray-50 pb-10">
           {renderContent()}
        </div>
      </div>

      {/* Slip Modal Placeholder */}
      <AnimatePresence>
        {showSlipModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
            <div className="bg-white p-4 rounded-2xl max-w-sm w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">รูปสลิป</h3>
                <button onClick={() => setShowSlipModal(false)}><X className="w-5 h-5"/></button>
              </div>
              <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                Mock Slip Image
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Code Modal */}
      <AnimatePresence>
        {showCodeModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
            <div className="bg-white p-6 rounded-3xl max-w-sm w-full shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl">สร้างโค้ดใหม่</h3>
                <button onClick={() => setShowCodeModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
              </div>
              <label className="block text-sm font-bold text-gray-700 mb-2">จำนวนโค้ดที่ต้องการ</label>
              <input type="number" defaultValue="10" className="w-full p-4 border border-gray-300 rounded-xl mb-6 text-lg font-bold" />
              <button 
                onClick={() => { setShowCodeModal(false); showToast('สร้างเรียบร้อยแล้ว ✅'); }}
                className="w-full py-4 bg-[#C9A84C] text-white font-bold rounded-xl"
              >
                สร้างโค้ด (KP69-XXXX)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// --- Menu Button Component ---
const MenuBtn = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-6 py-3 font-bold transition-all relative ${
      active ? 'text-[#C9A84C] bg-[#C9A84C]/5' : 'text-gray-500 hover:bg-gray-50'
    }`}
  >
    {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C9A84C]" />}
    {icon}
    {label}
  </button>
);

// --- Overview Tab ---
const OverviewTab = () => (
  <div className="p-4 lg:p-8 max-w-5xl">
    <h1 className="text-3xl font-extrabold text-[#1B2A4A] mb-8">ภาพรวมระบบ</h1>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <StatCard title="สลิปวันนี้" value="12" icon={<Receipt className="w-6 h-6 text-blue-500" />} />
      <StatCard title="รายได้วันนี้ (บาท)" value="2,388" icon={<TrendingUp className="w-6 h-6 text-green-500" />} />
      <StatCard title="โค้ด Unused" value="3" subtitle="ต่ำกว่า 5 ควรเพิ่ม!" alert icon={<Key className="w-6 h-6 text-red-500" />} />
      <StatCard title="ผู้ใช้ทั้งหมด" value="1,204" icon={<Users className="w-6 h-6 text-purple-500" />} />
    </div>

    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-gray-700 mb-6">รายรับ 7 วันล่าสุด (บาท)</h3>
      {/* Mock CSS Bar Chart */}
      <div className="h-48 flex items-end justify-between gap-2 border-b border-gray-100 pb-2">
        <div className="w-full bg-[#1B2A4A] rounded-t-sm" style={{ height: '40%' }}></div>
        <div className="w-full bg-[#1B2A4A] rounded-t-sm" style={{ height: '70%' }}></div>
        <div className="w-full bg-[#1B2A4A] rounded-t-sm" style={{ height: '30%' }}></div>
        <div className="w-full bg-[#1B2A4A] rounded-t-sm" style={{ height: '90%' }}></div>
        <div className="w-full bg-[#1B2A4A] rounded-t-sm" style={{ height: '60%' }}></div>
        <div className="w-full bg-[#1B2A4A] rounded-t-sm" style={{ height: '50%' }}></div>
        <div className="w-full bg-[#C9A84C] rounded-t-sm shadow-[0_0_15px_rgba(201,168,76,0.3)]" style={{ height: '80%' }}></div>
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-400 font-bold">
        <span>จ.</span><span>อ.</span><span>พ.</span><span>พฤ.</span><span>ศ.</span><span>ส.</span><span className="text-[#C9A84C]">อา.</span>
      </div>
    </div>
  </div>
);

const StatCard = ({ title, value, icon, alert, subtitle }: any) => (
  <div className={`bg-white border ${alert ? 'border-red-200 bg-red-50/10' : 'border-gray-200'} rounded-2xl p-5 shadow-sm`}>
    <div className="flex justify-between items-start mb-2">
      <span className={`text-sm font-bold ${alert ? 'text-red-500' : 'text-gray-500'}`}>{title}</span>
      {icon}
    </div>
    <div className="text-2xl font-black text-[#1B2A4A]">{value}</div>
    {subtitle && <div className={`text-xs mt-1 font-bold ${alert ? 'text-red-500' : 'text-gray-400'}`}>{subtitle}</div>}
  </div>
);

// --- Slips Tab ---
const SlipsTab = ({ setShowSlipModal }: any) => (
  <div className="p-4 lg:p-8 max-w-6xl">
    <h1 className="text-3xl font-extrabold text-[#1B2A4A] mb-8">ตรวจสอบสลิป</h1>
    
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-4 font-bold">ชื่อ-นามสกุล</th>
              <th className="px-6 py-4 font-bold">เบอร์โทร</th>
              <th className="px-6 py-4 font-bold">เวลา</th>
              <th className="px-6 py-4 font-bold">สถานะ</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-[#1B2A4A]">สมหญิง รักเรียน</td>
              <td className="px-6 py-4 font-mono text-sm text-gray-600">0812345678</td>
              <td className="px-6 py-4 text-sm text-gray-500">10:45 น.</td>
              <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">Pending</span></td>
              <td className="px-6 py-4 text-right space-x-2">
                <button onClick={() => setShowSlipModal(true)} className="px-3 py-1.5 bg-gray-100 font-bold text-gray-600 text-xs rounded hover:bg-gray-200">ดูสลิป</button>
                <button className="px-3 py-1.5 bg-red-100 font-bold text-red-600 text-xs rounded hover:bg-red-200">Reject</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-[#1B2A4A]">มานะ ตั้งใจ</td>
              <td className="px-6 py-4 font-mono text-sm text-gray-600">0898765432</td>
              <td className="px-6 py-4 text-sm text-gray-500">10:30 น.</td>
              <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">Pending</span></td>
              <td className="px-6 py-4 text-right space-x-2">
                <button onClick={() => setShowSlipModal(true)} className="px-3 py-1.5 bg-gray-100 font-bold text-gray-600 text-xs rounded hover:bg-gray-200">ดูสลิป</button>
                <button className="px-3 py-1.5 bg-red-100 font-bold text-red-600 text-xs rounded hover:bg-red-200">Reject</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-[#1B2A4A]">ใจดี อารี</td>
              <td className="px-6 py-4 font-mono text-sm text-gray-600">0845556666</td>
              <td className="px-6 py-4 text-sm text-gray-500">09:15 น.</td>
              <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Approved</span></td>
              <td className="px-6 py-4 text-right space-x-2">
                <button onClick={() => setShowSlipModal(true)} className="px-3 py-1.5 bg-gray-100 font-bold text-gray-600 text-xs rounded hover:bg-gray-200">ดูสลิป</button>
                <button className="px-3 py-1.5 border border-red-500 text-red-500 font-bold text-xs rounded hover:bg-red-50">Revoke โค้ด</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 opacity-60">
              <td className="px-6 py-4 font-medium text-[#1B2A4A]">คนโกง หลอกลวง</td>
              <td className="px-6 py-4 font-mono text-sm text-gray-600">0800000000</td>
              <td className="px-6 py-4 text-sm text-gray-500">เมื่อวาน</td>
              <td className="px-6 py-4"><span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">Rejected</span></td>
              <td className="px-6 py-4 text-right space-x-2">
                <button onClick={() => setShowSlipModal(true)} className="px-3 py-1.5 bg-gray-100 font-bold text-gray-600 text-xs rounded hover:bg-gray-200">ดูสลิป</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// --- Codes Tab ---
const CodesTab = ({ setShowCodeModal }: any) => (
  <div className="p-4 lg:p-8 max-w-5xl">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <h1 className="text-3xl font-extrabold text-[#1B2A4A]">จัดการโค้ด</h1>
      <button 
        onClick={() => setShowCodeModal(true)}
        className="px-6 py-3 bg-[#C9A84C] text-white font-bold rounded-xl hover:bg-[#b09340] shadow-sm flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5"/> สร้างโค้ดใหม่
      </button>
    </div>

    <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center justify-between mb-6">
      <div className="flex items-center gap-2 text-red-600 font-bold">
        <AlertTriangle className="w-5 h-5" /> โค้ดว่างเหลือน้อยกว่า 5 โค้ด กรุณาสร้างเพิ่ม! (เหลือ 3)
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-white border text-center border-gray-200 p-4 rounded-xl shadow-sm">
        <div className="text-gray-500 text-sm font-bold mb-1">Unused</div>
        <div className="text-2xl font-black text-red-500">3</div>
      </div>
      <div className="bg-white border text-center border-gray-200 p-4 rounded-xl shadow-sm">
        <div className="text-gray-500 text-sm font-bold mb-1">Used</div>
        <div className="text-2xl font-black text-[#1B2A4A]">45</div>
      </div>
      <div className="bg-white border text-center border-gray-200 p-4 rounded-xl shadow-sm">
        <div className="text-gray-500 text-sm font-bold mb-1">Revoked</div>
        <div className="text-2xl font-black text-gray-400">2</div>
      </div>
    </div>

    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <table className="w-full text-left">
         <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-4 font-bold">Code</th>
              <th className="px-6 py-4 font-bold">สถานะ</th>
              <th className="px-6 py-4 font-bold">ใช้โดย</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-6 py-4 font-mono font-bold text-lg text-[#1B2A4A]">KP69-A1B2-C3D4</td>
              <td className="px-6 py-4"><span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">Unused</span></td>
              <td className="px-6 py-4 text-gray-400 text-sm">-</td>
              <td className="px-6 py-4 text-right space-x-2">
                <button className="p-2 bg-gray-50 text-gray-400 hover:text-[#1B2A4A] rounded-lg"><Copy className="w-4 h-4"/></button>
                <button className="px-3 py-1.5 border border-red-500 text-red-500 font-bold text-xs rounded hover:bg-red-50">Revoke</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-mono font-bold text-lg text-[#1B2A4A]">KP69-X9Y8-Z7W6</td>
              <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Used</span></td>
              <td className="px-6 py-4 font-medium text-sm">0845556666</td>
              <td className="px-6 py-4 text-right space-x-2">
                <button className="p-2 bg-gray-50 text-gray-400 hover:text-[#1B2A4A] rounded-lg"><Copy className="w-4 h-4"/></button>
                <button className="px-3 py-1.5 border border-red-500 text-red-500 font-bold text-xs rounded hover:bg-red-50">Revoke</button>
              </td>
            </tr>
          </tbody>
      </table>
    </div>
  </div>
);

// --- Settings Tab ---
const SettingsTab = ({ showToast }: any) => {
  const [settings, setSettings] = useState({
    isOpen: true,
    courseName: 'ENG KP KILLER',
    tagline: 'สุดยอดคอร์สติวภาษาอังกฤษ สอบ ก.พ. การันตีผล',
    regularPrice: '990',
    specialPrice: '199',
    accountName: 'นาย สมรักษ์ ขยันยิ่ง',
    accountNumber: '081-234-5678',
    qrCodeImg: ''
  });

  React.useEffect(() => {
    const saved = localStorage.getItem('kp_killer_settings');
    if (saved) {
      // eslint-disable-next-line
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings({ ...settings, qrCodeImg: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('kp_killer_settings', JSON.stringify(settings));
    showToast('อัพเดทการตั้งค่าแล้ว ✅');
  };

  return (
    <div className="p-4 lg:p-8 max-w-3xl">
      <h1 className="text-3xl font-extrabold text-[#1B2A4A] mb-8">ตั้งค่าเว็บไซต์</h1>
      
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div>
            <h3 className="font-bold text-[#1B2A4A]">เปิดรับชำระเงิน</h3>
            <p className="text-sm text-gray-500 mt-1">หากปิด หน้าชำระเงินจะแสดงว่า &quot;ปิดรับสมัครชั่วคราว&quot;</p>
          </div>
          <div 
            onClick={() => setSettings({...settings, isOpen: !settings.isOpen})}
            className={`w-14 h-8 rounded-full flex items-center p-1 cursor-pointer transition-colors ${settings.isOpen ? 'bg-green-500' : 'bg-gray-300'}`}
          >
            <div className={`w-6 h-6 bg-white rounded-full transition-transform ${settings.isOpen ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">ชื่อคอร์ส</label>
            <input type="text" value={settings.courseName} onChange={e => setSettings({...settings, courseName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A84C] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Tagline ใต้ชื่อคอร์ส</label>
            <input type="text" value={settings.tagline} onChange={e => setSettings({...settings, tagline: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A84C] outline-none" />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-2">ราคาปกติ (บาท)</label>
            <input type="number" value={settings.regularPrice} onChange={e => setSettings({...settings, regularPrice: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A84C] outline-none" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-2">ราคาพิเศษ (บาท)</label>
            <input type="number" value={settings.specialPrice} onChange={e => setSettings({...settings, specialPrice: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none text-red-500 font-bold" />
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 space-y-4">
          <h3 className="font-bold text-[#1B2A4A] text-lg">บัญชีรับเงิน (PromptPay)</h3>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">ชื่อบัญชี</label>
            <input type="text" value={settings.accountName} onChange={e => setSettings({...settings, accountName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A84C] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">เบอร์โทรศัพท์ / เลขบัตร ปชช.</label>
            <input type="text" value={settings.accountNumber} onChange={e => setSettings({...settings, accountNumber: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A84C] outline-none font-mono" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">โค้ด QR (รูปภาพ)</label>
            <label className="block border-2 border-dashed border-gray-300 p-6 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-[#C9A84C] hover:text-[#C9A84C] cursor-pointer relative overflow-hidden group h-[200px]">
              {settings.qrCodeImg ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={settings.qrCodeImg} alt="QR Code" className="h-full object-contain" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white z-10">
                    <Plus className="w-8 h-8 mb-2" />
                    <span className="font-bold text-sm">เปลี่ยนรูป QR Code</span>
                  </div>
                </>
              ) : (
                <>
                  <Plus className="w-8 h-8 mb-2" />
                  <span className="font-bold text-sm">อัพโหลด QR Code ใหม่</span>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
        </div>

        <div className="pt-6">
          <button 
            onClick={handleSave}
            className="w-full md:w-auto px-10 py-4 bg-[#C9A84C] text-white font-bold rounded-xl hover:bg-[#b09340] shadow-md flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5"/> บันทึกการตั้งค่า
          </button>
        </div>
      </div>
    </div>
  );
};
