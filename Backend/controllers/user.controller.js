import userModel from "../models/user.model.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import geminiResponse from "../gemini.js";
import moment from "moment/moment.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `getting current user error ${error}` });
  }
};

export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, assistantImage } = req.body;
    let finalImage;
    if (req.file) {
      finalImage = await uploadOnCloudinary(req.file.path);
    } else {
      finalImage = assistantImage;
    }
    const user = await userModel
      .findByIdAndUpdate(
        req.userId,
        {
          assistantName,
          assistantImage: finalImage,
        },
        { new: true }
      )
      .select("-password");
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `update Assistant error: ${error}` });
  }
};

export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    const user = await userModel.findById(req.userId);
    const userName = user.name;
    const assistantImage = user.assistantImage;
    const assistantName = user.assistantName;
    const result = await geminiResponse(command, assistantName, userName);
    const jsonMatch = result.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      res.status(400).json({ response: "sorry i can't understand" });
    }
    const gemResult = JSON.parse(jsonMatch[0]);
    const type = gemResult.type;

    switch (type) {
      case "get_date":
        return res.json({
          type,
          userInput: gemResult.userinput,
          response: `current date is ${moment().format("YYYY-MM-DD")}`,
        });
      case "get_time":
        return res.json({
          type,
          userInput: gemResult.userinput,
          response: `current time is ${moment().format("hh-mm A")}`,
        });
      case "get_day":
        return res.json({
          type,
          userInput: gemResult.userinput,
          response: `today is ${moment().format("dddd")}`,
        });
      case "get_month":
        return res.json({
          type,
          userInput: gemResult.userinput,
          response: `current month is ${moment().format("MMMM")}`,
        });
      case "general":
      case "google_search":
      case "youtube_search":
      case "instagram_open":
      case "youtube_play":
      case "facebook_open":
      case "weather_show":
      case "calculator_open":
      case "project_summary":
      case "code_generate":
      case "bug_fix":
      case "file_create":
      case "terminal_command":
      case "git_commit":
      case "deploy_check":
      case "api_test":
        return res.json({
          type,
          userInput: gemResult.userinput,
          response: gemResult.response,
        });

      default:
        return res
          .status(400)
          .json({ message: "i didn't understand that command!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "asktoAssistant controller error!" });
  }
};
