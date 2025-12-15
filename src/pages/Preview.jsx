import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { ArrowLeftIcon } from "lucide-react";
import ResumePreview from "../components/ResumePreview";
import { dummyResumeData } from "../assets/assets";

const Preview = () => {
  const { resumeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);
  const [message, setMessage] = useState("");

  const funnyMessages = [
    "Oops… This Resume Took a Coffee Break ☕",
    "Error 418: Resume Is a Teapot ☕",
    "Well This Is Awkward…",
    "The Resume Exists… Just Not Here",
    "You Came Too Early 😅",
  ];

  const loadResume = async () => {
    setResumeData(
      dummyResumeData.find((resume) => resume._id === resumeId || null)
    );
    setIsLoading(false);
  };

  useEffect(() => {
    loadResume();
    const randomMessage =
      funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    setMessage(randomMessage);
  }, []);

  return resumeData ? (
    <div className="bg-slate-100">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white"
        />
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-center text-6xl text-slate-400 font-medium">
            {message}
          </p>
          <a
            href="/"
            className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors"
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            Go to home page
          </a>
        </div>
      )}
    </div>
  );
};

export default Preview;
