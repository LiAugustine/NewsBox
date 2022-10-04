import { useState, useEffect } from "react"
import {
    Box, Badge, SimpleGrid, Image

} from '@chakra-ui/react'

const NewsResults = (props) => {
    const [articleResults, setArticleResults] = useState([])
    useEffect(() => {
        setArticleResults(props.results)
        console.log(props.results)
    }, [props.results])


    return (
        <SimpleGrid columns={3} spacingX='3px' spacingY='5px'>
            {articleResults.map((article) =>
                <Box maxW='md' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
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
                    </a>
                </Box>

            )
            }
        </SimpleGrid>
    )
}
export default NewsResults;
