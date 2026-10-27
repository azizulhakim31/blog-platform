
import { useState } from "react";
import {
  FiBookOpen,
  FiMenu,
  FiX,
  FiSearch,
  FiPenTool,
} from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Explore", href: "#blogs" },
    { label: "Categories", href: "#categories" },
    { label: "About", href: "#about" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <nav className="navbar mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          <a
            href="#home"
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-content">
              <FiBookOpen size={21} />
            </span>
            Relato
          </a>
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
          <a
            href="#blogs"
            className="btn btn-ghost btn-square hidden sm:inline-flex"
            aria-label="Explore articles"
          >
            <FiSearch size={19} />
          </a>

          <a href="#write" className="btn btn-primary btn-sm sm:btn-md">
            <FiPenTool size={16} />
            <span className="hidden sm:inline">Start writing</span>
            <span className="sm:hidden">Write</span>
          </a>

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

      {menuOpen && (
        <div className="border-t border-base-300 bg-base-100 p-3 lg:hidden">
          <ul className="menu w-full">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
