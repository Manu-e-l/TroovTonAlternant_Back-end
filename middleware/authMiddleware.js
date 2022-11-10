const jwt = require("jsonwebtoken");

const middleware = {

    checkUserMiddleware (req,res, next) {
        const cookieToken = req.cookies.jwt;
        if (cookieToken) {
            jwt.verify(cookieToken, process.env.TOKEN_SECRET_KEY, async (err, data) => {
                if (err) {
                    res.cookie("jwt", "", { maxAge: 1 });
                    next();
                } else {
                    req.user = data.userId;
                    next();
                }
            });
        } else {
            res.status(401).json({ message: "Veuillez-vous connecter ou vous inscrire." });   
        }
    },


    autoLogInMiddleware (req, res, next) {
        const cookieTokeN = req.cookies.jwt;
        console.log(cookieTokeN);
        if (cookieTokeN){
            jwt.verify(cookieTokeN, process.env.TOKEN_SECRET_KEY, (err, data) => {
                if(err) {
                    console.log(err);
                }else{
                    console.log(data.userId);
                    next();

                }
            });

        }else{
            console.log("No Token Found.");
        }
    }

};

module.exports = middleware;