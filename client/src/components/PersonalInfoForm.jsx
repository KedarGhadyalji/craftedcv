import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import {
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
  X,
  Upload,
} from "lucide-react";
import { getCroppedImg } from "../utils/cropImage";

const PersonalInfoForm = ({ data, onChange }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result);
        setShowModal(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const handleDone = async () => {
    try {
      const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels);
      handleChange("image", croppedFile);
      setShowModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      required: true,
    },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Portfolio Website", icon: Globe, type: "url" },
  ];

  return (
    <div className="relative animate-in fade-in duration-500">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">
          Personal Information
        </h3>
        <p className="text-xs text-slate-500">
          The foundation of your professional identity.
        </p>
      </div>

      {/* Image Section - Quartz Style */}
      <div className="flex items-center gap-6 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 mb-8">
        <label className="relative group cursor-pointer">
          <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white shadow-md group-hover:ring-indigo-100 transition-all duration-300">
            {data.image ? (
              <img
                src={
                  typeof data.image === "string"
                    ? data.image
                    : URL.createObjectURL(data.image)
                }
                alt="user"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-indigo-50 flex items-center justify-center text-indigo-300">
                <User className="size-8" />
              </div>
            )}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-indigo-600/40 opacity-0 group-hover:opacity-100 rounded-full transition-all duration-300 backdrop-blur-[2px]">
            <Upload className="text-white size-6" />
          </div>
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        <div>
          <p className="font-bold text-slate-700 text-sm">Profile Portrait</p>
          <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
            Square aspect ratio recommended.
            <br />
            Supports JPG, PNG.
          </p>
        </div>
      </div>

      {/* Crop Modal - Glassmorphism */}
      {showModal && (
        <div className="fixed inset-0 z-999 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-4xl w-full max-w-lg overflow-hidden shadow-2xl scale-in-center">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/50">
              <h4 className="font-black text-slate-800">Precision Crop</h4>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-800 transition-colors"
              >
                <X className="size-6" />
              </button>
            </div>

            <div className="relative h-80 w-full bg-slate-900">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Adjust Zoom
                  </label>
                  <span className="text-[10px] font-bold text-indigo-600">
                    {Math.round(zoom * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(e.target.value)}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDone}
                  className="px-8 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 active:scale-95 transition-all"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Input Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="space-y-1.5 mt-5">
              <label className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                <Icon className="size-3.5 text-indigo-500" />
                {field.label}
                {field.required && (
                  <span className="text-rose-500 ml-0.5">*</span>
                )}
              </label>
              <input
                type={field.type}
                value={data[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm placeholder:text-slate-300"
                placeholder={`Your ${field.label.toLowerCase()}...`}
                required={field.required}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
