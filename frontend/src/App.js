import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Schedule from './Components/Schedule';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Dashboard from './Components/Dashboard';
import EmployeeShiftContext from './EmployeeShiftContext';
import { useState, useCallback } from 'react';
import useRole from './Hooks/useRole';
import useGetOpenShift from './Hooks/useGetOpenShift';
import Cookies from 'js-cookie'
import PasswordReset from './Components/PasswordReset';
import {
  BrowserRouter as Router,
  Route,
  Routes

} from "react-router-dom"
import { BASE_URL } from './apiConfig';

function App() {

  const authToken = Cookies.get('authToken')

  //state variables to be shared between Dashboard and Schedule components.
  const [ shifts, setShifts ] = useState([]);
  const [ employees, setEmployees ] = useState([])
  const [ adjustments, setAdjustments ] = useState([])
  const [ openShifts, setOpenShifts ] = useState([])
  

  const fetchOpenShifts = useGetOpenShift(setOpenShifts)

  const role = useRole()

  //fetch all shifts
  const fetchShift = useCallback(() => {
    if (!authToken){
      return
    }

    fetch(`${BASE_URL}/shift/list_shifts/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${authToken}`,
        },
    })
        .then(response => response.json())
        .then(json => {
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

  const fetchAdjustments = useCallback(() => {

    if (!authToken){
      return
    }

    fetch(`${BASE_URL}/retrieve_adjustments/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => response.json())
      .then(json => {
        const data = json.map(adjustment => ({
          adj_id : adjustment.id,
          employee : adjustment.employee,
          date : adjustment.date,
          shift_id : adjustment.shift,
          type_of_coverage : adjustment.type_of_coverage,
          start : adjustment.start,
          end : adjustment.end,
          approved : adjustment.approved,
          user : adjustment.user,
        }))

        setAdjustments(data)
      })
  }, [authToken, setAdjustments])

  return (
    <ChakraProvider>
      <EmployeeShiftContext.Provider value={{
        shifts, 
        setShifts, 
        employees, 
        setEmployees, 
        adjustments, 
        setAdjustments,
        fetchShift,
        openShifts,
        fetchOpenShifts,
        setOpenShifts,
        fetchAdjustments,
        role
      }} >
        <Router>
          <Routes>
              <Route path="/" exact element={<Schedule />} />
              <Route path="sign_in" element={<SignIn />} />
              <Route path="sign_up" element={<SignUp />} />
              <Route path="dashboard" element={<Dashboard/>} />
              <Route path="password_reset/:uid/:token" element={<PasswordReset/>}/>
          </Routes>
        </Router>
      </EmployeeShiftContext.Provider>
    </ChakraProvider>
      
  );
}

export default App;
