import { FaTrophy } from "react-icons/fa"
import type { Quiz } from "@/app/types/profile"
import { getDifficultyColor } from "@/app/utils/profile-utils"

interface QuizzesTabProps {
  quizHistory: Quiz[]
}

export default function QuizzesTab({ quizHistory }: QuizzesTabProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Quiz History ({quizHistory.length})</h3>
        <select className="px-3 py-2 border border-gray-300 rounded-lg">
          <option>All Quizzes</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
      <div className="space-y-4">
        {quizHistory.map((quiz) => (
          <div key={quiz.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FaTrophy className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h4 className="font-medium">{quiz.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                  <span className="text-sm text-gray-600">{new Date(quiz.completedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">
                {quiz.score}/{quiz.maxScore}
              </p>
              <p className="text-sm text-gray-600">{Math.round((quiz.score / quiz.maxScore) * 100)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
