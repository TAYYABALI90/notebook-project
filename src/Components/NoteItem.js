import React, { useContext } from 'react'

import NoteContext from '../Context/notes/NoteContext';

export default function NoteItem(props) {

    let context = useContext(NoteContext);

    let { deleteNotes } = context;

    let { note, updateNote } = props;

    return (

        <>

            <div className="container">

                <div className="row align-items-center justify-content-center">

                    <div className="col-12">

                        <div className="card my-3">

                            <div className="card-header">

                                {/* <h2 className="card-title"></h2> */}

                            </div>

                            <div className="card-body">

                                <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4">

                                    <div className="row">

                                        <div className="col-sm-12">

                                            <table

                                                id="example1"
                                                className="table table-bordered table-striped dataTable dtr-inline"
                                                aria-describedby="example1_info">

                                                <thead>

                                                    <tr>

                                                        <th

                                                            className="sorting"
                                                            tabIndex={0}
                                                            aria-controls="example1"
                                                            rowSpan={1}
                                                            colSpan={1}
                                                            aria-label="Browser: activate to sort column ascending">TITLE</th>

                                                        <th

                                                            className="sorting"
                                                            tabIndex={0}
                                                            aria-controls="example1"
                                                            rowSpan={1}
                                                            colSpan={1}
                                                            aria-label="Engine version: activate to sort column ascending">DESCRIPTION</th>

                                                        <th

                                                            className="sorting"
                                                            tabIndex={0}
                                                            aria-controls="example1"
                                                            rowSpan={1}
                                                            colSpan={1}
                                                            aria-label="CSS grade: activate to sort column ascending">TAG</th>

                                                        <th

                                                            className="sorting"
                                                            tabIndex={0}
                                                            aria-controls="example1"
                                                            rowSpan={1}
                                                            colSpan={1}
                                                            aria-label="CSS grade: activate to sort column ascending">UPDATE</th>

                                                        <th

                                                            className="sorting"
                                                            tabIndex={0}
                                                            aria-controls="example1"
                                                            rowSpan={1}
                                                            colSpan={1}
                                                            aria-label="CSS grade: activate to sort column ascending">DELETE</th>

                                                    </tr>

                                                </thead>

                                                <tbody>

                                                    <tr>

                                                        <td>{note.title}</td>

                                                        <td>{note.description}</td>

                                                        <td>{note.tag}</td>

                                                        <td>

                                                            <button

                                                                className="btn btn-info"
                                                                onClick={() => { updateNote(note) }}>
                                                                Update</button>

                                                        </td>

                                                        <td>

                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={() => { deleteNotes(note._id);
                                                                props.showAlert("Have Successfully Deleted Your Note", "success") }}>
                                                                Delete</button>

                                                        </td>

                                                    </tr>

                                                </tbody>

                                                <tfoot>

                                                    <tr>

                                                        <th rowSpan={1} colSpan={1}>TITLE</th>
                                                        <th rowSpan={1} colSpan={1}>DESCRIPTION</th>
                                                        <th rowSpan={1} colSpan={1}>TAG</th>
                                                        <th rowSpan={1} colSpan={1}>UPDATE</th>
                                                        <th rowSpan={1} colSpan={1}>DELETE</th>

                                                    </tr>

                                                </tfoot>

                                            </table>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

};
