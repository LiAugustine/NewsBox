import { useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import { format } from 'date-fns';
import {
    Center,
    Heading,
    Button,
    Input, FormControl, FormLabel,
    FormHelperText,
    Tab, Tabs, TabList,
    Box

} from '@chakra-ui/react'
import NewsResults from "./NewsResults"



export default function NewsSearch() {
    const today = format(new Date(), 'yyyy-MM-dd')
    const [query, setQuery] = useState({
        q: "",
        sources: "",
        domains: "",
        to: today,
    })


    const changeHandler = (e) => {
        setQuery({ ...query, [e.target.name]: e.target.value })
    };


    const [results, setResults] = useState([])

    const onClickSearch = () => {
        axios.post('/api/get_search_results', {
            query
        })
            .then((response) => {
                setResults(response.data)
            })
    }

    return (
        <div>
            <Center>
                <Tabs variant='soft-rounded' colorScheme='green' defaultIndex={1}>
                    <TabList>

                        <Tab as={Link} to="/">Hot News</Tab>

                        {/* <Tab as={Link} to="/YourNews">Your News</Tab> */}

                        <Tab as={Link} to="/NewsSearch">Advanced News Search</Tab>

                    </TabList>
                </Tabs>
            </Center>
            <br></br>
            <Center>
                <Box>
                    <Heading as="h3" size="lg">
                        Advanced News Search
                    </Heading>
                    <br></br>
                </Box>
            </Center>
            <Center>


                <Box>

                    <FormControl isRequired>
                        <Center><FormLabel>Search Query</FormLabel></Center>
                        <Center> <Input type='query' name='q' htmlSize={60} width='auto' onChange={changeHandler} /></Center>
                        <Center><FormHelperText>Search for anything!</FormHelperText></Center>
                    </FormControl>
                    <br></br>

                    <FormControl>
                        <Center><FormLabel>Sources (Countries)</FormLabel></Center>
                        <Center><Input type='sources' name='sources' htmlSize={60} width='auto' onChange={changeHandler} /></Center>
                        <Center><FormHelperText>Search articles from specific countries, up to 20 countries allowed.
                            Separate by comma. See more info here: https://newsapi.org/sources
                        </FormHelperText></Center>
                    </FormControl>
                    <br></br>

                    <FormControl>
                        <Center><FormLabel>Domains</FormLabel></Center>
                        <Center><Input type='domains' name='domains' htmlSize={60} width='auto' onChange={changeHandler} /></Center>
                        <Center><FormHelperText>Search articles from specific websites, separate by comma for multiple domains.
                            Example: bbc.co.uk
                        </FormHelperText></Center>
                    </FormControl>
                    <br></br>

                    <FormControl isRequired>
                        <Center><FormLabel>To Date</FormLabel></Center>
                        <Center><Input type='to' name='to' defaultValue={query.to} htmlSize={60} width='auto' onChange={changeHandler} /></Center>
                        <Center><FormHelperText>Search articles up to a specific date (format: YYYY-MM-DD).
                            Note: API can only retrieve articles up to a month from the current date.
                            Example: 2020-01-01

                        </FormHelperText></Center>
                    </FormControl>
                    <br></br>

                </Box>
            </Center>

            <Center>
                <Button colorScheme='green'

                    height='50px'
                    width='200px'
                    onClick={onClickSearch}>
                    Search!
                </Button>
            </Center>



            <br></br>



            <br></br>

            <Center>
                <Heading as="h4" size='lg'>
                    Search Results:
                </Heading>
            </Center>

            <NewsResults results={results} />

        </div >

    )



}