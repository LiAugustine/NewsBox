import { useState, useEffect } from 'react'
import axios from 'axios'
import NewsTabs from "./NewsTabs"
import NewsResults from "./NewsResults"
export default function HotNews() {

    const [news, setNews] = useState([])

    useEffect(() => {
        axios.get("/api/get_hot_articles")
            .then((response) => {
                setNews(response.data)
            });
    }, []);

    return (
        <div>
            <NewsTabs tab={2} />

            <br></br>
            <NewsResults results={news} />
        </div>
    )
}