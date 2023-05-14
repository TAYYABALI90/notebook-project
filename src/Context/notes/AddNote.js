import React, { useContext, useState } from 'react'

import NoteContext from './NoteContext';

export default function AddNote(props) {

    let context = useContext(NoteContext);

    let { createNotes } = context;

    let [note, setNote] = useState({ title: "", description: "", tag: "" });

    let handleSubmit = (e) => {

        e.preventDefault();

        createNotes(note.title, note.description, note.tag);

        setNote({ title: "", description: "", tag: "" });

        props.showAlert("Have Successfully Added Your Note", "success");

    };

    let onChange = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value });

    };

    return (

        <>

            <div className="container my-3">

                <div className="row align-items-center justify-content-center">

                    <div className="col-12">

                        <h2>ADD A NOTE HERE</h2>

                        <div className='border-bottom border-dark'></div>

                        <form className='my-3' onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label htmlFor="title" className="form-label">Enter Your Title</label>

                                <input

                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={note.title}
                                    name='title'
                                    aria-describedby="emailHelp"
                                    onChange={onChange}
                                    minLength={5}
                                    required />

                            </div>

                            <div className="mb-3">

                                <label htmlFor="description" className="form-label">Enter Your Description</label>

                                <input

                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={note.description}
                                    name='description'
                                    onChange={onChange}
                                    minLength={5}
                                    required />

                            </div>

                            <div className="mb-3">

                                <label htmlFor="tag" className="form-label">Enter Your Tag</label>

                                <input

                                    type="text"
                                    className="form-control"
                                    id="tag"
                                    value={note.tag}
                                    name='tag'
                                    onChange={onChange}
                                    minLength={5}
                                    required />

                            </div>

                            <button

                                type="submit"
                                className="btn btn-primary"
                                disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 5}>
                                Create A Note</button>

                        </form>

                        <div className='border-bottom border-dark'></div>

                    </div>

                </div>

            </div>

        </>

    );

};
