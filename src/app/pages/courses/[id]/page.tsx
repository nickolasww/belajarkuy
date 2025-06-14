import { notFound } from "next/navigation"
import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import VideoPlayer from "@/app/pages/courses/partials/vidioplayer"
import CourseCurriculum from "@/app/pages/courses/partials/curriculumn"
import type { CourseDetail } from "@/app/types/courses"
import { FaArrowLeft } from "react-icons/fa6"
import { CiStar } from "react-icons/ci"
import { FiUsers } from "react-icons/fi"
import { CiClock1 } from "react-icons/ci"
import { FiBarChart } from "react-icons/fi"

// Sample course detail data - Updated with YouTube URLs
const getCourseDetail = (id: string): CourseDetail | null => {
  const courseDetails: Record<string, CourseDetail> = {
    "1": {
      id: "1",
      title: "Next Js For Beginners",
      category: "DEVELOPMENT",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      studentsCount: "265.7K",
      isFree: true,
      description:
        "Pelajari cara menggunakan Next Js dari dasar hingga mahir. Kursus ini akan mengajarkan Anda cara membuat website responsif tanpa coding menggunakan platform Webflow yang powerful.",
      instructor: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "Web Designer & Webflow Expert",
      },
      duration: "4 jam 30 menit",
      lessonsCount: 25,
      level: "Pemula",
      videoUrl: "https://www.youtube.com/watch?v=6h649f2fB9Q", // Webflow tutorial
      curriculum: [
        {
          id: "module-1",
          title: "Pengenalan Next Js",
          lessons: [
            { id: "lesson-1", title: "Apa itu Next Js?", duration: "10:30", isCompleted: true },
            { id: "lesson-2", title: "Membuat File Baru di Next JS", duration: "8:15", isCompleted: true },
            { id: "lesson-3", title: "Folder Structure in Next Js", duration: "15:45", isCompleted: false },
          ],
        },
      ],
      reviews: [
        {
          id: "review-1",
          user: { name: "Ahmad Rizki", avatar: "/placeholder.svg?height=40&width=40" },
          rating: 5,
          comment:
            "Kursus yang sangat bagus! Penjelasannya mudah dipahami dan step-by-step. Sangat recommended untuk pemula yang ingin belajar Webflow.",
          date: "2 hari yang lalu",
        },
        {
          id: "review-2",
          user: { name: "Siti Nurhaliza", avatar: "/placeholder.svg?height=40&width=40" },
          rating: 4,
          comment:
            "Materi lengkap dan instructor sangat berpengalaman. Hanya saja ada beberapa bagian yang agak cepat, tapi overall bagus.",
          date: "1 minggu yang lalu",
        },
      ],
    },
    "2": {
      id: "2",
      title: "Complete React Development Course",
      category: "DEVELOPMENT",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      studentsCount: "180.5K",
      isFree: false,
      price: 99,
      description:
        "Master React from beginner to advanced level. Learn hooks, context, routing, state management, and build real-world projects that will make you job-ready.",
      instructor: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "Senior React Developer",
      },
      duration: "12 jam 45 menit",
      lessonsCount: 48,
      level: "Menengah",
      videoUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0", // React tutorial
      curriculum: [
        {
          id: "module-1",
          title: "React Fundamentals",
          lessons: [
            { id: "lesson-1", title: "Introduction to React", duration: "15:30", isCompleted: false },
            { id: "lesson-2", title: "JSX and Components", duration: "20:15", isCompleted: false },
            { id: "lesson-3", title: "Props and State", duration: "25:45", isCompleted: false },
          ],
        },
        {
          id: "module-2",
          title: "Advanced React Concepts",
          lessons: [
            { id: "lesson-4", title: "React Hooks", duration: "30:30", isCompleted: false },
            { id: "lesson-5", title: "Context API", duration: "22:15", isCompleted: false },
            { id: "lesson-6", title: "React Router", duration: "28:20", isCompleted: false },
          ],
        },
      ],
      reviews: [
        {
          id: "review-1",
          user: { name: "Maria Garcia", avatar: "/placeholder.svg?height=40&width=40" },
          rating: 5,
          comment: "Excellent course! Very comprehensive and well-structured. The projects are really helpful.",
          date: "3 days ago",
        },
      ],
    },
  }

  return courseDetails[id] || null
}

interface CourseDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  // Unwrap params Promise using React.use()
  const resolvedParams = use(params)
  const course = getCourseDetail(resolvedParams.id)

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/pages/courses"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft size={20} />
            Kembali ke Kursus
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player - Now uses YouTube */}
            <VideoPlayer videoUrl={course.videoUrl} title={course.title} />

            {/* Course Info */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {course.category}
                </span>
                {course.isFree && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">GRATIS</span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>

              <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <CiStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiUsers className="w-4 h-4" />
                  <span>{course.studentsCount} siswa</span>
                </div>
                <div className="flex items-center gap-1">
                  <CiClock1 className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiBarChart className="w-4 h-4" />
                  <span>{course.level}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={course.instructor.avatar || "/placeholder.svg"}
                    alt={course.instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{course.instructor.name}</p>
                  <p className="text-sm text-gray-600">{course.instructor.title}</p>
                </div>
              </div>
            </div>

            {/* Course Description */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Deskripsi Kursus</h2>
              <p className="text-gray-700 leading-relaxed">{course.description}</p>
            </div>

            {/* Course Reviews */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews ({course.reviews.length})</h2>
              <div className="space-y-4">
                {course.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-start gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={review.user.avatar || "/placeholder.svg"}
                          alt={review.user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-gray-900">{review.user.name}</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <CiStar
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <CourseCurriculum modules={course.curriculum} />

            {/* Enroll Button */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <button className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                {course.isFree ? "Mulai Belajar Gratis" : `Daftar - $${course.price}`}
              </button>

              {/* Course Stats */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total Lessons:</span>
                    <span className="font-medium">{course.lessonsCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Level:</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Students:</span>
                    <span className="font-medium">{course.studentsCount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Features */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Yang Akan Anda Dapatkan:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Akses seumur hidup
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Sertifikat penyelesaian
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Akses mobile dan desktop
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Forum diskusi
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Update materi terbaru
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
