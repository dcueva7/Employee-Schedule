import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Schedule from './Schedule';
import SignIn from './SignIn';
import SignUp from './SignUp';

import {
  BrowserRouter as Router,
  Route,
  Routes

} from "react-router-dom"


function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
            <Route path="/" exact element={<Schedule />} />
            <Route path="sign_in" element={<SignIn />} />
            <Route path="sign_up" element={<SignUp />} />
        </Routes>
      </Router>
    </ChakraProvider>
      
  );
}

export default App;
