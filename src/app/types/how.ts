import { StaticImageData } from "next/image";

export interface Step {
  id: string
  stepNumber: number
  title: string
  description: string
  image: string | StaticImageData
  imageAlt: string
}

export interface StepCardProps {
  step: Step
  className?: string
}

export interface HowItWorksProps {
  title?: string
  subtitle?: string
  steps: Step[]
  className?: string
}