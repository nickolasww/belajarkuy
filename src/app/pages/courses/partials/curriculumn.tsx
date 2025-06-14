"use client"
import { useState } from "react"
import type { CurriculumModule } from "@/app/types/courses"
import { FaChevronDown } from "react-icons/fa6"
import { FaChevronRight } from "react-icons/fa6"
import { CiPlay1 } from "react-icons/ci"
import { FaRegCheckCircle } from "react-icons/fa"

interface CourseCurriculumProps {
  modules: CurriculumModule[]
  className?: string
}

const CourseCurriculum = ({ modules, className = "" }: CourseCurriculumProps) => {
  const [expandedModules, setExpandedModules] = useState<string[]>([modules[0]?.id || ""])

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  const totalLessons = modules.reduce((total, module) => total + module.lessons.length, 0)
  const completedLessons = modules.reduce(
    (total, module) => total + module.lessons.filter((lesson) => lesson.isCompleted).length,
    0,
  )

  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Konten Kursus</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            {modules.length} bagian • {totalLessons} pelajaran
          </p>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span>
                Progress: {completedLessons}/{totalLessons} selesai
              </span>
              <span className="font-medium">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {modules.map((module) => {
          const moduleCompletedLessons = module.lessons.filter((lesson) => lesson.isCompleted).length
          const moduleProgressPercentage = Math.round((moduleCompletedLessons / module.lessons.length) * 100)

          return (
            <div key={module.id} className="border-b border-gray-100 last:border-b-0">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {expandedModules.includes(module.id) ? (
                      <FaChevronDown size={16} className="text-gray-500" />
                    ) : (
                      <FaChevronRight size={16} className="text-gray-500" />
                    )}
                    <div>
                      <span className="font-medium text-gray-900 block">{module.title}</span>
                      <span className="text-xs text-gray-500">
                        {moduleCompletedLessons}/{module.lessons.length} selesai ({moduleProgressPercentage}%)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500 block">{module.lessons.length} pelajaran</span>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className="bg-green-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${moduleProgressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </button>

              {expandedModules.includes(module.id) && (
                <div className="pb-2">
                  {module.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-3 px-4 py-3 ml-6 hover:bg-gray-50 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-6 text-center">{index + 1}</span>
                        {lesson.isCompleted ? (
                          <FaRegCheckCircle size={16} className="text-green-500" />
                        ) : (
                          <CiPlay1 size={16} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-sm ${
                            lesson.isCompleted ? "text-gray-600 line-through" : "text-gray-900"
                          } group-hover:text-orange-600 transition-colors`}
                        >
                          {lesson.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{lesson.duration}</span>
                        {lesson.isCompleted && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Selesai</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Summary Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Total Progress</span>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{progressPercentage}% Complete</span>
            {progressPercentage === 100 && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">🎉 Selesai!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCurriculum
