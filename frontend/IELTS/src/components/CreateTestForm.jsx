import { useState } from "react";
import API from "../api";

export default function CreateTestForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/tests", { title, description });
      onCreated(res.data);
      setTitle("");
      setDescription("");
    } catch (err) {
      alert("Error creating test");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded mb-3">
      <h3>Create New Test</h3>
      <input
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">Create</button>
    </form>
  );
}
