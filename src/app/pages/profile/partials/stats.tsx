import { FaGraduationCap, FaTrophy, FaStar, FaClock } from "react-icons/fa"
import type { ProfileStats } from "@/app/types/profile"

interface StatsCardsProps {
  stats: ProfileStats
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
        <FaGraduationCap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
        <p className="text-2xl font-bold text-gray-900">{stats.completedCourses}</p>
        <p className="text-sm text-gray-600">Courses Completed</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
        <FaTrophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
        <p className="text-2xl font-bold text-gray-900">{stats.totalQuizzes}</p>
        <p className="text-sm text-gray-600">Quizzes Taken</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
        <FaStar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
        <p className="text-2xl font-bold text-gray-900">{stats.averageQuizScore}%</p>
        <p className="text-sm text-gray-600">Avg Quiz Score</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
        <FaClock className="w-8 h-8 text-green-600 mx-auto mb-2" />
        <p className="text-2xl font-bold text-gray-900">{stats.totalLearningHours}h</p>
        <p className="text-sm text-gray-600">Learning Hours</p>
      </div>
    </div>
  )
}
