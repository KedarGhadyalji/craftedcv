import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernSidebarTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white min-h-[1000px] flex shadow-xl overflow-hidden">
      {/* Dark Left Sidebar */}
      <aside className="w-1/3 bg-zinc-700 text-zinc-100 p-8 flex flex-col gap-8">
        {/* Image Area */}
        <div className="text-center">
          {data.personal_info?.image && (
            <div
              className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-zinc-800 overflow-hidden"
              style={{ borderColor: accentColor }}
            >
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
          <h2 className="text-xl font-bold uppercase tracking-widest mb-2 text-center">
            Contact
          </h2>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 text-sm text-zinc-300">
          {data.personal_info?.email && (
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded bg-zinc-800">
                <Mail size={14} style={{ color: accentColor }} />
              </div>
              <span className="text-xs break-all">
                {data.personal_info.email}
              </span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded bg-zinc-800">
                <Phone size={14} style={{ color: accentColor }} />
              </div>
              <span className="text-xs">{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded bg-zinc-800">
                <MapPin size={14} style={{ color: accentColor }} />
              </div>
              <span className="text-xs">{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded bg-zinc-800">
                <Linkedin size={14} style={{ color: accentColor }} />
              </div>
              <span className="text-xs truncate">LinkedIn</span>
            </div>
          )}
        </div>

        {/* Education (In Sidebar) */}
        {data.education && data.education.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-zinc-700 pb-2">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="text-zinc-300">
                  <div className="font-bold text-sm text-white">
                    {edu.degree}
                  </div>
                  <div className="text-xs italic mb-1">{edu.field}</div>
                  <div className="text-xs opacity-70">{edu.institution}</div>
                  <div className="text-xs opacity-50 mt-1">
                    {formatDate(edu.graduation_date)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills (In Sidebar) */}
        {data.skills && data.skills.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-zinc-700 pb-2">
              Expertise
            </h2>
            <ul className="space-y-2">
              {data.skills.map((skill, index) => (
                <li
                  key={index}
                  className="text-xs text-zinc-300 flex items-center gap-2"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  ></span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-10 text-zinc-800">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-5xl font-black uppercase tracking-tight text-zinc-900 mb-2">
            {data.personal_info?.full_name?.split(" ")[0]}
            <span style={{ color: accentColor }}>
              {" "}
              {data.personal_info?.full_name?.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="text-xl font-medium tracking-widest text-zinc-500 uppercase">
            {data.personal_info?.profession}
          </p>
        </header>

        {/* Summary */}
        {data.professional_summary && (
          <section className="mb-8">
            <p
              className="text-sm leading-loose text-zinc-600 border-l-4 pl-4"
              style={{ borderColor: accentColor }}
            >
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-10">
            <h2 className="flex items-center gap-3 text-lg font-bold uppercase tracking-wider mb-6">
              <span
                className="p-2 text-white rounded"
                style={{ backgroundColor: accentColor }}
              >
                MY
              </span>
              Experience
            </h2>

            <div className="border-l-2 border-zinc-200 ml-3 space-y-8">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative pl-8">
                  {/* Timeline Dot */}
                  <span
                    className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-white"
                    style={{ backgroundColor: accentColor }}
                  ></span>

                  <h3 className="text-lg font-bold text-zinc-800">
                    {exp.position}
                  </h3>
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: accentColor }}
                    >
                      {exp.company}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {formatDate(exp.start_date)} —{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.project && data.project.length > 0 && (
          <section>
            <h2 className="flex items-center gap-3 text-lg font-bold uppercase tracking-wider mb-6">
              <span
                className="p-2 text-white rounded"
                style={{ backgroundColor: accentColor }}
              >
                KEY
              </span>
              Projects
            </h2>
            <div className="grid grid-cols-1 gap-5">
              {data.project.map((proj, index) => (
                <div
                  key={index}
                  className="border-b border-zinc-100 pb-4 last:border-0"
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-zinc-800">{proj.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500">
                      {proj.type}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ModernSidebarTemplate;
