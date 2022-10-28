import { useState, useEffect } from 'react'
import {

    Input, FormControl, FormLabel, FormHelperText,
    Center,
    Button, IconButton,
    Text, Heading,
    Tab, Tabs, TabList,
} from '@chakra-ui/react'

import { CloseIcon } from '@chakra-ui/icons'
import { Link } from "react-router-dom";
import axios from 'axios'
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

    const [queries, setQueries] = useState([])

    useEffect(() => {
        if (typeof (user) !== "undefined") {
            axios.post("/api/get_saved_queries", {
                user
            })
                .then((response) => {
                    setQueries(response.data)
                })
        }
    }, [user])

    const [queryToBeAdded, setQueryToBeAdded] = useState("")

    const queryChangeHandler = (e) => {
        setQueryToBeAdded(e.target.value)
    };

    const onClickAdd = (user_id, queryToBeAdded) => {
        axios.post('/api/save_query', {
            user_id, queryToBeAdded
        })
            .then(response => {
                setQueries(response.data)
            })
    }

    const onClickDelete = (user_id, query) => {
        axios.post('/api/delete_query', {
            user_id, query
        })
            .then(response => {
                setQueries(response.data)
            })
    }




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
                            <Heading as="h3" size="lg">
                                Manage Queries
                            </Heading>
                        </Center>

                        <Center>
                            <Text as='i' fontSize="xl">
                                News results from saved queries appear in your feed. Add up to 3 queries.
                            </Text>
                        </Center>
                        <br></br>

                        <FormControl>
                            <Center><FormLabel>Add query</FormLabel></Center>
                            <Center> <Input type='query' name='q' htmlSize={40} width='auto' onChange={queryChangeHandler} /></Center>
                        </FormControl>

                        <Center>
                            <Button colorScheme='green'

                                height='35px'
                                width='160px'
                                onClick={() => onClickAdd(
                                    user.sub,
                                    queryToBeAdded
                                )}
                            >

                                Add query!
                            </Button>
                        </Center>
                        <br></br>

                        <Center>
                            <Heading as="h3" size="lg">
                                Queries
                            </Heading>
                        </Center>

                        {queries.map((query) =>
                            <Center>
                                <Text fontSize='xl'>
                                    {query.query}
                                </Text>

                                <IconButton
                                    colorScheme='red'
                                    aria-label='Delete Query'
                                    size='sm'
                                    icon={<CloseIcon />}
                                    onClick={
                                        () => onClickDelete(
                                            user.sub,
                                            query.query,
                                        )
                                    }
                                />
                            </Center>
                        )}




                    </div>
                ) :
                (
                    <LoginRequired />
                )
            }
        </div>
    )
}