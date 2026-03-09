import { Plus, Sparkles, X } from "lucide-react";
import React, { useState } from "react";

const SkillsForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (indexToRemove) => {
    onChange(data.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">
          Skills & Expertise
        </h3>
        <p className="text-xs text-slate-500">
          Add technical proficiencies and soft skills
        </p>
      </div>

      {/* Input Group */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="e.g., React, Node.js, Leadership"
          className="flex-1 px-4 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300"
          onChange={(e) => setNewSkill(e.target.value)}
          value={newSkill}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus className="size-4" /> Add
        </button>
      </div>

      {/* Skills Display Area */}
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2.5 p-1">
          {data.map((skill, index) => (
            <div
              key={index}
              className="group flex items-center gap-1.5 px-4 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full text-[13px] font-semibold hover:bg-indigo-100 hover:border-indigo-200 transition-all animate-in zoom-in duration-200"
            >
              {skill}
              <button
                onClick={() => removeSkill(index)}
                className="text-indigo-400 hover:text-rose-500 transition-colors"
              >
                <X className="size-3.5 stroke-3" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-10 bg-slate-50/50 rounded-4xl border border-dashed border-slate-200">
          <div className="size-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
            <Sparkles className="size-7 text-slate-300" />
          </div>
          <p className="text-slate-600 font-medium">No skills listed.</p>
          <p className="text-xs text-slate-400 mt-1">
            Start typing above to build your expertise list.
          </p>
        </div>
      )}

      {/* Quartz Pro Tip Box */}
      <div className="bg-indigo-50/30 border border-indigo-100/50 rounded-2xl p-4">
        <p className="text-[11px] text-indigo-600/80 font-medium leading-relaxed">
          <span className="font-black uppercase mr-1 tracking-wider">
            Pro Tip:
          </span>
          Aim for 8-12 relevant skills. Mix high-demand technical tools (React,
          AWS) with key soft skills (Communication, Teamwork) to optimize for
          ATS.
        </p>
      </div>
    </div>
  );
};

export default SkillsForm;
