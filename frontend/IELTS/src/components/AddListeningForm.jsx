import { useState } from "react";
import API from "../api";

export default function AddListeningForm({ testId }) {
  const [htmlContext, setHtmlContext] = useState("");
  const [inputLabel, setInputLabel] = useState("");
  const [inputs, setInputs] = useState([]);

  const addInput = () => {
    setInputs([...inputs, { id: `q${inputs.length+1}`, type: "text", correctAnswer: "", label: inputLabel }]);
    setInputLabel("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/tests/${testId}/listening`, { htmlContext, inputs });
      alert("Listening section added!");
      setHtmlContext("");
      setInputs([]);
    } catch (err) {
      alert("Error adding listening section");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 border rounded mt-2">
      <h6>Add Listening Section</h6>
      <textarea
        className="form-control mb-2"
        placeholder="HTML Context"
        value={htmlContext}
        onChange={(e) => setHtmlContext(e.target.value)}
      />
      <div className="d-flex mb-2">
        <input
          className="form-control"
          placeholder="Input Label"
          value={inputLabel}
          onChange={(e) => setInputLabel(e.target.value)}
        />
        <button type="button" className="btn btn-secondary ms-2" onClick={addInput}>
          Add Input
        </button>
      </div>
      <ul>
        {inputs.map((i) => (
          <li key={i.id}>{i.label} ({i.type})</li>
        ))}
      </ul>
      <button className="btn btn-success mt-2" type="submit">Save Listening</button>
    </form>
  );
}
