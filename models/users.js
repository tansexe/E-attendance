const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  RollNo: {
    type: Number,
    required: true,
  },
  Hostel: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
});

usersSchema.statics.isThisEmailInUse = async function (Email) {
  try {
    const sameEmailUser = await this.findOne({ Email });
    if (sameEmailUser) return false;

    return true;
  } catch (error) {
    console.log("error inside isThisEmailInUse method", error.message);
    return false;
  }
};

usersSchema.statics.isThisUsernameInUse = async function (Username) {
  try {
    const sameUsernameUser = await this.findOne({ Username });
    if (sameUsernameUser) return false;

    return true;
  } catch (error) {
    console.log("error inside isThisUsernameInUse method", error.message);
    return false;
  }
};

module.exports = mongoose.model("users", usersSchema);
