import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HotNews from "./HotNews"
import YourNews from "./YourNews"
import NewsSearch from "./NewsSearch"

export default function NewsTabs() {

    return (
        <div>

            <Router>
                <Routes>
                    <Route path="/" element={<HotNews />} />
                    <Route path="/YourNews" element={<YourNews />} />
                    <Route path="/NewsSearch" element={<NewsSearch />} />
                </Routes>
            </Router>

        </div >
    );
}
