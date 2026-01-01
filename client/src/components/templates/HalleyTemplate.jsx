import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const HalleyTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div
      className="max-w-4xl mx-auto bg-white text-zinc-800 font-sans border-t-8"
      style={{ borderColor: accentColor }}
    >
      {/* Header Grid */}
      <div className="grid grid-cols-3 border-b border-zinc-200">
        {/* Left Header: Image & Contact */}
        <div className="col-span-1 bg-zinc-50 p-8 border-r border-zinc-200 flex flex-col items-center text-center">
          {data.personal_info?.image && (
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-white shadow-sm">
              {typeof data.personal_info.image === "string" ? (
                <img
                  src={data.personal_info.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={URL.createObjectURL(data.personal_info.image)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}

          <div className="w-full space-y-3 text-sm text-zinc-600 text-left">
            {data.personal_info?.email && (
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white rounded shadow-sm">
                  <Mail size={12} style={{ color: accentColor }} />
                </div>
                <span className="truncate">{data.personal_info.email}</span>
              </div>
            )}
            {data.personal_info?.phone && (
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white rounded shadow-sm">
                  <Phone size={12} style={{ color: accentColor }} />
                </div>
                <span>{data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info?.location && (
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white rounded shadow-sm">
                  <MapPin size={12} style={{ color: accentColor }} />
                </div>
                <span>{data.personal_info.location}</span>
              </div>
            )}
            {data.personal_info?.linkedin && (
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white rounded shadow-sm">
                  <Linkedin size={12} style={{ color: accentColor }} />
                </div>
                <span className="truncate">LinkedIn</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Header: Name & Profile */}
        <div className="col-span-2 p-8 flex flex-col justify-center">
          <h1 className="text-5xl font-black uppercase text-zinc-900 leading-none mb-2 tracking-tighter">
            {data.personal_info?.full_name?.split(" ")[0]}
            <span className="text-zinc-400 block">
              {data.personal_info?.full_name?.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p
            className="text-xl font-medium tracking-widest uppercase mb-6"
            style={{ color: accentColor }}
          >
            {data.personal_info?.profession}
          </p>
          {data.professional_summary && (
            <p className="text-sm text-zinc-600 leading-relaxed border-l-2 pl-4 border-zinc-200">
              {data.professional_summary}
            </p>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 min-h-[800px]">
        {/* Left Sidebar Content */}
        <div className="col-span-1 p-8 border-r border-zinc-200">
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section className="mb-10">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6 pb-2 border-b border-zinc-200">
                Education
              </h2>
              <div className="space-y-6">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <div className="font-bold text-sm">{edu.degree}</div>
                    <div className="text-xs text-zinc-500">
                      {edu.institution}
                    </div>
                    <div className="text-xs font-mono mt-1 text-zinc-400">
                      {formatDate(edu.graduation_date)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6 pb-2 border-b border-zinc-200">
                Skills
              </h2>
              <div className="flex flex-col gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-sm font-medium text-zinc-700 flex items-center gap-2"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    ></span>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Main Content */}
        <div className="col-span-2 p-8">
          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section className="mb-10">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6 pb-2 border-b border-zinc-200">
                Work History
              </h2>
              <div className="space-y-8">
                {data.experience.map((exp, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-1 bg-zinc-100 relative">
                      <div
                        className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-zinc-800 text-lg">
                          {exp.position}
                        </h3>
                        <span className="text-xs font-mono text-zinc-400">
                          {formatDate(exp.start_date)} -{" "}
                          {exp.is_current
                            ? "Present"
                            : formatDate(exp.end_date)}
                        </span>
                      </div>
                      <p
                        className="text-sm font-semibold mb-2"
                        style={{ color: accentColor }}
                      >
                        {exp.company}
                      </p>
                      <p className="text-sm text-zinc-600 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.project && data.project.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6 pb-2 border-b border-zinc-200">
                Projects
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {data.project.map((proj, index) => (
                  <div key={index} className="bg-zinc-50 p-4 rounded">
                    <h3 className="font-bold text-zinc-800 text-sm mb-1">
                      {proj.name}
                    </h3>
                    <p
                      className="text-xs font-medium mb-2 opacity-70"
                      style={{ color: accentColor }}
                    >
                      {proj.type}
                    </p>
                    <p className="text-xs text-zinc-600 line-clamp-4">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default HalleyTemplate;
