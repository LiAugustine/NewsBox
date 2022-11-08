import { useState, useEffect } from "react"
import {
    Center,
    Button,
    Box, Badge, SimpleGrid, Image,

} from '@chakra-ui/react'
import axios from 'axios'

const SavedArticles = (props) => {
    const [user, setUser] = useState()

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser)
            setUser(foundUser)
        }
    }, []);

    const [articleResults, setArticleResults] = useState([])

    useEffect(() => {
        setArticleResults(props.results)
    }, [props.results])


    const onClickDelete = (user_id, url) => {
        axios.post('/api/delete_article', {
            user_id, url
        })
            .then((response) => {
                setArticleResults(response.data)
            })
            .then(() => {
                alert("You deleted the article!");
            }
            )
    }

    return (
        <Center>
            <SimpleGrid columns={1} spacingX='3px' spacingY='5px'>
                {articleResults.map((article) =>
                    <Box maxW='md' borderWidth='1px' borderRadius='lg' overflow='hidden'>

                        <Image src={article.image} alt="" />
                        <Box p='6'>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
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
                            </a>

                            <Center>
                                <Button colorScheme='red'
                                    onClick={() => onClickDelete(
                                        user.sub,
                                        article.url)}>
                                    Delete!
                                </Button>
                            </Center>

                        </Box>
                    </Box>

                )
                }
            </SimpleGrid>
        </Center>
    )
}
export default SavedArticles;
