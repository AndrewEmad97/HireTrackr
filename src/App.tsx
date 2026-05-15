import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import JobDetail from "./pages/JobDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/jobs/:id" element={<JobDetail />}  />
      </Routes>
    </BrowserRouter>
  );
}

export default App
