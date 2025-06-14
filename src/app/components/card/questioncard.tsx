"use client"

import { useState } from "react"
import type { QuizQuestion } from "@/app/types/quiz"

interface QuestionCardProps {
  question: QuizQuestion
  questionNumber: number
  selectedAnswer?: number
  onAnswerSelect: (answer: number) => void
  showResult?: boolean
  disabled?: boolean
}

export default function QuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  onAnswerSelect,
  showResult = false,
  disabled = false,
}: QuestionCardProps) {
  const [hoveredOption, setHoveredOption] = useState<number | null>(null)

  const getOptionStyle = (index: number) => {
    let baseStyle = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 "

    if (disabled) {
      baseStyle += "cursor-not-allowed "
    } else {
      baseStyle += "cursor-pointer hover:border-blue-300 "
    }

    if (showResult) {
      if (index === question.correctAnswer) {
        baseStyle += "border-green-500 bg-green-50 text-green-800 "
      } else if (index === selectedAnswer && index !== question.correctAnswer) {
        baseStyle += "border-red-500 bg-red-50 text-red-800 "
      } else {
        baseStyle += "border-gray-200 bg-gray-50 text-gray-600 "
      }
    } else {
      if (selectedAnswer === index) {
        baseStyle += "border-blue-500 bg-blue-50 text-blue-800 "
      } else if (hoveredOption === index) {
        baseStyle += "border-blue-300 bg-blue-25 "
      } else {
        baseStyle += "border-gray-200 hover:bg-gray-50 "
      }
    }

    return baseStyle
  }

  const getOptionIcon = (index: number) => {
    if (!showResult) return null

    if (index === question.correctAnswer) {
      // return <CheckCircle className="w-5 h-5 text-green-500" />
    } else if (index === selectedAnswer && index !== question.correctAnswer) {
      // return <XCircle className="w-5 h-5 text-red-500" />
    }
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Pertanyaan {questionNumber}
          </span>
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
            {question.points} poin
          </span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">{question.question}</h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !disabled && onAnswerSelect(index)}
            onMouseEnter={() => setHoveredOption(index)}
            onMouseLeave={() => setHoveredOption(null)}
            className={getOptionStyle(index)}
            disabled={disabled}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="font-medium">{option}</span>
              </div>
              {getOptionIcon(index)}
            </div>
          </button>
        ))}
      </div>

      {showResult && question.explanation && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Penjelasan:</h4>
          <p className="text-blue-800 text-sm leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  )
}
