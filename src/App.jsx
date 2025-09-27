import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AutoSummary from "./pages/AutoSummary";

function App() {
  return (
    <Router>
      <Routes>
        {/* other routes */}
        <Route path="/auto-summary" element={<AutoSummary />} />
      </Routes>
    </Router>
  );
}

export default App;
