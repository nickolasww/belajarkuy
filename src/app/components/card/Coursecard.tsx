import React from 'react'
import Image from 'next/image'
import { Course } from "@/app/types/bestsell";
import Link from 'next/link'

interface CardProps {
    course: Course 
    className?: string
}

export default function CourseCard({ course, className = "" }: CardProps) {
  return (
    <Link href={`/pages/courses/${course.id}`}>
    <div
      className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      {/* Course Image */}
      <div className="relative aspect-video w-full">
        <Image
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Course Content */}
      <div className="p-4">
        {/* Category Tag */}
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded uppercase tracking-wide">
            {course.category}
          </span>
        </div>

        {/* Course Title */}
        <h3 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2 leading-5">{course.title}</h3>

        {/* Rating and Students */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            {/* <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> */}
            <span className="text-sm font-medium text-gray-900">{course.rating}</span>
          </div>
          <span className="text-sm text-gray-600">{course.studentsCount} students</span>
        </div>
      </div>
    </div>
    </Link>
  )
}
