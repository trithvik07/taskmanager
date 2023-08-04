import React,{useContext,useState} from 'react'
import notecontext from '../context/notes/notecontext';



const Addnote = (props) => {
    const context = useContext(notecontext)
    const {addnote} = context
    const [note, setnote] = useState({title:"",description:"",tag:""})
    const onClick = (e)=>{
        e.preventDefault();
        addnote(note.title,note.description,note.tag)
        setnote({title:'',description:'',tag:''})
        props.showAlert("Added succesfully","success")
    }
    const onChange = (e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    return (
        <>
            <h1>Add a Task</h1>
            <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name = "title" aria-describedby="emailHelp" value = {note.title} onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" name = "description" value = {note.description} onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name = "tag" value = {note.tag} onChange={onChange}/>
            </div>
            <button disabled = {note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={onClick}>Add note</button>
            </form>
        </>
    )
}

export default Addnote