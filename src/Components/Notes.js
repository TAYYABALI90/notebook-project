import React, { useContext, useEffect, useRef, useState } from 'react'

import { useNavigate } from 'react-router-dom';

import AddNote from '../Context/notes/AddNote';

import NoteContext from '../Context/notes/NoteContext';

import NoteItem from './NoteItem';

export default function Notes(props) {

    let navigate = useNavigate();

    let context = useContext(NoteContext);

    let { notes, getNotes, updateNotes } = context;

    useEffect(() => {

        if (localStorage.getItem('token')) {

            getNotes();

        }

        else {

            navigate("/login");

        };

        // eslint-disable-next-line

    }, []);

    let ref = useRef(null);

    let refClose = useRef(null);

    let [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    let updateNote = (currentNote) => {

        ref.current.click();

        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

    };

    let handleSubmit = (e) => {

        e.preventDefault();

        updateNotes(note.id, note.etitle, note.edescription, note.etag);

        refClose.current.click();

        props.showAlert("Have Successfully Updated Your Note", "success");

    };

    let onChange = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value });

    };

    // console.log(props);

    return (

        <>

            <AddNote showAlert={props.showAlert}></AddNote>

            <div className="container">

                <div className="row align-items-center justify-content-center">

                    <div className="col-12 my-2">

                        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">

                            Update Your Note

                        </button>

                        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">

                            <div className="modal-dialog">

                                <div className="modal-content">

                                    <div className="modal-header">

                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Your Note</h1>

                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />

                                    </div>

                                    <div className="modal-body">

                                        <form className='my-3'>

                                            <div className="mb-3">

                                                <label htmlFor="etitle" className="form-label">Update Your Title</label>

                                                <input

                                                    type="text"
                                                    className="form-control"
                                                    value={note.etitle}
                                                    id="etitle"
                                                    name='etitle'
                                                    aria-describedby="emailHelp"
                                                    onChange={onChange}
                                                    minLength={5}
                                                    required />

                                            </div>

                                            <div className="mb-3">

                                                <label htmlFor="edescription" className="form-label">Update Your Description</label>

                                                <input

                                                    type="text"
                                                    className="form-control"
                                                    value={note.edescription}
                                                    id="edescription"
                                                    name='edescription'
                                                    onChange={onChange}
                                                    minLength={5}
                                                    required />

                                            </div>

                                            <div className="mb-3">

                                                <label htmlFor="etag" className="form-label">Update Your Tag</label>

                                                <input

                                                    type="text"
                                                    className="form-control"
                                                    value={note.etag}
                                                    id="etag"
                                                    name='etag'
                                                    onChange={onChange}
                                                    minLength={5}
                                                    required />

                                            </div>

                                        </form>

                                    </div>

                                    <div className="modal-footer">

                                        <button

                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                            ref={refClose}>
                                            Close</button>

                                        <button

                                            type="button"
                                            className="btn btn-primary"
                                            disabled={note.etitle.length < 5 || note.edescription.length < 5}
                                            onClick={handleSubmit}>
                                            Update Your Note</button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className="container">

                <div className="row align-items-center justify-content-center">

                    <div className="col-12 my-2">

                        <h2>A LIST OF ALL YOUR NOTES</h2>

                        {notes.length === 0 && "You Have Not Created Any Note Yet ..."}

                        {Array.isArray(notes) && notes.map((note) =>

                            <NoteItem key={note._id} updateNote={updateNote} note={note}></NoteItem>

                        )}

                        {/* {notes.map((note) => 

                             <NoteItem key={note._id} updateNote={updateNote} note={note}></NoteItem>

                        )}; */}

                    </div>

                </div>

            </div>

        </>

    );

};