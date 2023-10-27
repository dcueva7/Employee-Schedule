import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Schedule from './Components/Schedule';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Dashboard from './Components/Dashboard';
import EmployeeShiftContext from './EmployeeShiftContext';
import Exam from './Components/Exam';
import Info from './Components/Info';
import { useState, useCallback, useEffect } from 'react';
import useRole from './Hooks/useRole';
import useGetOpenShift from './Hooks/useGetOpenShift';
import PasswordReset from './Components/PasswordReset';
import {
  BrowserRouter as Router,
  Route,
  Routes

} from "react-router-dom"
import { BASE_URL } from './apiConfig';
import Cookies from 'js-cookie';

function App() {

  const initialToken = Cookies.get("authToken")
  const [ authToken, setAuthToken ] = useState(initialToken)

  //state variables to be shared between Dashboard and Schedule components.
  const [ shifts, setShifts ] = useState([]);
  const [ employees, setEmployees ] = useState([])
  const [ adjustments, setAdjustments ] = useState([])
  const [ openShifts, setOpenShifts ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ employeeName, setEmployeeName ] = useState('')
  

  const fetchOpenShifts = useGetOpenShift(setOpenShifts)

  const role = useRole()

  //fetch all shifts
  const fetchShift = useCallback((departmentId) => {
    if (!authToken){
      return
    }

    setIsLoading(true)

    let url = `${BASE_URL}/shift/list_shifts/`

    if (departmentId){
      url += `?department=${departmentId}`
    }
    
    fetch(url, {
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
            setIsLoading(false)
            
        }).catch(error => {
            console.error('Error:', error);
            setIsLoading(false)
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

  const fetchEmployeeName = useCallback(() => {
      if(!authToken){
        return
      }

      fetch(`${BASE_URL}/employee/get_current_employee/`,{
          method : 'GET',
          headers: {
              'Authorization': `Token ${authToken}`,
          }
      })
          .then(response => {
              if(!response.ok){
                  throw new Error('Error fetching name')
              }
              else{
                  return response.json()
              }
          })
          .then(json => {
              setEmployeeName(json.name)
          }).catch(error => console.log(error))
  },[authToken])

  const fetchEmpoyees = useCallback(() => {
    if(!authToken){
        return
    }
    
    fetch(`${BASE_URL}/employee/get_all_employees/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${authToken}`,
        },
    })
        .then(response => response.json())
        .then(json => {
            
            const data = json.map(item => ({
                name : `${item.first_name} ${item.last_name}`,
                email: item.email,
                id : item.id,
                user : item.user,
                phone: item.phone,
                department : item.department
            }));
            setEmployees(data)
            
        }).catch(error => {
            console.error('Error:', error);
        })
    },[setEmployees, authToken] )
  

  useEffect(() => {
      fetchEmpoyees()
      fetchAdjustments()
      fetchEmployeeName()
  },[fetchAdjustments, fetchEmployeeName, fetchEmpoyees, authToken])


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
        role,
        isLoading,
        employeeName,
        setEmployeeName,
        authToken,
        setAuthToken
      }} >
        <Router>
          <Routes>
              <Route path="/" exact element={<Schedule department="1" />} />
              <Route path="sign_in" element={<SignIn />} />
              <Route path="sign_up" element={<SignUp />} />
              <Route path="dashboard" element={<Dashboard/>} />
              <Route path="password_reset/:uid/:token" element={<PasswordReset/>}/>
              <Route path="exams" element={<Exam department="2"/>}/>
              <Route path="info" element={<Info />}/>
          </Routes>
        </Router>
      </EmployeeShiftContext.Provider>
    </ChakraProvider>
      
  );
}

export default App;
