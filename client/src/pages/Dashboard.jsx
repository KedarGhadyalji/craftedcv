import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResumes, setShowCreateResume] = useState(false);
  const [showUploadResumes, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const createResume = async (event) => {
    try {
      event.preventDefault();
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);
      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
    setIsLoading(false);
  };

  const editTitle = async (event) => {
    try {
      event.preventDefault();
      const { data } = await api.put(
        "/api/resumes/update",
        { resumeId: editResumeId, resumeData: { title } },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setAllResumes(
        allResumes.map((resume) =>
          resume._id === editResumeId ? { ...resume, title } : resume,
        ),
      );
      setTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this resume?",
      );
      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllResumes(allResumes.filter((resume) => resume._id !== resumeId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-poppins selection:bg-indigo-100">
      {/* Background Decorative Mesh - Pure Polish */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] size-[500px] bg-indigo-200/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[5%] size-[400px] bg-violet-200/20 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Welcome Header with Glass Backdrop */}
        <header className="mb-12 animate-in fade-in slide-in-from-left duration-700">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Welcome,{" "}
            <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {user?.name || "John Lark"}
            </span>
          </h2>
          <p className="text-slate-500 mt-2 text-lg">
            Your professional future starts here. Pick up where you left off.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {/* Action Card: Create */}
          <button
            onClick={() => setShowCreateResume(true)}
            className="group relative h-64 flex flex-col items-center justify-center rounded-3xl bg-white/40 backdrop-blur-md border border-white hover:border-indigo-400 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 active:scale-95 animate-in fade-in zoom-in"
          >
            <div className="size-16 flex items-center justify-center bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <PlusIcon size={32} strokeWidth={2.5} />
            </div>
            <span className="mt-4 font-bold text-slate-700 group-hover:text-indigo-600">
              New Resume
            </span>
          </button>

          {/* Action Card: Upload */}
          <button
            onClick={() => setShowUploadResume(true)}
            className="group relative h-64 flex flex-col items-center justify-center rounded-3xl bg-white/40 backdrop-blur-md border border-white hover:border-violet-400 shadow-sm hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500 active:scale-95 animate-in fade-in zoom-in delay-75"
          >
            <div className="size-16 flex items-center justify-center bg-violet-600 text-white rounded-2xl shadow-lg shadow-violet-200 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
              <UploadCloudIcon size={32} strokeWidth={2.5} />
            </div>
            <span className="mt-4 font-bold text-slate-700 group-hover:text-violet-600">
              Upload PDF
            </span>
          </button>

          {/* Resume Items */}
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <div
                key={resume._id}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                style={{ "--index": index }}
                className="group relative h-64 flex flex-col items-center justify-center rounded-3xl bg-white/60 backdrop-blur-xl border border-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <div
                  className="size-16 flex items-center justify-center rounded-2xl mb-4 group-hover:rotate-3 transition-transform"
                  style={{
                    backgroundColor: `${baseColor}15`,
                    color: baseColor,
                  }}
                >
                  <FilePenLineIcon size={30} strokeWidth={1.5} />
                </div>

                <div className="px-4 text-center">
                  <h3 className="font-bold text-slate-800 line-clamp-1">
                    {resume.title}
                  </h3>
                  <p className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-wider">
                    {new Date(resume.updatedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {/* Glass Floating Actions */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300"
                >
                  <button
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className="p-2 bg-white/90 hover:bg-white rounded-xl text-slate-600 shadow-lg hover:text-indigo-600 transition-colors"
                  >
                    <PencilIcon size={16} />
                  </button>
                  <button
                    onClick={() => deleteResume(resume._id)}
                    className="p-2 bg-white/90 hover:bg-red-50 rounded-xl text-red-500 shadow-lg transition-colors"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Unified Glass Modal Overlay --- */}
        {(showCreateResumes || showUploadResumes || editResumeId) && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
            <div className="relative w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-[40px] shadow-2xl p-10 border border-white animate-in zoom-in-95 duration-300">
              <button
                onClick={() => {
                  setShowCreateResume(false);
                  setShowUploadResume(false);
                  setEditResumeId("");
                }}
                className="absolute top-6 right-6 text-slate-400 hover:rotate-90 hover:text-slate-900 transition-all duration-300"
              >
                <XIcon size={24} />
              </button>

              <h2 className="text-3xl font-black text-slate-900 mb-2">
                {showCreateResumes
                  ? "Create"
                  : showUploadResumes
                    ? "Upload"
                    : "Edit"}
              </h2>
              <p className="text-slate-500 mb-8 font-medium">
                Please provide a title for your resume.
              </p>

              <div className="space-y-6">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                  className="w-full px-6 py-4 bg-slate-100/50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl transition-all outline-none text-lg font-medium"
                  placeholder="e.g. Fullstack Developer"
                />

                {showUploadResumes && (
                  <label className="block group">
                    <div
                      className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center gap-4 transition-all duration-300 ${resume ? "border-indigo-500 bg-indigo-50/50" : "border-slate-200 group-hover:border-indigo-300"}`}
                    >
                      <UploadCloud
                        className={`size-12 ${resume ? "text-indigo-600 animate-bounce" : "text-slate-300"}`}
                      />
                      <p className="font-bold text-slate-700">
                        {resume ? resume.name : "Select your PDF"}
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      hidden
                      onChange={(e) => setResume(e.target.files[0])}
                    />
                  </label>
                )}

                <button
                  disabled={isLoading}
                  onClick={
                    showCreateResumes
                      ? createResume
                      : showUploadResumes
                        ? uploadResume
                        : editTitle
                  }
                  className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[20px] font-bold text-lg shadow-2xl shadow-indigo-200 transition-all active:scale-[0.97] flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <LoaderCircleIcon className="animate-spin" />
                  ) : (
                    <PlusIcon />
                  )}
                  {isLoading ? "Processing..." : "Confirm & Continue"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
