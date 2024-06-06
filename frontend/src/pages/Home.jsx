import React from "react";
import { useState, useEffect } from "react";
import api from "../api";

export default function Home() {
  //need to keep track of all notes we already grabbed from the server
  const [notes, setNotes] = useState([]);

  //state allow us to create new notes
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  return <div>Home</div>;
}
