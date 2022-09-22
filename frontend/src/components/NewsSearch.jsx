import { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Heading,
    Button,
    Input, FormControl, FormLabel,
    FormHelperText,
    Box, Badge, SimpleGrid, Link, Image
} from '@chakra-ui/react'


export default function NewsSearch() {
    const [query, setQuery] = useState({
        q: "",
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
            <FormControl>
                <FormLabel>Search Query</FormLabel>
                <Input type='query' name='q' onChange={changeHandler} />
                <FormHelperText>Search for anything!</FormHelperText>
            </FormControl>


            {/* <FormControl>
                <FormLabel>Language</FormLabel>
                <Input type='language' name='language' onChange={changeHandler} />
                <FormHelperText>Search articles from specific langauge. Example: en </FormHelperText>
            </FormControl> */}

            <br></br>

            <Button colorScheme='green' onClick={onClickSearch}>
                Search!
            </Button>

            <br></br>

            <Heading as="h5">
                Search Results:
            </Heading>

            <SimpleGrid columns={3} spacingX='3px' spacingY='5px'>
                {results.map((article) =>
                    <Box maxW='md' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                        <Link href={article.url} isExternal>
                            <Image src={article.urlToImage} alt="" />
                            <Box p='6'>
                                <Box display='flex' alignItems='baseline'>
                                    <Badge borderRadius='full' px='2' colorScheme='teal'>
                                        {article.author}
                                    </Badge>
                                    <Box
                                        color='gray.500'
                                        fontWeight='semibold'
                                        letterSpacing='wide'
                                        fontSize='xs'
                                        textTransform='uppercase'
                                        ml='2'
                                    >
                                        {article.publishedAt}
                                    </Box>
                                </Box>

                                <Box
                                    mt='1'
                                    fontWeight='semibold'
                                    as='h4'
                                    lineHeight='tight'
                                    noOfLines={2}
                                >
                                    {article.title}
                                </Box>

                                <Box>
                                    <Box as='span' color='gray.500' fontSize='sm' fontWeight='semibold'>
                                        {article.description}
                                    </Box>
                                </Box>
                            </Box>
                        </Link>
                    </Box>

                )
                }
            </SimpleGrid>

        </div>

    )



}