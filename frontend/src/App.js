import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Schedule from './Schedule';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import EmployeeShiftContext from './EmployeeShiftContext';
import { useState } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes

} from "react-router-dom"


function App() {

  //state variables to be shared between Dashboard and Schedule components.  Will be set initially in Schedule component
  const [ shifts, setShifts ] = useState([]);
  const [ employees, setEmployees ] = useState([])
  const [ adjustments, setAdjustments ] = useState([])

  return (
    <ChakraProvider>
      <EmployeeShiftContext.Provider value={{shifts, setShifts, employees, setEmployees, adjustments, setAdjustments}} >
        <Router>
          <Routes>
              <Route path="/" exact element={<Schedule />} />
              <Route path="sign_in" element={<SignIn />} />
              <Route path="sign_up" element={<SignUp />} />
              <Route path="dashboard" element={<Dashboard/>} />
          </Routes>
        </Router>
      </EmployeeShiftContext.Provider>
    </ChakraProvider>
      
  );
}

export default App;
