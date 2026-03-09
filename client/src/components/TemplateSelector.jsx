import React, { useState, useRef, useEffect } from "react";
import { Layout, Check, ChevronDown } from "lucide-react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef(null);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview: "Traditional format with professional typography.",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview: "Clean design with a single profile image focus.",
    },
    {
      id: "executive",
      name: "Executive",
      preview: "High-impact layout with a bold header section.",
    },
    {
      id: "right-sidebar",
      name: "Right Sidebar",
      preview: "Content-first layout with a metadata sidebar.",
    },
    {
      id: "cascade",
      name: "Cascade",
      preview: "Elegant waterfall timeline for visual journeys.",
    },
    {
      id: "halley",
      name: "Halley",
      preview: "Compact split-header design for high impact.",
    },
  ];

  // Close when clicking outside for better UX
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative font-poppins" ref={selectorRef}>
      {/* Trigger Button - Quartz Style */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 text-sm font-semibold transition-all px-4 py-2 rounded-xl border active:scale-95 ${
          isOpen
            ? "bg-indigo-50 border-indigo-200 text-indigo-600 shadow-inner"
            : "bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 shadow-sm"
        }`}
      >
        <Layout size={16} strokeWidth={2.5} />
        <span className="max-sm:hidden">Template</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Popover - Quartz Glassmorphism */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-3 w-80 p-3 z-100 bg-white/95 backdrop-blur-2xl rounded-2xl border border-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-3 px-2">
            Select Layout
          </p>

          <div className="space-y-2 overflow-y-auto max-h-[400px] pr-1 custom-scrollbar">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => {
                  onChange(template.id);
                  setIsOpen(false);
                }}
                className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                  selectedTemplate === template.id
                    ? "border-indigo-500 bg-indigo-50/50 shadow-md"
                    : "border-transparent bg-slate-50/50 hover:bg-white hover:border-slate-200"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4
                      className={`font-bold text-sm ${selectedTemplate === template.id ? "text-indigo-700" : "text-slate-800"}`}
                    >
                      {template.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed italic">
                      {template.preview}
                    </p>
                  </div>

                  {selectedTemplate === template.id && (
                    <div className="size-6 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-200 animate-in zoom-in">
                      <Check className="size-3.5 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>

                {/* Optional: Subtle Visual Indicator for Selected State */}
                {selectedTemplate === template.id && (
                  <div className="absolute left-0 top-4 bottom-4 w-1 bg-indigo-600 rounded-r-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
