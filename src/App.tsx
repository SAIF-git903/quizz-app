import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import Quiz from "./pages/Quizz";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App m-auto h-[100vh]">
      <header className="App-header"></header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  );
}

export default App;
