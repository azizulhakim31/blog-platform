import { NavLink, Link } from 'react-router-dom'

const Navbar = () => (
  <header className="site-header">
    <nav className="navigation page-width" aria-label="Main navigation">
      <Link to="/" className="brand" aria-label="BlogHub home">
        <span className="brand-mark" aria-hidden="true">b.</span>
        <span>blog<span className="brand-accent">hub</span></span>
      </Link>

      <div className="navigation-links">
        <NavLink to="/" end className={({ isActive }) => `navigation-link${isActive ? ' is-active' : ''}`}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `navigation-link${isActive ? ' is-active' : ''}`}>
          About
        </NavLink>
      </div>

      <Link to="/about#community" className="button button-small navigation-cta">
        Join the community <span aria-hidden="true">↗</span>
      </Link>
    </nav>
  </header>
)

export default Navbar
