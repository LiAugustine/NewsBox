import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import {
    Center,
    Heading,
    Button,
    Box,
    Text,
    Tab, Tabs, TabList,
} from '@chakra-ui/react'
import SavedArticles from "./SavedArticles"
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

    const login = useGoogleLogin({
        onSuccess: async response => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${response.access_token}`
                    }
                })
                setUser(res.data)
                localStorage.setItem('user', JSON.stringify(res.data))
                window.location.reload();
            } catch (err) {
                console.log(err)

            }

        }
    });


    return (
        <div>
            <Center>
                <Tabs variant='soft-rounded' colorScheme='green' defaultIndex={1}>
                    <TabList>

                        <Tab as={Link} to="/">Hot News</Tab>
                        <Tab as={Link} to="/YourNews">Your News</Tab>
                        <Tab as={Link} to="/NewsSearch">Advanced News Search</Tab>

                    </TabList>
                </Tabs>
            </Center>
            <br></br>
            {user ?
                (
                    <div>
                        <Center>
                            <Text fontSize='3xl'>
                                Your saved articles:
                            </Text>
                        </Center>

                        <SavedArticles results={savedArticles} />
                    </div>
                ) :
                (
                    <div>
                        <Center>
                            <Text fontSize='3xl'>Sign-in to save articles
                                and personalize your news feed.
                            </Text>
                        </Center>
                        <Center>
                            <Button
                                onClick={login}
                                colorScheme='green'
                                height='45px'
                            >
                                Sign-in with Google
                            </Button>
                        </Center>
                    </div>
                )
            }
        </div >
    )
}