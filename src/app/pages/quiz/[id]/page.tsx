"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import QuizHeader from "@/app/pages/quiz/partials/header"
import QuestionCard from "@/app/components/card/questioncard"
import QuizResult from "@/app/pages/quiz/partials/result"
import type { Quiz, QuizAnswer, QuizResult as QuizResultType } from "@/app/types/quiz"

// Sample quiz data - In real app, this would come from API
const quizDatabase: Record<string, Quiz> = {
  "1": {
    id: "1",
    title: "Quiz JavaScript Fundamentals",
    description: "Uji pemahaman Anda tentang dasar-dasar JavaScript",
    timeLimit: 15,
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "Apa yang dimaksud dengan 'hoisting' dalam JavaScript?",
        options: [
          "Proses mengangkat variabel dan fungsi ke atas scope",
          "Proses menghapus variabel dari memory",
          "Proses mengubah tipe data variabel",
          "Proses menggabungkan dua string",
        ],
        correctAnswer: 0,
        explanation:
          "Hoisting adalah mekanisme JavaScript dimana deklarasi variabel dan fungsi dipindahkan ke atas scope mereka selama fase kompilasi.",
        points: 10,
      },
      {
        id: "q2",
        question: "Manakah cara yang benar untuk mendeklarasikan array dalam JavaScript?",
        options: ["let arr = (1, 2, 3)", "let arr = [1, 2, 3]", "let arr = {1, 2, 3}", "let arr = <1, 2, 3>"],
        correctAnswer: 1,
        explanation: "Array dalam JavaScript dideklarasikan menggunakan tanda kurung siku [].",
        points: 5,
      },
      {
        id: "q3",
        question: "Apa output dari console.log(typeof null)?",
        options: ["null", "undefined", "object", "boolean"],
        correctAnswer: 2,
        explanation:
          "Ini adalah bug yang terkenal dalam JavaScript. typeof null mengembalikan 'object' meskipun null bukan object.",
        points: 15,
      },
      {
        id: "q4",
        question: "Manakah yang merupakan method untuk menambahkan elemen ke akhir array?",
        options: ["array.add()", "array.append()", "array.push()", "array.insert()"],
        correctAnswer: 2,
        explanation: "Method push() digunakan untuk menambahkan satu atau lebih elemen ke akhir array.",
        points: 10,
      },
      {
        id: "q5",
        question: "Apa perbedaan antara '==' dan '===' dalam JavaScript?",
        options: [
          "Tidak ada perbedaan",
          "'==' membandingkan nilai, '===' membandingkan nilai dan tipe data",
          "'==' lebih cepat dari '==='",
          "'===' hanya untuk angka",
        ],
        correctAnswer: 1,
        explanation:
          "Operator '==' melakukan type coercion sebelum membandingkan, sedangkan '===' membandingkan nilai dan tipe data tanpa konversi.",
        points: 10,
      },
    ],
  },
  "2": {
    id: "2",
    title: "Quiz React Hooks",
    description: "Uji pemahaman Anda tentang React Hooks",
    timeLimit: 20,
    passingScore: 75,
    questions: [
      {
        id: "q1",
        question: "Apa fungsi utama dari useState hook?",
        options: [
          "Untuk mengatur routing",
          "Untuk mengelola state dalam functional component",
          "Untuk mengakses DOM",
          "Untuk membuat API call",
        ],
        correctAnswer: 1,
        explanation: "useState hook digunakan untuk mengelola state dalam functional component React.",
        points: 10,
      },
      {
        id: "q2",
        question: "Kapan useEffect hook dijalankan?",
        options: [
          "Hanya saat component mount",
          "Hanya saat component unmount",
          "Setelah setiap render",
          "Hanya saat state berubah",
        ],
        correctAnswer: 2,
        explanation: "useEffect dijalankan setelah setiap render, kecuali jika diberikan dependency array.",
        points: 15,
      },
    ],
  },
}

interface QuizPageProps {
  params: Promise<{
    id: string
  }>
}

export default function QuizPage({ params }: QuizPageProps) {
  // Unwrap params Promise using React.use()
  const resolvedParams = use(params)
  const router = useRouter()
  
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [quizStartTime] = useState<number>(Date.now())
  const [showResult, setShowResult] = useState(false)
  const [quizResult, setQuizResult] = useState<QuizResultType | null>(null)
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)

  // Load quiz data based on resolvedParams.id
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true)
        setError(null)

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const quizData = quizDatabase[resolvedParams.id]

        if (!quizData) {
          setError("Quiz tidak ditemukan")
          return
        }

        setQuiz(quizData)
        setTimeRemaining(quizData.timeLimit ? quizData.timeLimit * 60 : 0)
      } catch (err) {
        setError("Gagal memuat quiz")
        console.error("Error loading quiz:", err)
      } finally {
        setLoading(false)
      }
    }

    if (resolvedParams.id) {
      loadQuiz()
    }
  }, [resolvedParams.id])

  // Timer effect
  useEffect(() => {
    if (quiz?.timeLimit && timeRemaining > 0 && !isQuizCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleQuizSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [timeRemaining, isQuizCompleted, quiz?.timeLimit])

  const handleAnswerSelect = (answer: number) => {
    if (!quiz) return

    setAnswers((prev) => ({
      ...prev,
      [quiz.questions[currentQuestionIndex].id]: answer,
    }))
  }

  const handleNextQuestion = () => {
    if (!quiz) return

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      handleQuizSubmit()
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleQuizSubmit = () => {
    if (!quiz) return

    setIsQuizCompleted(true)
    const timeSpent = Math.floor((Date.now() - quizStartTime) / 1000)

    const quizAnswers: QuizAnswer[] = quiz.questions.map((question) => {
      const selectedAnswer = answers[question.id]
      const isCorrect = selectedAnswer === question.correctAnswer
      return {
        questionId: question.id,
        selectedAnswer: selectedAnswer ?? -1,
        isCorrect,
        points: isCorrect ? question.points : 0,
      }
    })

    const totalPoints = quizAnswers.reduce((sum, answer) => sum + answer.points, 0)
    const maxPoints = quiz.questions.reduce((sum, question) => sum + question.points, 0)
    const correctAnswers = quizAnswers.filter((answer) => answer.isCorrect).length
    const percentage = (correctAnswers / quiz.questions.length) * 100

    const result: QuizResultType = {
      totalQuestions: quiz.questions.length,
      correctAnswers,
      totalPoints,
      maxPoints,
      percentage,
      passed: percentage >= quiz.passingScore,
      timeSpent,
      answers: quizAnswers,
    }

    setQuizResult(result)
    setShowResult(true)

    // Save result to localStorage or send to API
    try {
      const savedResults = JSON.parse(localStorage.getItem("quizResults") || "[]")
      savedResults.push({
        quizId: quiz.id,
        result,
        completedAt: new Date().toISOString(),
      })
      localStorage.setItem("quizResults", JSON.stringify(savedResults))
    } catch (err) {
      console.error("Error saving quiz result:", err)
    }
  }

  const handleRetry = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setTimeRemaining(quiz?.timeLimit ? quiz.timeLimit * 60 : 0)
    setShowResult(false)
    setQuizResult(null)
    setIsQuizCompleted(false)
  }

  const handleBackToCourse = () => {
    router.push("/pages/quiz")
  }

  const handleExitQuiz = () => {
    const confirmExit = window.confirm("Apakah Anda yakin ingin keluar dari quiz? Progress akan hilang.")
    if (confirmExit) {
      router.push("/pages/quiz")
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat quiz...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">{error || "Quiz yang Anda cari tidak tersedia."}</p>
          <button
            onClick={() => router.push("/pages/quiz")}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Kembali ke Daftar Quiz
          </button>
        </div>
      </div>
    )
  }

  // Show result
  if (showResult && quizResult) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <QuizResult result={quizResult} onRetry={handleRetry} onBackToCourse={handleBackToCourse} quiz={quiz} />
      </div>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const selectedAnswer = answers[currentQuestion.id]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Exit Quiz Button */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleExitQuiz}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2"
          >
            ← Keluar Quiz
          </button>
          <div className="text-sm text-gray-500">Quiz ID: {resolvedParams.id}</div>
        </div>

        <QuizHeader
          title={quiz.title}
          description={quiz.description}
          totalQuestions={quiz.questions.length}
          timeLimit={quiz.timeLimit}
          currentQuestion={currentQuestionIndex + 1}
          timeRemaining={timeRemaining}
        />

        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
        />

        {/* Progress Bar */}
        <div className="mt-6 mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>
              {currentQuestionIndex + 1} dari {quiz.questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>

          <div className="flex gap-4">
            <button
              onClick={handleQuizSubmit}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Selesai Quiz
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === undefined}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex === quiz.questions.length - 1 ? "Selesai" : "Selanjutnya"}
            </button>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Navigasi Soal</h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                  index === currentQuestionIndex
                    ? "bg-orange-600 text-white"
                    : answers[quiz.questions[index].id] !== undefined
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
