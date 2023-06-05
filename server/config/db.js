const { default: mongoose } = require("mongoose");
mongoose.set("toJSON", { getters: true });

const db = {
  connect: async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://Elminm:uVC1S2C44r7RIuvE@cluster0.kuxordu.mongodb.net/"
      );
      console.log("CONNECTED!");
    } catch (error) {
      console.log("ERROR", error);
    }
  },
};

module.exports = {
  db,
};
