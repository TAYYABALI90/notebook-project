let express = require('express');

let User = require('../models/User');

let router = express.Router();

let { body, validationResult } = require('express-validator');

let bcrypt = require('bcryptjs');

let jwt = require('jsonwebtoken');

let fetchUser = require('../middleware/fetchUser');


let JWT_SECRET = "SuchAComplicatedProject";

//ROUTE - 1 : Create A User Using : (POST) "/api/auth/createuser". No Login Required ...

router.post("/createuser", [

    body('name', 'Enter A Valid Name').isLength({ min: 3 }),

    body('email', 'Enter A Valid Email').isEmail(),

    body('password', 'Password Must Contain Atleast 5 Characters').isLength({ min: 5 }),

], async (req, res) => {

    let success = false;

    //If There Are Errors, Return Bad Request And The Errors ...

    let errors = validationResult(req);

    if (!errors.isEmpty()) {

        //If The Status Code Is 400, Then Show The Following Error ...

        return res.status(400).json({ success, errors: errors.array() });

    };

    //Check Whether The User With This Email Exists Already ...

    try {

        let user = await User.findOne({ email: req.body.email });

        if (user) {

            //If The Status Code Is 400, Then Show The Following Error ...

            return res.status(400).json({ success, error: "Sorry A User With This Email Already Exists" });

        };

        // To Hash A Password ...

        let salt = await bcrypt.genSalt(10);

        // Store Hash In Your Password DB ...

        let secretPassword = await bcrypt.hash(req.body.password, salt);

        //Create A New User ...

        user = await User.create({

            name: req.body.name,

            email: req.body.email,

            password: secretPassword

        });

        //Creating An Object And Storing The ID Of User In It ...

        let data = {

            user: {

                id: user.id

            }

        };

        //Creating A Variable And Passing data And JWT_SECRET In It ...

        let authToken = jwt.sign(data, JWT_SECRET);

        success = true;

        //Sending The authToken As A Response In json() ...

        res.json({ success, authToken });

    }

    //If Not Then Show The Following Errors ...

    catch (error) {

        //Show The Error In The console.error() ...

        console.error(error.message);

        //If The Status Code Is 500, Then Show The Following Error ...

        res.status(500).send("Internal Server Error");

    };

});

//ROUTE - 2 : Authenticate A User Using : (POST) "/api/auth/login". No Login Required ...

router.post("/login", [

    body('email', 'Enter A Valid Email').isEmail(),

    body('password', 'Passowrd Cannot Be Empty').exists()

], async (req, res) => {

    let success = false;

    //If There Are Errors, Return Bad Request And The Errors ...

    let errors = validationResult(req);

    if (!errors.isEmpty()) {

        //If The Status Code Is 400, Then Show The Following Error ...

        return res.status(400).json({ errors: errors.array() });

    };

    let { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (!user) {

            success = false;

            //If The Status Code Is 400, Then Show The Following Error ...

            return res.status(400).json({ error: "Please Try To Login With Correct Credentials" });

        };

        let passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {

            success = false;

            //If The Status Code Is 400, Then Show The Following Error ...

            return res.status(400).json({ error: "Please Try To Login With Correct Credentials" });

        };

        //Creating An Object And Storing The ID Of User In It ...

        let data = {

            user: {

                id: user.id

            }

        };

        //Creating A Variable And Passing data And JWT_SECRET In It ...

        let authToken = jwt.sign(data, JWT_SECRET);

        success = true;

        //Sending The authToken As A Response In json() ...

        res.json({ success, authToken });

    }

    catch (error) {

        //Show The Error In The console.error() ...

        console.error(error.message);

        //If The Status Code Is 500, Then Show The Following Error ...

        res.status(500).send("Internal Server Error");

    };

});

//ROUTE - 3 : Get The LoggedIn User Details Using : (POST) "/api/auth/getuser". Login Required ...

router.post("/getuser", fetchUser, async (req, res) => {

    try {

        let userId = req.user.id;

        let user = await User.findById(userId).select("-password");

        res.send(user);

    }

    catch (error) {

        //Show The Error In The console.error() ...

        console.error(error.message);

        //If The Status Code Is 500, Then Show The Following Error ...

        res.status(500).send("Internal Server Error");

    };

});

module.exports = router;