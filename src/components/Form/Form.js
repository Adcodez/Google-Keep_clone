import React, { useState, useEffect,useRef } from "react";
import "./Form.css";
import { uid } from "uid";

const Form = (props) => {
  const { edit, selectedNote, toggleModal } = props;
  const [title, setTitle] = useState((edit && selectedNote.title) || "");
  const [text, setText] = useState((edit && selectedNote.text) || "");
  const [isActiveForm, setIsActiveForm] = useState(edit);
 
  const formRef = useRef(null);

  const titleChangeHandler = (event) => setTitle(event.target.value);
  const textChangeHandler = (event) => {
    setText(event.target.value);
    setIsActiveForm(true);
  };

  // handle submit on enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      submitFormHandler(e);
    }
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    // Prevent submitting empty notes
    if (title.trim() === "" && text.trim() === ""){
      alert(" nice try but you can't submit an empty note!");
      return;
    } 

    if (!edit) {
      props.addNote({
        id: uid(),
        title,
        text,
      });
      setIsActiveForm(false);
    } else {
      props.editNote({
        id: selectedNote.id,
        title,
        text,
      });
      toggleModal();
    }

    setTitle("");
    setText("");
  };

  const closeFormHandler = (e) => {
    e.preventDefault();
    setIsActiveForm(false);
    setTitle("");
    setText("");
    // ensureing no duplicate forms!
    if (edit) {
      toggleModal();
    }
  };

  const formClickHandler = (event) => {
    if (!isActiveForm) {
      setIsActiveForm(true);
    } // Prevents form from opening if already active
    event.stopPropagation();
  };

  // close form if clicked outside!! iow I DID IT!!
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setIsActiveForm(false);
      setTitle("");
      setText("");
      if (edit) toggleModal();
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [edit, toggleModal]);

  return (
    <div>
      <div  ref={formRef} className="form-container active-form" onClick={formClickHandler}>
        <form
          onSubmit={submitFormHandler}
          className={isActiveForm ? "form" : ""}
        >
          {isActiveForm && (
            <input
              onChange={titleChangeHandler}
              value={title}
              onKeyDown={handleKeyDown}
              type="text"
              className="note-title"
              placeholder="Title"
            />
          )}
          <input
            onChange={textChangeHandler}
            value={text}
            onKeyDown={handleKeyDown}
            className="note-text"
            type="text"
            placeholder="Take a note..."
          />
          {isActiveForm ? (
            <div className="form-actions">
              <div className="icons">
                <div className="tooltip">
                  <span className="material-icons-outlined hover small-icon">
                    add_alert
                  </span>
                  <span className="tooltip-text">Remind me</span>
                </div>
                <div className="tooltip">
                  <span className="material-icons-outlined hover small-icon">
                    person_add
                  </span>
                  <span className="tooltip-text">Collaborator</span>
                </div>
                <div className="tooltip">
                  <span className="material-icons-outlined hover small-icon">
                    palette
                  </span>
                  <span className="tooltip-text">Change Color</span>
                </div>
                <div className="tooltip">
                  <span className="material-icons-outlined hover small-icon">
                    image
                  </span>
                  <span className="tooltip-text">Add Image</span>
                </div>
                <div className="tooltip">
                  <span className="material-icons-outlined hover small-icon">
                    archive
                  </span>
                  <span className="tooltip-text">Archive</span>
                </div>
                <div className="tooltip">
                  <span className="material-icons-outlined hover small-icon">
                    more_vert
                  </span>
                  <span className="tooltip-text">More</span>
                </div>
                <div className="tooltip">
                  <span className="material-icons-outlined hover small-icon">
                    arrow_back
                  </span>
                  <span className="tooltip-text">Undo</span>
                </div>
                <div className="tooltip">
                  <span className="material-icons-outlined hover small-icon">
                    arrow_forward
                  </span>
                  <span className="tooltip-text">Redo</span>
                </div>
              </div>
              <button
                type="button"
                className="close-btn"
                onClick={closeFormHandler}
              >
                Close
              </button>
            </div>
          ) : (
            <div className="form-actions-closed">
              <div className="tooltip">
                <span className="material-icons-outlined hover closed-icon">check_box</span>
                <span className="tooltip-text">New List</span>
              </div>
              <div className="tooltip">
                <span className="material-icons-outlined hover closed-icon">brush</span>
                <span className="tooltip-text">New Drawing</span>
              </div>
              <div className="tooltip">
                <span className="material-icons-outlined hover closed-icon">image</span>
                <span className="tooltip-text">New Image</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
