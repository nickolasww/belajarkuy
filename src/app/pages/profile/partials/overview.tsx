import { FaTrophy, FaGraduationCap, FaStar } from "react-icons/fa"
import type { Course } from "@/app/types/profile"

interface OverviewTabProps {
  enrolledCourses: Course[]
}

export default function OverviewTab({ enrolledCourses }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <FaTrophy className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="font-medium">Completed React Hooks Deep Dive quiz</p>
              <p className="text-sm text-gray-600">Scored 92/100 • 2 days ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <FaGraduationCap className="w-5 h-5 text-orange-600" />
            <div>
              <p className="font-medium">Completed Python Data Science course</p>
              <p className="text-sm text-gray-600">5 days ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <FaStar className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium">Unlocked Learning Streak achievement</p>
              <p className="text-sm text-gray-600">1 week ago</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
        <div className="space-y-4">
          {enrolledCourses.slice(0, 3).map((course) => (
            <div key={course.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="w-16 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium">{course.title}</h4>
                <p className="text-sm text-gray-600">{course.category}</p>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
