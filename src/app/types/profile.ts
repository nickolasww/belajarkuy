export type User = {
  name: string
  email: string
  avatar?: string
  bio?: string
  location?: string
  website?: string
  joinDate?: string
  lastActive?: string
}

export type Course = {
  id: string
  title: string
  category: string
  progress: number
  rating?: number
  completedAt?: string
  image: string
}

export type Quiz = {
  id: string
  title: string
  score: number
  maxScore: number
  completedAt: string
  difficulty: "Easy" | "Medium" | "Hard"
}

export type Achievement = {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
}

export type ProfileStats = {
  completedCourses: number
  totalQuizzes: number
  averageQuizScore: number
  totalLearningHours: number
}
