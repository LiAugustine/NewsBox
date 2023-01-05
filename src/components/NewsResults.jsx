import { useState, useEffect, useRef } from "react"
import {
    Center,
    Heading, Text,
    Divider,
    Button, IconButton,
    Box, Badge, SimpleGrid, Image,
    Stack,
    Flex,
    Card, CardHeader, CardBody, CardFooter,
    Spacer,


} from '@chakra-ui/react'
import { SlSocialTwitter, SlSocialReddit } from "react-icons/sl";
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
        <>
            <Center>
                <Heading as="h4" size="md">
                    {articleResults.length} Results
                </Heading>
            </Center>
            <br></br>
            <Center>
                <SimpleGrid columns={3} spacingX='10px' spacingY='10px'>
                    {articleResults.map((article) =>
                        <Card maxW='md'>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                <CardBody>

                                    <Image
                                        src={article.urlToImage}
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
                                <Flex w="100%">
                                    {user ?
                                        (<Button variant='solid' colorScheme='green'
                                            onClick={() => onClickSave(
                                                user.sub,
                                                article.url,
                                                article.title,
                                                article.description,
                                                article.urlToImage,
                                                article.author,
                                                article.publishedAt)}
                                        >
                                            Save Article
                                        </Button>
                                        ) :
                                        (
                                            <Text as='u'>
                                                Sign-in to save articles.
                                            </Text>
                                        )
                                    }
                                    <Spacer />
                                    <Stack direction="row" spacing={2}>

                                        <a href={"https://twitter.com/search?q=" + article.title.split(' ').slice(0, 3).join(' ')} target="_blank" rel="noopener noreferrer">
                                            <IconButton
                                                colorScheme='twitter'
                                                variant='outline'
                                                icon={<SlSocialTwitter />}
                                            />
                                        </a>
                                        <a href={"https://www.reddit.com/search/?q=" + article.title.split(' ').slice(0, 3).join(' ')} target="_blank" rel="noopener noreferrer">
                                            <IconButton
                                                colorScheme='red'
                                                variant='outline'
                                                icon={<SlSocialReddit />}
                                            />
                                        </a>

                                    </Stack>
                                </Flex>
                            </CardFooter>

                        </Card>

                    )
                    }
                </SimpleGrid>
            </Center >
        </>
    )
}
export default NewsResults;
