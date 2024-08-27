import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import Chat from './assets/components/Chat'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
 
  return (
    <>
    <ChakraProvider>
     <Chat/>
    </ChakraProvider>
     
    </>
  )
}

export default App
