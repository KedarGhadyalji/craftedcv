import React from "react";
import JDRImage from "../../assets/JDR.jpg";
import EHRImage from "../../assets/EHR.jpg";
import TSRImage from "../../assets/TSR.jpg";
import HPRImage from "../../assets/HPR.jpg";
import SRImage from "../../assets/SR.jpg";
import LHRImage from "../../assets/LHR.jpg";

const LatestCreations = () => {
  const resumeShowcase = [
    {
      id: 1,
      title: "Classic Professional",
      image: JDRImage,
    },
    {
      id: 2,
      title: "Minimal Image",
      image: EHRImage,
    },
    {
      id: 3,
      title: "Executive",
      image: TSRImage,
    },
    {
      id: 4,
      title: "Right Sidebar",
      image: HPRImage,
    },
    {
      id: 5,
      title: "Cascade",
      image: SRImage,
    },
    {
      id: 6,
      title: "Halley",
      image: LHRImage,
    },
  ];

  return (
    <section className="py-24 bg-white font-poppins overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Our Latest <span className="text-indigo-600">Creations</span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 mt-4 max-w-lg mx-auto leading-relaxed">
            Explore a curated selection of our most successful resume designs,
            optimized for both ATS and human impact.
          </p>
        </div>

        {/* --- FIXED: Full Width & No Grayscale --- */}
        <div className="group/container flex flex-col md:flex-row items-center gap-3 h-[600px] md:h-[500px] w-full mt-10">
          {resumeShowcase.map((resume) => (
            <div
              key={resume.id}
              className={`
                relative h-full rounded-2xl overflow-hidden cursor-pointer shadow-lg 
                transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                w-full md:w-[16%] group-hover/container:md:w-[10%] hover:md:w-[50%]!
                hover:shadow-indigo-500/30 border border-slate-100
              `}
            >
              {/* Info Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 z-10 flex items-end p-8">
                <div className="translate-y-4 hover:translate-y-0 transition-transform duration-500">
                  <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-1">
                    Preview
                  </p>
                  <span className="text-white font-bold text-xl block">
                    {resume.title}
                  </span>
                </div>
              </div>

              {/* Resume Image - REMOVED GRAYSCALE */}
              <img
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-in-out scale-105 group-hover:scale-100"
                src={resume.image}
                alt={resume.title}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCreations;
