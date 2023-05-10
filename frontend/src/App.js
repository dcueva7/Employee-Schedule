import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Home from './Home';
import Nav from './Nav'

function App() {
  return (
    <ChakraProvider>
      <Nav />
      <Home />
    </ChakraProvider>
      
  );
}

export default App;
