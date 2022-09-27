import { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Box, Heading, Flex,
    Button,
    Spacer,
    Divider
} from '@chakra-ui/react'

export default function Navbar() {

    const [user, setUser] = useState([])

    useEffect(() => {
        axios.get("/api/get_user_data")
            .then((response) => {
                setUser(response.data)
            });
    }, []);


    return (
        <div>
            <Flex minWidth='max-content' alignItems='center' gap='2'>
                <Box>
                    <Heading size='lg' as='span'>NewsBox</Heading>
                </Box>
                <Spacer />
                {user ?
                    (

                        <a href='/logout'>
                            <Button colorScheme='red'
                                height='45px'
                                width='100px'>
                                Logout
                            </Button>
                        </a>
                    ) :
                    (
                        <a href='/google_login'>
                            <Button colorScheme='blue'
                                height='45px'
                                width='100px'>
                                Sign-in
                            </Button>
                        </a>
                    )

                }

            </Flex>
            <Divider orientation="horizontal" />

        </div>
    );
}


