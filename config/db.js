// Import mongoose
const mongoose = require("mongoose");

// Connect mongoose with MongoDB
// eslint-disable-next-line quotes
mongoose.connect(`mongodb+srv://${process.env.DB_USER_PASS}@troovtonalternant.ejrskrd.mongodb.net/TroovTonAlternant`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

mongoose.connection.once("open", () => {
    console.log("MongoDB is connected");
});