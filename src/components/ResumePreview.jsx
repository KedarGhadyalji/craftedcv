import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import RightSidebarTemplate from "./templates/RightSidebarTemplate";
import CascadeTemplate from "./templates/CascadeTemplate";
import HalleyTemplate from "./templates/HalleyTemplate";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const renderTemplate = () => {
    switch (template) {
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      case "executive":
        return <ExecutiveTemplate data={data} accentColor={accentColor} />;
      case "right-sidebar":
        return <RightSidebarTemplate data={data} accentColor={accentColor} />;
      case "cascade":
        return <CascadeTemplate data={data} accentColor={accentColor} />;
      case "halley":
        return <HalleyTemplate data={data} accentColor={accentColor} />;
      case "classic":
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <div
        id="resume-preview"
        className={
          "border border-gray-200 print:shadow-none print:border-none " +
          classes
        }
      >
        {renderTemplate()}
      </div>
      <style jsx>
        {`
          @page {
            size: letter;
            margin: 0;
          }

          @media print {
            html,
            body {
              width: 8.5in;
              height: 11in;
              overflow: hidden;
            }

            body * {
              visibility: hidden;
            }

            #resume-preview,
            #resume-preview * {
              visibility: visible;
            }

            #resume-preview {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: auto;
              margin: 0;
              padding: 0;
              box-shadow: none !important;
              border: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResumePreview;
