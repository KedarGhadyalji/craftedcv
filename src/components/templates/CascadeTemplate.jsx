import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const CascadeTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-zinc-800 font-sans shadow-lg">
      <div className="grid grid-cols-3 min-h-[1000px]">
        {/* LEFT SIDEBAR */}
        <div className="col-span-1 bg-zinc-50 border-r border-zinc-200 p-6 flex flex-col gap-8">
          {/* Profile Image */}
          <div className="text-center">
            {data.personal_info?.image && (
              <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-white shadow-md overflow-hidden">
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
          </div>

          {/* Contact */}
          <div className="space-y-3 text-sm text-zinc-600">
            <h3 className="font-bold uppercase tracking-wider text-zinc-400 text-xs mb-2">
              Contact
            </h3>
            {data.personal_info?.email && (
              <div className="flex items-center gap-2 break-all">
                <Mail size={14} style={{ color: accentColor }} />
                <span>{data.personal_info.email}</span>
              </div>
            )}
            {data.personal_info?.phone && (
              <div className="flex items-center gap-2">
                <Phone size={14} style={{ color: accentColor }} />
                <span>{data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info?.location && (
              <div className="flex items-center gap-2">
                <MapPin size={14} style={{ color: accentColor }} />
                <span>{data.personal_info.location}</span>
              </div>
            )}
            {data.personal_info?.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin size={14} style={{ color: accentColor }} />
                <span className="truncate">LinkedIn</span>
              </div>
            )}
            {data.personal_info?.website && (
              <div className="flex items-center gap-2">
                <Globe size={14} style={{ color: accentColor }} />
                <span className="truncate">Portfolio</span>
              </div>
            )}
          </div>

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <h3 className="font-bold uppercase tracking-wider text-zinc-400 text-xs mb-4">
                Skills
              </h3>
              <div className="flex flex-col gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-sm font-medium text-zinc-700 pb-2 border-b border-zinc-200 last:border-0"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education (Sidebar) */}
          {data.education && data.education.length > 0 && (
            <div>
              <h3 className="font-bold uppercase tracking-wider text-zinc-400 text-xs mb-4">
                Education
              </h3>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <p className="font-bold text-sm text-zinc-800">
                      {edu.degree}
                    </p>
                    <p className="text-xs text-zinc-500">{edu.institution}</p>
                    <p className="text-xs text-zinc-400 italic mt-1">
                      {formatDate(edu.graduation_date)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-span-2 p-8 pt-10">
          {/* Header */}
          <div
            className="mb-10 border-b-2 pb-6"
            style={{ borderColor: accentColor }}
          >
            <h1 className="text-4xl font-extrabold text-zinc-900 uppercase tracking-tight mb-1">
              {data.personal_info?.full_name}
            </h1>
            <p className="text-xl font-medium tracking-widest text-zinc-500 uppercase">
              {data.personal_info?.profession}
            </p>
          </div>

          {/* Summary */}
          {data.professional_summary && (
            <div className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <span
                  className="w-8 h-1 rounded"
                  style={{ backgroundColor: accentColor }}
                ></span>
                Profile
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                {data.professional_summary}
              </p>
            </div>
          )}

          {/* Experience Timeline */}
          {data.experience && data.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <span
                  className="w-8 h-1 rounded"
                  style={{ backgroundColor: accentColor }}
                ></span>
                Experience
              </h2>

              <div
                className="border-l-2 ml-2 space-y-8"
                style={{ borderColor: accentColor + "40" }}
              >
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative pl-6 ml-[-1px]">
                    {/* Dot */}
                    <div
                      className="absolute left-[-5px] top-1.5 w-3 h-3 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: accentColor }}
                    ></div>

                    <h3 className="text-lg font-bold text-zinc-800">
                      {exp.position}
                    </h3>
                    <div className="flex justify-between items-center mb-2 text-sm">
                      <span className="font-semibold text-zinc-600">
                        {exp.company}
                      </span>
                      <span className="text-zinc-400 text-xs italic">
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
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <span
                  className="w-8 h-1 rounded"
                  style={{ backgroundColor: accentColor }}
                ></span>
                Projects
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {data.project.map((proj, index) => (
                  <div
                    key={index}
                    className="bg-white border-l-4 p-4 shadow-sm"
                    style={{ borderLeftColor: accentColor }}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-zinc-800">{proj.name}</h3>
                      <span className="text-xs text-zinc-500">{proj.type}</span>
                    </div>
                    <p className="text-sm text-zinc-600">{proj.description}</p>
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

export default CascadeTemplate;
