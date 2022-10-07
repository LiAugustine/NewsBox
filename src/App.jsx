import NewsRoutes from "./components/NewsRoutes"
import { useState } from 'react'
import axios from 'axios'
import { useGoogleLogin } from '@react-oauth/google';
import { format } from 'date-fns';
import {
  Box, Heading, Flex,
  Input,
  Button,
  Spacer,
  Divider
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
      <br></br>
      <NewsResults results={results} />
      <NewsRoutes />


    </div>

  );
}


