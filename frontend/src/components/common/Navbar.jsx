import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes, FaUser, FaBlog, FaHome } from 'react-icons/fa'

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/')
        setIsOpen(false)
    }

    const navLinks = [
        { path: '/', label: 'Home', icon: <FaHome /> },
        { path: '/blogs', label: 'Blogs', icon: <FaBlog /> },
    ]

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="container-custom">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-primary-600">Blog</span>
                        <span className="text-2xl font-bold text-gray-700">Hub</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                            >
                                {link.icon}
                                <span>{link.label}</span>
                            </Link>
                        ))}

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/create"
                                    className="btn-primary text-sm"
                                >
                                    Write Blog
                                </Link>
                                <Link
                                    to="/profile"
                                    className="flex items-center space-x-1 text-gray-700 hover:text-primary-600"
                                >
                                    <FaUser />
                                    <span>{user?.username || 'Profile'}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-700 hover:text-red-600 transition-colors duration-200"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-700 hover:text-primary-600">
                                    Login
                                </Link>
                                <Link to="/register" className="btn-primary">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none"
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.icon}
                                    <span>{link.label}</span>
                                </Link>
                            ))}

                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/create"
                                        className="btn-primary text-center"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Write Blog
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <FaUser />
                                        <span>{user?.username || 'Profile'}</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-left text-gray-700 hover:text-red-600"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-gray-700 hover:text-primary-600"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="btn-primary text-center"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar