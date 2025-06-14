export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
  points: number
}

export interface Quiz {
  id: string
  title: string
  description: string
  questions: QuizQuestion[]
  timeLimit?: number // in minutes
  passingScore: number
}

export interface QuizAnswer {
  questionId: string
  selectedAnswer: number
  isCorrect: boolean
  points: number
}

export interface QuizResult {
  totalQuestions: number
  correctAnswers: number
  totalPoints: number
  maxPoints: number
  percentage: number
  passed: boolean
  timeSpent: number
  answers: QuizAnswer[]
}
