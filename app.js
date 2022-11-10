var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const cors = require("cors");
const middleware = require("./middleware/authMiddleware");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users.routes");

var app = express();

app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    cors({
        origin: (origin, callback) => callback(null, true),
        credentials: true,
    })
);

app.get("/jwtid", middleware.autoLogInMiddleware, (req, res) => {
    res.status(200).send("Connexion réussie");
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
