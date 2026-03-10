import React from "react";
import { Github, ArrowRight, Code2 } from "lucide-react";

const GitHubCTA = () => {
  return (
    <section className="py-20 px-4 bg-white font-poppins">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center text-center rounded-4xl py-16 bg-slate-50 border border-slate-100 relative overflow-hidden group">
        {/* Subtle Background Glow */}
        <div className="absolute -top-24 -right-24 size-64 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 size-64 bg-violet-500/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Dynamic Icon Wrapper */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-indigo-200/20 blur-2xl rounded-full scale-150 group-hover:bg-indigo-200/40 transition-colors" />
          <div className="relative size-16 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-slate-100">
            <Code2 className="size-8 text-indigo-600" />
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 max-w-2xl px-4 tracking-tight">
          CraftedCV is <span className="text-indigo-600">Open Source</span>.{" "}
          <br className="hidden md:block" />
          Help us build the future of resumes.
        </h2>

        <p className="text-sm md:text-base text-slate-500 max-w-lg mt-4 px-6 leading-relaxed">
          Join our growing community of developers on GitHub. Whether you want
          to add new templates, fix bugs, or suggest AI features, your
          contribution makes a difference.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <button
            onClick={() => (window.location.href = "/app")}
            className="w-full sm:w-auto px-10 py-3.5 text-sm font-bold bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
          >
            Get Started
            <ArrowRight className="size-4" />
          </button>

          <a
            href="https://github.com/KedarGhadyalji/craftedcv"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all hover:-translate-y-1 active:scale-95 shadow-sm"
          >
            <Github className="size-5" />
            GitHub Repo
          </a>
        </div>
      </div>
    </section>
  );
};

export default GitHubCTA;
