import { useState } from "react";
import API from "../api";

export default function AdminAddListening() {
  const [testId, setTestId] = useState("");
  const [htmlContext, setHtmlContext] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/tests/${testId}/listening`, { testId, htmlContext, inputs: [] });
      alert("Listening section added!");
      setHtmlContext(""); setTestId("");
    } catch (err) {
      alert("Error adding listening section");
      console.log(err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Listening Section</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full border p-2 rounded"
          placeholder="Test ID" value={testId} onChange={(e) => setTestId(e.target.value)} />
        
        {/* HTML Input (for now) */}
        <textarea className="w-full border p-2 h-40 rounded"
          placeholder="Paste Listening HTML here"
          value={htmlContext} onChange={(e) => setHtmlContext(e.target.value)} />

        {/* Preview */}
        <div className="border p-4 rounded bg-gray-50">
          <h3 className="text-sm font-semibold mb-2">Preview</h3>
          <div dangerouslySetInnerHTML={{ __html: htmlContext }} />
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
          Save Listening
        </button>
      </form>
    </div>
  );
}
