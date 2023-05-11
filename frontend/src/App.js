import './App.css';
import { ChakraProvider, Box } from '@chakra-ui/react'
import Schedule from './Schedule';
import Nav from './Nav'


function App() {
  return (
    <ChakraProvider>
      <Nav />
      <Box height="1rem" />
      <Schedule />
    </ChakraProvider>
      
  );
}

export default App;
