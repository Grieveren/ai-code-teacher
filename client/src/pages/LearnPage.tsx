import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import lessonService from '../services/lessonService'
import { Lesson } from '../types/lesson'

const LearnPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Courses' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
  ]

  const [courses, setCourses] = useState<Lesson[]>([])

  useEffect(() => {
    lessonService.getAllLessons().then(setCourses).catch(console.error)
  }, [])

  const filteredCourses = courses

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Learn to Code</h1>
        <p className="text-gray-400 text-lg">
          Choose from our AI-enhanced courses and start your coding journey
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-2 rounded-lg transition-all ${
              selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'glass-morphism hover:bg-gray-800/50'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            className="glass-morphism p-6 rounded-xl hover:bg-gray-800/50 transition-all cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-400 mb-4">{course.description}</p>

            <div className="text-sm text-gray-500 mb-4">Created at {new Date(course.createdAt).toLocaleDateString()}</div>

            <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
              Start Learning
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default LearnPage