import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[url(https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradientBackground.png)] bg-cover bg-center text-sm text-slate-500 min-h-screen font-poppins">
      {/* Navbar - Modern Quartz Glass */}
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-white/40 font-medium relative z-50 bg-white/70 backdrop-blur-xl shadow-sm">
        {/* Logo */}
        <Link to="/">
          <img src="/logo.svg" alt="CraftedCV Logo" className="h-10 w-auto" />
        </Link>

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-slate-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Nav Links */}
        <ul
          className={`${menuOpen ? "flex" : "hidden"} absolute top-full left-0 w-full flex-col bg-white/95 backdrop-blur-lg shadow-xl px-6 py-4 md:static md:w-auto md:flex md:flex-row md:items-center gap-8 md:bg-transparent md:shadow-none z-50`}
        >
          <li>
            <a
              className="hover:text-indigo-600 md:hover:underline underline-offset-8 transition"
              href="#"
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="hover:text-indigo-600 md:hover:underline underline-offset-8 transition"
              href="#features"
            >
              Features
            </a>
          </li>
          <li>
            <a
              className="hover:text-indigo-600 md:hover:underline underline-offset-8 transition"
              href="#testimonials"
            >
              Testimonials
            </a>
          </li>
          <li>
            <a
              className="hover:text-indigo-600 md:hover:underline underline-offset-8 transition"
              href="#contact"
            >
              Contact
            </a>
          </li>

          {/* Login/Dashboard button for mobile */}
          <li className="block md:hidden mt-4 border-t border-slate-100 pt-4">
            {!user ? (
              <Link
                to="/app?state=login"
                className="group flex items-center gap-2 text-indigo-600 font-bold"
              >
                Log In
                <svg
                  className="group-hover:translate-x-1 transition pt-0.5"
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                  fill="none"
                >
                  <path
                    d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ) : (
              <Link
                to="/app"
                className="group flex items-center gap-2 text-indigo-600 font-bold"
              >
                Go to Dashboard
              </Link>
            )}
          </li>
        </ul>

        {/* Auth Actions for desktop */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <Link
              to="/app?state=login"
              className="group flex items-center gap-2 hover:text-indigo-600 transition"
            >
              Log In
              <svg
                className="group-hover:translate-x-1 transition pt-0.5"
                width="12"
                height="9"
                viewBox="0 0 12 9"
                fill="none"
              >
                <path
                  d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          ) : (
            <Link
              to="/app"
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition active:scale-95 shadow-lg shadow-indigo-500/20"
            >
              Dashboard
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Content */}
      <div className="h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold max-w-4xl text-slate-900 leading-tight">
          Land your dream Job with{" "}
          <span className="bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
            AI Built Resume
          </span>
        </h1>

        <p className="max-w-xl text-center mt-6 px-4 text-lg text-slate-600 leading-relaxed">
          Create, edit, and download professional resumes with tailored
          strategies designed for success. Simplify your career growth today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link
            to="/app?state=register"
            className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-xl shadow-indigo-500/30 active:scale-95"
          >
            Get Started Now
          </Link>
        </div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          .font-poppins { font-family: 'Poppins', sans-serif; }
        `}
      </style>
    </div>
  );
};

export default Hero;
