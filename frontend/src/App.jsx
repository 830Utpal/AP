import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ScheduleDisplay from "./components/ScheduleDisplay";
import "./index.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <header className="header">School Schedule</header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule/:className" element={<ScheduleDisplay />} />
          </Routes>
        </main>
        <footer className="footer">© 2025 School Schedule</footer>
      </div>
    </Router>
  );
}

export default App;
