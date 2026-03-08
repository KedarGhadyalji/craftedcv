import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

// Controller for creating a new resume
// POST: /api/resumes/create
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    // Create new resume
    const newResume = await Resume.create({ userId, title });

    // Return success message
    return res.status(201).json({
      message: "Resume created successfully",
      resume: newResume,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Controller for deleting a resume
// POST: /api/resumes/delete
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ userId, _id: resumeId });

    // Return success message
    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get user resume by ID
// GET: /api/resumes/get/:resumeId
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    // Validate ID length/format before querying
    if (!resumeId || resumeId.length !== 24) {
      return res.status(400).json({ message: "Invalid Resume ID format" });
    }

    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume Not Found" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    console.error("❌ GET RESUME ERROR:", error);
    return res.status(400).json({ message: error.message });
  }
};

// get resume by id public
// GET: /api/resumes/public
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ public: true, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for updating a resume
// PUT: /api/resumes/update

export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    if (!resumeId) {
      return res.status(400).json({ message: "Resume ID is required." });
    }

    // 1. Parse the resume data first
    let resumeDataCopy;
    try {
      resumeDataCopy =
        typeof resumeData === "string" ? JSON.parse(resumeData) : resumeData;
    } catch (parseError) {
      return res
        .status(400)
        .json({ message: "Invalid JSON format in resumeData." });
    }

    // 2. NOW delete the problematic fields (Moved from the top)
    if (resumeDataCopy) {
      delete resumeDataCopy._id;
      delete resumeDataCopy.userId;
      delete resumeDataCopy.__v;
      delete resumeDataCopy.createdAt;
      delete resumeDataCopy.updatedAt;
    }

    // 3. Handle Image Upload
    // Inside updateResume in server/controllers/resumeController.js

    // 3. Handle Image Upload
    if (image) {
      const imageBufferData = fs.createReadStream(image.path);
      const response = await imagekit.files.upload({
        file: imageBufferData,
        fileName: `resume_${resumeId}.png`,
        folder: "user-resumes",
        transformation: {
          pre: `w-300,h-300,fo-face,z-0.75`, // Kept fo-face to center on face, but removed e-bgremove
        },
      });

      if (!resumeDataCopy.personal_info) resumeDataCopy.personal_info = {};
      resumeDataCopy.personal_info.image = response.url;
      fs.unlinkSync(image.path);
    }

    // 4. Update Database
    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId: userId },
      { $set: resumeDataCopy },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updatedResume) {
      return res
        .status(404)
        .json({ message: "Resume not found or unauthorized." });
    }

    return res
      .status(200)
      .json({ message: "Saved successfully!", resume: updatedResume });
  } catch (error) {
    console.error("❌ DETAILED SERVER ERROR:", error);
    return res.status(400).json({ message: error.message });
  }
};
