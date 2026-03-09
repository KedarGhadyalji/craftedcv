import { FolderIcon, Plus, Trash2 } from "lucide-react";
import React from "react";

const ProjectForm = ({ data, onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">
            Projects
          </h3>
          <p className="text-xs text-slate-500">
            Showcase your best work and side-hustles
          </p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 active:scale-95 shadow-sm"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {data.length === 0 ? (
        /* Empty State with Glassmorphism */
        <div className="text-center py-12 bg-slate-50/50 rounded-4xl border border-dashed border-slate-200">
          <div className="size-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
            <FolderIcon className="size-8 text-slate-300" />
          </div>
          <p className="text-slate-600 font-medium">No projects added yet.</p>
          <p className="text-xs text-slate-400 mt-1">
            Click the button above to start.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
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
                    Project Entry
                  </h4>
                </div>
                <button
                  onClick={() => removeProject(index)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Form Grid */}
              <div className="grid gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                    Project Name
                  </label>
                  <input
                    value={project.name || ""}
                    onChange={(e) =>
                      updateProject(index, "name", e.target.value)
                    }
                    type="text"
                    placeholder="e.g. CraftedCV - AI Portfolio Builder"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                    Project Type
                  </label>
                  <input
                    value={project.type || ""}
                    onChange={(e) =>
                      updateProject(index, "type", e.target.value)
                    }
                    type="text"
                    placeholder="e.g. Web Application / Open Source"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={project.description || ""}
                    onChange={(e) =>
                      updateProject(index, "description", e.target.value)
                    }
                    placeholder="Briefly explain the tech stack used and the problem you solved..."
                    className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
