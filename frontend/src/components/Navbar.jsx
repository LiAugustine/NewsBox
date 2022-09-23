import React from 'react'
import {
    Box, Heading, Flex,
    Button,
    Spacer,
    Divider
} from '@chakra-ui/react'

export default function Navbar() {


    return (
        <div>
            <Flex minWidth='max-content' alignItems='center' gap='2'>
                <Box>
                    <Heading size='lg' as='span'>NewsBox</Heading>
                </Box>
                <Spacer />
                <Button colorScheme='blue'

                    height='45px'
                    width='100px'>
                    Sign-in
                </Button>
            </Flex>
            <Divider orientation="horizontal" />

        </div>
    );
}


