import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL as string );
    console.log("Mongo Connected");
  } catch (err) {
    console.log("Error in DB", err);
  }
}

export default connectToDB;
