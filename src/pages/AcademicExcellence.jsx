import React, { useState } from 'react';
import {
    LayoutGrid, Calendar, Users, BarChart2, BookOpen,
    Settings, LogOut, Search, Bell, ChevronRight,
    CheckCircle, AlertTriangle, XCircle, ArrowRight,
    Layers, Brain, Target, Trophy, Briefcase, ChevronLeft,
    Lock, Play, Book
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';

const AcademicExcellence = () => {
    const navigate = useNavigate();
    const [selectedSubject, setSelectedSubject] = useState('Operating Systems');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Mock Data for Section A
    const subjects = [
        { name: 'Data Structures', concepts: 24, progress: 65, color: 'bg-emerald-100 text-emerald-700', status: 'On Track' },
        { name: 'Operating Systems', concepts: 18, progress: 40, color: 'bg-amber-100 text-amber-700', status: 'Needs Work' },
        { name: 'DBMS', concepts: 12, progress: 85, color: 'bg-emerald-100 text-emerald-700', status: 'On Track' },
        { name: 'Comp. Networks', concepts: 20, progress: 25, color: 'bg-rose-100 text-rose-700', status: 'Behind' },
    ];

    // Mock Data for Section B (Concept Maps)
    const conceptMaps = {
        'Operating Systems': [
            { title: 'Process States & PCB', difficulty: 'Easy', status: 'Mastered' },
            { title: 'CPU Scheduling Algorithms', difficulty: 'Medium', status: 'In Progress' },
            { title: 'Thread Concurrency & Sync', difficulty: 'Hard', status: 'Weak' },
            { title: 'Deadlock Prevention', difficulty: 'Hard', status: 'Locked' },
            { title: 'Memory Paging', difficulty: 'Medium', status: 'Locked' },
        ],
        'Data Structures': [
            { title: 'Arrays & Strings', difficulty: 'Easy', status: 'Mastered' },
            { title: 'Linked Lists', difficulty: 'Easy', status: 'Mastered' },
            { title: 'Binary Trees', difficulty: 'Medium', status: 'In Progress' },
            { title: 'Graph Algorithms', difficulty: 'Hard', status: 'Locked' },
            { title: 'Dynamic Programming', difficulty: 'Hard', status: 'Locked' },
        ],
        'DBMS': [
            { title: 'ER Models', difficulty: 'Easy', status: 'Mastered' },
            { title: 'Normalization', difficulty: 'Medium', status: 'Mastered' },
            { title: 'SQL Queries', difficulty: 'Medium', status: 'In Progress' },
            { title: 'Indexing', difficulty: 'Hard', status: 'Locked' },
        ],
        'Comp. Networks': [
            { title: 'OSI Model', difficulty: 'Easy', status: 'In Progress' },
            { title: 'TCP/IP', difficulty: 'Medium', status: 'Locked' },
            { title: 'Routing Algorithms', difficulty: 'Hard', status: 'Locked' },
        ]
    };

    const currentConcepts = conceptMaps[selectedSubject] || [];

    const NavItem = ({ icon: Icon, label, active, onClick }) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-3'} py-2.5 rounded-xl transition-all duration-200 ease-out group outline-none focus:ring-2 focus:ring-white/20 active:scale-[0.98] active:translate-y-0 ${active
                ? 'bg-white/10 text-white font-medium shadow-sm translate-y-[-1px]'
                : 'text-gray-400 hover:text-white hover:bg-white/5 hover:-translate-y-[1px] hover:shadow-md'
                }`}
            title={isSidebarCollapsed ? label : ''}
        >
            <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
            {!isSidebarCollapsed && <span className="text-sm tracking-wide">{label}</span>}
        </button>
    );

    return (
        <div className="flex h-screen w-full bg-[#FAF9F4] p-3 gap-3 font-sans overflow-hidden text-[#1F1F1F]">

            {/* Sidebar - Compact (Global) */}
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
                            <NavItem icon={Target} label="Today's Focus" onClick={() => navigate('/today-focus')} />
                            <NavItem icon={BookOpen} label="Academic" active />
                            <NavItem icon={Trophy} label="Competitive" onClick={() => navigate('/competitive')} />
                            <NavItem icon={Briefcase} label="Career" onClick={() => navigate('/career')} />
                            <NavItem icon={BarChart2} label="Analytics" onClick={() => navigate('/analytics')} />
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

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 mx-2 h-full relative">

                {/* Top Header (Global) */}
                <header className="absolute top-0 left-0 right-0 z-50 h-14 flex items-center justify-end shrink-0 pt-2 pointer-events-none px-4 gap-3">
                    <div className="pointer-events-auto flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-black/5 w-64 transition-all duration-200 ease-out hover:shadow-md hover:-translate-y-[1px] focus-within:ring-2 focus-within:ring-indigo-100 h-10">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder:text-gray-400 text-[#1F1F1F]"
                        />
                        <div className="flex gap-1 hidden sm:flex">
                            <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[9px] font-bold text-gray-500 font-mono">⌘K</kbd>
                        </div>
                    </div>
                    <div className="pointer-events-auto flex items-center gap-3">
                        <button className="relative p-2 bg-white rounded-full shadow-sm border border-black/5 hover:bg-gray-50 transition-all duration-200 ease-out hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-100">
                            <Bell className="w-4 h-4 text-[#1F1F1F]" />
                            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
                        </button>
                    </div>
                </header>

                {/* Academic Content Scrollable Area - Content Redesigned */}
                <div className="flex-1 overflow-y-auto scrollbar-hide pb-6 pr-2 pt-4">

                    {/* Page Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-[#1F1F1F] tracking-tight mb-1">Academic Syllabus</h1>
                        <p className="text-gray-500 font-medium text-sm">
                            Select a subject and build mastery concept by concept.
                        </p>
                    </div>

                    {/* Section A: Subject Overview (Grid) */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {subjects.map((subject) => (
                            <div
                                key={subject.name}
                                onClick={() => setSelectedSubject(subject.name)}
                                className={`p-4 rounded-[1.25rem] border transition-all duration-200 ease-out cursor-pointer group relative overflow-hidden flex flex-col h-28 hover:-translate-y-1 hover:shadow-lg active:scale-[0.99]
                      ${selectedSubject === subject.name
                                        ? 'bg-[#1F1F1F] text-white border-[#1F1F1F] shadow-lg scale-[1.01]'
                                        : 'bg-white text-[#1F1F1F] border-slate-100 hover:border-slate-300'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-auto">
                                    <h3 className="font-bold text-sm leading-tight">{subject.name}</h3>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedSubject === subject.name ? 'opacity-70' : 'text-gray-400'}`}>
                                            {subject.concepts} Concepts
                                        </span>
                                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${selectedSubject === subject.name ? 'bg-white/20 text-white' : subject.color}`}>
                                            {subject.status}
                                        </span>
                                    </div>
                                    <div className="w-full h-1 bg-black/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${selectedSubject === subject.name ? 'bg-amber-400' : 'bg-slate-900/10'}`}
                                            style={{ width: `${subject.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Section B: Concept Map */}
                    <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold text-[#1F1F1F]">{selectedSubject} Roadmap</h2>
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full text-[10px] font-extrabold uppercase tracking-wider border border-slate-200">
                                    Syllabus
                                </span>
                            </div>
                            {/* Simple Legend */}
                            <div className="flex gap-4">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-[10px] font-bold text-gray-500">Mastered</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                                    <span className="text-[10px] font-bold text-gray-500">In Progress</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {currentConcepts.length > 0 ? currentConcepts.map((concept, i) => (
                                <div key={i} className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all duration-200
                                    ${concept.status === 'Locked' ? 'bg-slate-50 border-slate-100 opacity-70' :
                                        concept.status === 'In Progress' ? 'bg-[#FAF9F4] border-amber-200 shadow-sm' :
                                            'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'}`}>

                                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                                        {/* Status Indicator Icon */}
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
                                            ${concept.status === 'Mastered' ? 'bg-emerald-100 text-emerald-600' :
                                                concept.status === 'In Progress' ? 'bg-amber-100 text-amber-600' :
                                                    concept.status === 'Weak' ? 'bg-rose-100 text-rose-600' : 'bg-slate-200 text-slate-400'}`}>
                                            {concept.status === 'Mastered' && <CheckCircle className="w-5 h-5" />}
                                            {concept.status === 'In Progress' && <Play className="w-5 h-5 fill-current" />}
                                            {concept.status === 'Weak' && <AlertTriangle className="w-5 h-5" />}
                                            {concept.status === 'Locked' && <Lock className="w-4 h-4" />}
                                        </div>

                                        <div>
                                            <h3 className={`font-bold text-sm ${concept.status === 'Locked' ? 'text-gray-400' : 'text-[#1F1F1F]'}`}>
                                                {concept.title}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider
                                                    ${concept.difficulty === 'Easy' ? 'text-emerald-600' :
                                                        concept.difficulty === 'Medium' ? 'text-amber-600' : 'text-rose-600'}`}>
                                                    {concept.difficulty}
                                                </span>
                                                <span className="text-[10px] font-bold text-gray-300">•</span>
                                                <span className="text-[10px] font-medium text-gray-400">
                                                    {concept.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className={`flex items-center gap-2 ${concept.status === 'Locked' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                        <button
                                            onClick={() => navigate(`/academic/learn/${selectedSubject.toLowerCase().replace(/ /g, '-')}/${concept.title.toLowerCase().replace(/ /g, '-')}`)}
                                            className="px-4 py-2 bg-white border border-slate-200 text-[#1F1F1F] text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
                                        >
                                            <Book className="w-3.5 h-3.5 text-gray-400" />
                                            Learn
                                        </button>
                                        <button
                                            onClick={() => navigate('/academic/test')}
                                            className="px-4 py-2 bg-[#1F1F1F] text-white text-xs font-bold rounded-lg hover:bg-black transition-colors shadow-sm flex items-center gap-2"
                                        >
                                            <Target className="w-3.5 h-3.5" />
                                            Practice
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-12 text-gray-400 font-medium">
                                    No syllabus data available for this subject yet.
                                </div>
                            )}
                        </div>
                    </div>

                </div>

            </main>

            {/* Right Panel - Compact Calendar & Timeline (Global) */}
            <RightSidebar />
        </div>
    );
};

export default AcademicExcellence;
