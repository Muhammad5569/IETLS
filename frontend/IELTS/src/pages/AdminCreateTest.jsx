import { useState } from "react";
import API from "../api";

export default function AdminCreateTest() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [version, setVersion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tests", { title, description, version });
      alert("Test created successfully!");
      setTitle(""); setDescription(""); setVersion("");
    } catch (err) {
      alert("Error creating test");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Create New Test</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full border p-2 rounded"
          placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="w-full border p-2 rounded"
          placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input className="w-full border p-2 rounded"
          placeholder="Version" value={version} onChange={(e) => setVersion(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
