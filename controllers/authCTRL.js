const UserModel = require("../models/UsersSchema");
const multiplesErrors = require("../utils/errors.utils");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const authentificationCTRL = {

    signUp: async (req, res) => {

        const { email, password } = req.body;

        try {
            const user = await UserModel.create({ email, password });
            res.status(201).json({ user: user._id });
        } catch (err) {
            console.log(err);
            const errors = multiplesErrors.signUpErrors(err);

            res.status(401).json({ errors });

        }

    },
    signIn: async (req, res) => {
        const { email, password } = req.body;

        try {

            const findByEmail = await UserModel.findOne({ email: email });

            const match = await bcrypt.compare(password, findByEmail.password);

            if (match == true) {
                const token = jwt.sign(
                    {
                        userId: findByEmail._id,
                    },
                    process.env.TOKEN_SECRET_KEY,
                    { expiresIn: maxAge }
                );
                res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
                res.json({ message: "Connecté", token: token });
            } else {
                res.status(401).json({ message: "Mot de passe incorrect." });
            }

        } catch (err) {
            const errors = multiplesErrors.signInErrors(err);
            res.status(401).json({ errors });
        }
    },
    logOut: (req, res) => {
        res.cookie("jwt", "", { maxAge: 1 }).json({ message: "Merci de votre visite, à très bientôt." });
    }

};

module.exports = authentificationCTRL;
