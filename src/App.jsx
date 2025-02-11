import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ScheduleDisplay from "./components/ScheduleDisplay";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule/:className" element={<ScheduleDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;

