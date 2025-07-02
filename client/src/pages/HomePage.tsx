import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const HomePage = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Learning',
      description: 'Get personalized explanations and real-time help from Claude AI',
    },
    {
      icon: '💻',
      title: 'Interactive Coding',
      description: 'Write and run code directly in your browser with instant feedback',
    },
    {
      icon: '📈',
      title: 'Adaptive Progress',
      description: 'Learn at your own pace with AI-adjusted difficulty levels',
    },
    {
      icon: '🎯',
      title: 'Project-Based',
      description: 'Build real projects while learning programming concepts',
    },
  ]

  const languages = ['JavaScript', 'Python', 'HTML/CSS', 'TypeScript', 'React', 'Node.js']

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Learn to Code with{' '}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
            AI Assistance
          </span>
        </motion.h1>

        <motion.p
          className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Experience personalized coding education powered by AI. Get instant help,
          explanations, and feedback as you learn programming at your own pace.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/register"
            className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors"
          >
            Start Learning Free
          </Link>
          <Link
            to="/learn"
            className="px-8 py-4 glass-morphism hover:bg-gray-800/50 rounded-lg font-semibold transition-colors"
          >
            Browse Courses
          </Link>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Learn with AI Code Teacher?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glass-morphism p-6 rounded-xl hover:bg-gray-800/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Languages Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-8">Learn Popular Technologies</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {languages.map((lang) => (
            <motion.div
              key={lang}
              className="px-6 py-3 glass-morphism rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {lang}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16">
        <div className="glass-morphism p-12 rounded-2xl max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Coding Journey?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of learners who are mastering programming with AI assistance.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Get Started for Free
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage