import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaArrowRight, 
  FaNewspaper, 
  FaUsers, 
  FaRocket,
  FaClock,
  FaEye,
  FaHeart,
  FaUserCircle,
  FaTag,
  FaTrendingUp
} from 'react-icons/fa'


const Home = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([])
  const [latestBlogs, setLatestBlogs] = useState([])
  const [popularBlogs, setPopularBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalUsers: 0,
    totalViews: 0
  })

  useEffect(() => {
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    try {
      setLoading(true)
      const [blogsRes, statsRes] = await Promise.all([
        api.get('/blogs'),
        api.get('/blogs/stats')
      ])

      const allBlogs = blogsRes.data.data || []
      
      // Featured blogs (first 3)
      setFeaturedBlogs(allBlogs.slice(0, 3))
      
      // Latest blogs (next 4)
      setLatestBlogs(allBlogs.slice(3, 7))
      
      // Popular blogs (sorted by views)
      const sortedByViews = [...allBlogs].sort((a, b) => (b.views || 0) - (a.views || 0))
      setPopularBlogs(sortedByViews.slice(0, 3))
      
      // Get unique categories
      const uniqueCategories = [...new Set(allBlogs.map(blog => blog.category).filter(Boolean))]
      setCategories(uniqueCategories.slice(0, 6))
      
      // Stats
      setStats({
        totalBlogs: allBlogs.length,
        totalUsers: statsRes.data?.totalUsers || 0,
        totalViews: allBlogs.reduce((acc, blog) => acc + (blog.views || 0), 0)
      })
      
      setError(null)
    } catch (err) {
      console.error('Error fetching home data:', err)
      setError(err.response?.data?.message || 'Failed to load home page')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Featured Blogs */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <SectionHeader 
            title="Featured Stories" 
            subtitle="Hand-picked articles for you"
            viewAllLink="/blogs"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog, index) => (
              <FeaturedBlogCard key={blog._id} blog={blog} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16">
          <div className="container-custom">
            <SectionHeader 
              title="Explore Categories" 
              subtitle="Find blogs by topic"
              viewAllLink="/blogs"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <CategoryCard key={index} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest & Popular Blogs */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Latest Blogs */}
            <div className="lg:col-span-2">
              <SectionHeader 
                title="Latest Blogs" 
                subtitle="Recent articles from our community"
                viewAllLink="/blogs"
              />
              <div className="space-y-6">
                {latestBlogs.map((blog) => (
                  <LatestBlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            </div>

            {/* Popular Blogs & Sidebar */}
            <div>
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaTrendingUp className="text-primary-500" />
                  Trending Now
                </h3>
                <div className="space-y-6">
                  {popularBlogs.map((blog, index) => (
                    <PopularBlogCard key={blog._id} blog={blog} index={index} />
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-4">Join Our Community</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Start sharing your stories and connect with readers worldwide.
                  </p>
                  <Link to="/register" className="btn-primary w-full text-center block">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CallToAction />
    </div>
  )
}

// Hero Section Component
const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-white opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
      <div className="container-custom relative py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-white text-sm font-medium">Community of Writers</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Share Your Story with the World
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Join thousands of writers and readers on BlogHub. Publish your ideas, 
            discover new perspectives, and build your audience.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 shadow-lg">
              Start Writing <FaArrowRight />
            </Link>
            <Link to="/blogs" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200">
              Explore Blogs
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="white" className="w-full">
          <path d="M0,32L48,42.7C96,53,192,75,288,74.7C384,75,480,53,576,53.3C672,53,768,75,864,80C960,85,1056,75,1152,64C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  )
}

// Stats Section Component
const StatsSection = ({ stats }) => {
  const statItems = [
    { icon: FaNewspaper, label: 'Total Blogs', value: stats.totalBlogs },
    { icon: FaUsers, label: 'Active Writers', value: stats.totalUsers },
    { icon: FaEye, label: 'Total Views', value: stats.totalViews.toLocaleString() },
    { icon: FaRocket, label: 'Community Growth', value: '+100%' },
  ]

  return (
    <div className="bg-white border-b border-gray-200 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 rounded-full mb-4">
                <item.icon className="text-2xl text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{item.value}</div>
              <div className="text-gray-600 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Section Header Component
const SectionHeader = ({ title, subtitle, viewAllLink }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      </div>
      {viewAllLink && (
        <Link to={viewAllLink} className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 mt-2 md:mt-0">
          View All <FaArrowRight className="text-sm" />
        </Link>
      )}
    </div>
  )
}

// Featured Blog Card
const FeaturedBlogCard = ({ blog, index }) => {
  const colors = ['from-purple-500 to-pink-500', 'from-blue-500 to-indigo-500', 'from-green-500 to-teal-500']
  const color = colors[index % colors.length]

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${color}`}></div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Featured
          </span>
          {blog.category && (
            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize">
              {blog.category}
            </span>
          )}
        </div>
        <Link to={`/blogs/${blog._id}`}>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 mb-2 line-clamp-2">
            {blog.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {blog.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={blog.author?.avatar || `https://ui-avatars.com/api/?name=${blog.author?.username || 'User'}&size=32`} 
              alt={blog.author?.username}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-gray-700">{blog.author?.username || 'Anonymous'}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <FaClock className="text-xs" />
              {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Latest Blog Card
const LatestBlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {blog.image && (
          <img 
            src={blog.image} 
            alt={blog.title}
            className="w-full md:w-48 h-32 object-cover rounded-lg"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {blog.category && (
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize">
                {blog.category}
              </span>
            )}
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
            </span>
          </div>
          <Link to={`/blogs/${blog._id}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-200 line-clamp-2">
              {blog.title}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
            {blog.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
          </p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <FaUserCircle />
              {blog.author?.username || 'Anonymous'}
            </span>
            <span className="flex items-center gap-1">
              <FaEye />
              {blog.views || 0}
            </span>
            <span className="flex items-center gap-1">
              <FaHeart />
              {blog.likes || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Popular Blog Card
const PopularBlogCard = ({ blog, index }) => {
  return (
    <Link to={`/blogs/${blog._id}`} className="group flex items-start gap-4">
      <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">
        {index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
          {blog.title}
        </h4>
        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <FaEye className="text-xs" />
            {blog.views || 0}
          </span>
          <span className="flex items-center gap-1">
            <FaHeart className="text-xs" />
            {blog.likes || 0}
          </span>
        </div>
      </div>
    </Link>
  )
}

// Category Card
const CategoryCard = ({ category }) => {
  const colors = [
    'bg-blue-100 text-blue-700 hover:bg-blue-200',
    'bg-purple-100 text-purple-700 hover:bg-purple-200',
    'bg-green-100 text-green-700 hover:bg-green-200',
    'bg-red-100 text-red-700 hover:bg-red-200',
    'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
    'bg-pink-100 text-pink-700 hover:bg-pink-200',
  ]
  const colorIndex = Math.floor(Math.random() * colors.length)
  
  return (
    <Link 
      to={`/blogs?category=${category}`}
      className={`${colors[colorIndex]} rounded-xl p-6 text-center transition-all duration-300 transform hover:scale-105 group`}
    >
      <FaTag className="text-2xl mx-auto mb-2 opacity-60 group-hover:opacity-100" />
      <span className="font-medium capitalize block">{category}</span>
    </Link>
  )
}

// Call to Action Section
const CallToAction = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join our community of writers and start publishing your ideas today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Get Started
            </Link>
            <Link to="/blogs" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200">
              Browse Blogs
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home