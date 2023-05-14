let express = require('express');

let router = express.Router();

let Note = require('../models/Note');

let fetchUser = require('../middleware/fetchUser');

let { body, validationResult } = require('express-validator');

//ROUTE - 1 : Fetch All The Notes Using : (GET) "/api/notes/fetchallnotes". Login Required ...

router.get("/fetchallnotes", fetchUser, async (req, res) => {

    try {

        let notes = await Note.find({ user: req.user.id });

        //Sending The notes As A Response In json() ...

        res.json(notes);

    }

    catch (error) {

        //Show The Error In The console.error() ...

        console.error(error.message);

        //If The Status Code Is 500, Then Show The Following Error ...

        res.status(500).send("Internal Server Error");

    };

});

//ROUTE - 2 : Add A New Note Using : (POST) "/api/notes/addnote". Login Required ...

router.post("/addnote", fetchUser, [

    body('title', 'Enter A Valid Title').isLength({ min: 3 }),

    body('description', 'Description Must Contain Atleast 5 Characters').isLength({ min: 5 })

], async (req, res) => {

    //Check Whether The User Has Filled All The Requirements ...

    try {

        //If There Are Errors, Return Bad Request And The Errors ...

        let errors = validationResult(req);

        if (!errors.isEmpty()) {

            //If The Status Code Is 400, Then Show The Following Error ...

            return res.status(400).json({ errors: errors.array() });

        };

        //Destructuring title, description, tag In req.body ...

        let { title, description, tag } = req.body;

        //Storing The Destructured Values In note ...

        let note = new Note({

            title,

            description,

            tag,

            user: req.user.id

        });

        let savedNote = await note.save();

        //Sending The savedNote As A Response In json() ...

        res.json(savedNote);

    }

    // If Not Then Show The Following Error ...

    catch (error) {

        //Show The Error In The console.error() ...

        console.error(error.message);

        //If The Status Code Is 500, Then Show The Following Error ...

        res.status(500).send("Internal Server Error");

    };

});

//ROUTE - 3 : Update An Existing Note Using : (PUT) "/api/notes/updatenote". Login Required ...

router.put("/updatenote/:id", fetchUser, async (req, res) => {

    //Destructuring title, description, tag In req.body ...

    let { title, description, tag } = req.body;

    //Check Whether The User Want's To Update His Own Note ...

    try {

        //Storing The Destructured Values In newNote...

        let newNote = {};

        if (title) {

            newNote.title = title;

        };

        if (description) {

            newNote.description = description;

        };

        if (tag) {

            newNote.tag = tag;

        };

        //Find The Note To Be Updated And Then Update It ...

        let note = await Note.findById(req.params.id);

        if (!note) {

            //If The Status Code Is 404, Then Show The Following Error ...

            res.status(404).send("Not Found");

        };

        //If LoggedIn User Trying To Access Another's User Note Then ...

        if (note.user.toString() !== req.user.id) {

            //If The Status Code Is 401, Then Show The Following Error ...

            return res.status(401).send("Not Allowed");

        };

        note = await Note.findByIdAndUpdate(req.params.id,

            {

                $set: newNote

            },

            {

                new: true

            }

        );

        //Sending The note As A Response In json() ...

        res.json({ note });

    }

    // If Not Then Show The Following Error ...

    catch (error) {

        //Show The Error In The console.error() ...

        console.error(error.message);

        //If The Status Code Is 500, Then Show The Following Error ...

        res.status(500).send("Internal Server Error");

    };

});

//ROUTE - 4 : Delete An Existing Note Using : (DELETE) "/api/notes/deletenote". Login Required...

router.delete("/deletenote/:id", fetchUser, async (req, res) => {

    //Check Whether The User Want's To Delete His Own Note ...

    try {

        //Find The Note To Be Deleted And Then Delete It ...

        let note = await Note.findById(req.params.id);

        if (!note) {

            //If The Status Code Is 404, Then Show The Following Error ...

            res.status(404).send("Not Found");

        };

        //If LoggedIn User Trying To Access Another's User Note Then ...

        if (note.user.toString() !== req.user.id) {

            //If The Status Code Is 401, Then Show The Following Error ...

            return res.status(401).send("Not Allowed");

        };

        note = await Note.findByIdAndDelete(req.params.id);

        //Sending The Success Message As A Response In json() ...

        res.json({ "Success": "Note Has Been Deleted", note: note });

    }

    // If Not Then Show The Following Error ...

    catch (error) {

        //Show The Error In The console.error() ...

        console.error(error.message);

        //If The Status Code Is 500, Then Show The Following Error ...

        res.status(500).send("Internal Server Error");

    };

});

module.exports = router;