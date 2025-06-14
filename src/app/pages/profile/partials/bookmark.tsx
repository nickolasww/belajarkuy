import { FaHeart } from "react-icons/fa"
import type { Course } from "@/app/types/profile"

interface BookmarksTabProps {
  bookmarkedCourses: Course[]
}

export default function BookmarksTab({ bookmarkedCourses }: BookmarksTabProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Bookmarked Courses ({bookmarkedCourses.length})</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarkedCourses.map((course) => (
          <div
            key={course.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h4 className="font-semibold mb-2">{course.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{course.category}</p>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  Enroll Now
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <FaHeart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
