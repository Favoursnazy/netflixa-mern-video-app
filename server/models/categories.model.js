import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

export default mongoose.model("Categoies", CategorySchema);
