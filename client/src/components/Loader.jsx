import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Glow */}
        <div className="absolute size-20 bg-indigo-500/20 rounded-full animate-ping" />

        {/* Middle Rotating Ring */}
        <div className="size-14 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />

        {/* Inner Violet Orb */}
        <div className="absolute size-6 bg-linear-to-tr from-indigo-600 to-violet-500 rounded-full shadow-lg shadow-indigo-500/40 animate-pulse" />
      </div>
    </div>
  );
};

export default Loader;
