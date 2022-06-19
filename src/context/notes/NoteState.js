import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const host = "http://localhost:5000";
    const initialNote = []

    const [notes, setNotes] = useState(initialNote)

    //get a note
    const getNote = async () => {
        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
                // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5ZTA3OGNhNTEyOGE3MjU1OGVkNWMyIn0sImlhdCI6MTY1NDUyMzc4OH0.tzD8jhikN-Zk8ArT6PqH_d7am2aqO24qZRrg-xtAnus"
            },
        });
        const json = await response.json();
        setNotes(json);
    }

    //Add a note
    const addNote = async (title, description, tag) => {

        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
                // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5ZTA3OGNhNTEyOGE3MjU1OGVkNWMyIn0sImlhdCI6MTY1NDUyMzc4OH0.tzD8jhikN-Zk8ArT6PqH_d7am2aqO24qZRrg-xtAnus"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    // Delete a Note
    const deleteNote = async(id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
                // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5ZTA3OGNhNTEyOGE3MjU1OGVkNWMyIn0sImlhdCI6MTY1NDUyMzc4OH0.tzD8jhikN-Zk8ArT6PqH_d7am2aqO24qZRrg-xtAnus"
            },
        });
        const json = await response.json();
        console.log(json);

        const newNote = notes.filter((note) => { return note._id !== id });
        setNotes(newNote);
    }

    // Edit a Note
    // replce note values of id ==id,by parameter values(title,description,tag)
    const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
                // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5ZTA3OGNhNTEyOGE3MjU1OGVkNWMyIn0sImlhdCI6MTY1NDUyMzc4OH0.tzD8jhikN-Zk8ArT6PqH_d7am2aqO24qZRrg-xtAnus"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);
        //logic to edit in client
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;