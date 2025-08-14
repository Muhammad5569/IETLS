import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TestList from "./pages/TestList";
import TestRunner from "./pages/TestRunner";
import AdminCreateTest from "./pages/AdminCreateTest";
import AdminAddListening from "./pages/AdminAddListening";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<TestList />} />
        <Route path="/tests/:id" element={<TestRunner />} />
        <Route path="/admin/create-test" element={<AdminCreateTest />} />
        <Route path="/admin/add-listening" element={<AdminAddListening />} />
      </Routes>
    </Router>
  );
}

export default App;
