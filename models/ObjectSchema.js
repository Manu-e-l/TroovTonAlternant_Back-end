const mongoose = require("mongoose");

const ObjectSchema = new mongoose.Schema(
    {
        objectName: {
            type: String,
            trim: true,
            required: true,
            minLength: 3
        },
        findDate: {
            type: Date,
            required: true
        },
        picture: {
            type: String,
        }

    }
);

module.exports = mongoose.model("Objet", ObjectSchema);