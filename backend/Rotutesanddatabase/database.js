const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://gkmali:Zatchbell%40123@cluster0.u3k7kag.mongodb.net/taskmanagment?retryWrites=true&w=majority&appName=AtlasApp",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to the database");
  } catch (error) {
    console.log(`error in connection of database ${error}`);
  }
};

module.exports = connection;
