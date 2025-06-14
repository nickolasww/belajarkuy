"use client"
import { motion } from "framer-motion"
import HowCard from "@/app/components/card/howcard"
import StepOne from "@/app/assets/StepOne.jpeg"
import StepTwo from "@/app/assets/StepTwo.jpeg"
import Sertifikasi from "@/app/assets/Sertifikasi.jpeg"
import type { Variants } from "framer-motion"

const StepsData = [
  {
    id: "1",
    stepNumber: 1,
    title: "Masuk ke Platform",
    description:
      "Daftar dan masuk ke platform pembelajaran kami. Pilih kursus yang sesuai dengan minat dan kebutuhan karier Anda untuk memulai perjalanan belajar.",
    image: StepOne,
    imageAlt: "Wanita berkacamata sedang bekerja dengan laptop dan dokumen",
  },
  {
    id: "2",
    stepNumber: 2,
    title: "Mulai Belajar",
    description:
      "Ikuti materi pembelajaran yang telah dirancang secara sistematis. Akses video, modul, dan latihan interaktif kapan saja dan di mana saja sesuai kecepatan Anda.",
    image: StepTwo,
    imageAlt: "Wanita sedang belajar menggunakan laptop di ruang kerja modern",
  },
  {
    id: "3",
    stepNumber: 3,
    title: "Raih Sertifikat",
    description:
      "Selesaikan semua modul dan ujian untuk mendapatkan sertifikat resmi. Tingkatkan kredibilitas profesional Anda dan buka peluang karier yang lebih luas.",
    image: Sertifikasi,
    imageAlt: "Tampilan antarmuka digital Google menunjukkan pencapaian pembelajaran",
  },
]

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const How = () => {
  return (
    <motion.div
      className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div className="mb-8 sm:mb-12 md:mb-16 text-center lg:text-left" variants={containerVariants}>
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6"
          variants={headerVariants}
        >
          Seperti ini Cara Kerja Quiznya
        </motion.h1>
        <motion.p
          className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto lg:mx-0 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed"
          variants={descriptionVariants}
        >
          Ikuti tiga langkah mudah ini untuk memulai perjalanan pembelajaran Anda dan meraih kesuksesan dalam dunia
          digital bersama platform kami.
        </motion.p>
      </motion.div>

      {/* Cards Grid - Optimized for 3 cards */}
      <motion.div className="w-full max-w-7xl mx-auto" variants={containerVariants}>
        {/* Mobile: Single column */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-6 lg:gap-8">
          {StepsData.map((step, index) => (
            <motion.div
              key={step.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 },
              }}
              custom={index}
              className="w-full"
            >
              <HowCard step={step} className="h-full" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default How
