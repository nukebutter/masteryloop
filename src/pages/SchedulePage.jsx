import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';
import {
    LayoutGrid, Calendar, Users, BarChart2, BookOpen,
    Settings, LogOut, Search, Bell, ChevronRight, ChevronLeft,
    Clock, Plus, MoreHorizontal, Move, Trophy, Briefcase
} from 'lucide-react';

const SchedulePage = () => {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [viewMode, setViewMode] = useState('Week'); // 'Week' or 'Day'

    const NavItem = ({ icon: Icon, label, active, onClick }) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-3'} py-2.5 rounded-xl transition-all duration-200 group ${active
                ? 'bg-white/10 text-white font-medium shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            title={isSidebarCollapsed ? label : ''}
        >
            <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
            {!isSidebarCollapsed && <span className="text-sm tracking-wide">{label}</span>}
        </button>
    );

    // Mock Schedule Data for Week View
    const scheduleItems = [
        { day: 'Mon', time: '07:00', duration: 1, title: 'Calculus Review', track: 'Academic', color: 'bg-amber-100 border-amber-200 text-amber-900' },
        { day: 'Mon', time: '08:30', duration: 0.5, title: 'Speed Drill', track: 'Competitive', color: 'bg-rose-100 border-rose-200 text-rose-900' },
        { day: 'Tue', time: '14:00', duration: 1.5, title: 'System Design', track: 'Career', color: 'bg-emerald-100 border-emerald-200 text-emerald-900' },
        { day: 'Wed', time: '10:00', duration: 1, title: 'Data Structures', track: 'Academic', color: 'bg-amber-100 border-amber-200 text-amber-900' },
        { day: 'Thu', time: '16:30', duration: 0.75, title: 'Mock Interview', track: 'Career', color: 'bg-blue-100 border-blue-200 text-blue-900' },
        { day: 'Fri', time: '09:00', duration: 2, title: 'Full Length Test', track: 'Competitive', color: 'bg-rose-100 border-rose-200 text-rose-900' },
    ];

    const timeSlots = Array.from({ length: 16 }, (_, i) => i + 7); // 07:00 to 22:00

    return (
        <div className="flex h-screen w-full bg-[#FAF9F4] p-3 gap-3 font-sans overflow-hidden text-[#1F1F1F]">
            {/* Sidebar */}
            <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-56'} bg-[#1F1F1F] rounded-[1.5rem] p-4 flex flex-col hidden md:flex shrink-0 shadow-2xl shadow-black/5 z-20 transition-all duration-300 relative`}>
                <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="absolute -right-3 top-10 w-6 h-6 bg-[#1F1F1F] rounded-full shadow-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 z-50 transition-colors"
                >
                    {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>

                <div className={`flex items-center gap-3 mb-8 px-2 pt-1 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#1F1F1F] font-bold text-lg shadow-md shrink-0">M</div>
                    {!isSidebarCollapsed && <span className="font-bold text-base tracking-tight text-white whitespace-nowrap overflow-hidden">MasteryLoop</span>}
                </div>
                <div className="flex-1 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
                    <section>
                        {!isSidebarCollapsed && <div className="text-[10px] font-extrabold text-gray-600 uppercase tracking-widest mb-2 px-3 whitespace-nowrap">General</div>}
                        <nav className="space-y-0.5">
                            <NavItem icon={LayoutGrid} label="Dashboard" onClick={() => navigate('/')} />
                            <NavItem icon={BookOpen} label="Academic" onClick={() => navigate('/academic')} />
                            <NavItem icon={Trophy} label="Competitive" onClick={() => navigate('/competitive')} />
                            <NavItem icon={Briefcase} label="Career" onClick={() => navigate('/career')} />
                            <NavItem icon={BarChart2} label="Analytics" onClick={() => navigate('/analytics')} />
                            <NavItem icon={Calendar} label="Schedule" active />
                        </nav>
                    </section>
                    <section>
                        {!isSidebarCollapsed && <div className="text-[10px] font-extrabold text-gray-600 uppercase tracking-widest mb-2 px-3 whitespace-nowrap">Tools</div>}
                        <nav className="space-y-0.5">
                            <NavItem icon={Settings} label="Search" />
                            <NavItem icon={LogOut} label="Log out" />
                        </nav>
                    </section>
                </div>
                <div className="mt-auto pt-4 border-t border-white/5">
                    <div className={`bg-white/5 p-2 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-inner shrink-0" />
                        {!isSidebarCollapsed && (
                            <div className="overflow-hidden">
                                <div className="text-sm font-bold text-white whitespace-nowrap">Guest User</div>
                                <div className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Student Plan</div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 mx-2 h-full relative">
                {/* Header */}
                <div className="flex items-end justify-between mb-6 px-1 pt-2">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1F1F1F] tracking-tight mb-1">Your Schedule</h1>
                        <p className="text-gray-500 font-medium text-sm">Plan and manage your learning sessions.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-100">
                            {['Week', 'Day'].map(mode => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === mode ? 'bg-[#1F1F1F] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                        <button className="p-2 bg-[#1F1F1F] text-white rounded-xl shadow-lg hover:bg-black transition-all">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Schedule Grid */}
                <div className="flex-1 bg-white rounded-[1.5rem] border border-slate-100 flex flex-col overflow-hidden shadow-sm">
                    {/* Week Header */}
                    <div className="grid grid-cols-8 border-b border-slate-100">
                        <div className="p-4 border-r border-slate-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center pt-5">Time</div>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <div key={day} className="p-4 text-center border-r border-slate-50 last:border-0">
                                <div className="text-xs font-bold text-[#1F1F1F]">{day}</div>
                                <div className="text-[10px] font-medium text-gray-400">12</div>
                            </div>
                        ))}
                    </div>

                    {/* Scrollable Grid */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide relative bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] bg-opacity-5">
                        {timeSlots.map(hour => (
                            <div key={hour} className="grid grid-cols-8 h-20 border-b border-slate-50">
                                <div className="border-r border-slate-100 text-[10px] font-medium text-gray-400 flex justify-center pt-2 relative">
                                    <span className="-mt-3 bg-white px-1">{hour}:00</span>
                                </div>
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                                    <div key={i} className="border-r border-slate-50 last:border-0 relative group">
                                        {/* Hover effect for add */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[#1F1F1F]/5 transition-opacity cursor-pointer flex items-center justify-center">
                                            <Plus className="w-4 h-4 text-[#1F1F1F]/20" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}

                        {/* Overlay Events */}
                        {/* This is a simplified positioning logic. Real implementation would calculate exact pixels. */}
                        <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none grid grid-cols-8">
                            <div className="col-span-1"></div> {/* Time axis offset */}
                            {/* Render items based on mock offsets */}

                            {/* Calculus Review: Mon 07:00 (Row 0) */}
                            <div className="absolute top-[0px] left-[12.5%] w-[12.5%] h-[80px] p-1 pointer-events-auto">
                                <div className="w-full h-full bg-amber-100 border border-amber-200 rounded-lg p-2 text-amber-900 border-l-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
                                    <div className="text-xs font-bold">Calculus Review</div>
                                    <div className="text-[9px] font-medium opacity-80">07:00 - 08:00</div>
                                </div>
                            </div>

                            {/* Speed Drill: Mon 08:30 (Row 1.5) */}
                            <div className="absolute top-[120px] left-[12.5%] w-[12.5%] h-[40px] p-1 pointer-events-auto">
                                <div className="w-full h-full bg-rose-100 border border-rose-200 rounded-lg p-1 px-2 text-rose-900 border-l-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center">
                                    <div className="text-xs font-bold truncate">Speed Drill</div>
                                </div>
                            </div>

                            {/* System Design: Tue 14:00 (Row 7) -> 14-7 = 7 * 80px = 560px */}
                            <div className="absolute top-[560px] left-[25%] w-[12.5%] h-[120px] p-1 pointer-events-auto">
                                <div className="w-full h-full bg-emerald-100 border border-emerald-200 rounded-lg p-2 text-emerald-900 border-l-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
                                    <div className="text-xs font-bold">System Design</div>
                                    <div className="text-[9px] font-medium opacity-80">14:00 - 15:30</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            <RightSidebar />
        </div>
    );
};

export default SchedulePage;
