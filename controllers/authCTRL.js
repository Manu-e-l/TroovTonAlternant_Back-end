const UserModel = require("../models/UsersSchema");
const multiplesErrors = require("../utils/errors.utils");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

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
                        email: findByEmail.email
                    },
                    process.env.TOKEN_SECRET_KEY,
                    { expiresIn: maxAge }
                );
                ////////////////////// Essai Infructueux /////////////////////////////
                // res.cookie("acces_token_cookie", token, { httpOnly: true, maxAge: maxAge });
                res.json({ message: "Connecté", token: token });
            } else {
                res.status(401).json({ message: "Mot de passe incorrect." });
            }

        } catch (err) {
            const errors = multiplesErrors.signInErrors(err);
            res.status(401).json({ errors });
        }
    },
    getMe: (req,res) => {
        const token = String(req.get("Authorization")).split(" ")[1];
        
        const decoded = jwt.decode(token, { complete: false });

        return res.json({ content: decoded });
        
    },
    // logOut: (req, res) => {
    //     ////////////////////// Essai Infructueux /////////////////////////////
    //     // res.cookie("acces_token_cookie", "", { maxAge: 1 }).json({ message: "Merci de votre visite, à très bientôt." });
    // },
    welcomeMail: async (req, res) => {
        const contentMail = `Bonjour,
        
        Bienvenue sur le site Troov Ton Alternant.
        Nous sommes heureux de vous compter parmis nous !`;

        const transporter = nodemailer.createTransport({
            host: process.env.HOST_MAIL,
            port: process.env.PORT_MAIL,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.PASS_MAIL
            }
        });
     
        let info = await transporter.sendMail({
            from: "\"Troov Ton Alternant\" <troovtonalternant@example.com>", // sender address
            to: req.body.mail, // list of receivers
            subject: "Bienvenue à bord !", // Subject line
            text: contentMail, // plain text body
        // html: "<b>Hello world?</b>", // html body
        });
    
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        if (info.messageId) {
            res.status(200).json({message : "email envoyé"});
        }else{
            res.status(404);
        }
    }

};

module.exports = authentificationCTRL;
