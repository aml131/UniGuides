const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")



router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs", { error: null })
})

router.post("/sign-up", async (req, res) => {
    try {
        const { first, last, username, password , password2 } = req.body;

        // VALIDATION
        //  Check if all the necessary fields are there
        if (!username || !password) {
            return res.render("auth/sign-up", {
                error: "All fields are required."
            });
        }

        if (password.length < 6) {
            return res.render("auth/sign-up", {
                error: "Password must be at least 6 characters long."
            });
        }

        if(!/[A-Z]/.test(password)){
             return res.render("auth/sign-up", {
                error: "Password must contain at least uppercase letter."
            });
        }

           if(!/[a-z]/.test(password)){
             return res.render("auth/sign-up", {
                error: "Password must contain at least one lowercase letter."
            });
        }

            if(!/[0-9]/.test(password)){
             return res.render("auth/sign-up", {
                error: "Password must contain at least one number."
            });
        }



        if(password != password2){
            return res.render("auth/sign-up", {
            error: "Please make sure passwords match."
            })
        }



        if (first.length < 2) {
            return res.render("auth/sign-up", {
                error: "First name must be at least 2 characters long."
            });
        }



        // Do we already have this person in our database?
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render("auth/sign-up", {
                error: "Username is already taken."

            });
        }


        // Hash password and create user
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = {
            first,
            last,
            username,
            password: hashedPassword,
        };

        await User.create(newUser);

        // Redirect to Login
        res.redirect("/auth/login");

    } catch (error) {
        console.error("Sign-up error:", error);
        res.render("auth/sign-up", {
            error: "Something went wrong. Please try again."
        });
    }
});



router.get("/login", (req, res) => {
    res.render("auth/login.ejs", { error: null })
})

router.post("/login", async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username });

        if (!userInDatabase) {
            return res.render("auth/login", { error: "Username not found." });
        }

        const validPassword = bcrypt.compareSync(
            req.body.password,
            userInDatabase.password
        );

        if (!validPassword) {
            return res.render("auth/login", { error: "Incorrect password." });
        }

        req.session.user = {
            username: userInDatabase.username,
            _id: userInDatabase._id,
            first: userInDatabase.first,
            last: userInDatabase.last
        };

        res.redirect("/home");
    } catch (error) {
        console.error("Error during sign-in:", error);
        res.render("auth/sign-in", { error: "An unexpected error occurred." });
    }
});



router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/auth/login")
})

module.exports = router