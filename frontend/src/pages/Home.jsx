import React from "react";
import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";

export default function Home() {
  //need to keep track of all notes we already grabbed from the server
  const [notes, setNotes] = useState([]);

  //state allow us to create new notes
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  //call getNote function as soon as we visit the page
  useEffect(() => {
    getNote();
  }, []);

  //functions that will send requests
  const getNote = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert.err);
  };

  //detele notes
  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note Deleted!");
        else alert("Failed to delete note.");
        getNote(); // update the screen by removing the notes when recieve the new notes from backend
      })
      .catch((err) => alert(err));
  };

  //create notes
  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note Created!");
        else alert("Failed to create.");
        getNote();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>

      <h2>Create a Note</h2>

      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />

        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label htmlFor="content">Content:</label>
        <br />

        <textarea
          name="content"
          id="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
