export interface CourseDetail {
  id: string
  title: string
  category: string
  image: string
  rating: number
  studentsCount: string
  isFree: boolean
  price?: number
  description: string
  instructor: {
    name: string
    avatar: string
    title: string
  }
  duration: string
  lessonsCount: number
  level: string
  videoUrl: string
  curriculum: CurriculumModule[]
  reviews: CourseReview[]
}

export interface CurriculumModule {
  id: string
  title: string
  lessons: CurriculumLesson[]
}

export interface CurriculumLesson {
  id: string
  title: string
  duration: string
  isCompleted: boolean
}

export interface CourseReview {
  id: string
  user: {
    name: string
    avatar: string
  }
  rating: number
  comment: string
  date: string
}

export interface Course {
  id: string
  title: string
  category: string
  image: string
  rating: number
  studentsCount: string
}
