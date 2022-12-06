import { useState, useEffect } from "react"
import {
    Text,
    Center,
    Button,
    Box, Badge, SimpleGrid, Image,
    Card, CardBody, CardFooter, Stack,
    Flex, Divider, Heading, Spacer

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
            <SimpleGrid columns={1} spacingY='10px'>
                {articleResults.map((article) =>
                    <Card maxW='md'>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            <CardBody>

                                <Image
                                    src={article.image}
                                    alt=""
                                    objectFit='cover'
                                    height={230}
                                    width="md"
                                />

                                <Stack mt='2' spacing='2'>

                                    <Box
                                        noOfLines={2}>
                                        <Heading size='md'>{article.title}</Heading>
                                    </Box>

                                    <Flex w="100%">
                                        <Text fontSize="sm" as="u">{article.author}</Text>
                                        <Spacer />
                                        <Badge colorScheme='blue' fontSize='sm' borderRadius="full">{article.publishedAt}</Badge>
                                    </Flex>


                                    <Box
                                        noOfLines={2}>
                                        {article.description}
                                    </Box>
                                </Stack>
                            </CardBody>
                            <Divider />
                        </a>
                        <CardFooter>
                            <Center>
                                <Button colorScheme='red'
                                    onClick={() => onClickDelete(
                                        user.sub,
                                        article.url)}>
                                    Delete!
                                </Button>
                            </Center>
                        </CardFooter>
                    </Card>
                )
                }
            </SimpleGrid>
        </Center>
    )
}
export default SavedArticles;
