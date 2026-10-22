import { Link } from 'react-router-dom'

const Footer = () => (
  <footer className="site-footer">
    <div className="page-width footer-content">
      <Link to="/" className="brand footer-brand">
        <span className="brand-mark" aria-hidden="true">b.</span>
        <span>blog<span className="brand-accent">hub</span></span>
      </Link>
      <p>Good ideas deserve a place to grow.</p>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <span className="footer-copyright">© {new Date().getFullYear()} BlogHub</span>
    </div>
  </footer>
)

export default Footer
