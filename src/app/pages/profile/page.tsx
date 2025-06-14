"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/app/components/navbar/navbar"
import ProfileHeader from "@/app/pages/profile/partials/profile-header"
import StatsCards from "@/app/pages/profile/partials/stats"
import OverviewTab from "@/app/pages/profile/partials/overview"
import CoursesTab from "@/app/pages/profile/partials/course"
import BookmarksTab from "@/app/pages/profile/partials/bookmark"
import QuizzesTab from "@/app/pages/profile/partials/quizzes"
import AchievementsTab from "@/app/pages/profile/partials/achivement"
import SettingsTab from "@/app/pages/profile/partials/setting"
import { FaChartBar, FaGraduationCap, FaBookmark, FaTrophy, FaStar, FaCog } from "react-icons/fa"
import type { User, Course, Quiz, Achievement, ProfileStats } from "@/app/types/profile"

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    bio: "",
    location: "",
    website: "",
  })
  const router = useRouter()

  // Mock data - in real app, this would come from API
  const [enrolledCourses] = useState<Course[]>([
    {
      id: "1",
      title: "JavaScript Fundamentals",
      category: "Programming",
      progress: 85,
      rating: 5,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: "2",
      title: "React Advanced Concepts",
      category: "Web Development",
      progress: 60,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: "3",
      title: "Python Data Science",
      category: "Data Science",
      progress: 100,
      rating: 4,
      completedAt: "2024-01-15",
      image: "/placeholder.svg?height=100&width=150",
    },
  ])

  const [bookmarkedCourses] = useState<Course[]>([
    {
      id: "4",
      title: "Machine Learning Basics",
      category: "AI",
      progress: 0,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: "5",
      title: "DevOps with Docker",
      category: "DevOps",
      progress: 0,
      image: "/placeholder.svg?height=100&width=150",
    },
  ])

  const [quizHistory] = useState<Quiz[]>([
    {
      id: "1",
      title: "JavaScript Basics Quiz",
      score: 85,
      maxScore: 100,
      completedAt: "2024-01-20",
      difficulty: "Easy",
    },
    {
      id: "2",
      title: "React Hooks Deep Dive",
      score: 92,
      maxScore: 100,
      completedAt: "2024-01-18",
      difficulty: "Medium",
    },
    {
      id: "3",
      title: "Advanced Python Quiz",
      score: 78,
      maxScore: 100,
      completedAt: "2024-01-15",
      difficulty: "Hard",
    },
  ])

  const [achievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "First Course Completed",
      description: "Complete your first course",
      icon: "🎓",
      unlockedAt: "2024-01-15",
      rarity: "Common",
    },
    {
      id: "2",
      title: "Quiz Master",
      description: "Score 90+ on 5 quizzes",
      icon: "🏆",
      unlockedAt: "2024-01-18",
      rarity: "Rare",
    },
    {
      id: "3",
      title: "Learning Streak",
      description: "Learn for 7 consecutive days",
      icon: "🔥",
      unlockedAt: "2024-01-20",
      rarity: "Epic",
    },
  ])

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser({
        ...userData,
        bio: "Passionate learner exploring the world of technology and programming.",
        location: "Jakarta, Indonesia",
        website: "https://github.com/username",
        joinDate: "2023-12-01",
        lastActive: "2024-01-20",
      })
      setEditForm({
        name: userData.name,
        bio: "Passionate learner exploring the world of technology and programming.",
        location: "Jakarta, Indonesia",
        website: "https://github.com/username",
      })
    } else {
      router.push("/pages/login")
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user")
      if (updatedUser) {
        setUser(JSON.parse(updatedUser))
      } else {
        router.push("/pages/login")
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [router])

  const handleSaveProfile = () => {
    if (user) {
      const updatedUser = {
        ...user,
        name: editForm.name,
        bio: editForm.bio,
        location: editForm.location,
        website: editForm.website,
      }
      setUser(updatedUser)

      // Update localStorage
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}")
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...currentUser,
          name: editForm.name,
        }),
      )

      setIsEditing(false)
    }
  }

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?")

    if (confirmLogout) {
      localStorage.removeItem("user")
      setUser(null)
      window.dispatchEvent(new Event("storage"))
      router.push("/pages/home")
    }
  }

  const handleEditFormChange = (field: string, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }))
  }

  const calculateStats = (): ProfileStats => {
    const completedCourses = enrolledCourses.filter((course) => course.progress === 100).length
    const totalQuizzes = quizHistory.length
    const averageQuizScore = quizHistory.reduce((sum, quiz) => sum + quiz.score, 0) / totalQuizzes || 0
    const totalLearningHours = enrolledCourses.reduce((sum, course) => sum + course.progress * 2, 0) / 100

    return {
      completedCourses,
      totalQuizzes,
      averageQuizScore: Math.round(averageQuizScore),
      totalLearningHours: Math.round(totalLearningHours),
    }
  }

  const stats = calculateStats()

  const tabs = [
    { id: "overview", label: "Overview", icon: FaChartBar },
    { id: "courses", label: "My Courses", icon: FaGraduationCap },
    { id: "bookmarks", label: "Bookmarks", icon: FaBookmark },
    { id: "quizzes", label: "Quiz History", icon: FaTrophy },
    { id: "achievements", label: "Achievements", icon: FaStar },
    { id: "settings", label: "Settings", icon: FaCog },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab enrolledCourses={enrolledCourses} />
      case "courses":
        return <CoursesTab enrolledCourses={enrolledCourses} />
      case "bookmarks":
        return <BookmarksTab bookmarkedCourses={bookmarkedCourses} />
      case "quizzes":
        return <QuizzesTab quizHistory={quizHistory} />
      case "achievements":
        return <AchievementsTab achievements={achievements} />
      case "settings":
        return <SettingsTab onLogout={handleLogout} />
      default:
        return <OverviewTab enrolledCourses={enrolledCourses} />
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader
          user={user}
          isEditing={isEditing}
          editForm={editForm}
          onEditFormChange={handleEditFormChange}
          onSaveProfile={handleSaveProfile}
          onStartEditing={() => setIsEditing(true)}
          onCancelEditing={() => setIsEditing(false)}
        />

        <StatsCards stats={stats} />

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
