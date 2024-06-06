import React from "react";
import { useState, useEffect } from "react";
import api from "../api";

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

  return <div>Home</div>;
}
