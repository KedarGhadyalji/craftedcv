import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    // Matching the bg-bottom and removing the harsh border for a clean Quartz flow
    <footer className="flex flex-col items-center justify-center w-full pb-20 pt-16 bg-[url(https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradientBackground.png)] bg-cover bg-bottom font-poppins relative">
      {/* Subtle Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-indigo-400/5 blur-[120px] pointer-events-none"></div>

      {/* Branding Logo */}
      <Link to="/" className="mb-4 hover:opacity-80 transition-opacity relative z-10">
        <img src="/logo.svg" alt="CraftedCV" className="h-10 w-auto" />
      </Link>

      {/* Copyright Text */}
      <p className="mt-2 text-center text-sm tracking-wide text-slate-500 relative z-10">
        Copyright © 2026{" "}
        <Link
          to="/"
          className="text-indigo-600 font-semibold hover:underline transition"
        >
          CraftedCV
        </Link>
        . All rights reserved.
      </p>

      {/* Social Icons */}
      <div className="flex items-center gap-8 mt-8 relative z-10">
        <a
          href="#"
          className="text-slate-400 hover:-translate-y-1 hover:text-indigo-600 transition-all duration-300"
        >
          <Instagram size={22} strokeWidth={2} />
        </a>
        <a
          href="#"
          className="text-slate-400 hover:-translate-y-1 hover:text-indigo-600 transition-all duration-300"
        >
          <Linkedin size={22} strokeWidth={2} />
        </a>
        <a
          href="#"
          className="text-slate-400 hover:-translate-y-1 hover:text-indigo-600 transition-all duration-300"
        >
          <Github size={22} strokeWidth={2} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;