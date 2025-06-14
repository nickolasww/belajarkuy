"use client"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Course } from "@/app/types/bestsell"
import Navbar from "@/app/components/navbar/navbar"
import CourseCard from "@/app/components/card/Coursecard"
import { IoMdSearch } from "react-icons/io"
import type { Variants } from "framer-motion"
import course1 from "@/app/assets/course1.jpeg"
import course2 from "@/app/assets/course2.png"
import course3 from "@/app/assets/course3.jpeg"
import course4 from "@/app/assets/course4.jpeg"
import course5 from "@/app/assets/course5.jpg"
import course6 from "@/app/assets/course6.png"
import course7 from "@/app/assets/course7.jpg"
import course8 from "@/app/assets/course8.png"
import course9 from "@/app/assets/course9.jpeg"
import course10 from "@/app/assets/course10.png"

const Courses: Course[] = [
  {
    id: "1",
    title: "Learn python programming masterclass",
    category: "DEVELOPMENT",
    image: course1,
    rating: 5.0,
    studentsCount: "265.7K",
  },
  {
    id: "2",
    title: "The Complete 2021 Web Development Bootcamp",
    category: "IT DEVELOPMENT",
    image: course2,
    rating: 4.8,
    studentsCount: "150K",
  },
  {
    id: "3",
    title: "Machine Learning A-Z™: Hands-On Python & R In Data Science",
    category: "DATA SCIENCE",
    image: course3,
    rating: 4.9,
    studentsCount: "200K",
  },
  {
    id: "4",
    title: "Ultimate Certified Solution Architect",
    category: "Development",
    image: course4,
    rating: 4.7,
    studentsCount: "180K",
  },
  {
    id: "5",
    title: "AWS certified solutions ",
    category: "LIFESTYLE",
    image: course5,
    rating: 4.6,
    studentsCount: "120K",
  },
  {
    id: "6",
    title: "Web Development Bootcamp: HTML, CSS, JS, React",
    category: "WEB DEVELOPMENT",
    image: course6,
    rating: 4.8,
    studentsCount: "180K",
  },
  {
    id: "7",
    title: "Mastering Data Structures & Algorithms in JavaScript",
    category: "PROGRAMMING",
    image: course7,
    rating: 4.7,
    studentsCount: "150K",
  },
  {
    id: "8",
    title: "Arch Linux: The Complete Beginner's Guide",
    category: "DATA SCIENCE",
    image: course8,
    rating: 4.9,
    studentsCount: "200K",
  },
  {
    id: "9",
    title: "Linux Administration: Complete Guide",
    category: "SYSTEM ADMINISTRATION",
    image: course9,
    rating: 4.6,
    studentsCount: "95K",
  },
  {
    id: "10",
    title: "Introduction to Cloud Computing with AWS",
    category: "CLOUD COMPUTING",
    image: course10,
    rating: 4.8,
    studentsCount: "130K",
  },
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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const searchVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

const statsVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
}

const statItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
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

const CoursesPage = () => {
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [sortBy, setSortBy] = useState("")

  // Helper function to parse student count for sorting
  const parseStudentCount = (count: string): number => {
    const numStr = count.replace(/[^\d.]/g, "")
    const num = Number.parseFloat(numStr)
    if (count.includes("K")) return num * 1000
    if (count.includes("M")) return num * 1000000
    return num
  }

  // Filtered and sorted courses
  const filteredCourses = useMemo(() => {
    let filtered = [...Courses]

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter((course) => {
        const courseCategory = course.category.toLowerCase()
        const filterCategory = categoryFilter.toLowerCase()

        // Handle different category mappings
        switch (filterCategory) {
          case "development":
            return courseCategory.includes("development") || courseCategory.includes("programming")
          case "data-science":
            return courseCategory.includes("data science") || courseCategory.includes("ai")
          case "marketing":
            return courseCategory.includes("marketing")
          case "lifestyle":
            return courseCategory.includes("lifestyle")
          case "web-development":
            return courseCategory.includes("web development")
          case "devops":
            return courseCategory.includes("devops")
          case "cybersecurity":
            return courseCategory.includes("cybersecurity")
          case "database":
            return courseCategory.includes("database")
          case "cloud":
            return courseCategory.includes("cloud")
          case "mobile":
            return courseCategory.includes("mobile")
          case "system":
            return courseCategory.includes("system")
          default:
            return courseCategory.includes(filterCategory)
        }
      })
    }

    // Apply sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "popular":
            return parseStudentCount(b.studentsCount) - parseStudentCount(a.studentsCount)
          case "rating":
            return b.rating - a.rating
          case "newest":
            // Since we don't have date data, we'll sort by ID (assuming newer courses have higher IDs)
            return Number.parseInt(b.id) - Number.parseInt(a.id)
          case "title":
            return a.title.localeCompare(b.title)
          default:
            return 0
        }
      })
    }

    return filtered
  }, [searchQuery, categoryFilter, sortBy])

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setCategoryFilter("")
    setSortBy("")
  }

  // Check if any filters are active
  const hasActiveFilters = searchQuery || categoryFilter || sortBy

  // Hapus baris ini karena tidak digunakan
  // const uniqueCategories = useMemo(() => {
  //   const categories = Courses.map((course) => course.category)
  //   return [...new Set(categories)].sort()
  // }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content Container */}
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Page Header */}
        <motion.div className="mb-8 sm:mb-10 md:mb-12" variants={headerVariants}>
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            All Courses
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-gray-600 max-w-2xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Discover our comprehensive collection of courses designed to help you master new skills and advance your
            career.
          </motion.p>
        </motion.div>

        {/* Search Section */}
        <motion.div className="mb-8 sm:mb-10 md:mb-12" variants={searchVariants}>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
            {/* Search Bar */}
            <motion.div
              className="w-full sm:w-auto"
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center border border-gray-300 rounded-lg p-3 sm:p-4 gap-3 group hover:border-orange-400 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200 transition-all duration-200">
                <motion.div
                  animate={{
                    rotate: searchQuery ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <IoMdSearch className="text-xl sm:text-2xl text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                </motion.div>
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="focus:outline-none w-full sm:w-64 md:w-80 lg:w-96 text-sm sm:text-base bg-transparent"
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSearchQuery("")}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      ✕
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Filter/Sort Options */}
            <motion.div
              className="flex gap-2 sm:gap-3 w-full sm:w-auto"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm sm:text-base bg-white flex-1 sm:flex-none"
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
              >
                <option value="">All Categories</option>
                <option value="development">Development</option>
                <option value="data-science">Data Science</option>
                <option value="marketing">Marketing</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="web-development">Web Development</option>
                <option value="devops">DevOps</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="database">Database</option>
                <option value="cloud">Cloud Computing</option>
                <option value="mobile">Mobile Development</option>
                <option value="system">System Administration</option>
              </motion.select>

              <motion.select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm sm:text-base bg-white flex-1 sm:flex-none"
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
              >
                <option value="">Sort by</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="title">Title (A-Z)</option>
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
                  whileHover={{ scale: 1.05 }}
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
          variants={itemVariants}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.p
            className="text-sm sm:text-base text-gray-600"
            key={filteredCourses.length} // Re-animate when count changes
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Showing <span className="font-semibold">{filteredCourses.length}</span> of{" "}
            <span className="font-semibold">{Courses.length}</span> courses
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

        <AnimatePresence>
          {filteredCourses.length === 0 && (
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
                }}
                transition={{
                  duration: 2,
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
                No courses found
              </motion.h3>
              <motion.p
                className="text-gray-600 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Try adjusting your search terms or filters to find what you&apos;re looking for.
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

        {/* Courses Grid */}
        <AnimatePresence>
          {filteredCourses.length > 0 && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8"
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              key={`${searchQuery}-${categoryFilter}-${sortBy}`} 
            >
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  className="w-full"
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.03,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  <CourseCard
                    course={course}
                    className="border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-200 h-full"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filteredCourses.length > 0 && (
          <motion.div
            className="flex justify-center mt-12 sm:mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.button
              className="px-6 py-3 sm:px-8 sm:py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 text-sm sm:text-base font-medium"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Courses
            </motion.button>
          </motion.div>
        )}

        {filteredCourses.length > 0 && (
          <motion.div
            className="mt-12 sm:mt-16 bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200"
            variants={statsVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4" variants={itemVariants}>
              Course Statistics
            </motion.h3>
            <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-4" variants={statsVariants}>
              <motion.div className="text-center" variants={statItemVariants}>
                <motion.p
                  className="text-2xl sm:text-3xl font-bold text-orange-600"
                  key={filteredCourses.length}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                >
                  {filteredCourses.length}
                </motion.p>
                <p className="text-sm text-gray-600">Total Courses</p>
              </motion.div>
              <motion.div className="text-center" variants={statItemVariants}>
                <motion.p
                  className="text-2xl sm:text-3xl font-bold text-blue-600"
                  key={filteredCourses.reduce((sum, course) => sum + course.rating, 0)}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
                >
                  {(filteredCourses.reduce((sum, course) => sum + course.rating, 0) / filteredCourses.length).toFixed(
                    1,
                  )}
                </motion.p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </motion.div>
              <motion.div className="text-center" variants={statItemVariants}>
                <motion.p
                  className="text-2xl sm:text-3xl font-bold text-green-600"
                  key={Math.max(...filteredCourses.map((course) => course.rating))}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  {Math.max(...filteredCourses.map((course) => course.rating)).toFixed(1)}
                </motion.p>
                <p className="text-sm text-gray-600">Highest Rated</p>
              </motion.div>
              <motion.div className="text-center" variants={statItemVariants}>
                <motion.p
                  className="text-2xl sm:text-3xl font-bold text-purple-600"
                  key={[...new Set(filteredCourses.map((course) => course.category))].length}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  {[...new Set(filteredCourses.map((course) => course.category))].length}
                </motion.p>
                <p className="text-sm text-gray-600">Categories</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default CoursesPage
