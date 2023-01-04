import { useState, useEffect } from 'react'
import axios from 'axios'
import { useGoogleLogin } from '@react-oauth/google';
import { format } from 'date-fns';
import { Link } from "react-router-dom"
import {

    Heading, Flex,
    Input,
    Button,
    Spacer,
    HStack,
    Image,
    Divider,
    Avatar,
    Container,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Popover, PopoverTrigger, Portal, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody,
} from '@chakra-ui/react'
import boxImg from '../assets/box.png';
import NewsResults from "./NewsResults"
import './Styling.css'


export default function App() {

    const today = format(new Date(), 'yyyy-MM-dd')

    const [query, setQuery] = useState({
        q: "",
        sources: "",
        domains: "",
        to: today,
    })
    const [results, setResults] = useState([])

    const changeHandler = (e) => {
        setQuery({ ...query, [e.target.name]: e.target.value })
    };

    const onClickSearch = () => {
        axios.post('/api/get_search_results', {
            query
        })
            .then((response) => {
                setResults(response.data)
            })
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    {/* 
This section handles login functionality.
Google login library is used. When user is logged in, login data is persisted in local storage
until the user logs out. If user reloads page while logged in, useEffect hook retrieves user data from local storage.
Logging out clears local storage.
  */}

    const [user, setUser] = useState()

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser)
            setUser(foundUser)
        }
    }, []);

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

    const logout = () => {
        setUser(false)
        localStorage.clear()
        window.location.reload();
    }


    {/* end of login section */ }

    return (
        <div>
            <Container bg="white" maxW="100%" position='fixed' zIndex={100}>
                <Flex margin='auto' alignItems='center' gap='1'>
                    <HStack as={Link} to="/">
                        <Image src={boxImg}
                            height={10}
                            width={10}
                        >
                        </Image>
                        <Heading size='lg'>NewsBox</Heading>
                    </HStack>

                    <Spacer />
                    <Input type="simpleQuery" name="q" htmlSize={50} width='auto' placeholder='Search news here!' onChange={changeHandler} />

                    <Button
                        onClick={onClickSearch}
                        colorScheme='green'>
                        Search!
                    </Button>

                    <Spacer />


                    {user ? (
                        <Popover>
                            <PopoverTrigger>
                                <Button size='lg' variant='ghost'>
                                    <HStack>
                                        <Avatar size='sm' src={user.picture} />
                                        <Heading size='md'>{user.name}</Heading>
                                    </HStack>
                                </Button>
                            </PopoverTrigger>
                            <Portal>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverHeader>Account Options</PopoverHeader>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <Button
                                            onClick={logout}
                                            colorScheme='red'
                                            height='45px'
                                            width='100px'>
                                            Logout
                                        </Button>
                                    </PopoverBody>

                                </PopoverContent>
                            </Portal>
                        </Popover>
                    ) : (
                        <Popover>
                            <PopoverTrigger>
                                <Button colorScheme='green' size='lg'
                                >Sign-in</Button>
                            </PopoverTrigger>
                            <Portal>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverHeader>Sign-in Options</PopoverHeader>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <Button
                                            onClick={login}
                                            colorScheme='blue'
                                            height='45px'>
                                            Sign-in with Google!
                                        </Button>
                                    </PopoverBody>

                                </PopoverContent>
                            </Portal>
                        </Popover>
                    )}



                </Flex>

                <Divider orientation="horizontal" />
            </Container>


            <br></br>
            <br></br>
            <br></br>

            <NewsResults results={results} />


        </div >

    );
}


