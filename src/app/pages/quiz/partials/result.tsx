"use client"

import { useRouter } from "next/navigation"
import type { QuizResult, Quiz } from "@/app/types/quiz"
import { FaTrophy, FaClock, FaShare, FaDownload } from "react-icons/fa"
import { FiTarget, FiHome } from "react-icons/fi"
import { LuRotateCcw } from "react-icons/lu"
import { IoMdStats } from "react-icons/io"

interface QuizResultProps {
  result: QuizResult
  quiz: Quiz
  onRetry: () => void
  onBackToCourse: () => void
}

export default function QuizResult({ result, quiz, onRetry, onBackToCourse }: QuizResultProps) {
  const router = useRouter()

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes} menit ${secs} detik`
  }

  const getScoreColor = () => {
    if (result.percentage >= 80) return "text-green-600"
    if (result.percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = () => {
    if (result.percentage >= 80) return "bg-green-50 border-green-200"
    if (result.percentage >= 60) return "bg-yellow-50 border-yellow-200"
    return "bg-red-50 border-red-200"
  }

  const getPerformanceMessage = () => {
    if (result.percentage >= 90) return "Luar biasa! Anda menguasai materi dengan sangat baik!"
    if (result.percentage >= 80) return "Bagus sekali! Anda memahami sebagian besar materi."
    if (result.percentage >= 70) return "Cukup baik! Masih ada ruang untuk perbaikan."
    if (result.percentage >= 60) return "Lumayan! Coba pelajari lagi materi yang belum dikuasai."
    return "Perlu belajar lebih giat lagi. Jangan menyerah!"
  }

  const handleShareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: `Hasil Quiz: ${quiz.title}`,
        text: `Saya baru saja menyelesaikan quiz "${quiz.title}" dengan skor ${Math.round(result.percentage)}%!`,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      const shareText = `Saya baru saja menyelesaikan quiz "${quiz.title}" dengan skor ${Math.round(result.percentage)}%! ${window.location.href}`
      navigator.clipboard.writeText(shareText).then(() => {
        alert("Link berhasil disalin ke clipboard!")
      })
    }
  }

  const handleDownloadCertificate = () => {
    // Simulate certificate download
    alert("Fitur download sertifikat akan segera tersedia!")
  }

  const handleViewAllQuizzes = () => {
    router.push("/pages/quiz")
  }

  const handleViewProfile = () => {
    router.push("/pages/profile")
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Quiz Info Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{quiz.title}</h2>
            <p className="text-gray-600 mt-1">{quiz.description}</p>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p>Quiz ID: {quiz.id}</p>
            <p>Passing Score: {quiz.passingScore}%</p>
          </div>
        </div>
      </div>

      {/* Result Header */}
      <div className={`text-center p-8 rounded-lg border-2 ${getScoreBg()} mb-8`}>
        <div className="mb-4">
          {result.passed ? (
            <FaTrophy className="w-16 h-16 text-yellow-500 mx-auto animate-bounce" />
          ) : (
            <FiTarget className="w-16 h-16 text-gray-400 mx-auto" />
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {result.passed ? "🎉 Selamat! Quiz Berhasil" : "📚 Quiz Selesai"}
        </h1>
        <p className="text-gray-600 mb-4">{getPerformanceMessage()}</p>

        <div className={`text-6xl font-bold ${getScoreColor()} mb-2`}>{Math.round(result.percentage)}%</div>
        <p className="text-gray-600 mb-4">
          {result.correctAnswers} dari {result.totalQuestions} jawaban benar
        </p>

        {result.passed && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <FaTrophy className="w-4 h-4" />
            Anda Lulus! Skor di atas {quiz.passingScore}%
          </div>
        )}
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow">
          <FiTarget className="w-8 h-8 text-blue-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">{result.totalPoints}</div>
          <div className="text-sm text-gray-600">Total Poin</div>
          <div className="text-xs text-gray-500 mt-1">dari {result.maxPoints} poin</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow">
          <FaTrophy className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">{result.correctAnswers}</div>
          <div className="text-sm text-gray-600">Jawaban Benar</div>
          <div className="text-xs text-gray-500 mt-1">dari {result.totalQuestions} soal</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow">
          <FaClock className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">{formatTime(result.timeSpent)}</div>
          <div className="text-sm text-gray-600">Waktu Pengerjaan</div>
          <div className="text-xs text-gray-500 mt-1">
            {quiz.timeLimit ? `dari ${quiz.timeLimit} menit` : "Tanpa batas waktu"}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow">
          <IoMdStats className="w-8 h-8 text-purple-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {Math.round((result.totalPoints / result.maxPoints) * 100)}%
          </div>
          <div className="text-sm text-gray-600">Efisiensi Poin</div>
          <div className="text-xs text-gray-500 mt-1">Poin yang diperoleh</div>
        </div>
      </div>

      {/* Answer Review */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Review Jawaban</h3>
          <div className="text-sm text-gray-500">
            Benar: {result.answers.filter((a) => a.isCorrect).length} | Salah:{" "}
            {result.answers.filter((a) => !a.isCorrect).length}
          </div>
        </div>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {result.answers.map((answer, index) => {
            const question = quiz.questions.find((q) => q.id === answer.questionId)
            return (
              <div key={answer.questionId} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{question?.question}</p>
                      {question && (
                        <div className="mt-2 text-sm">
                          <p className="text-gray-600">
                            <span className="font-medium">Jawaban Anda:</span>{" "}
                            {answer.selectedAnswer >= 0 ? question.options[answer.selectedAnswer] : "Tidak dijawab"}
                          </p>
                          {!answer.isCorrect && (
                            <p className="text-green-600">
                              <span className="font-medium">Jawaban Benar:</span>{" "}
                              {question.options[question.correctAnswer]}
                            </p>
                          )}
                          {question.explanation && (
                            <p className="text-blue-600 mt-1">
                              <span className="font-medium">Penjelasan:</span> {question.explanation}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        answer.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {answer.isCorrect ? "✓ Benar" : "✗ Salah"}
                    </span>
                    <span className="text-sm text-gray-600 font-medium">+{answer.points} poin</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button
          onClick={onRetry}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <LuRotateCcw className="w-5 h-5" />
          Coba Lagi
        </button>

        <button
          onClick={handleViewAllQuizzes}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <FiHome className="w-5 h-5" />
          Quiz Lainnya
        </button>

        <button
          onClick={handleShareResult}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <FaShare className="w-5 h-5" />
          Bagikan Hasil
        </button>

        {result.passed && (
          <button
            onClick={handleDownloadCertificate}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <FaDownload className="w-5 h-5" />
            Sertifikat
          </button>
        )}
      </div>

      {/* Additional Actions */}
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">Langkah Selanjutnya</h4>
        <p className="text-gray-600 mb-4">
          {result.passed
            ? "Bagus! Lanjutkan dengan quiz lain atau lihat progress Anda di profil."
            : "Jangan menyerah! Pelajari materi lagi dan coba quiz ini sekali lagi."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleViewProfile}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Lihat Profil & Progress
          </button>
          <button
            onClick={onBackToCourse}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Kembali ke Kursus
          </button>
        </div>
      </div>
    </div>
  )
}
