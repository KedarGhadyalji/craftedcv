import React from "react";
import { Mail, Phone, MapPin, Linkedin, Link2 } from "lucide-react";

const RightSidebarTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white text-zinc-800 font-sans">
      <div className="grid grid-cols-12 min-h-[1000px]">
        {/* LEFT CONTENT COLUMN (8/12) */}
        <div className="col-span-8 p-10 pr-8">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-zinc-900 tracking-tight mb-2">
              {data.personal_info?.full_name}
            </h1>
            <p
              className="text-xl font-medium uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              {data.personal_info?.profession}
            </p>
          </div>

          {/* Summary */}
          {data.professional_summary && (
            <div className="mb-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
                About Me
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                {data.professional_summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">
                Experience
              </h3>
              <div className="space-y-8 border-l-2 border-zinc-100 pl-6 ml-1">
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative">
                    <div
                      className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2 border-white"
                      style={{ backgroundColor: accentColor }}
                    ></div>
                    <h4 className="text-lg font-bold text-zinc-800">
                      {exp.position}
                    </h4>
                    <div className="flex justify-between text-sm mb-2">
                      <span
                        className="font-semibold"
                        style={{ color: accentColor }}
                      >
                        {exp.company}
                      </span>
                      <span className="text-zinc-400">
                        {formatDate(exp.start_date)} -{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.project && data.project.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">
                Projects
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {data.project.map((proj, index) => (
                  <div
                    key={index}
                    className="bg-zinc-50 p-4 rounded border border-zinc-100"
                  >
                    <h4 className="font-bold text-zinc-800">{proj.name}</h4>
                    <p
                      className="text-xs font-semibold mb-2"
                      style={{ color: accentColor }}
                    >
                      {proj.type}
                    </p>
                    <p className="text-sm text-zinc-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR COLUMN (4/12) */}
        <div className="col-span-4 bg-zinc-50 p-8 border-l border-zinc-100">
          {/* Image */}
          {data.personal_info?.image && (
            <div className="mb-8">
              {typeof data.personal_info.image === "string" ? (
                <img
                  src={data.personal_info.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-lg object-cover shadow-sm mx-auto border-4"
                  style={{ borderColor: accentColor }}
                />
              ) : (
                <img
                  src={URL.createObjectURL(data.personal_info.image)}
                  alt="Profile"
                  className="w-32 h-32 rounded-lg object-cover shadow-sm mx-auto border-4"
                  style={{ borderColor: accentColor }}
                />
              )}
            </div>
          )}

          {/* Contact Info */}
          <div className="mb-8 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
              Contact
            </h3>
            {data.personal_info?.email && (
              <div className="flex items-center gap-2 text-sm text-zinc-600 break-all">
                <Mail size={14} style={{ color: accentColor }} />{" "}
                {data.personal_info.email}
              </div>
            )}
            {data.personal_info?.phone && (
              <div className="flex items-center gap-2 text-sm text-zinc-600">
                <Phone size={14} style={{ color: accentColor }} />{" "}
                {data.personal_info.phone}
              </div>
            )}
            {data.personal_info?.location && (
              <div className="flex items-center gap-2 text-sm text-zinc-600">
                <MapPin size={14} style={{ color: accentColor }} />{" "}
                {data.personal_info.location}
              </div>
            )}
            {data.personal_info?.linkedin && (
              <div className="flex items-center gap-2 text-sm text-zinc-600">
                <Linkedin size={14} style={{ color: accentColor }} />{" "}
                <span>LinkedIn</span>
              </div>
            )}
            {data.personal_info?.website && (
              <div className="flex items-center gap-2 text-sm text-zinc-600">
                <Link2 size={14} style={{ color: accentColor }} />{" "}
                <span>Portfolio</span>
              </div>
            )}
          </div>

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white border border-zinc-200 rounded text-xs font-medium text-zinc-600 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                Education
              </h3>
              <div className="space-y-6">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <p className="font-bold text-sm text-zinc-800">
                      {edu.degree}
                    </p>
                    <p className="text-xs text-zinc-500 mb-1">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {formatDate(edu.graduation_date)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSidebarTemplate;
