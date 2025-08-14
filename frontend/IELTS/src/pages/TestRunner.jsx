import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function TestRunner() {
  const { id } = useParams();
  const [listening, setListening] = useState(null);

  useEffect(() => {
    API.get(`/tests/${id}`).then(async (res) => {
      // for now assume one listening section exists
      const test = res.data;
      if (test.sections?.length) {
        const listeningId = test.sections[0];
        const listeningRes = await API.get(`/listening/${listeningId}`);
        setListening(listeningRes.data);
      }
    });
  }, [id]);

  const handleSubmit = () => {
    alert("Collect form values and POST /listening-attempts here");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Test Runner</h2>
      {listening ? (
        <div>
          <div className="border p-4 rounded bg-gray-50"
            dangerouslySetInnerHTML={{ __html: listening.htmlContext }} />
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 mt-4 rounded">
            Submit Answers
          </button>
        </div>
      ) : (
        <p>Loading test...</p>
      )}
    </div>
  );
}
