"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Button from "@/app/components/button/button"
import JumbotronImage from "@/app/assets/JumbotronImg.png"
import type { Variants } from "framer-motion"

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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.1, x: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
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

const Jumbotron = () => {
  return (
    <section className="relative bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]">
          <motion.div
            className="relative z-10 py-8 sm:py-12 md:py-16 lg:py-24 order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6"
                variants={itemVariants}
              >
                Learn with expert{" "}
                <motion.span className="block" variants={itemVariants}>
                  anytime anywhere
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0"
                variants={itemVariants}
              >
                Our mission is to help people to find the best course online and learn with expert anytime, anywhere.
              </motion.p>

              <motion.div variants={buttonVariants} className="flex justify-center lg:justify-start">
                <motion.a href="/pages/register" variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-md transition-colors duration-200"
                  >
                    Create Account
                  </Button>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="relative order-1 lg:order-2"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >

            <div className="relative h-64 sm:h-80 md:h-96 lg:h-full lg:min-h-[500px]">
              <motion.div
                className="absolute inset-0 rounded-lg lg:rounded-none overflow-hidden"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <Image
                  src={JumbotronImage || "/placeholder.svg"}
                  alt="Woman with glasses holding books in a learning environment"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                />
              </motion.div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-r rounded-lg lg:rounded-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute top-10 sm:top-16 md:top-20 right-4 sm:right-10 md:right-20 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-orange-100 rounded-full opacity-20"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        viewport={{ once: true }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          opacity: { duration: 0.5 },
          scale: { duration: 0.5 },
          y: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
      />

      <motion.div
        className="absolute bottom-10 sm:bottom-16 md:bottom-20 left-4 sm:left-10 md:left-20 w-12 sm:w-18 md:w-24 h-12 sm:h-18 md:h-24 bg-blue-100 rounded-full opacity-20"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        viewport={{ once: true }}
        animate={{
          y: [0, 10, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.2 },
          scale: { duration: 0.5, delay: 0.2 },
          y: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
      />
    </section>
  )
}

export default Jumbotron
