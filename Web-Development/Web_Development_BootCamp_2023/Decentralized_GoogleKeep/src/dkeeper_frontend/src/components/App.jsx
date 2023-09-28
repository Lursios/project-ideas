import React, { useState } from "react";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper_backend } from "../../../declarations/dkeeper_backend";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {

    dkeeper_backend.createNote(newNote.title,newNote.content);
    setNotes(prevNotes => {
      console.log(prevNotes);
      return [newNote, ...prevNotes];
    });
  }

  useEffect(() => {
    console.log("use effect is working !")
    fetchData();
  }, []);

  async function fetchData() {
    const notesArray = await dkeeper_backend.getNotes();
    setNotes(notesArray);
  };

  function deleteNote(id)  {
    dkeeper_backend.deleteNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
