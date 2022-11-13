const mongoose = require("mongoose");

const ObjectSchema = new mongoose.Schema(
    {
        objectName: {
            type: String,
            trim: true,
            required: true,
            minLength: 2
        },
        findDate: {
            type: Date,
            max: Date().toUTCString,
            required: true
        }

    }
);

module.exports = mongoose.model("Objet", ObjectSchema);