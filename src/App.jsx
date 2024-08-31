
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import Chat from './assets/components/Chat'
import 'bootstrap/dist/css/bootstrap.min.css';
import EmailWriter from './assets/components/EmailWriter'
import Footer from './assets/components/footer'
import 'regenerator-runtime/runtime';
function App() {
 
  return (
    <>
    <ChakraProvider>
     {/* <Chat/> */}
     <EmailWriter/>
     <Footer/>
    </ChakraProvider>
     
    </>
  )
}

export default App
