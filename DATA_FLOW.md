# MasteryLoop - Data Flow & State Management

## 🔄 Application State Flow

### Global State (App.jsx)
```javascript
{
  userIntent: null | 'academic' | 'competitive' | 'career',
  userData: {
    skillLevel: 'beginner' | 'intermediate' | 'advanced',
    hoursPerWeek: number (2-40),
    resume: string | null,
    manualSkills: string[],
    intent: string,
    generatedAt: ISO timestamp
  },
  isAuthenticated: boolean
}
```

---

## 📊 Data Flow Diagrams

### 1. User Onboarding Flow

```
┌─────────────────┐
│  Landing Page   │
│  (Select Path)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Auth Modal    │
│ (Signup/Login)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Input Page    │
│  (Calibration)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Dashboard    │
│ (Personalized)  │
└─────────────────┘
```

### 2. Academic Learning Flow (LAP)

```
┌──────────────────────────────────────────────────────────────┐
│                    Academic Excellence                        │
│                  (Subject/Concept Browser)                    │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                  Learning Content Page                        │
│                    (LAP Flow Engine)                          │
└──────────────────────┬───────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
┌──────────────┐ ┌──────────┐ ┌─────────────┐
│ conceptSchema│ │aiService │ │  quizData   │
│   (Static)   │ │   (AI)   │ │  (Static)   │
└──────┬───────┘ └────┬─────┘ └──────┬──────┘
       │              │              │
       └──────────────┼──────────────┘
                      │
                      ▼
        ┌─────────────────────────┐
        │   Learning State        │
        │  ┌───────────────────┐  │
        │  │ currentStep       │  │
        │  │ currentSubConcept │  │
        │  │ explanation       │  │
        │  │ quiz              │  │
        │  │ score             │  │
        │  │ completedConcepts │  │
        │  └───────────────────┘  │
        └─────────────────────────┘
```

### 3. LAP Step-by-Step Flow

```
START
  │
  ▼
┌─────────────────┐
│   STEP A:       │
│  Introduction   │
│  - Overview     │
│  - Objectives   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   STEP B:       │
│   Learning      │
│  - AI/Mock      │
│  - Explanation  │
│  - Analogy      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   STEP C:       │
│     Quiz        │
│  - 3 MCQs       │
│  - 1 Conceptual │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   STEP D:       │
│  Evaluation     │
│  - MCQ Auto     │
│  - AI Eval      │
│  - Calculate %  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
Score ≥ 70%   Score < 70%
    │         │
    ▼         ▼
┌─────────┐ ┌─────────────┐
│ STEP F: │ │   STEP E:   │
│Continue │ │  Re-teach   │
│  Next   │ │ - Simplified│
│Concept  │ │ - Retry     │
└─────────┘ └──────┬──────┘
                   │
                   └──────┐
                          │
                          ▼
                    ┌──────────┐
                    │ STEP C:  │
                    │  Retry   │
                    │  Quiz    │
                    └──────────┘
```

### 4. AI Service Data Flow

```
┌─────────────────────────────────────────────────────────┐
│              LearningContentPage.jsx                    │
│                                                         │
│  useEffect(() => {                                      │
│    loadAIContent()  ──────────────────┐                │
│  }, [currentSubConceptIndex])         │                │
└───────────────────────────────────────┼────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────┐
│                  aiService.js                           │
│                                                         │
│  ┌────────────────────────────────────────────┐        │
│  │  generateExplanation()                     │        │
│  │    ├─> Gemini API                          │        │
│  │    └─> Returns: explanation text           │        │
│  └────────────────────────────────────────────┘        │
│                                                         │
│  ┌────────────────────────────────────────────┐        │
│  │  generateAnalogy()                         │        │
│  │    ├─> Gemini API                          │        │
│  │    └─> Returns: analogy text               │        │
│  └────────────────────────────────────────────┘        │
│                                                         │
│  ┌────────────────────────────────────────────┐        │
│  │  generateQuiz()                            │        │
│  │    ├─> Gemini API                          │        │
│  │    └─> Returns: { mcqs[], conceptual }     │        │
│  └────────────────────────────────────────────┘        │
│                                                         │
│  ┌────────────────────────────────────────────┐        │
│  │  evaluateConceptualAnswer()                │        │
│  │    ├─> Gemini API                          │        │
│  │    └─> Returns: score (0.0 - 1.0)          │        │
│  └────────────────────────────────────────────┘        │
│                                                         │
│  ┌────────────────────────────────────────────┐        │
│  │  generateSimplifiedExplanation()           │        │
│  │    ├─> Gemini API                          │        │
│  │    └─> Returns: simplified text            │        │
│  └────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              Google Gemini API                          │
│                                                         │
│  Model: gemini-pro                                      │
│  Rate Limits:                                           │
│    - 60 requests/minute                                 │
│    - 1,500 requests/day                                 │
│                                                         │
│  Fallback: Mock data from conceptSchema.js/quizData.js │
└─────────────────────────────────────────────────────────┘
```

---

## 🗂️ Data Structures

### 1. Concept Schema Structure

```javascript
// src/data/conceptSchema.js
export const operatingSystemsSchema = {
  subject: "Operating Systems",
  concept: "CPU Scheduling",
  subConcepts: [
    {
      id: "why-scheduling",              // Unique identifier
      title: "Why scheduling is needed", // Display name
      difficulty: "Easy",                // Easy | Medium | Hard
      prerequisites: [],                 // Array of prerequisite IDs
      explanation: "...",                // Full explanation text
      simplifiedExplanation: "..."       // Simplified version
    }
    // ... more sub-concepts
  ]
}

// Helper functions
getSubConcept(id)                    // Returns sub-concept by ID
getNextSubConcept(currentId)         // Returns next in sequence
isPrerequisiteMet(id, completedIds)  // Checks prerequisites
```

### 2. Quiz Data Structure

```javascript
// src/data/quizData.js
export const quizData = {
  "sub-concept-id": {
    mcqs: [
      {
        question: "Question text",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: 0  // Index of correct option (0-3)
      }
      // ... 2 more MCQs (total 3)
    ],
    conceptual: {
      question: "Conceptual question text",
      sampleAnswer: "Sample answer for AI evaluation"
    }
  }
  // ... more sub-concepts
}

// Helper function
getQuizForSubConcept(subConceptId)  // Returns quiz for sub-concept
```

### 3. Learning State (LearningContentPage.jsx)

```javascript
// Component State
const [currentStep, setCurrentStep] = useState('intro')
// Possible values: 'intro' | 'learn' | 'quiz' | 'results' | 'reteach'

const [currentSubConceptIndex, setCurrentSubConceptIndex] = useState(0)
// Index in subConcepts array

const [completedSubConcepts, setCompletedSubConcepts] = useState([])
// Array of completed sub-concept IDs

const [explanation, setExplanation] = useState('')
// AI-generated or mock explanation

const [analogy, setAnalogy] = useState('')
// AI-generated analogy

const [currentQuiz, setCurrentQuiz] = useState(null)
// Current quiz object { mcqs[], conceptual }

const [quizAnswers, setQuizAnswers] = useState({
  mcqs: [],           // Array of selected indices
  conceptual: ''      // Text answer
})

const [quizResults, setQuizResults] = useState(null)
// { score, mcqScore, conceptualScore, passed }

const [isLoadingAI, setIsLoadingAI] = useState(false)
// Loading state for AI calls

const [useAI, setUseAI] = useState(true)
// Toggle AI vs mock data
```

### 4. User Data Structure

```javascript
// Stored in App.jsx state and passed to components
const userData = {
  skillLevel: 'intermediate',     // beginner | intermediate | advanced
  hoursPerWeek: 10,               // 2-40
  resume: null,                   // filename or null
  manualSkills: [                 // Array of selected skills
    'React',
    'Node.js',
    'Python'
  ],
  intent: 'academic',             // academic | competitive | career
  generatedAt: '2026-01-28T...'   // ISO timestamp
}
```

---

## 🔀 Component Communication

### Props Drilling Pattern

```
App.jsx
  │
  ├─> LandingPage
  │     └─> setIntent(intent) ──┐
  │                              │
  ├─> InputPage                  │
  │     ├─ intent ◄──────────────┘
  │     └─> setUserData(data) ──┐
  │                              │
  └─> Dashboard                  │
        ├─ intent                │
        └─ userData ◄────────────┘
```

### Route-Based Navigation

```javascript
// App.jsx routing structure
<Routes>
  <Route path="/" element={<LandingPage />} />
  
  <Route path="/academic" element={<AcademicExcellence />} />
  <Route path="/academic/learn/:subject/:concept" 
         element={<LearningContentPage />} />
  
  <Route path="/competitive" element={<CompetitivePage />} />
  <Route path="/competitive/drill" element={<DrillPage />} />
  
  <Route path="/career" element={<CareerPage />} />
  
  <Route path="/setup" element={<InputPage />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
```

---

## 📡 API Integration Points

### Current Implementation (Client-Side Only)

```
┌──────────────────┐
│  React Frontend  │
│                  │
│  ┌────────────┐  │
│  │ aiService  │  │
│  └─────┬──────┘  │
│        │         │
└────────┼─────────┘
         │
         ▼
┌──────────────────┐
│  Gemini API      │
│  (Google Cloud)  │
└──────────────────┘
```

### Recommended Production Architecture

```
┌──────────────────┐
│  React Frontend  │
│                  │
│  ┌────────────┐  │
│  │   fetch()  │  │
│  └─────┬──────┘  │
│        │         │
└────────┼─────────┘
         │
         ▼
┌──────────────────┐
│  Backend API     │
│  (Node/Express)  │
│                  │
│  ┌────────────┐  │
│  │ aiService  │  │
│  └─────┬──────┘  │
│        │         │
│  ┌────────────┐  │
│  │ Database   │  │
│  │ (Progress) │  │
│  └────────────┘  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Gemini API      │
│  (Secure)        │
└──────────────────┘
```

---

## 🔄 State Update Patterns

### 1. Quiz Answer Selection (MCQ)

```javascript
// User clicks option
handleMCQAnswer(questionIndex, optionIndex)
  │
  ├─> Update quizAnswers state
  │     quizAnswers.mcqs[questionIndex] = optionIndex
  │
  └─> Re-render QuizComponent with new selection
```

### 2. Quiz Submission & Evaluation

```javascript
handleQuizSubmit(answers)
  │
  ├─> evaluateQuiz(answers)
  │     │
  │     ├─> Grade MCQs (auto)
  │     │     mcqScore = correct / total
  │     │
  │     ├─> Evaluate Conceptual (AI)
  │     │     conceptualScore = await evaluateConceptualAnswer(...)
  │     │
  │     └─> Calculate final score
  │           finalScore = (mcqScore * 0.75) + (conceptualScore * 0.25)
  │
  ├─> setQuizResults({ score, passed: score >= 70 })
  │
  └─> setCurrentStep(passed ? 'results' : 'reteach')
```

### 3. Concept Progression

```javascript
handleContinue()
  │
  ├─> Add current concept to completedSubConcepts
  │
  ├─> Check if more concepts exist
  │     │
  │     ├─ YES: Increment currentSubConceptIndex
  │     │       Reset state (step, quiz, results)
  │     │       Load new AI content
  │     │
  │     └─ NO:  Show completion screen
  │             Navigate to dashboard
```

---

## 🎯 Key Data Transformations

### 1. AI Response → Quiz Object

```javascript
// AI returns JSON string
const aiResponse = `{
  "mcqs": [...],
  "conceptual": {...}
}`

// Transform
const cleanedResponse = aiResponse
  .replace(/```json\n?/g, '')
  .replace(/```\n?/g, '')
  .trim()

const quiz = JSON.parse(cleanedResponse)

// Validate
if (!quiz.mcqs || quiz.mcqs.length !== 3) {
  throw new Error('Invalid quiz structure')
}
```

### 2. Quiz Answers → Score

```javascript
// Input
const answers = {
  mcqs: [0, 2, 1],        // Selected option indices
  conceptual: "..."       // Text answer
}

const quiz = {
  mcqs: [
    { correctAnswer: 0 },
    { correctAnswer: 1 },
    { correctAnswer: 1 }
  ],
  conceptual: { sampleAnswer: "..." }
}

// Transform
const mcqCorrect = answers.mcqs.filter(
  (ans, i) => ans === quiz.mcqs[i].correctAnswer
).length

const mcqScore = mcqCorrect / quiz.mcqs.length  // 0.33

const conceptualScore = await evaluateConceptualAnswer(...)  // 0.7

const finalScore = (mcqScore * 0.75) + (conceptualScore * 0.25)  // 0.42
const passed = finalScore >= 0.7  // false
```

### 3. Concept Progress → UI State

```javascript
// Input
const completedSubConcepts = ['why-scheduling', 'scheduling-criteria']
const allSubConcepts = operatingSystemsSchema.subConcepts  // 6 total

// Transform
const progress = (completedSubConcepts.length / allSubConcepts.length) * 100
// progress = 33.33%

// UI Rendering
subConcepts.map(concept => ({
  ...concept,
  isCompleted: completedSubConcepts.includes(concept.id),
  isLocked: !isPrerequisiteMet(concept.id, completedSubConcepts),
  isCurrent: concept.id === currentSubConcept.id
}))
```

---

## 🔐 Data Persistence (Current vs Ideal)

### Current (Client-Side Only)
```
┌──────────────────┐
│  Browser Memory  │
│  (useState)      │
│                  │
│  ❌ Lost on      │
│     refresh      │
└──────────────────┘
```

### Ideal (With Backend)
```
┌──────────────────┐
│  Browser Memory  │
│  (useState)      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Local Storage   │
│  (Temporary)     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Backend API     │
│  (Sync)          │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Database        │
│  (PostgreSQL/    │
│   MongoDB)       │
│                  │
│  ✅ Persistent   │
└──────────────────┘
```

---

## 📊 Performance Considerations

### AI Call Optimization

```javascript
// Current: Generate on every load
useEffect(() => {
  loadAIContent()  // Calls AI every time
}, [currentSubConceptIndex])

// Optimized: Cache responses
const [contentCache, setContentCache] = useState({})

useEffect(() => {
  const conceptId = currentSubConcept.id
  
  if (contentCache[conceptId]) {
    // Use cached content
    setExplanation(contentCache[conceptId].explanation)
    setAnalogy(contentCache[conceptId].analogy)
  } else {
    // Generate and cache
    loadAIContent().then(content => {
      setContentCache(prev => ({
        ...prev,
        [conceptId]: content
      }))
    })
  }
}, [currentSubConceptIndex])
```

---

**Last Updated**: January 28, 2026
**Status**: ✅ Documented
