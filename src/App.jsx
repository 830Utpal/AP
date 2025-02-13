import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ScheduleDisplay from "./components/ScheduleDisplay";
import "./App.css"; // Import CSS

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>School Schedule</header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule/:className" element={<ScheduleDisplay />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
