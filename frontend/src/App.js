import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Schedule from './Schedule';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import EmployeeShiftContext from './EmployeeShiftContext';
import { useState, useCallback } from 'react';

import useAuth from './UseAuth'

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

  const authToken = useAuth()

  const fetchShift = useCallback(() => {
    fetch('/shift/list_shifts/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${authToken}`,
        },
    })
        .then(response => response.json())
        .then(json => {
            console.log(json,'fetched all shifts')
            const data = json.map(item => ({
                id: item.id,
                title : `${item.student.first_name} ${item.student.last_name}`,
                start : `${item.date}T${item.start_time}`,
                end : `${item.date}T${item.end_time}`,
                color : item.student.color,
                extendedProps : {
                    student_id : item.student.user,
                    employee_id : item.student.id,
                },
            }));
            setShifts(data)
            
        }).catch(error => {
            console.error('Error:', error);
        })
  }, [authToken])

  return (
    <ChakraProvider>
      <EmployeeShiftContext.Provider value={{
        shifts, 
        setShifts, 
        employees, 
        setEmployees, 
        adjustments, 
        setAdjustments,
        fetchShift
      }} >
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
