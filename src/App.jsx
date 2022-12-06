import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import HotNews from "./components/HotNews"
import YourNews from "./components/YourNews"
import Customize from "./components/YourNewsCustomization"
import NewsSearch from "./components/NewsSearch"
import SearchResults from "./components/NewsResults"

export default function App() {

  return (
    <div>

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<YourNews />} />
          <Route path="/Customize" element={<Customize />} />
          <Route path="/HotNews" element={<HotNews />} />
          <Route path="/NewsSearch" element={<NewsSearch />} />
          <Route path="/SearchResults" element={<SearchResults />} />
        </Routes>
      </Router>
    </div>

  );
}


