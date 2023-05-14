import React, { useState } from "react";

import NoteContext from "./NoteContext";

let NoteState = (props) => {

    let host = "http://localhost:5000";

    let notesInitial = [];

    let [notes, setNotes] = useState(notesInitial);

    //Get All Notes

    let getNotes = async () => {

        //Adding The Notes By Fetch Using GET Method ...

        let response = await fetch(`${host}/api/notes/fetchallnotes`, {

            method: 'GET',

            headers: {

                'Content-Type': 'application/json',

                'auth-token': localStorage.getItem('token')

            }

        });

        let data = await response.json();

        setNotes(data);

    };

    //Create A Note

    let createNotes = async (title, description, tag) => {

        //Adding The Notes By Fetch Using POST Method ...

        let response = await fetch(`${host}/api/notes/addnote`, {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json',

                'auth-token': localStorage.getItem('token')

            },

            body: JSON.stringify({ title, description, tag })

        });

        //Logic For Adding The Notes ...

        let note = await response.json();

        setNotes(notes.concat(note));

    };

    //Update A Note

    let updateNotes = async (id, title, description, tag) => {

        //Updating The Notes By Fetch Using PUT Method ...

        let response = await fetch(`${host}/api/notes/updatenote/${id}`, {

            method: 'PUT',

            headers: {

                'Content-Type': 'application/json',

                'auth-token': localStorage.getItem('token')

            },

            body: JSON.stringify({ title, description, tag })

        });

        let json = response.json();

        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));

        //Logic For Updating The Notes ...

        for (let index = 0; index < newNotes.length; index++) {

            let element = newNotes[index];

            if (element._id === id) {

                newNotes[index].title = title;

                newNotes[index].description = description;

                newNotes[index].tag = tag;

                break;

            };

        };

        setNotes(newNotes);

    };

    //Delete A Note

    let deleteNotes = async (id) => {

        //Updating The Notes By Fetch Using DELETE Method ...

        let response = await fetch(`${host}/api/notes/deletenote/${id}`, {

            method: 'DELETE',

            headers: {

                'Content-Type': 'application/json',

                'auth-token': localStorage.getItem('token')

            }

        });

        let json = await response.json();

        console.log(json);

        //Logic For Deleting The Notes ...

        let newNotes = notes.filter((note) => { return note._id !== id });

        setNotes(newNotes);

    };

    return (

        <NoteContext.Provider value={{ notes, createNotes, updateNotes, deleteNotes, getNotes }}>

            {props.children}

        </NoteContext.Provider>

    );

};

export default NoteState;