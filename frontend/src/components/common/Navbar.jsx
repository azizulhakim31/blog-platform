import { useState } from "react";
import { FiBookOpen, FiMenu, FiX, FiSearch, FiUser, FiLayout, FiLogOut, } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/#blogs" },
    { label: "Categories", href: "/#categories" },
    { label: "About", href: "/#about" },
  ];

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <nav className="navbar mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-content">
              <FiBookOpen size={21} />
            </span>
            Relato
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1 font-medium">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <Link
            to="/#blogs"
            className="btn btn-ghost btn-square hidden sm:inline-flex"
            aria-label="Explore articles"
          >
            <FiSearch size={19} />
          </Link>

          {isAuthenticated ? (
            <div className="dropdown dropdown-end hidden sm:block">
              <button
                type="button"
                tabIndex={0}
                className="btn btn-ghost gap-2"
              >
                <div className="grid size-8 place-items-center rounded-full bg-primary text-primary-content">
                  <FiUser />
                </div>
                <span className="max-w-28 truncate">{user?.name}</span>
              </button>

              <ul
                tabIndex={0}
                className="menu dropdown-content z-50 mt-3 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
              >
                <li>
                  <Link to="/dashboard">
                    <FiLayout /> Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout}>
                    <FiLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                to="/login"
                className="btn btn-ghost btn-sm"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm"
              >
                Get started
              </Link>
            </div>
          )}

          <button
            type="button"
            className="btn btn-ghost btn-square lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {
        menuOpen && (
          <div className="border-t border-base-300 bg-base-100 p-3 lg:hidden">
            <ul className="menu w-full">
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                </li>
              ))}

              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                      <FiLayout /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>
                      <FiLogOut /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" onClick={() => setMenuOpen(false)}>
                      Sign in
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={() => setMenuOpen(false)}>
                      Get started
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )
      }
    </header >
  );
};

export default Navbar;
