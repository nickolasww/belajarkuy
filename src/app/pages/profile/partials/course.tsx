import { FaCheck, FaStar } from "react-icons/fa"
import type { Course } from "@/app/types/profile"

interface CoursesTabProps {
  enrolledCourses: Course[]
}

export default function CoursesTab({ enrolledCourses }: CoursesTabProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">My Courses ({enrolledCourses.length})</h3>
        <select className="px-3 py-2 border border-gray-300 rounded-lg">
          <option>All Courses</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => (
          <div
            key={course.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h4 className="font-semibold mb-2">{course.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{course.category}</p>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
              {course.progress === 100 ? (
                <div className="flex items-center justify-between">
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                    <FaCheck className="w-3 h-3" />
                    Completed
                  </span>
                  {course.rating && (
                    <div className="flex items-center gap-1">
                      <FaStar className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{course.rating}</span>
                    </div>
                  )}
                </div>
              ) : (
                <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  Continue Learning
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
