const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");


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

UserSchema.pre("save", async function(next) {
    // bcrypt va  génerer  le "Salage" du mdp
    const salt = await bcrypt.genSalt();
    // Ne pas faire de fonction fléchée( () => ))à cause du this, bcrypt va Hasher
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


module.exports = mongoose.model("user", UserSchema);