import React from "react";
import { Link } from "react-router-dom"; // FIXED: Changed from react-redux to react-router-dom
import { Github, Linkedin, Coffee, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-100 font-poppins pt-16 pb-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
        {/* Brand Logo */}
        <Link to="/" onClick={scrollToTop} className="mb-6">
          <span className="text-xl font-black tracking-tighter text-slate-900">
            Crafted
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              CV
            </span>
          </span>
        </Link>
        {/* Support the Developer Card */}
        <div className="w-full max-w-2xl bg-white border border-indigo-100 rounded-[24px] p-6 md:p-8 mb-12 shadow-sm relative overflow-hidden group">
          {/* Decorative Background Icon */}
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Coffee size={48} className="text-indigo-600 rotate-12" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="size-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
              <Heart size={28} fill="currentColor" className="animate-pulse" />
            </div>

            <div className="text-center md:text-left">
              <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
                "These pixels are free, but the servers run on high-octane
                caffeine and electricity. If you enjoyed your stay, consider
                fueling the next build with a coffee."
              </p>

              <a
                href="https://buymeacoffee.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Support the build <Coffee size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6 text-slate-400 mb-10">
          <a
            href="#"
            className="hover:text-indigo-600 hover:-translate-y-1 transition-all duration-300"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="#"
            className="hover:text-indigo-600 hover:-translate-y-1 transition-all duration-300"
          >
            <Github size={20} />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200/60 w-full text-center">
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-bold">
            © {currentYear} CraftedCV — Built with Passion & Caffeine
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
