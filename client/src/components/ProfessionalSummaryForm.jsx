import { Loader2, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);
      const prompt = `enhance my professional summary "${data}"`;
      const response = await api.post(
        "/api/ai/enhance-pro-sum",
        { userContent: prompt },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setResumeData((prev) => ({
        ...prev,
        professional_summary: response.data.enhancedContent,
      }));
      toast.success("Summary enhanced!");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">
            Professional Summary
          </h3>
          <p className="text-xs text-slate-500">
            Pitch your career in a few powerful sentences
          </p>
        </div>

        {/* Quartz AI Button */}
        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-violet-50 text-violet-600 rounded-xl hover:bg-violet-600 hover:text-white transition-all duration-300 disabled:opacity-40 shadow-sm border border-violet-100 active:scale-95"
        >
          {isGenerating ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Sparkles className="size-3.5" />
          )}
          {isGenerating ? "REFINING..." : "AI ENHANCE"}
        </button>
      </div>

      <div className="relative group">
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={8}
          className="w-full p-5 text-sm bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none placeholder:text-slate-300 leading-relaxed text-slate-700"
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
        />

        {/* Subtle decorative glow for AI focus */}
        <div className="absolute top-0 right-0 p-3 opacity-20 pointer-events-none group-focus-within:opacity-100 transition-opacity">
          <Sparkles className="size-4 text-indigo-400" />
        </div>
      </div>

      <div className="bg-indigo-50/30 border border-indigo-100/50 rounded-2xl p-4">
        <p className="text-[11px] text-indigo-600/80 font-medium text-center leading-relaxed">
          <span className="font-bold uppercase mr-1">Pro Tip:</span>
          Keep it concise (3-4 sentences) and focus on your most relevant
          achievements and high-impact skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
