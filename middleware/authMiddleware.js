const jwt = require("jsonwebtoken");

const middleware = {
    
    token: (req, res, next) => {
        const token = String(req.get("Authorization")).split(" ")[1];
        if (!token) {
            res.status(401).json({message: "Accès non autorisé"});
        }else{
            jwt.verify(token, process.env.TOKEN_SECRET_KEY);
            res.status(200);
            next();

        }
    },
   
   
    ////////////////////// Essai Infructueux /////////////////////////////
    // checkUserMiddleware (req,res, next) {
    //     const cookieToken = req.cookies.acces_token_cookie;
    //     if (cookieToken) {
    //         jwt.verify(cookieToken, process.env.TOKEN_SECRET_KEY, async (err, data) => {
    //             if (err) {
    //                 res.cookie("acces_token_cookie", "", { maxAge: 1 });
    //                 next();
    //             } else {
    //                 req.user = data.userId;
    //                 next();
    //             }
    //         });
    //     } else {
    //         res.status(401).json({ message: "Veuillez-vous connecter ou vous inscrire." });   
    //     }
    // },

    ////////////////////// Essai Infructueux /////////////////////////////
    // autoLogInMiddleware (req, res, next) {
    //     const cookieTokeN = req.cookies.acces_token_cookie;
    //     console.log(cookieTokeN);
    //     if (cookieTokeN){
    //         jwt.verify(cookieTokeN, process.env.TOKEN_SECRET_KEY, (err, data) => {
    //             if(err) {
    //                 console.log(err);
    //             }else{
    //                 console.log(data.userId);
    //                 next();

    //             }
    //         });

    //     }else{
    //         console.log("No Token Found.");
    //     }
    // }

};

module.exports = middleware;