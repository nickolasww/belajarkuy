"use client"
import { motion } from "framer-motion"
import Button from "@/app/components/button/button"
import Image from "next/image"
import quizImage from "@/app/assets/QuizImg.png"
import type { Variants } from "framer-motion"

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

const textVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const imageVariants: Variants = {
  hidden: { opacity: 0, x: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
  },
}

const Quiz = () => {
  return (
    <motion.div
      className="flex items-center justify-between p-10 px-4 md:px-20 lg:px-56 overflow-hidden relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.div className="w-full lg:w-[70%]" variants={textVariants}>
        <div className="flex flex-col gap-6 items-start">
          <motion.h1 className="text-3xl md:text-4xl lg:text-6xl font-bold w-full lg:w-[80%]" variants={textVariants}>
            Daily Quiz, Daily Bonus-play Today!
          </motion.h1>

          <motion.p className="text-base md:text-lg text-gray-600 leading-relaxed" variants={textVariants}>
            Kerjakan kuis dan trivia harian yang seru dan menantang. Jawab kuis setiap hari dan kumpulkan poinnya!
            Banyak kejutan menarik menantimu di setiap tantangan.
          </motion.p>

          <motion.div variants={buttonVariants}>
            <motion.a href="/pages/quiz" whileHover="hover" whileTap="tap" variants={buttonVariants}>
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-md transition-colors duration-200"
              >
                Play Now
              </Button>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="hidden lg:block" variants={imageVariants}>
        <motion.div
          whileHover={{
            scale: 1.05,
            rotate: 2,
            transition: { duration: 0.3 },
          }}
        >
          <Image
            src={quizImage || "/placeholder.svg"}
            alt="Quiz Image"
            width={1000}
            height={1000}
            className="max-w-full h-auto"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-10 right-10 w-16 h-16 bg-yellow-200 rounded-full opacity-30"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.3, scale: 1 }}
        viewport={{ once: true }}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 90, 180],
        }}
        transition={{
          opacity: { duration: 0.5 },
          scale: { duration: 0.5 },
          y: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          rotate: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
      />

      <motion.div
        className="absolute bottom-10 left-10 w-12 h-12 bg-green-200 rounded-full opacity-30"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.3, scale: 1 }}
        viewport={{ once: true }}
        animate={{
          y: [0, 15, 0],
          rotate: [0, -90, -180],
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.2 },
          scale: { duration: 0.5, delay: 0.2 },
          y: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
      />
    </motion.div>
  )
}

export default Quiz
