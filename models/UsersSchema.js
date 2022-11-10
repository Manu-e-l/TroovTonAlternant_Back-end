const mongoose = require("mongoose");
const { isEmail } = require("validator");


const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6
        },
    },
    {
        timestamps: true,
    }

);


module.exports = mongoose.model("user", UserSchema);