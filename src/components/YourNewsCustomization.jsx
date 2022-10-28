import { useState, useEffect } from 'react'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,

    Center,
    Button,
    Box,
    Text,
    Tab, Tabs, TabList,
} from '@chakra-ui/react'

import { Link } from "react-router-dom";
import LoginRequired from "./LoginRequired"



export default function Customize() {
    const [user, setUser] = useState()

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser)
            setUser(foundUser)
        }

    }, []);


    return (
        <div>
            <Center>
                <Tabs variant='soft-rounded' colorScheme='green' defaultIndex={1}>
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

                        <Center>
                            <Text fontSize='3xl'> Saved Queries
                            </Text>

                        </Center>

                        <Alert status='info' variant='left-accent'>
                            <Center>
                                <AlertIcon />

                                Save desired news queries. Results from these queries appear in your feed.
                            </Center>
                        </Alert>

                    </div>
                ) :
                (
                    <LoginRequired />
                )
            }
        </div>
    )
}