"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/lib/supabase"
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
import type { Course, Quiz, Achievement, ProfileStats } from "@/app/types/profile"

// ✅ Definisikan User interface langsung di sini dengan field 'id'
interface User {
  id: string
  name: string
  email: string
  bio: string
  location: string
  website: string
  joinDate: string
  lastActive: string
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [editForm, setEditForm] = useState({
    name: "",
    bio: "",
    location: "",
    website: "",
  })
  const router = useRouter()

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
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.replace("/pages/login")
        return
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("username, email, bio, location, website, join_date, last_active")
        .eq("id", session.user.id)
        .single()

      if (!error && data) {
        // ✅ Cast eksplisit ke User agar tidak ada error 'id does not exist'
        const userData: User = {
          id: session.user.id,
          name: data.username ?? "",
          email: data.email ?? "",
          bio: data.bio ?? "Passionate learner exploring the world of technology.",
          location: data.location ?? "",
          website: data.website ?? "",
          joinDate: data.join_date ?? "",
          lastActive: data.last_active ?? "",
        }
        setUser(userData)
        setEditForm({
          name: userData.name,
          bio: userData.bio,
          location: userData.location,
          website: userData.website,
        })
      }

      setIsLoading(false)
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/pages/login")
    })

    return () => subscription.unsubscribe()
  }, [router])

  const handleSaveProfile = async () => {
    if (!user) return

    const { error } = await supabase
      .from("profiles")
      .update({
        username: editForm.name,
        bio: editForm.bio,
        location: editForm.location,
        website: editForm.website,
      })
      .eq("id", user.id)

    if (!error) {
      // ✅ Gunakan functional update agar TypeScript tidak bingung dengan tipe
      setUser((prev) => {
        if (!prev) return null
        return {
          ...prev,
          name: editForm.name,
          bio: editForm.bio,
          location: editForm.location,
          website: editForm.website,
        }
      })
      setIsEditing(false)
    }
  }

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?")
    if (confirmLogout) {
      await supabase.auth.signOut()
      router.push("/pages/home")
    }
  }

  const handleEditFormChange = (field: string, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }))
  }

  // ✅ Tambah return type eksplisit agar tidak ada error 'must return a value'
  const calculateStats = (): ProfileStats => {
    const completedCourses = enrolledCourses.filter((c) => c.progress === 100).length
    const totalQuizzes = quizHistory.length
    const averageQuizScore =
      totalQuizzes > 0
        ? quizHistory.reduce((sum, quiz) => sum + quiz.score, 0) / totalQuizzes
        : 0
    const totalLearningHours =
      enrolledCourses.reduce((sum, course) => sum + course.progress * 2, 0) / 100

    return {
      completedCourses,
      totalQuizzes,
      averageQuizScore: Math.round(averageQuizScore),
      totalLearningHours: Math.round(totalLearningHours),
    }
  }

  // ✅ Definisikan renderTabContent yang sebelumnya hilang
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

  const stats = calculateStats()

  const tabs = [
    { id: "overview", label: "Overview", icon: FaChartBar },
    { id: "courses", label: "My Courses", icon: FaGraduationCap },
    { id: "bookmarks", label: "Bookmarks", icon: FaBookmark },
    { id: "quizzes", label: "Quiz History", icon: FaTrophy },
    { id: "achievements", label: "Achievements", icon: FaStar },
    { id: "settings", label: "Settings", icon: FaCog },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (!user) return null

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