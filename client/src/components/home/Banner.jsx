import React from "react";

const Banner = () => {
  return (
    <div className="w-full py-3 font-poppins font-medium text-sm text-slate-600 text-center bg-white/40 backdrop-blur-md border-b border-white/40 relative overflow-hidden group">
      {/* Subtle Quartz Animated Shine */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-indigo-50/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

      <p className="relative z-10 flex items-center justify-center gap-3">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold text-white bg-indigo-600 shadow-lg shadow-indigo-500/30">
          New
        </span>
        <span className="text-slate-700">
          Unleash your potential with our{" "}
          <span className="text-indigo-600 font-bold">
            AI Resume Intelligence
          </span>
        </span>
      </p>
    </div>
  );
};

export default Banner;
