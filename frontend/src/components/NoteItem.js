import React, { useContext } from "react";
import notecontext from "../context/notes/notecontext";

const NoteItem = (props) => {
  const context = useContext(notecontext);
  const { deletenote } = context;
  const { note, updatenote } = props;
  return (
    <div className="col md-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="d-flex flex-coloumn align-items-center justify-content-between">
            <div>
              <i
                className="fa-sharp fa-solid fa-trash mx-2"
                onClick={() => {
                  deletenote(note._id);
                  props.showAlert("deleted succesfully", "success");
                }}
              ></i>
              <i
                className="fa-regular fa-pen-to-square mx-2"
                onClick={() => {
                  updatenote(note);
                }}
              ></i>
            </div>
            {note.status?(<i class="fa fa-check-square fa-2x" aria-hidden="true"></i>):''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
