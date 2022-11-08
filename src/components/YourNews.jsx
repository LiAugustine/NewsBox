import { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Text,
} from '@chakra-ui/react'
import SavedArticles from "./SavedArticles"
import NewsTabs from "./NewsTabs"
import LoginRequired from "./LoginRequired"
import NewsResults from "./NewsResults"

export default function YourNews() {

    const [user, setUser] = useState()

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser)
            setUser(foundUser)
        }

    }, []);

    const [savedQueryResults, setSavedQueryResults] = useState([])

    useEffect(() => {
        if (typeof (user) !== "undefined") {
            axios.post("/api/get_saved_query_results", {
                user
            })
                .then((response) => {
                    setSavedQueryResults(response.data)
                })
        }
    }, [user])

    const [savedArticles, setSavedArticles] = useState([])

    useEffect(() => {
        if (typeof (user) !== "undefined") {
            axios.post("/api/get_saved_articles", {
                user
            })
                .then((response) => {
                    setSavedArticles(response.data)
                })
        }
    }, [user])


    return (
        <div>
            <NewsTabs tab={0} />
            <br></br>
            {user ?
                (
                    <div>
                        <Accordion defaultIndex={[0]} allowMultiple>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            <Text fontSize='3xl'> Your Feed
                                            </Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Text fontSize='xl'> Your news feed (based on saved queries).
                                    </Text>
                                    <NewsResults results={savedQueryResults} />
                                </AccordionPanel>

                            </AccordionItem>


                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            <Text fontSize='3xl'> Saved Articles
                                            </Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Text fontSize='xl'> Your saved articles.
                                    </Text>
                                    <SavedArticles results={savedArticles} />
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            <Text fontSize='3xl'> Viewed Articles
                                            </Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Text fontSize='xl'> Viewed articles.
                                    </Text>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </div>
                ) :
                (
                    <LoginRequired />
                )
            }
        </div >
    )
}