const express = require('express')
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');


//Route 1:get all the Notes using: GET "/api/notes/fetchallnotes. Login required
router.get('/fetchallnotes',fetchuser, async(req,res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    }  catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error !");
    }
})
//Route 2:Add a new note using: Post "/api/notes/addnote. Login required
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title(minimum 3 length)').isLength({ min: 3 }),
    body('description','description should be minimum 5 characters').isLength({ min: 5 }),
], async(req,res)=>{
    try {
        const {title,description,tag} =req.body;
        //if there are errors , return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title,description,tag,user: req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote);
        
    }  catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error !");
    }
})
//Route 3:Update an existing note: PUT "/api/notes/updatenote. Login required
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag} = req.body;
    try {
        //create a newNote object
        const newNote ={};
        if(title){ newNote.title = title};
        if(description){ newNote.description = description};
        if(tag){ newNote.tag = tag};
    
        //find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note)
        {
            return res.status(404).send("Not Found");
        }
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error !");
    }
})
//Route 4:Delete an existing note: DELETE "/api/notes/deletenote. Login required
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag} = req.body;
    try {
        //find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note)
        {
            return res.status(404).send("Not Found");
        }
        //check note is own by logged in user
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Sucess": "Note has been deleted",note:note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error !");
    }
})

module.exports = router