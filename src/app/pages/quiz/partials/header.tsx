import { FaClock } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";


interface QuizHeaderProps {
  title: string
  description: string
  totalQuestions: number
  timeLimit?: number
  currentQuestion: number
  timeRemaining?: number
}

export default function QuizHeader({
  title,
  description,
  totalQuestions,
  timeLimit,
  currentQuestion,
  timeRemaining,
}: QuizHeaderProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        {timeLimit && timeRemaining !== undefined && (
          <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg">
            <FaClock className="w-5 h-5 text-orange-500" />
            <span className={`font-medium ${timeRemaining < 300 ? "text-red-500" : "text-orange-500"}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FiBookOpen className="w-4 h-4" />
          <span>
            Pertanyaan {currentQuestion} dari {totalQuestions}
          </span>
        </div>
        {timeLimit && (
          <div className="flex items-center gap-2">
            <FaClock  className="w-4 h-4" />
            <span>Batas waktu: {timeLimit} menit</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round((currentQuestion / totalQuestions) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
