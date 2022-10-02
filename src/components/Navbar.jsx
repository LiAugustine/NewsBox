import { useState } from 'react'
import axios from 'axios'
import { useGoogleLogin } from '@react-oauth/google';

import {
    Box, Heading, Flex,
    Button,
    Spacer,
    Divider
} from '@chakra-ui/react'

export default function Navbar() {

    const [user, setUser] = useState(false)


    const login = useGoogleLogin({
        onSuccess: async response => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${response.access_token}`
                    }
                })
                setUser(res.data)
                // console.log({ user })
            } catch (err) {
                console.log(err)

            }

        }
    });

    const logout = () => {
        setUser(false)
    }


    return (
        <div>
            <Flex minWidth='max-content' alignItems='center' gap='2'>
                <Box>
                    <Heading size='lg' as='span'>NewsBox</Heading>
                </Box>
                <Spacer />


                {user ?
                    (
                        <div>
                            <Button
                                onClick={logout}
                                colorScheme='red'
                                height='45px'
                                width='100px'>
                                Logout
                            </Button>
                        </div>
                    ) : (

                        <div>
                            <Button
                                onClick={login}
                                colorScheme='blue'
                                height='45px'
                                width='100px'>
                                Login
                            </Button>
                        </div>
                    )
                }



            </Flex>
            <Divider orientation="horizontal" />

        </div>
    );
}


