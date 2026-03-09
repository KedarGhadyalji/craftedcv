import { Check, Palette, ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    // --- Professional & AI Tones ---
    { name: "Indigo", value: "#4F46E5" },
    { name: "Violet", value: "#6D28D9" },
    { name: "Cobalt", value: "#1E40AF" },

    // --- Fresh & Growth Tones ---
    { name: "Teal", value: "#0D9488" },
    { name: "Emerald", value: "#059669" },
    { name: "Lime", value: "#65A30D" },

    // --- High Contrast / Warm Tones ---
    { name: "Amber", value: "#D97706" },
    { name: "Crimson", value: "#DC2626" },
    { name: "Rose", value: "#E11D48" },

    // --- Earth & Sophisticated Tones ---
    { name: "Coffee", value: "#78350F" },
    { name: "Slate", value: "#475569" }, // Kept one neutral for "Classic" look
    { name: "Charcoal", value: "#111827" }, // Deepest black-ish for high contrast
  ];

  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative font-poppins" ref={pickerRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 text-sm font-semibold transition-all px-4 py-2 rounded-xl border active:scale-95 ${
          isOpen
            ? "bg-indigo-50 border-indigo-200 text-indigo-600 shadow-inner"
            : "bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 shadow-sm"
        }`}
      >
        <Palette size={16} strokeWidth={2.5} />
        <span className="max-sm:hidden">Colour</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Popover - Now 12 colors in a 4-column grid */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-3 w-64 p-4 z-100 bg-white/90 backdrop-blur-2xl rounded-2xl border border-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-4 px-1">
            Select Accent
          </p>

          <div className="grid grid-cols-4 gap-y-5 gap-x-2">
            {colors.map((color) => (
              <div
                key={color.value}
                className="relative flex flex-col items-center group cursor-pointer"
                onClick={() => {
                  onChange(color.value);
                  setIsOpen(false);
                }}
              >
                {/* Color Orb with Selection Ring */}
                <div
                  className={`size-10 rounded-full border-4 transition-all duration-300 shadow-sm group-hover:scale-110 group-hover:shadow-md ${
                    selectedColor === color.value
                      ? "border-white ring-2 ring-indigo-500 shadow-lg shadow-indigo-200"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.value }}
                >
                  {selectedColor === color.value && (
                    <div className="w-full h-full flex items-center justify-center">
                      <Check className="size-4 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>

                {/* Minimalist Label */}
                <span
                  className={`mt-1.5 text-[10px] font-medium transition-colors ${selectedColor === color.value ? "text-indigo-600 font-bold" : "text-slate-400 group-hover:text-slate-600"}`}
                >
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
