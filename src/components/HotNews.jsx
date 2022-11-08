import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import { Center, Tab, Tabs, TabList } from '@chakra-ui/react'
import TabLinks from "./TabLinks"
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
            <TabLinks tab={2} />

            <br></br>
            <NewsResults results={news} />
        </div>
    )
}