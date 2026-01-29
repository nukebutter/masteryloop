# MasteryLoop - Complete Codebase Overview

## 📋 Project Summary

**MasteryLoop** is an adaptive learning platform built with React + Vite that provides personalized educational experiences across three main learning paths:
- **Academic Excellence** - Structured learning for academic subjects (e.g., Operating Systems, CPU Scheduling)
- **Competitive Edge** - Exam preparation and speed drills (GATE, UGC NET, ISRO)
- **Career Development** - Professional skill building and interview prep

### Tech Stack
- **Frontend**: React 19.2.0 with React Router DOM 7.12.0
- **Styling**: Tailwind CSS 4.1.18 with custom scrollbar utilities
- **Icons**: Lucide React 0.562.0
- **AI Integration**: Google Gemini AI (@google/generative-ai 0.24.1)
- **Build Tool**: Vite 7.2.4
- **State Management**: React hooks (useState, useEffect)

---

## 📁 Project Structure

```
masteryloop/
├── public/                      # Static assets
├── src/
│   ├── assets/                  # Images, fonts, etc.
│   ├── components/              # Reusable React components
│   │   ├── AuthModal.jsx        # Authentication modal (signup/login)
│   │   ├── Navbar.jsx           # Global navigation bar
│   │   ├── QuizComponent.jsx    # Quiz rendering component
│   │   └── ReteachView.jsx      # Re-teaching interface for failed concepts
│   ├── data/                    # Static data and schemas
│   │   ├── conceptSchema.js     # Operating Systems curriculum structure
│   │   └── quizData.js          # Mock quiz questions for each sub-concept
│   ├── pages/                   # Main application pages
│   │   ├── AcademicExcellence.jsx    # Academic learning dashboard
│   │   ├── AcademicFlow.jsx          # LAP/Test/Reteach flow pages
│   │   ├── CareerPage.jsx            # Career development page
│   │   ├── CompetitivePage.jsx       # Competitive exam prep page
│   │   ├── Dashboard.jsx             # Main user dashboard
│   │   ├── DrillPage.jsx             # Speed drill practice
│   │   ├── InputPage.jsx             # User onboarding/calibration
│   │   ├── LandingPage.jsx           # Landing page with path selection
│   │   └── LearningContentPage.jsx   # Core learning experience (LAP flow)
│   ├── services/                # External services
│   │   └── aiService.js         # Google Gemini AI integration
│   ├── App.css                  # App-specific styles
│   ├── App.jsx                  # Main app component with routing
│   ├── index.css                # Global styles and Tailwind imports
│   └── main.jsx                 # React app entry point
├── .env.example                 # Environment variable template
├── .gitignore                   # Git ignore rules
├── AI_INTEGRATION_GUIDE.md      # Comprehensive AI integration guide
├── AI_SETUP.md                  # Quick AI setup instructions
├── README.md                    # Project readme
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML entry point
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
└── vite.config.js               # Vite build configuration
```

---

## 🎯 Core Features & User Flow

### 1. **Landing Page** (`LandingPage.jsx`)
- **Purpose**: Entry point where users select their learning path
- **Paths Available**:
  - Academic Excellence (Indigo theme)
  - Competitive Edge (Amber theme)
  - Career Development (Emerald theme)
- **Navigation**: Redirects to `/setup` with selected intent

### 2. **Input/Calibration Page** (`InputPage.jsx`)
- **Purpose**: Collect user preferences to personalize learning
- **Inputs**:
  - Skill level (beginner/intermediate/advanced)
  - Weekly time commitment (2-40 hours)
  - Skills selection or resume upload (for career path)
- **Output**: Generates user profile and navigates to `/dashboard`

### 3. **Dashboard** (`Dashboard.jsx`)
- **Purpose**: Personalized learning hub based on user intent
- **Features**:
  - Recommended learning paths
  - Progress tracking
  - Quick access to active learning sessions
  - Intent-specific content (academic/competitive/career)

### 4. **Academic Excellence** (`AcademicExcellence.jsx`)
- **Purpose**: Structured academic learning interface
- **Features**:
  - Subject browser (Operating Systems, Data Structures, etc.)
  - Concept hierarchy visualization
  - Progress tracking per concept
  - "Continue Learning" CTA to resume progress

### 5. **Learning Content Page** (`LearningContentPage.jsx`) ⭐ **CORE FEATURE**
- **Purpose**: Main adaptive learning experience using LAP (Learn-Apply-Practice) methodology
- **Flow**:
  1. **Step A: Introduction** - Overview of the concept
  2. **Step B: Learning** - AI-generated explanation with analogies
  3. **Step C: Quiz** - 3 MCQs + 1 conceptual question
  4. **Step D: Evaluation** - AI-powered answer grading
  5. **Step E: Re-teach** (if score < 70%) - Simplified explanation
  6. **Step F: Continue** - Move to next sub-concept or complete

- **AI Integration**:
  - Dynamic explanation generation
  - Real-world analogy creation
  - Quiz question generation
  - Conceptual answer evaluation
  - Simplified re-teaching content

### 6. **Competitive Page** (`CompetitivePage.jsx`)
- **Purpose**: Exam-focused speed drills and practice
- **Features**:
  - Exam selection (GATE, UGC NET, ISRO)
  - Active speed drills
  - Performance metrics (accuracy, avg time/question)
  - Weak area identification
  - Recent session history

### 7. **Career Page** (`CareerPage.jsx`)
- **Purpose**: Professional skill development
- **Features**: (Similar structure to competitive page, career-focused)

---

## 🤖 AI Integration (Google Gemini)

### Setup
1. Get API key from: https://makersuite.google.com/app/apikey
2. Create `.env` file:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
3. Restart dev server

### AI Service Functions (`aiService.js`)

#### 1. `generateExplanation(conceptTitle, subject, difficulty, prerequisites)`
- Generates educational explanation for a concept
- Returns: 200-300 word explanation text

#### 2. `generateSimplifiedExplanation(conceptTitle, originalExplanation)`
- Creates simplified version for struggling students
- Returns: 150-200 word simplified explanation with analogies

#### 3. `generateQuiz(conceptTitle, explanation)`
- Generates quiz questions based on concept
- Returns: JSON object with 3 MCQs and 1 conceptual question
- Format:
  ```javascript
  {
    mcqs: [
      {
        question: "...",
        options: ["A", "B", "C", "D"],
        correctAnswer: 0  // index of correct option
      }
    ],
    conceptual: {
      question: "...",
      sampleAnswer: "..."
    }
  }
  ```

#### 4. `evaluateConceptualAnswer(question, studentAnswer, sampleAnswer)`
- AI-powered answer evaluation
- Returns: Score between 0.0 and 1.0
- Criteria: Correctness (50%), Completeness (30%), Clarity (20%)

#### 5. `generateAnalogy(conceptTitle, explanation)`
- Creates real-world analogies
- Returns: 2-3 sentence analogy text

### Fallback System
- If AI fails or API key missing, app uses mock data from `data/` folder
- No crashes or errors - seamless user experience
- Loading states shown during AI generation

### API Limits (Free Tier)
- 60 requests per minute
- 1,500 requests per day

---

## 📊 Data Structure

### Concept Schema (`conceptSchema.js`)

```javascript
{
  subject: "Operating Systems",
  concept: "CPU Scheduling",
  subConcepts: [
    {
      id: "why-scheduling",
      title: "Why scheduling is needed",
      difficulty: "Easy",
      prerequisites: [],
      explanation: "...",
      simplifiedExplanation: "..."
    },
    // ... more sub-concepts
  ]
}
```

**Sub-concepts included**:
1. Why scheduling is needed (Easy)
2. Scheduling Criteria (Easy)
3. FCFS - First Come First Serve (Easy)
4. SJF - Shortest Job First (Medium)
5. Round Robin (Medium)
6. Priority Scheduling (Medium)

### Quiz Data (`quizData.js`)

Mock quiz data for each sub-concept with:
- 3 MCQs (multiple choice questions)
- 1 conceptual question with sample answer

---

## 🎨 Design System

### Color Themes
- **Academic**: Indigo (`indigo-600`, `indigo-100`)
- **Competitive**: Amber (`amber-600`, `amber-100`)
- **Career**: Emerald (`emerald-600`, `emerald-100`)
- **Base**: Slate (`slate-50`, `slate-900`)

### Typography
- Font: System font stack (sans-serif)
- Headings: Extrabold, tight tracking
- Body: Medium weight, readable line height

### Layout Patterns
- **Sidebar Navigation**: Dark (`#1F1F1F`) with white text
- **Main Content**: Light background (`#FAF9F4` or `slate-50`)
- **Cards**: White with subtle shadows and rounded corners (`rounded-xl`, `rounded-[1.5rem]`)
- **Buttons**: Bold, rounded, with hover effects

### Animations
- Fade-in-up animation for landing page
- Hover transitions (scale, shadow, color)
- Loading spinners for AI generation

---

## 🔐 Authentication

### Current Implementation
- Modal-based auth (`AuthModal.jsx`)
- Modes: Signup / Login
- Fields:
  - **Signup**: Name, Email, Password
  - **Login**: Email, Password
- **Note**: Currently mock authentication (no backend)
- Auth gate on app load - must authenticate to proceed

---

## 🚀 Running the Application

### Development
```bash
npm run dev
```
- Runs on Vite dev server (default: http://localhost:5173)
- Hot module replacement enabled
- Currently running (as per your terminal)

### Build
```bash
npm run build
```
- Creates production bundle in `dist/`

### Lint
```bash
npm run lint
```
- Runs ESLint on codebase

### Preview Production Build
```bash
npm run preview
```

---

## 📦 Key Dependencies

### Production
- `react` (19.2.0) - UI library
- `react-dom` (19.2.0) - React DOM renderer
- `react-router-dom` (7.12.0) - Client-side routing
- `lucide-react` (0.562.0) - Icon library
- `@google/generative-ai` (0.24.1) - Gemini AI SDK

### Development
- `vite` (7.2.4) - Build tool
- `tailwindcss` (4.1.18) - CSS framework
- `@tailwindcss/vite` (4.1.18) - Tailwind Vite plugin
- `eslint` (9.39.1) - Linting
- `tailwind-scrollbar-hide` (4.0.0) - Hide scrollbars utility

---

## 🔄 Learning Flow (LAP Methodology)

### LAP = Learn → Apply → Practice

**Step-by-Step Process**:

1. **Introduction (Step A)**
   - Concept overview
   - Learning objectives
   - Prerequisites check

2. **Learning (Step B)**
   - AI-generated explanation OR mock data
   - Real-world analogies
   - Key concepts highlighted

3. **Quiz (Step C)**
   - 3 Multiple Choice Questions
   - 1 Conceptual short-answer question
   - Timed or self-paced

4. **Evaluation (Step D)**
   - MCQ auto-grading (immediate)
   - AI evaluation of conceptual answer
   - Score calculation (MCQ: 75%, Conceptual: 25%)

5. **Branching**:
   - **Score ≥ 70%**: Proceed to next concept
   - **Score < 70%**: Re-teach with simplified content

6. **Re-teach (Step E)** (if needed)
   - Simplified explanation
   - More analogies
   - Retry quiz option

7. **Progress Tracking**
   - Completed concepts marked
   - Prerequisites unlocked
   - Overall progress percentage

---

## 🎯 Adaptive Learning Features

### 1. **Prerequisite System**
- Concepts have prerequisites
- Must complete prerequisites before accessing advanced topics
- Enforced in UI (locked concepts)

### 2. **Difficulty Progression**
- Easy → Medium → Hard
- Gradual complexity increase
- Personalized pacing

### 3. **Performance-Based Branching**
- Pass (≥70%): Move forward
- Fail (<70%): Re-teach and retry
- No moving forward until mastery

### 4. **AI Personalization**
- Explanations tailored to difficulty level
- Simplified re-teaching for struggling students
- Dynamic quiz generation

### 5. **Multi-Path Learning**
- Academic: Deep conceptual understanding
- Competitive: Speed and accuracy
- Career: Practical application

---

## 🐛 Known Limitations & TODOs

### Current Limitations
1. **No Backend**: All data is client-side (mock data)
2. **No Persistence**: Progress lost on page refresh
3. **Single Subject**: Only Operating Systems implemented
4. **Mock Auth**: No real user authentication
5. **No Analytics**: No learning analytics backend

### Potential Improvements
1. **Backend Integration**:
   - User authentication (JWT)
   - Progress persistence (database)
   - API for content delivery

2. **Content Expansion**:
   - More subjects (Data Structures, Algorithms, etc.)
   - More sub-concepts per subject
   - Competitive exam question banks

3. **Enhanced AI**:
   - Response caching (avoid regeneration)
   - Better prompt engineering
   - Multi-language support

4. **Analytics**:
   - Learning patterns tracking
   - Time spent per concept
   - Weak area identification
   - Progress reports

5. **Social Features**:
   - Study groups
   - Peer comparison
   - Leaderboards

6. **Mobile Optimization**:
   - Better responsive design
   - Native app (React Native)

---

## 🔧 Configuration Files

### `vite.config.js`
- React plugin enabled
- Port and host configuration

### `tailwind.config.js`
- Custom theme extensions
- Plugin configurations

### `eslint.config.js`
- React-specific linting rules
- Code quality standards

### `.env.example`
- Template for environment variables
- Gemini API key placeholder

---

## 📝 Important Notes

### Security
⚠️ **API Key Exposure**: Currently, Gemini API key is in client-side code (fallback in `aiService.js`). For production:
- Move API calls to backend
- Use environment variables on server
- Implement rate limiting

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features used
- Vite handles transpilation

### Performance
- Lazy loading not implemented
- All routes loaded upfront
- AI calls can be slow (network dependent)

---

## 🎓 Educational Methodology

### Based on Research-Backed Principles:

1. **Spaced Repetition**: Re-teaching failed concepts
2. **Active Recall**: Quiz-based learning
3. **Mastery Learning**: Must score ≥70% to proceed
4. **Scaffolding**: Prerequisites and difficulty progression
5. **Immediate Feedback**: Instant quiz results
6. **Personalization**: AI-adapted content

---

## 📚 Documentation Files

1. **AI_INTEGRATION_GUIDE.md** (11,864 bytes)
   - Comprehensive AI integration guide
   - Code examples for all AI functions
   - Multiple AI provider options (Gemini, OpenAI, Claude)
   - Best practices and security notes

2. **AI_SETUP.md** (3,521 bytes)
   - Quick setup instructions
   - Troubleshooting guide
   - Testing procedures

3. **README.md** (1,173 bytes)
   - Basic React + Vite template info
   - ESLint configuration notes

4. **CODEBASE_OVERVIEW.md** (This file)
   - Complete codebase documentation
   - Architecture overview
   - Feature descriptions

---

## 🚦 Getting Started (Quick Guide)

1. **Clone/Open Project**
   ```bash
   cd c:\Users\deepjyoti\Desktop\coding\masteryloop\masteryloop
   ```

2. **Install Dependencies** (if not done)
   ```bash
   npm install
   ```

3. **Set Up AI (Optional)**
   - Get Gemini API key: https://makersuite.google.com/app/apikey
   - Create `.env` file with `VITE_GEMINI_API_KEY=your_key`

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open Browser**
   - Navigate to http://localhost:5173
   - Sign up/login (mock auth)
   - Select learning path
   - Start learning!

---

## 📞 Support & Resources

- **Gemini API Docs**: https://ai.google.dev/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Vite Docs**: https://vitejs.dev

---

**Last Updated**: January 28, 2026
**Version**: 0.0.0 (Development)
**Status**: ✅ Fully Functional (AI-Enabled)
