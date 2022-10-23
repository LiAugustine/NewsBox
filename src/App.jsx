import NewsRoutes from "./components/NewsRoutes"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useGoogleLogin } from '@react-oauth/google';
import { format } from 'date-fns';
import {
  Box, Heading, Flex,
  Input,
  Button,
  Spacer,
  Divider,
  Avatar, Wrap, WrapItem,
  Popover, PopoverTrigger, Portal, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody,
} from '@chakra-ui/react'
import NewsResults from "./components/NewsResults"

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
      <Flex minWidth='max-content' alignItems='center' gap='2'>
        <Box>
          <a href="/">
            <Heading size='lg'>NewsBox</Heading>
          </a>
        </Box>
        <Spacer />
        <Input type="simpleQuery" name="q" htmlSize={50} width='auto' placeholder='Search news here!' onChange={changeHandler} />
        <Button onClick={onClickSearch}
          colorScheme='green'>
          Search!
        </Button>

        <Spacer />


        {user ? (
          <Popover>
            <PopoverTrigger>
              <Button size='lg'>
                <Wrap>
                  <WrapItem>
                    <Avatar size='sm' src={user.picture} />
                  </WrapItem>
                </Wrap>
                {user.name}
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
      <br></br>
      <NewsResults results={results} />
      <NewsRoutes />


    </div>

  );
}


