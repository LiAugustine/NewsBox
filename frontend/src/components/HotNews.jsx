import { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Badge, SimpleGrid, Link, Center, Image } from '@chakra-ui/react'

export default function HotNews() {

    const [news, setNews] = useState([])

    useEffect(() => {
        axios.get("/api/get_hot_articles")
            .then((response) => {
                setNews(response.data)
            });
    }, []);

    console.log(news)

    return (
        <div>
            <SimpleGrid columns={3} spacingX='3px' spacingY='5px'>
                {news.map((article) =>
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