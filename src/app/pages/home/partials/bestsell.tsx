"use client";
import { motion } from "framer-motion";
import type { Course } from "@/app/types/bestsell";
import CourseCard from "@/app/components/card/Coursecard";
import Button from "@/app/components/button/button";
import CourseImage1 from "@/app/assets/CourseImages1.png";
import CourseImage2 from "@/app/assets/CourseImages2.png";
import CourseImage3 from "@/app/assets/CourseImages3.png";
import CourseImage4 from "@/app/assets/CourseImages4.png";
import CourseImage5 from "@/app/assets/CourseImages5.png";
import Link from "next/link";

const BestSelling: Course[] = [
  {
    id: "1",
    title: "Machine Learning A-Z™: Hands-On Python & R In Data Science",
    category: "DEVELOPMENT",
    image: CourseImage1,
    rating: 5.0,
    studentsCount: "265.7K",
  },
  {
    id: "2",
    title: "The Complete 2021 Web Development Bootcamp",
    category: "DEVELOPMENT",
    image: CourseImage2,
    rating: 5.0,
    studentsCount: "265.7K",
  },
  {
    id: "3",
    title: "Learn Python Programming Masterclass - From Beginner to Expert",
    category: "DEVELOPMENT",
    image: CourseImage3,
    rating: 5.0,
    studentsCount: "265.7K",
  },
  {
    id: "4",
    title: "The Complete Digital Marketing Course - 12 Courses in 1",
    category: "MARKETING",
    image: CourseImage4,
    rating: 5.0,
    studentsCount: "265.7K",
  },
  {
    id: "5",
    title: "Reiki Level I, II and Master/Teacher Program",
    category: "LIFESTYLE",
    image: CourseImage5,
    rating: 5.0,
    studentsCount: "265.7K",
  },
];

const BestSell = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8 md:p-16 lg:p-32 bg-gray-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-semibold"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Courses
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {BestSelling.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: 0.4 + index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
          >
            <CourseCard course={course} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/pages/courses">
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-md transition-colors duration-200"
          >
            Jelajahi Lebih Banyak
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default BestSell;
