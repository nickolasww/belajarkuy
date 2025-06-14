import Image from "next/image"
import Link from "next/link"
import PlayNowButton from "@/app/components/button/playnowbutton"
import type { StaticImageData } from "next/image"

interface QuizCardProps {
  quiz: {
    id: string
    title: string
    description: string
    image: string | StaticImageData
    difficulty: "Easy" | "Medium" | "Hard"
    duration: number // in minutes
    questionsCount: number
    points: number
  }
  className?: string
}

export default function QuizCard({ quiz, className = "" }: QuizCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      {/* Quiz Image */}
      <div className="relative aspect-video w-full">
        <Image
          src={quiz.image || "/placeholder.svg"}
          alt={quiz.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
            {quiz.difficulty}
          </span>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{quiz.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{quiz.description}</p>

        {/* Quiz Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            {/* <Clock className="w-4 h-4" /> */}
            <span>{quiz.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            {/* <BookOpen className="w-4 h-4" /> */}
            <span>{quiz.questionsCount} soal</span>
          </div>
          <div className="flex items-center gap-1">
            {/* <Trophy className="w-4 h-4" /> */}
            <span>{quiz.points} poin</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <PlayNowButton quizId={quiz.id} variant="primary" size="md" className="flex-1" />
          <Link
            href={`/quiz/${quiz.id}/preview`}
            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            Preview
          </Link>
        </div>
      </div>
    </div>
  )
}
