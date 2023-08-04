const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

//ROUTE 1 : get all the notes
router.get('/fetchallnotes',fetchUser,async(req,res)=>{
    try {
    const notes = await Notes.find({user : req.user.id})
    res.json(notes)
} catch (error) {
      console.error(error.message);  
      res.status(500).send("Internal server error")
    }   
})


//ROUTE 2 : adding notes
router.post('/addnotes',fetchUser,[
    body('title','title must be atleast 3 char long').isLength({min:3}),
    body('description','description must be atleast 5 char long').isLength({min:5})
],async(req,res)=>{
    try {
        const {title,description,tag} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes(
            {title,description,tag,user: req.user.id}
        )
        const savednote = await note.save()
        res.json(savednote)
    }
     catch (error) {
        console.error(error)
        res.status(500).send("Internal server error")
    }
})

//ROUTE 3 : updating an exsisting note
router.put('/updatenote/:id',fetchUser,async(req,res)=>{
    try {
    const {title,description,tag,status} = req.body;
    const newnote = {};
    if(title){newnote.title = title};
    if(description){newnote.description = description};
    if(tag){newnote.tag = tag};
    newnote.status = status;
    //find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not found")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
    res.json(note)
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Internal server error")
    }
})


//ROUTE 4 : delete a note
router.delete('/deletenote/:id',fetchUser,async(req,res)=>{
    try {
        

    const {title,description,tag} = req.body;
    //find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not found")
    }
    //aloow deletion only if user owns this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"success":"note has been deleted","note":note})
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Internal server error")
    }
})
module.exports = router