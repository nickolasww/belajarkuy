import React from 'react'
import type { StepCardProps } from '@/app/types/how'
import Image from 'next/image'

export default function HowCard({ step, className = "" }: StepCardProps) {
  return (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      {/* Step Image */}
      <div className="relative h-96 w-full">
        <Image
          src={step.image || "/placeholder.svg"}
          alt={step.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Step Content */}
      <div className="bg-orange-400 p-6">
        {/* Step Number */}
        <div className="mb-4">
          <span className="inline-block px-4 py-2 bg-white text-gray-800 text-sm font-medium rounded-full">
            Step {step.stepNumber}
          </span>
        </div>

        {/* Step Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>

        {/* Step Description */}
        <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p>
      </div>
    </div>
  )
}
