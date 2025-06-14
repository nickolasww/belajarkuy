"use client"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import QuizCard from "@/app/components/card/quizcard"
import Navbar from "@/app/components/navbar/navbar"
import { IoMdSearch, IoMdTrophy, IoMdTime, IoMdStats } from "react-icons/io"
import type { Variants } from "framer-motion"
import quiz1 from "@/app/assets/quiz1.jpeg"
import quiz2 from "@/app/assets/quiz2.png"
import quiz3 from "@/app/assets/quiz3.png"
import quiz4 from "@/app/assets/quiz4.png"

// Quiz type definition
import type { StaticImageData } from "next/image"

type Quiz = {
  id: string
  title: string
  description: string
  image: string | StaticImageData
  difficulty: "Easy" | "Medium" | "Hard"
  duration: number
  questionsCount: number
  points: number
  category?: string
}

// Sample quiz data with categories
const quizzes: Quiz[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals Quiz",
    description: "Test your knowledge of JavaScript basics including variables, functions, and data types.",
    image: quiz1,
    difficulty: "Easy",
    duration: 15,
    questionsCount: 10,
    points: 100,
    category: "javascript",
  },
  {
    id: "2",
    title: "React Hooks Deep Dive",
    description: "Advanced quiz covering useState, useEffect, useContext and custom hooks.",
    image:  quiz2,
    difficulty: "Medium",
    duration: 25,
    questionsCount: 15,
    points: 200,
    category: "react",
  },
  {
    id: "3",
    title: "Node.js & Express Mastery",
    description: "Comprehensive test on backend development with Node.js and Express framework.",
    image: quiz3,
    difficulty: "Hard",
    duration: 30,
    questionsCount: 20,
    points: 300,
    category: "nodejs",
  },
  {
    id: "4",
    title: "CSS Grid & Flexbox",
    description: "Master modern CSS layout techniques with Grid and Flexbox.",
    image: quiz4,
    difficulty: "Medium",
    duration: 20,
    questionsCount: 12,
    points: 150,
    category: "css",
  },
]

// Stats data
const stats = [
  { icon: IoMdTrophy, label: "Total Quizzes", value: "50+", color: "text-yellow-600" },
  { icon: IoMdTime, label: "Avg. Duration", value: "20 min", color: "text-blue-600" },
  { icon: IoMdStats, label: "Success Rate", value: "85%", color: "text-green-600" },
]

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
}

const heroVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

const heroTextVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.3,
      ease: "easeOut",
    },
  },
}

const statsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
}

const statsCardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const searchSectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const quizGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
}

const quizCardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

const noResultsVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function QuizzesPage() {
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [sortBy, setSortBy] = useState("")

  // Filtered and sorted quizzes
  const filteredQuizzes = useMemo(() => {
    let filtered = [...quizzes]

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          quiz.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply difficulty filter
    if (difficultyFilter) {
      filtered = filtered.filter((quiz) => quiz.difficulty.toLowerCase() === difficultyFilter.toLowerCase())
    }

    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter((quiz) => quiz.category === categoryFilter)
    }

    // Apply sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "difficulty":
            const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 }
            return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
          case "duration":
            return a.duration - b.duration
          case "points":
            return b.points - a.points // Descending order for points
          case "popular":
            return b.questionsCount - a.questionsCount // Assuming more questions = more popular
          default:
            return 0
        }
      })
    }

    return filtered
  }, [searchQuery, difficultyFilter, categoryFilter, sortBy])

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setDifficultyFilter("")
    setCategoryFilter("")
    setSortBy("")
  }

  // Check if any filters are active
  const hasActiveFilters = searchQuery || difficultyFilter || categoryFilter || sortBy

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content Container */}
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-8 sm:mb-12 md:mb-16" variants={heroVariants}>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Quiz & Latihan
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            variants={heroTextVariants}
          >
            Uji kemampuan Anda dengan berbagai quiz interaktif dan dapatkan poin untuk setiap jawaban yang benar!
            Tingkatkan skill programming Anda dengan latihan yang menyenangkan.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 md:mb-16"
          variants={statsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              variants={statsCardVariants}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4">
                <motion.div
                  className={`p-2 sm:p-3 rounded-lg bg-gray-50 ${stat.color}`}
                  whileHover={{
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  <stat.icon className="text-xl sm:text-2xl" />
                </motion.div>
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">{stat.label}</p>
                  <motion.p
                    className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div className="mb-8 sm:mb-10 md:mb-12" variants={searchSectionVariants}>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <motion.div
              className="w-full lg:w-auto"
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center border border-gray-300 rounded-lg p-3 sm:p-4 gap-3 group hover:border-orange-400 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200 transition-all duration-200">
                <motion.div
                  animate={{
                    rotate: searchQuery ? [0, 15, -15, 0] : 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <IoMdSearch className="text-xl sm:text-2xl text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                </motion.div>
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="focus:outline-none w-full lg:w-64 xl:w-80 text-sm sm:text-base bg-transparent"
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => setSearchQuery("")}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      ✕
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Filter Options */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm sm:text-base bg-white"
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
              >
                <option value="">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </motion.select>

              <motion.select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm sm:text-base bg-white"
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
              >
                <option value="">All Categories</option>
                <option value="javascript">JavaScript</option>
                <option value="react">React</option>
                <option value="nodejs">Node.js</option>
                <option value="css">CSS</option>
                <option value="python">Python</option>
                <option value="database">Database</option>
              </motion.select>

              <motion.select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm sm:text-base bg-white"
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
              >
                <option value="">Sort by</option>
                <option value="difficulty">Difficulty</option>
                <option value="duration">Duration</option>
                <option value="points">Points</option>
                <option value="popular">Most Popular</option>
              </motion.select>
            </motion.div>
          </div>

          {/* Clear Filters Button */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                className="mt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  onClick={clearFilters}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear all filters
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.p
            className="text-sm sm:text-base text-gray-600"
            key={filteredQuizzes.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Showing <span className="font-semibold">{filteredQuizzes.length}</span> of{" "}
            <span className="font-semibold">{quizzes.length}</span> quizzes
            {hasActiveFilters && (
              <motion.span
                className="text-orange-600 ml-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                (filtered)
              </motion.span>
            )}
          </motion.p>
        </motion.div>

        {/* No Results Message */}
        <AnimatePresence>
          {filteredQuizzes.length === 0 && (
            <motion.div
              className="text-center py-12"
              variants={noResultsVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div
                className="text-gray-400 mb-4"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <IoMdSearch className="text-6xl mx-auto mb-4" />
              </motion.div>
              <motion.h3
                className="text-xl font-semibold text-gray-900 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                No quizzes found
              </motion.h3>
              <motion.p
                className="text-gray-600 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Try adjusting your search terms or filters to find what you are looking for.
              </motion.p>
              <motion.button
                onClick={clearFilters}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Clear all filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quiz Grid */}
        <AnimatePresence>
          {filteredQuizzes.length > 0 && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
              variants={quizGridVariants}
              initial="hidden"
              animate="visible"
              key={`${searchQuery}-${difficultyFilter}-${categoryFilter}-${sortBy}`}
            >
              {filteredQuizzes.map((quiz) => (
                <motion.div
                  key={quiz.id}
                  className="w-full"
                  variants={quizCardVariants}
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  <QuizCard quiz={quiz} className="h-full hover:shadow-lg transition-shadow duration-200" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More Section - Only show if there are results */}
        {filteredQuizzes.length > 0 && (
          <motion.div
            className="flex flex-col items-center mt-12 sm:mt-16 md:mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              className="px-6 py-3 sm:px-8 sm:py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 text-sm sm:text-base font-medium mb-4"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Quizzes
            </motion.button>
            <motion.p
              className="text-xs sm:text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Showing {filteredQuizzes.length} of 50+ available quizzes
            </motion.p>
          </motion.div>
        )}

        {/* Call to Action Section */}
        <motion.div
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 sm:p-8 md:p-12 text-center text-white mt-12 sm:mt-16 md:mt-20"
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to Challenge Yourself?
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.9, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join thousands of learners who are improving their skills through our interactive quizzes. Start your
            learning journey today!
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-orange-600 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base font-medium w-full sm:w-auto"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Take Random Quiz
            </motion.button>
            <motion.button
              className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-orange-600 transition-colors duration-200 text-sm sm:text-base font-medium w-full sm:w-auto"
              whileHover={{
                scale: 1.05,
                backgroundColor: "white",
                color: "#ea580c",
              }}
              whileTap={{ scale: 0.95 }}
            >
              View Leaderboard
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
