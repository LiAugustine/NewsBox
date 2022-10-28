import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HotNews from "./HotNews"
import YourNews from "./YourNews"
import Customize from "./YourNewsCustomization"
import NewsSearch from "./NewsSearch"

export default function NewsTabs() {

    return (
        <div>

            <Router>
                <Routes>
                    <Route path="/" element={<YourNews />} />
                    <Route path="/Customize" element={<Customize />} />
                    <Route path="/HotNews" element={<HotNews />} />
                    <Route path="/NewsSearch" element={<NewsSearch />} />
                </Routes>
            </Router>

        </div >
    );
}
