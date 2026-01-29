import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';
import {
    LayoutGrid, Calendar, Users, BarChart2, BookOpen,
    Settings, LogOut, Search, Bell, ChevronRight, ChevronLeft,
    CheckCircle, AlertTriangle, XCircle, ArrowRight,
    TrendingUp, Activity, Clock, Target, Zap, Trophy, Briefcase
} from 'lucide-react';

const AnalyticsPage = () => {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('Academic');

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

    return (
        <div className="flex h-screen w-full bg-[#FAF9F4] p-3 gap-3 font-sans overflow-hidden text-[#1F1F1F]">
            {/* Sidebar - Compact (Global Copy) */}
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
                            <NavItem icon={BarChart2} label="Analytics" active />
                            <NavItem icon={Calendar} label="Schedule" onClick={() => navigate('/schedule')} />
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
                {/* Header (Compact) */}
                <div className="flex items-end justify-between mb-6 px-1 pt-2">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1F1F1F] tracking-tight mb-1">Learning Analytics</h1>
                        <p className="text-gray-500 font-medium text-sm">Understand how you learn, where you struggle, and what to improve next.</p>
                    </div>
                    <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-100">
                        {['Academic', 'Competitive', 'Career'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === tab ? 'bg-[#1F1F1F] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-hide pb-6 pr-2">
                    {/* 2. High-Level Progress Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {[
                            { label: 'Concepts Covered', value: '18 / 42', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                            { label: 'Average Accuracy', value: '72%', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                            { label: 'Consistency', value: '4 days/wk', icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white rounded-[1.25rem] p-4 border border-slate-100 shadow-sm flex items-center justify-between">
                                <div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</div>
                                    <div className="text-2xl font-extrabold text-[#1F1F1F]">{stat.value}</div>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 3. Learning Trend (Primary Visual) */}
                    <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm mb-6 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-[#1F1F1F]">Conceptual Accuracy Over Time</h3>
                            <div className="flex gap-2">
                                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                                <span className="text-xs font-medium text-gray-500">Accuracy</span>
                            </div>
                        </div>
                        {/* Mock Chart Area */}
                        <div className="h-48 w-full flex items-end justify-between gap-2 px-2">
                            {[65, 70, 68, 75, 72, 80, 78, 85, 82, 88, 85, 90, 88, 92].map((h, i) => (
                                <div key={i} className="w-full h-full bg-indigo-50 rounded-t-sm relative group">
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-t-sm transition-all duration-500 hover:bg-indigo-600"
                                        style={{ height: `${h}%` }}
                                    />
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        {h}% Accuracy
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2">
                            <span>2 Weeks Ago</span>
                            <span>Today</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
                        {/* 4. Concept Mastery Breakdown (Most Important) - Span 7 */}
                        <div className="col-span-12 md:col-span-7 bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-[#1F1F1F]">Concept Mastery</h3>
                                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">View Details</button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { name: 'Process Synchronization', diff: 'Hard', status: 'weak', last: '2d ago' },
                                    { name: 'Deadlock Handling', diff: 'Medium', status: 'progress', last: '1d ago' },
                                    { name: 'CPU Scheduling', diff: 'Easy', status: 'mastered', last: '4d ago' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                        <div className="flex items-center gap-3">
                                            {item.status === 'mastered' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                                            {item.status === 'progress' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                                            {item.status === 'weak' && <XCircle className="w-5 h-5 text-rose-500" />}
                                            <div>
                                                <div className="font-bold text-sm text-[#1F1F1F]">{item.name}</div>
                                                <div className="text-[10px] font-medium text-gray-400">{item.diff} • Last: {item.last}</div>
                                            </div>
                                        </div>
                                        {item.status === 'weak' && (
                                            <button className="px-3 py-1.5 bg-rose-50 text-rose-700 rounded-lg text-[10px] font-bold uppercase tracking-wide hover:bg-rose-100 transition-colors">
                                                Review
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 5. Error Pattern Insights & 6. Time Analysis - Span 5 */}
                        <div className="col-span-12 md:col-span-5 flex flex-col gap-6">
                            <div className="bg-[#FAF9F4] rounded-[1.5rem] p-6 border border-slate-200">
                                <h3 className="font-bold text-[#1F1F1F] mb-4">Learning Insights</h3>
                                <ul className="space-y-3">
                                    <li className="flex gap-3 text-sm text-[#1F1F1F]/80">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                        Struggles more with preemptive algorithms.
                                    </li>
                                    <li className="flex gap-3 text-sm text-[#1F1F1F]/80">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                        Accuracy drops on concurrency-related topics.
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm flex-1">
                                <h3 className="font-bold text-[#1F1F1F] mb-4">Time & Effort</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs font-medium mb-1">
                                            <span className="text-gray-500">Practice</span>
                                            <span className="text-[#1F1F1F] font-bold">65%</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full w-[65%] bg-indigo-500 rounded-full" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs font-medium mb-1">
                                            <span className="text-gray-500">Theory</span>
                                            <span className="text-[#1F1F1F] font-bold">35%</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full w-[35%] bg-emerald-500 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 7. Action-Oriented Footer */}
                    <div className="bg-[#1F1F1F] rounded-[1.5rem] p-6 text-white flex items-center justify-between shadow-lg">
                        <div>
                            <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Recommended Focus</div>
                            <h3 className="text-xl font-bold">Process Synchronization</h3>
                            <p className="text-sm text-white/70">Weakest area this week. High impact on improved scores.</p>
                        </div>
                        <button className="px-6 py-3 bg-white text-[#1F1F1F] rounded-xl font-bold text-sm hover:bg-gray-100 transition-all flex items-center gap-2">
                            Start Focus Session <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                </div>
            </main>

            <RightSidebar />
        </div>
    );
};

export default AnalyticsPage;
