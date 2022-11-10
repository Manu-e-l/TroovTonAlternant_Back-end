const multiplesErrors = {
    signUpErrors(err) {
        let errors = { email: "", password: "" };

        if (err.message.includes("email")) {
            errors.email = "Email incorrect";
        }

        if (err.message.includes("password")) {
            errors.password = "Le mot de passe doit contenir 6 caractères minimum";
        }

        if (err.code === 11000 && err.keyValue.email) {
            errors.email = "Email déjà pris";
        }

        return errors;

    }

};

module.exports = multiplesErrors;