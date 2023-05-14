let jwt = require('jsonwebtoken');

let JWT_SECRET = "SuchAComplicatedProject";

let fetchUser = (req, res, next) => {

    //Get The User From The jwt Token And Add The ID Of User To req Object...

    let token = req.header('auth-token');

    if (!token) {

        //If The Status Code Is 401, Then Show The Following Error...

        res.status(401).send({ error: "Please Authenticate Using A Valid Token" });

    };

    try {

        let data = jwt.verify(token, JWT_SECRET);

        req.user = data.user;

        next();

    }

    catch (error) {

        //If The Status Code Is 401, Then Show The Following Error...

        res.status(401).send({ error: "Please Authenticate Using A Valid Token" });

    };

};

module.exports = fetchUser;