"use client"

import { useRouter } from "next/navigation"

interface PlayNowButtonProps {
  quizId: string
  className?: string
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
}

export default function PlayNowButton({
  quizId,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
}: PlayNowButtonProps) {
  const router = useRouter()

  const handlePlayNow = () => {
    if (!disabled) {
      router.push(`/pages/quiz/${quizId}`)
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-500 hover:bg-blue-600 text-white"
      case "secondary":
        return "bg-orange-500 hover:bg-orange-600 text-white"
      case "outline":
        return "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
      default:
        return "bg-blue-500 hover:bg-blue-600 text-white"
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-4 py-2 text-sm"
      case "md":
        return "px-6 py-3 text-base"
      case "lg":
        return "px-8 py-4 text-lg"
      default:
        return "px-6 py-3 text-base"
    }
  }

  return (
    <button
      onClick={handlePlayNow}
      disabled={disabled}
      className={`
        flex items-center gap-2 rounded-lg font-medium transition-all duration-200
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg transform hover:scale-105"}
        ${className}
      `}
    >
      {/* <Play className="w-5 h-5" /> */}
      Play Now
    </button>
  )
}
