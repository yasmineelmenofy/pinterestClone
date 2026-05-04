import mongoose from "mongoose";

interface image {
  title: string;
  description?: string;
  user: mongoose.Types.ObjectId;
  imageUrl: string;
}

const imageSchema = new mongoose.Schema<image>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const imageModel = mongoose.model("Image", imageSchema);

export default imageModel;
