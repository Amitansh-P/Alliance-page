import mongoose from "mongoose";

const ConnectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  offer: { type: String, required: true },
  need: { type: String, required: true },
});

export default mongoose.model("Connection", ConnectionSchema);
