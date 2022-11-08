import { useState, useEffect } from "react"
import {
    Center,
    Text,
    Button,
    Box, Badge, SimpleGrid, Image

} from '@chakra-ui/react'
import axios from 'axios'


const NewsResults = (props) => {
    const [articleResults, setArticleResults] = useState([])

    useEffect(() => {
        setArticleResults(props.results)
    }, [props.results])

    const [user, setUser] = useState()

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user")
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser)
            setUser(foundUser)
        }
    }, []);

    const onClickSave = (user_id, url, title, description, image, author, publishedAt) => {
        axios.post('/api/save_article', {
            user_id, url, title, description, image, author, publishedAt
        })
            .then(response => {
                alert(response.data);
            }
            )
    }

    return (
        <Center>
            <SimpleGrid columns={3} spacingX='3px' spacingY='5px'>
                {articleResults.map((article) =>
                    <Box maxW='md' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                        <Image src={article.urlToImage} alt="" />
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

                            {user ?
                                (
                                    <Button onClick={() => onClickSave(
                                        user.sub,
                                        article.url,
                                        article.title,
                                        article.description,
                                        article.image,
                                        article.author,
                                        article.publishedAt)}>
                                        Save article!
                                    </Button>
                                ) :
                                (
                                    <Text as='u'>
                                        Sign in to save articles.
                                    </Text>
                                )
                            }

                        </Box>

                    </Box>

                )
                }
            </SimpleGrid>
        </Center>
    )
}
export default NewsResults;
