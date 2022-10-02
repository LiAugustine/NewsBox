import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import.meta.env.VITE_GOOGLE_CLIENT_ID
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </ChakraProvider>
)
