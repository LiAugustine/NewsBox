import {
    Center,
    Button,
    Text,
} from '@chakra-ui/react'
import axios from 'axios'
import { useGoogleLogin } from '@react-oauth/google';


export default function LoginRequired() {
    const login = useGoogleLogin({
        onSuccess: async response => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${response.access_token}`
                    }
                })
                // setUser(res.data)
                localStorage.setItem('user', JSON.stringify(res.data))
                window.location.reload();
            } catch (err) {
                console.log(err)

            }

        }
    });

    return (
        <div>
            <Center>
                <Text fontSize='3xl'>You must login to access this content.
                </Text>
            </Center>
            <Center>
                <Button
                    onClick={login}
                    colorScheme='green'
                    height='45px'
                >
                    Sign-in with Google
                </Button>
            </Center>
        </div>
    )
}