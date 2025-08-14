import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function TestList() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    API.get("/tests").then((res) => setTests(res.data));
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Available Tests</h2>
      {tests.map((t) => (
        <div key={t._id} className="border p-4 rounded mb-3">
          <h3 className="font-semibold">{t.title}</h3>
          <p>{t.description}</p>
          <Link to={`/tests/${t._id}`} className="text-blue-600 hover:underline">
            Start Test
          </Link>
        </div>
      ))}
    </div>
  );
}
