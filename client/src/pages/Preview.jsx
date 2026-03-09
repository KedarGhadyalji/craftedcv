import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import { ArrowLeftIcon, AlertCircle } from "lucide-react";
import ResumePreview from "../components/ResumePreview";
import api from "../configs/api";

const Preview = () => {
  const { resumeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);
  const [message, setMessage] = useState("");

  const funnyMessages = [
    "Oops… This Resume Took a Coffee Break ☕",
    "The Resume Exists… Just Not Here",
    "Error 404: Career Path Not Found",
    "Well This Is Awkward…",
    "A Ghost In The Machine? 👻",
  ];

  const loadResume = async () => {
    try {
      const { data } = await api.get("/api/resumes/public/" + resumeId);
      setResumeData(data.resume);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
    const randomMessage =
      funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    setMessage(randomMessage);
  }, [resumeId]);

  if (isLoading) return <Loader />;

  return resumeData ? (
    <div className="bg-slate-50 min-h-screen">
      {/* Quartz Top Bar for Public View */}
      <div className="w-full bg-white/70 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-10 px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo" className="h-8 w-auto" />
        </Link>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Public Document Preview
        </p>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="shadow-2xl shadow-indigo-500/10 rounded-sm">
          <ResumePreview
            data={resumeData}
            template={resumeData.template}
            accentColor={resumeData.accent_color}
            classes="bg-white"
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="relative flex flex-col items-center justify-center h-screen bg-slate-50 font-poppins overflow-hidden">
      {/* Decorative Quartz Background Blobs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] size-[500px] bg-indigo-200/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[0%] right-[-5%] size-[400px] bg-violet-200/20 blur-[100px] rounded-full" />
      </div>

      <div className="text-center px-6 animate-in zoom-in duration-500">
        <div className="size-20 bg-white rounded-3xl shadow-quartz flex items-center justify-center mx-auto mb-8">
          <AlertCircle className="size-10 text-slate-300" />
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
          {message}
        </h1>

        <p className="text-slate-500 max-w-md mx-auto mb-10">
          The document you are looking for might have been moved, set to
          private, or deleted by the author.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl px-8 py-4 shadow-xl shadow-indigo-500/20 transition-all active:scale-95"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Home Page
        </Link>
      </div>
    </div>
  );
};

export default Preview;
