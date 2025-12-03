import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  ExternalLink,
} from "lucide-react";

const ExecutiveTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg text-zinc-800 font-sans">
      {/* Header Section with Accent Background */}
      <div
        className="text-white p-8 pb-10"
        style={{ backgroundColor: accentColor }}
      >
        <div className="flex justify-between items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">
              {data.personal_info?.full_name || "Your Name"}
            </h1>
            <p className="text-lg font-medium opacity-90 tracking-wide mb-6">
              {data.personal_info?.profession || "Profession"}
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm opacity-90">
              {data.personal_info?.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} /> {data.personal_info.email}
                </div>
              )}
              {data.personal_info?.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} /> {data.personal_info.phone}
                </div>
              )}
              {data.personal_info?.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} /> {data.personal_info.location}
                </div>
              )}
              {data.personal_info?.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin size={14} />{" "}
                  <span className="truncate max-w-[150px]">
                    {data.personal_info.linkedin}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Profile Image Logic */}
          {data.personal_info?.image && (
            <div className="shrink-0 border-4 border-white/30 rounded-lg overflow-hidden w-32 h-32">
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
      </div>

      <div className="p-8 grid grid-cols-3 gap-8">
        {/* Main Content Column (2/3) */}
        <div className="col-span-2 space-y-8">
          {/* Summary */}
          {data.professional_summary && (
            <section>
              <h2
                className="text-sm font-bold uppercase border-b-2 mb-3 pb-1"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                Professional Profile
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600">
                {data.professional_summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section>
              <h2
                className="text-sm font-bold uppercase border-b-2 mb-4 pb-1"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                Work Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-zinc-800">
                        {exp.position}
                      </h3>
                      <span className="text-xs font-semibold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                        {formatDate(exp.start_date)} -{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>
                    <p
                      className="text-sm font-medium mb-2"
                      style={{ color: accentColor }}
                    >
                      {exp.company}
                    </p>
                    {exp.description && (
                      <p className="text-xs text-zinc-600 leading-relaxed whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.project && data.project.length > 0 && (
            <section>
              <h2
                className="text-sm font-bold uppercase border-b-2 mb-4 pb-1"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                Key Projects
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {data.project.map((proj, index) => (
                  <div
                    key={index}
                    className="bg-zinc-50 p-3 rounded border border-zinc-100"
                  >
                    <h3 className="font-bold text-sm text-zinc-800">
                      {proj.name}
                    </h3>
                    <p
                      className="text-xs font-medium mb-1 opacity-75"
                      style={{ color: accentColor }}
                    >
                      {proj.type}
                    </p>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Column (1/3) */}
        <div className="col-span-1 space-y-8">
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section>
              <h2
                className="text-sm font-bold uppercase border-b-2 mb-4 pb-1"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-bold text-zinc-800">
                      {edu.degree}
                    </h3>
                    <div className="text-xs font-medium opacity-80 mb-1">
                      {edu.field}
                    </div>
                    <p className="text-xs text-zinc-600">{edu.institution}</p>
                    <div className="flex justify-between items-center mt-1 text-xs text-zinc-400">
                      <span>{formatDate(edu.graduation_date)}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <h2
                className="text-sm font-bold uppercase border-b-2 mb-4 pb-1"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium bg-zinc-100 text-zinc-700 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Websites/Links */}
          {(data.personal_info?.website || data.personal_info?.linkedin) && (
            <section>
              <h2
                className="text-sm font-bold uppercase border-b-2 mb-4 pb-1"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                Links
              </h2>
              <div className="space-y-2 text-xs">
                {data.personal_info?.website && (
                  <div className="flex items-center gap-2 text-zinc-600">
                    <Globe size={12} />
                    <span className="truncate">
                      {data.personal_info.website}
                    </span>
                  </div>
                )}
                {data.personal_info?.linkedin && (
                  <div className="flex items-center gap-2 text-zinc-600">
                    <Linkedin size={12} />
                    <span className="truncate">LinkedIn Profile</span>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
