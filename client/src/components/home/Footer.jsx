import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col bg-slate-50 items-center justify-around w-full py-16 text-sm text-slate-500 font-poppins border-t border-slate-100">
      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 px-4">
        <Link
          to="/"
          className="font-medium text-slate-500 hover:text-indigo-600 transition-all"
        >
          Home
        </Link>
        <Link
          to="#"
          className="font-medium text-slate-500 hover:text-indigo-600 transition-all"
        >
          About
        </Link>
        <Link
          to="#"
          className="font-medium text-slate-500 hover:text-indigo-600 transition-all"
        >
          Services
        </Link>
        <Link
          to="#"
          className="font-medium text-slate-500 hover:text-indigo-600 transition-all"
        >
          Contact
        </Link>
        <Link
          to="#"
          className="font-medium text-slate-500 hover:text-indigo-600 transition-all"
        >
          Help
        </Link>
      </div>

      {/* Social Icons */}
      <div className="flex items-center gap-6 mt-8 text-indigo-500/80">
        <a
          href="#"
          className="hover:-translate-y-1 hover:text-indigo-600 transition-all duration-300"
        >
          <Facebook size={22} strokeWidth={2} />
        </a>
        <a
          href="#"
          className="hover:-translate-y-1 hover:text-indigo-600 transition-all duration-300"
        >
          <Instagram size={22} strokeWidth={2} />
        </a>
        <a
          href="#"
          className="hover:-translate-y-1 hover:text-indigo-600 transition-all duration-300"
        >
          <Linkedin size={22} strokeWidth={2} />
        </a>
        <a
          href="#"
          className="hover:-translate-y-1 hover:text-indigo-600 transition-all duration-300"
        >
          <Github size={22} strokeWidth={2} />
        </a>
      </div>

      {/* Branding & Dynamic Copyright */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="text-center text-slate-400 text-xs tracking-wide">
          Copyright © {currentYear} CraftedCV. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
