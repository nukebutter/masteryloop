# MasteryLoop - Quick Reference Guide

## 📚 Table of Contents
1. [File Structure Quick Reference](#file-structure)
2. [Component Props Reference](#component-props)
3. [Data Schema Reference](#data-schemas)
4. [AI Service API Reference](#ai-service-api)
5. [Routing Reference](#routing)
6. [Styling Reference](#styling)
7. [Common Patterns](#common-patterns)

---

## 📁 File Structure Quick Reference {#file-structure}

### Components (`src/components/`)
| File | Purpose | Key Props |
|------|---------|-----------|
| `AuthModal.jsx` | Authentication UI | `isOpen`, `onClose`, `defaultMode`, `onAuthenticated` |
| `Navbar.jsx` | Global navigation | None (self-contained) |
| `QuizComponent.jsx` | Quiz rendering | `quiz`, `onSubmit`, `answers`, `onAnswerChange` |
| `ReteachView.jsx` | Re-teaching UI | `concept`, `simplifiedExplanation`, `onRetry` |

### Pages (`src/pages/`)
| File | Route | Purpose |
|------|-------|---------|
| `LandingPage.jsx` | `/` | Path selection (Academic/Competitive/Career) |
| `InputPage.jsx` | `/setup` | User calibration/onboarding |
| `Dashboard.jsx` | `/dashboard` | Personalized learning hub |
| `AcademicExcellence.jsx` | `/academic` | Academic subject browser |
| `LearningContentPage.jsx` | `/academic/learn/:subject/:concept` | Core LAP learning flow |
| `CompetitivePage.jsx` | `/competitive` | Competitive exam prep |
| `DrillPage.jsx` | `/competitive/drill` | Speed drill practice |
| `CareerPage.jsx` | `/career` | Career development |
| `AcademicFlow.jsx` | `/academic/lap`, `/academic/test`, `/academic/reteach` | LAP flow pages |

### Data (`src/data/`)
| File | Purpose | Exports |
|------|---------|---------|
| `conceptSchema.js` | Curriculum structure | `operatingSystemsSchema`, `getSubConcept()`, `getNextSubConcept()`, `isPrerequisiteMet()` |
| `quizData.js` | Mock quiz questions | `quizData`, `getQuizForSubConcept()` |

### Services (`src/services/`)
| File | Purpose | Exports |
|------|---------|---------|
| `aiService.js` | Google Gemini AI integration | `generateExplanation()`, `generateQuiz()`, `evaluateConceptualAnswer()`, `generateSimplifiedExplanation()`, `generateAnalogy()` |

---

## 🧩 Component Props Reference {#component-props}

### AuthModal
```javascript
<AuthModal
  isOpen={boolean}              // Show/hide modal
  onClose={() => {}}            // Close handler
  defaultMode="signup"          // 'signup' | 'login'
  onAuthenticated={(data) => {}} // Success callback
/>
```

### QuizComponent
```javascript
<QuizComponent
  quiz={{                       // Quiz object
    mcqs: [                     // Array of MCQs
      {
        question: string,
        options: string[],      // 4 options
        correctAnswer: number   // 0-3
      }
    ],
    conceptual: {
      question: string,
      sampleAnswer: string
    }
  }}
  answers={{                    // Current answers
    mcqs: number[],             // Selected indices
    conceptual: string          // Text answer
  }}
  onAnswerChange={(answers) => {}} // Answer change handler
  onSubmit={(answers) => {}}    // Submit handler
/>
```

### ReteachView
```javascript
<ReteachView
  concept={{                    // Sub-concept object
    id: string,
    title: string,
    difficulty: string
  }}
  simplifiedExplanation={string} // Simplified explanation text
  onRetry={() => {}}            // Retry quiz handler
/>
```

### Navbar
```javascript
<Navbar />  // No props - self-contained
```

---

## 📊 Data Schema Reference {#data-schemas}

### Concept Schema
```javascript
{
  subject: "Operating Systems",
  concept: "CPU Scheduling",
  subConcepts: [
    {
      id: "unique-id",                    // String (kebab-case)
      title: "Concept Title",             // String
      difficulty: "Easy",                 // "Easy" | "Medium" | "Hard"
      prerequisites: ["prereq-id"],       // String[] (IDs)
      explanation: "Full explanation...", // String (200-300 words)
      simplifiedExplanation: "Simple..."  // String (150-200 words)
    }
  ]
}
```

### Quiz Data Schema
```javascript
{
  "sub-concept-id": {
    mcqs: [
      {
        question: "Question text?",       // String
        options: [                        // String[4]
          "Option A",
          "Option B",
          "Option C",
          "Option D"
        ],
        correctAnswer: 0                  // Number (0-3)
      }
      // ... 2 more (total 3 MCQs)
    ],
    conceptual: {
      question: "Conceptual question?",   // String
      sampleAnswer: "Sample answer..."    // String
    }
  }
}
```

### User Data Schema
```javascript
{
  skillLevel: "intermediate",             // "beginner" | "intermediate" | "advanced"
  hoursPerWeek: 10,                       // Number (2-40)
  resume: "resume.pdf",                   // String | null
  manualSkills: ["React", "Node.js"],     // String[]
  intent: "academic",                     // "academic" | "competitive" | "career"
  generatedAt: "2026-01-28T..."           // ISO 8601 timestamp
}
```

### Quiz Results Schema
```javascript
{
  score: 0.75,                            // Number (0-1)
  mcqScore: 0.67,                         // Number (0-1)
  conceptualScore: 0.85,                  // Number (0-1)
  passed: true,                           // Boolean (score >= 0.7)
  mcqResults: [                           // Boolean[]
    true,   // Q1 correct
    false,  // Q2 incorrect
    true    // Q3 correct
  ]
}
```

---

## 🤖 AI Service API Reference {#ai-service-api}

### generateExplanation()
```javascript
import { generateExplanation } from '../services/aiService';

const explanation = await generateExplanation(
  conceptTitle,      // String: "Round Robin"
  subject,           // String: "Operating Systems"
  difficulty,        // String: "Medium"
  prerequisites      // String[]: ["FCFS", "SJF"]
);
// Returns: String (200-300 words)
```

### generateQuiz()
```javascript
import { generateQuiz } from '../services/aiService';

const quiz = await generateQuiz(
  conceptTitle,      // String: "Round Robin"
  explanation        // String: Full explanation text
);
// Returns: { mcqs: [...], conceptual: {...} }
```

### evaluateConceptualAnswer()
```javascript
import { evaluateConceptualAnswer } from '../services/aiService';

const score = await evaluateConceptualAnswer(
  question,          // String: "Explain Round Robin..."
  studentAnswer,     // String: Student's answer
  sampleAnswer       // String: Reference answer
);
// Returns: Number (0.0 - 1.0)
```

### generateSimplifiedExplanation()
```javascript
import { generateSimplifiedExplanation } from '../services/aiService';

const simplified = await generateSimplifiedExplanation(
  conceptTitle,      // String: "Round Robin"
  originalExplanation // String: Original explanation
);
// Returns: String (150-200 words, simpler)
```

### generateAnalogy()
```javascript
import { generateAnalogy } from '../services/aiService';

const analogy = await generateAnalogy(
  conceptTitle,      // String: "Round Robin"
  explanation        // String: Full explanation
);
// Returns: String (2-3 sentences)
```

---

## 🗺️ Routing Reference {#routing}

### Route Definitions
```javascript
// Public Routes
/                                    → LandingPage
/setup                               → InputPage (requires userIntent)
/dashboard                           → Dashboard (requires userData)

// Academic Routes
/academic                            → AcademicExcellence
/academic/learn/:subject/:concept    → LearningContentPage
/academic/lap                        → LapPage
/academic/test                       → TestPage
/academic/reteach                    → ReteachPage

// Competitive Routes
/competitive                         → CompetitivePage
/competitive/drill                   → DrillPage

// Career Routes
/career                              → CareerPage
```

### Navigation Examples
```javascript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Navigate to learning page
navigate('/academic/learn/operating-systems/cpu-scheduling');

// Navigate with state
navigate('/dashboard', { state: { fromOnboarding: true } });

// Navigate back
navigate(-1);

// Replace current route
navigate('/dashboard', { replace: true });
```

---

## 🎨 Styling Reference {#styling}

### Color Palette

#### Intent-Based Colors
```javascript
// Academic (Indigo)
bg-indigo-50    text-indigo-600    border-indigo-200

// Competitive (Amber)
bg-amber-50     text-amber-600     border-amber-200

// Career (Emerald)
bg-emerald-50   text-emerald-600   border-emerald-200
```

#### Neutral Colors
```javascript
// Backgrounds
bg-slate-50     // Light background
bg-white        // Card backgrounds
bg-[#FAF9F4]    // Alternative light bg
bg-[#1F1F1F]    // Dark (sidebar, buttons)

// Text
text-slate-900  // Primary text
text-slate-600  // Secondary text
text-slate-400  // Tertiary text
text-white      // On dark backgrounds
```

#### Status Colors
```javascript
// Success
bg-green-50     text-green-600     border-green-200

// Warning
bg-amber-50     text-amber-600     border-amber-200

// Error
bg-red-50       text-red-600       border-red-200

// Info
bg-blue-50      text-blue-600      border-blue-200
```

### Common Component Styles

#### Card
```javascript
className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
```

#### Button (Primary)
```javascript
className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
```

#### Button (Secondary)
```javascript
className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition-all"
```

#### Input
```javascript
className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
```

#### Badge
```javascript
className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold"
```

### Layout Patterns

#### Sidebar Layout
```javascript
<div className="flex h-screen">
  {/* Sidebar */}
  <aside className="w-56 bg-[#1F1F1F] rounded-[1.5rem] p-4">
    {/* Sidebar content */}
  </aside>
  
  {/* Main content */}
  <main className="flex-1 overflow-y-auto p-6">
    {/* Page content */}
  </main>
</div>
```

#### Grid Layout
```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>
```

---

## 🔧 Common Patterns {#common-patterns}

### 1. Loading State Pattern
```javascript
const [isLoading, setIsLoading] = useState(false);

const loadData = async () => {
  setIsLoading(true);
  try {
    const data = await fetchData();
    setData(data);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setIsLoading(false);
  }
};

// In JSX
{isLoading ? (
  <div className="flex items-center gap-2">
    <Loader2 className="w-4 h-4 animate-spin" />
    Loading...
  </div>
) : (
  <Content />
)}
```

### 2. AI with Fallback Pattern
```javascript
const [useAI, setUseAI] = useState(true);

const loadContent = async () => {
  if (useAI) {
    try {
      const aiContent = await generateExplanation(...);
      setContent(aiContent);
    } catch (error) {
      console.error('AI failed, using fallback:', error);
      setContent(mockData.explanation);
    }
  } else {
    setContent(mockData.explanation);
  }
};
```

### 3. Form Handling Pattern
```javascript
const [formData, setFormData] = useState({
  field1: '',
  field2: ''
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Process formData
};

// In JSX
<form onSubmit={handleSubmit}>
  <input
    name="field1"
    value={formData.field1}
    onChange={handleChange}
  />
</form>
```

### 4. Conditional Rendering Pattern
```javascript
// Simple condition
{isLoggedIn && <UserMenu />}

// If-else
{isLoggedIn ? <UserMenu /> : <LoginButton />}

// Multiple conditions
{
  status === 'loading' ? <Spinner /> :
  status === 'error' ? <Error /> :
  status === 'success' ? <Content /> :
  <Empty />
}
```

### 5. List Rendering Pattern
```javascript
{items.map((item, index) => (
  <div key={item.id}>  {/* Use unique ID, not index */}
    {item.name}
  </div>
))}
```

### 6. Theme-Based Styling Pattern
```javascript
const getThemeColor = (intent) => {
  switch(intent) {
    case 'academic': return 'indigo';
    case 'competitive': return 'amber';
    case 'career': return 'emerald';
    default: return 'indigo';
  }
};

const color = getThemeColor(intent);
className={`bg-${color}-50 text-${color}-600`}
```

### 7. Progress Calculation Pattern
```javascript
const progress = (completedItems.length / totalItems.length) * 100;

// In JSX
<div className="w-full bg-slate-100 rounded-full h-2">
  <div 
    className="bg-indigo-600 h-2 rounded-full transition-all"
    style={{ width: `${progress}%` }}
  />
</div>
```

---

## 🔑 Environment Variables

### Required Variables
```bash
# .env file
VITE_GEMINI_API_KEY=your_api_key_here
```

### Accessing in Code
```javascript
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
```

### Notes
- Prefix with `VITE_` for Vite to expose to client
- Never commit `.env` to version control
- Use `.env.example` for documentation

---

## 🚀 Common Commands

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Git
```bash
git status           # Check status
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push             # Push to remote
```

---

## 🐛 Debugging Tips

### Check AI Integration
```javascript
// In browser console
console.log('API Key:', import.meta.env.VITE_GEMINI_API_KEY);
```

### Check Component State
```javascript
// Add to component
console.log('Current state:', { currentStep, currentSubConceptIndex });
```

### Check Props
```javascript
// In component
useEffect(() => {
  console.log('Props changed:', props);
}, [props]);
```

### Network Requests
- Open DevTools → Network tab
- Filter by "Fetch/XHR"
- Check request/response for AI calls

---

## 📝 Code Snippets

### Create New Sub-Concept
```javascript
// In conceptSchema.js
{
  id: "new-concept",
  title: "New Concept Title",
  difficulty: "Medium",
  prerequisites: ["prerequisite-id"],
  explanation: "Full explanation here...",
  simplifiedExplanation: "Simplified version..."
}
```

### Create New Quiz
```javascript
// In quizData.js
"new-concept": {
  mcqs: [
    {
      question: "Question 1?",
      options: ["A", "B", "C", "D"],
      correctAnswer: 0
    },
    // ... 2 more
  ],
  conceptual: {
    question: "Conceptual question?",
    sampleAnswer: "Sample answer..."
  }
}
```

### Add New Route
```javascript
// In App.jsx
<Route 
  path="/new-route" 
  element={<NewComponent />} 
/>
```

---

## 🔗 Useful Links

- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Lucide Icons**: https://lucide.dev
- **Gemini API**: https://ai.google.dev/docs
- **Vite Docs**: https://vitejs.dev

---

**Last Updated**: January 28, 2026
**Quick Reference Version**: 1.0
