import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote} = context;
    const { note,updateNote } = props;
    return (
        <div className='col-md-4'>
            <div className="card my-3" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h4 className="card-title">{note.tag}</h4>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-pen-to-square mx-2"  onClick={()=>{updateNote(note);}}></i>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Note successfully Deleted","success");}}></i>
                    
                </div>
            </div>

        </div>
    )
}

export default Noteitem
