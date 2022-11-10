const UserModel = require("../models/UsersSchema");
const multiplesErrors = require("../utils/errors.utils");

const authentificationCTRL = {

    signUp : async (req,res) => {

        const {email, password} = req.body;

        try {
            const user = await UserModel.create({ email, password });
            res.status(201).json({ user: user._id });
        } catch (err) {
            console.log(err);
            const errors = multiplesErrors.signUpErrors(err);

            res.status(200).json({errors});
            
        }

    },
   
};

module.exports = authentificationCTRL;
