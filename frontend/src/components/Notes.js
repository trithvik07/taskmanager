import React,{useContext,useEffect,useRef,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import notecontext from '../context/notes/notecontext';
import Addnote from './Addnote';
import NoteItem from './NoteItem';

function Notes(props) {
    const context = useContext(notecontext)
    const navigate = useNavigate();
    const {note,getnotes,editnote} = context
    const [notes, setnote] = useState({id : "",etitle:"",edescription:"",etag:"",estatus:false})
    useEffect(() => {
        if(localStorage.getItem('token')){
            getnotes()
            
        }
        else{
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const updatenote = (currentnote)=>{
        ref.current.click()
        setnote({id : currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag,estatus:currentnote.status})
    }

    const onClick = (e)=>{
        refClose.current.click();
        editnote(notes.id,notes.etitle,notes.edescription,notes.etag,notes.estatus)
        props.showAlert("updated succesfully","success")
    }
    const onChange = (e)=>{
        setnote({...notes,[e.target.name]:e.target.value})
    }
    const handleChange = (e)=>{
        console.log(e.target.checked)
        if(notes.estatus){
            setnote({...notes,estatus:false})
        }
        else{
            setnote({...notes,estatus:true})
        }
    }
    console.log(notes.estatus);
    return (
    <> 
    
        <Addnote showAlert = {props.showAlert}/>
        <button type="button" className="btn btn-primary my-3 d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref = {ref}>
        Edit note
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Update Task</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
                <div className="modal-body">
                    <form>            
                    <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name = "etitle" value = {notes.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" value = {notes.edescription} name = "edescription" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" value = {notes.etag} name = "etag" onChange={onChange}/>
                </div>
                <div className='d-flex justify-content-center align-items-cente'>
                    <label>Completed</label>
                    <input type='checkbox' className='mx-3 p-5' name='estatus' onChange={handleChange}/>   
                </div>           
            </form>
            </div>
            <div className="modal-footer">
                <button ref = {refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled = {notes.etitle.length < 5 || notes.edescription.length < 5} type="button" className="btn btn-primary" onClick={onClick}>Update note</button>
            </div>
            </div>
        </div>
        </div>
        <div className='row'>      
            <h1>Your Tasks</h1>
            <div className="container">
                {note.length === 0 && 'No notes to display'}
            </div>
            {note.map((note)=>{
                return <NoteItem key = {note._id} showAlert = {props.showAlert} updatenote = {updatenote} note = {note}/>;
            })}
        </div>
    </>  
    )
}

export default Notes