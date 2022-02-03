import mongoose from "mongoose";

const ConnectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTION = {
      dbName: "projectecom",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTION);
    console.log("connected successfully...");
  } catch (error) {
    console.log(error);
  }
};

export default ConnectDB;
