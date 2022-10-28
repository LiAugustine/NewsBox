import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Center,
    Button,
    Box,
    Text,
    Tab, Tabs, TabList,
} from '@chakra-ui/react'
import SavedArticles from "./SavedArticles"
import LoginRequired from "./LoginRequired"
import { useGoogleLogin } from '@react-oauth/google';

export default function YourNews() {

    const [user, setUser] = useState()
    const [savedArticles, setSavedArticles] = useState([])

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser)
            setUser(foundUser)
        }

    }, []);

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
            <Center>
                <Tabs variant='soft-rounded' colorScheme='green' defaultIndex={0}>
                    <TabList>
                        <Tab as={Link} to="/">Your News</Tab>
                        <Tab as={Link} to="/Customize">Customize Your Feed</Tab>
                        <Tab as={Link} to="/HotNews">Hot News</Tab>
                        <Tab as={Link} to="/NewsSearch">Advanced News Search</Tab>
                    </TabList>
                </Tabs>



            </Center>
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
                                    Saved articles here.
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