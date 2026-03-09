import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ExperienceForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateDescription = async (index) => {
    setGeneratingIndex(index);
    const experience = data[index];
    const prompt = `enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}.`;

    try {
      const { data: resData } = await api.post(
        "api/ai/enhance-job-desc",
        { userContent: prompt },
        { headers: { Authorization: `Bearer ${token}` } }, // Standardized bearer token
      );
      updateExperience(index, "description", resData.enhancedContent);
      toast.success("AI Enhancement complete!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">
            Professional Experience
          </h3>
          <p className="text-xs text-slate-500">Document your career journey</p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 active:scale-95 shadow-sm"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        /* Empty State with Glassmorphism */
        <div className="text-center py-12 bg-slate-50/50 rounded-4xl border border-dashed border-slate-200">
          <div className="size-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
            <Briefcase className="size-8 text-slate-300" />
          </div>
          <p className="text-slate-600 font-medium">No experience added yet.</p>
          <p className="text-xs text-slate-400 mt-1">
            Click the button above to start.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative group"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="size-6 flex items-center justify-center bg-indigo-100 text-indigo-600 text-[10px] font-bold rounded-full">
                    {index + 1}
                  </span>
                  <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                    Experience Entry
                  </h4>
                </div>
                <button
                  onClick={() => removeExperience(index)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Form Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                    Company
                  </label>
                  <input
                    value={experience.company || ""}
                    onChange={(e) =>
                      updateExperience(index, "company", e.target.value)
                    }
                    type="text"
                    placeholder="e.g. Google"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                    Position
                  </label>
                  <input
                    value={experience.position || ""}
                    onChange={(e) =>
                      updateExperience(index, "position", e.target.value)
                    }
                    type="text"
                    placeholder="e.g. Software Engineer"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                    Start Date
                  </label>
                  <input
                    value={experience.start_date || ""}
                    onChange={(e) =>
                      updateExperience(index, "start_date", e.target.value)
                    }
                    type="month"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                    End Date
                  </label>
                  <input
                    value={experience.end_date || ""}
                    onChange={(e) =>
                      updateExperience(index, "end_date", e.target.value)
                    }
                    type="month"
                    disabled={experience.is_current}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Current Job Toggle */}
              <label className="flex items-center gap-2 mt-4 cursor-pointer w-fit group/label">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={experience.is_current || false}
                    onChange={(e) =>
                      updateExperience(index, "is_current", e.target.checked)
                    }
                    className="peer sr-only"
                  />
                  <div className="w-8 h-4 bg-slate-200 rounded-full peer peer-checked:bg-indigo-600 transition-colors" />
                  <div className="absolute top-0.5 left-0.5 size-3 bg-white rounded-full transition-transform peer-checked:translate-x-4 shadow-sm" />
                </div>
                <span className="text-xs font-medium text-slate-600 group-hover/label:text-indigo-600 transition-colors">
                  I currently work here
                </span>
              </label>

              {/* Description & AI Button */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">
                    Job Description
                  </label>
                  <button
                    onClick={() => generateDescription(index)}
                    disabled={
                      generatingIndex === index ||
                      !experience.position ||
                      !experience.company
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold bg-violet-50 text-violet-600 rounded-lg hover:bg-violet-600 hover:text-white transition-all duration-300 disabled:opacity-40 shadow-sm border border-violet-100"
                  >
                    {generatingIndex === index ? (
                      <Loader2 className="size-3 animate-spin" />
                    ) : (
                      <Sparkles className="size-3" />
                    )}
                    ENHANCE WITH AI
                  </button>
                </div>
                <textarea
                  value={experience.description || ""}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  rows={4}
                  className="w-full text-sm px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none"
                  placeholder="Describe your key responsibilities and impact..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
