import { Schema, model } from "mongoose";

const PackageSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "package name is required"],
    },
    price: {
      type: Number,
      required: [true, "package price is required"],
    },
    currency: {
      type: String,
      required: [true, "currency is required"],
    },
    duration: {
      type: String,
      enum: ["yearly", "monthly"],
      required: [true, "package duration is required"],
    },
    // free: {
    //   type: String,
    // },
  },

  {
    timestamps: true,
  }
);

const Packages = model("Package", PackageSchema);
export default Packages;
