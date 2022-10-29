const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require('config');
const usersRouter = require("./routes/api/users");
const searchRouter = require("./routes/api/laptops");
const specsRouter = require("./routes/api/specs");
const quoteRouter = require("./routes/api/quoations");
const emailRouter = require("./routes/api/email");
const cors = require("cors");
const app = express();
// Body parser middleware
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
// DB Config
const db = config.get('mongoURI');
// Connect to MongoDB
mongoose
    .connect(
        db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

app.use(cors());

// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", usersRouter);
app.use("/api/laptops", searchRouter);
app.use("/api/specs", specsRouter);
app.use("/api/quotations", quoteRouter);
app.use("/api/sendemail", emailRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));