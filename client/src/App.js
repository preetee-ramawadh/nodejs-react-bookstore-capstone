import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllBooks from "./pages/AllBooks";
import AllAuthors from "./pages/AllAuthors";
import AllGenres from "./pages/AllGenres";
import SidePanel from "./pages/SidePanel";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="containerCustom">
      <SidePanel />
      <main className="container">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<AllBooks />} />
            <Route path="/authors" element={<AllAuthors />} />
            <Route path="/genres" element={<AllGenres />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
