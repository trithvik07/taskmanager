import React from "react";
import noteContext from "./notecontext";
import { useState } from "react";
const NoteState = (props)=>{
  const host  = "http://localhost:4000"
    const notesInitial = []
    const [note, setnotes] = useState(notesInitial)
      const getnotes = async(title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        const json = await response.json()
        setnotes(json)
      }
    //adding a note
      const addnote = async(title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/addnotes`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}),
        });
        const json =  await response.json();

        setnotes(note.concat(json))
      }

    //deleting a note
      const deletenote = async(id)=>{
          const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        const json = await response.json()
        console.log(json)
        const newNotes = note.filter((notes)=>{return notes._id!==id})
        setnotes(newNotes)
      }

    //edit a note
    const editnote = async(id,title,description,tag,status)=>{
        // console.log("editing notes with note id",id)
        console.log(status);
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag,status}),
        });
        const json = await response.json();
        let newnotes = JSON.parse(JSON.stringify(note))
        for (let i = 0; i < note.length; i++) {
          const element = newnotes[i]
          if(element._id === id){
            newnotes[i].title = title
            newnotes[i].description = description
            newnotes[i].tag = tag
            newnotes[i].status = status
            break
          }
          
        }
        setnotes(newnotes)
      }

    return(    
    <noteContext.Provider value = {{note,addnote,deletenote,editnote,getnotes}}>
        {props.children}
    </noteContext.Provider>
    )
}

export default NoteState;