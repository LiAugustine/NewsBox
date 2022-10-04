import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import { Center, Tab, Tabs, TabList } from '@chakra-ui/react'
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
            <Center>
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList>

                        <Tab as={Link} to="/">Hot News</Tab>

                        {/* <Tab as={Link} to="/YourNews">Your News</Tab> */}

                        <Tab as={Link} to="/NewsSearch">Advanced News Search</Tab>

                    </TabList>
                </Tabs>
            </Center>
            <br></br>
            <NewsResults results={news} />
        </div>
    )
}