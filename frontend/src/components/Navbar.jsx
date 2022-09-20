import React from 'react'
import {
    Box, Heading, Flex,
} from '@chakra-ui/react'

export default function Navbar() {


    return (
        <div>
            <Flex minWidth='max-content' alignItems='center' gap='2'>
                <Box>
                    <Heading size='md' as='span'>NewsBox</Heading>
                </Box>
            </Flex>
        </div>
    );
}


