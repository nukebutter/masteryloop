import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const RightSidebar = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Timeline Data (Mock)
    const timelineData = [
        { time: '07:00', title: 'Calculus Review', tag: 'Academic', color: 'bg-amber-100 text-amber-900', border: 'border-amber-200', duration: '45m' },
        { time: '08:30', title: 'Speed Drill', tag: 'Competitive', color: 'bg-rose-100 text-rose-900', border: 'border-rose-200', duration: '30m' },
        { time: '14:00', title: 'System Design', tag: 'Career', color: 'bg-emerald-100 text-emerald-900', border: 'border-emerald-200', duration: '60m' },
        { time: '16:30', title: 'Mock Interview', tag: 'Career', color: 'bg-blue-100 text-blue-900', border: 'border-blue-200', duration: '45m' },
        { time: '19:00', title: 'Daily Review', tag: 'General', color: 'bg-slate-100 text-slate-900', border: 'border-slate-200', duration: '15m' },
    ];

    // Calendar Logic
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        let day = new Date(year, month, 1).getDay();
        return (day + 6) % 7;
    };

    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateClick = (day) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (newDate > today) return;

        setSelectedDate(newDate);
    };

    const isToday = (day) => {
        const today = new Date();
        return day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
    };

    const isSelected = (day) => {
        return day === selectedDate.getDate() &&
            currentDate.getMonth() === selectedDate.getMonth() &&
            currentDate.getFullYear() === selectedDate.getFullYear();
    };

    const isFuture = (day) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return checkDate > today;
    }

    return (
        <aside className={`${isCollapsed ? 'w-16' : 'w-72'} transition-all duration-300 relative shrink-0 z-20 h-full flex flex-col py-3 pr-3 pl-0`}>
            {/* Collapse Toggle Button - Floating on Left Edge */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -left-3 top-10 w-6 h-6 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:scale-110 z-50 transition-all cursor-pointer"
            >
                {isCollapsed ? <ChevronRight size={14} className="rotate-180" /> : <ChevronRight size={14} />}
            </button>

            {/* Main Content Card */}
            <div className="w-full h-full bg-white rounded-[1.25rem] shadow-xl shadow-gray-200/50 border border-gray-100/50 overflow-hidden flex flex-col p-4 relative">

                {!isCollapsed ? (
                    <>
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-4 shrink-0">
                            <h3 className="font-bold text-sm text-[#1F1F1F]">
                                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </h3>
                            <div className="flex gap-1 bg-gray-50 p-0.5 rounded-md border border-gray-100">
                                <button onClick={handlePrevMonth} className="p-1 hover:bg-white rounded transition-all text-gray-500 hover:text-black">
                                    <ChevronRight className="w-3 h-3 rotate-180" />
                                </button>
                                <button onClick={handleNextMonth} className="p-1 hover:bg-white rounded transition-all text-gray-500 hover:text-black">
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-5 shrink-0">
                            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => <span key={d}>{d}</span>)}

                            {/* Empty placeholders */}
                            {Array.from({ length: firstDay }).map((_, i) => (
                                <div key={`empty-${i}`} />
                            ))}

                            {/* Days */}
                            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => {
                                const future = isFuture(d);
                                const selected = isSelected(d);
                                const today = isToday(d);

                                return (
                                    <div
                                        key={d}
                                        onClick={() => !future && handleDateClick(d)}
                                        className={`w-6 h-6 mx-auto flex items-center justify-center rounded-full text-xs font-bold transition-all cursor-pointer select-none
                                            ${selected ? 'bg-[#1F1F1F] text-white shadow-md' :
                                                today ? 'bg-[#F2AEC1] text-[#1F1F1F] shadow-sm' :
                                                    future ? 'text-gray-300 cursor-not-allowed' :
                                                        'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        {d}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-gray-100 mb-4 shrink-0" />

                        {/* Timeline Header */}
                        <div className="flex items-center justify-between mb-3 shrink-0">
                            <h3 className="font-bold text-sm text-[#1F1F1F]">Today's Timeline</h3>
                            <button className="text-[10px] font-bold text-gray-400 hover:text-black transition-colors">See all</button>
                        </div>

                        {/* Timeline List */}
                        <div className="space-y-0 overflow-y-auto scrollbar-hide flex-1 pr-1 pl-1 -mx-1">
                            {timelineData.length > 0 ? timelineData.map((item, i, arr) => (
                                <div key={i} className="flex gap-3 items-stretch relative group">
                                    {/* Timeline Line */}
                                    {i !== arr.length - 1 && (
                                        <div className="absolute left-[5.5px] top-3 bottom-0 w-[2px] bg-slate-100 group-hover:bg-slate-200 transition-colors" />
                                    )}

                                    {/* Dot */}
                                    <div className={`mt-1.5 w-3 h-3 rounded-full border-2 border-white shadow-sm shrink-0 z-10 relative ${item.color.split(' ')[0].replace('bg-', 'bg-')}`} />

                                    {/* Content */}
                                    <div className="flex-1 pb-4">
                                        <div className="flex items-baseline justify-between mb-1">
                                            <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                                        </div>
                                        <div className={`p-3 rounded-xl ${item.color} ${item.border} border transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer`}>
                                            <div className="font-bold text-xs mb-0.5">{item.title}</div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[9px] uppercase tracking-wider font-black opacity-70">{item.tag}</span>
                                                <div className="h-0.5 w-0.5 rounded-full bg-current opacity-50" />
                                                <span className="text-[9px] font-medium opacity-70">{item.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-10">
                                    <p className="text-xs font-medium text-gray-400">No sessions scheduled</p>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    // Collapsed View
                    <div className="flex flex-col items-center pt-8 h-full gap-6">
                        <div className="w-8 h-8 bg-[#1F1F1F] rounded-full text-white flex items-center justify-center font-bold text-xs shadow-md">
                            {currentDate.getDate()}
                        </div>
                        <div className="w-px h-20 bg-gray-200" />
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1F1F1F] rotate-180 whitespace-nowrap [writing-mode:vertical-rl]">
                            By Time
                        </span>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default RightSidebar;
