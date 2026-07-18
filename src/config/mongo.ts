import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");
    console.log("Mongo Connected");
  } catch (err) {
    console.log("Error in DB", err);
  }
}

export default connectToDB;
