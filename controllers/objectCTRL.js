const ObjectSchema = require("../models/ObjectSchema");
const ObjectID = require("mongoose").Types.ObjectId;

const objetCTRL = {

    postObject: async (req, res) => {
        const { objectName, findDate } = req.body;
        const newObject = new ObjectSchema({
            objectName: objectName,
            findDate: findDate
        });

        try {
            const object = await newObject.save();
            res.status(200).json(object);

        } catch (err) {
            res.status(400).json(err);
        }

    },
    getObject: async (req, res) => {
        try {
            const getAllObject = await ObjectSchema.find();
            res.status(200).json(getAllObject);

        } catch (err) {
            res.status(404).json(err);
        }

    },
    updateObject: async (req, res) => {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).send(`ID unknown : ${req.params.id}`);

        const { objectName, findDate } = req.body;
        const updateData = {
            objectName: objectName,
            findDate: findDate
        };

        try {
            const objectUpdate = await ObjectSchema.findByIdAndUpdate(
                req.params.id,
                {
                    $set: updateData
                },
                { new: true },
            );
            res.status(200).json(objectUpdate);

        } catch (err) {
            res.status(400).json(err);
        }



    },
    deleteObject: async (req, res) => {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).send(`ID unknown : ${req.params.id}`);

        try {
            const deleteObject = await ObjectSchema.findByIdAndRemove(
                req.params.id
            );
            res.status(200).json(deleteObject);

        } catch (err) {
            res.status(400).json(err);
        }

    }

};

module.exports = objetCTRL;