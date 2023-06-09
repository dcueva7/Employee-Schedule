import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; 

import {
    Box,
    Button,
    Grid,
    Flex,
    Heading,
    Card,
    Text,
    useToast,
} from '@chakra-ui/react';

import { TimeIcon, CheckCircleIcon } from '@chakra-ui/icons';

import Nav from './Nav';
import useAuth from '../Hooks/UseAuth';

import { useContext, useEffect, useState } from 'react';
import EmployeeShiftContext from '../EmployeeShiftContext';
import ReviewRequestDialog from '../Overlay/ReviewRequestDialog';
import useWeeklyHours from '../Hooks/useWeeklyHours';
import useAddOpenShift from '../Hooks/useAddOpenShift';
import useUserId from '../Hooks/useUserId';
import ConfirmCoverage from '../Overlay/ConfirmCoverage';

  
const Dashboard = () => {

  const authToken = useAuth();
  const toast = useToast()
  const { shifts, adjustments, fetchShift, openShifts, fetchOpenShifts, employees, fetchAdjustments, role } = useContext(EmployeeShiftContext)

  //fetch shifts and openShifts on component mount
  useEffect(() => {
    fetchShift()
    fetchOpenShifts()
  }, [fetchShift, fetchOpenShifts])

  //fetch weekly hours for user
  const hours = useWeeklyHours()

  //state variables and funciton for open shifts
  const addOpenShift = useAddOpenShift()

  const userId = useUserId()

  const [ currentEmployee, setCurrentEmployee ] = useState('')

  //set employee id for current user
  useEffect(() => {
    setCurrentEmployee(employees.find((employee) => employee.user === userId))
  }, [employees, userId])

  //state variables and functions for Confirm Coverage Dialog
  const [ isConfirmCoverageDialogOpen, setIsConfirmCoverageDialogOpen ] = useState(false)
  const [ currentOpenShift, setCurrentOpenShift ] = useState('')
  const closeConfirmCoverageDialog = () => {
    setIsConfirmCoverageDialogOpen(false)
  }
  const triggerConfirmCoverage = (shift) => {
    setCurrentOpenShift(shift)
    setIsConfirmCoverageDialogOpen(true)
  }
  const confirmShiftCoverage = () => {
    fetch('/shift/add_shift/', {
      method : 'POST',
      headers : {
          'Content-type' : 'application/json',
          'Authorization': `Token ${authToken}`
      },
      body : JSON.stringify({
        student : currentEmployee.id, 
        start_time : currentOpenShift.start,
        end_time : currentOpenShift.end,
        date : currentOpenShift.date,
      })
    })
      .then(response => response.json())
      .then(json => {
          fetchShift();
          toast({
              title: 'Shift Coverage Accepted',
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
        })
          .then(
            fetch(`/delete_open_shift/${currentOpenShift.id}/`,{
            method : 'DELETE',
            headers : {
                'Authorization' : `Token ${authToken}`,
            },
            })
            .then(() => {
                fetchShift()
                fetchOpenShifts()
            })
            .catch(error => console.log(error))
          )
          .catch(error => console.log(error))

      closeConfirmCoverageDialog()

  }

  //state variables and functions for Review Request Dialog
  const [ isOpen, setIsOpen ] = useState(false)
  const [ full, setFull ] = useState(false)
  const [ currentAdjustment, setCurrentAdjustment] = useState(null)
  const closeRequestDialog = () => {
    setIsOpen(false)
  }
  const approveRequest = () => {
    if(full){
      fetch(`/shift/delete_shift/${currentAdjustment.shift_id}/`, {
        method: 'DELETE',
        headers : {
          'Authorization' : `Token ${authToken}`,
        }
      })
        .then(response => {
          if(!response.ok){
            throw response
          }

          return response
        })
        .then(() => {
          fetch(`update_adjustment/${currentAdjustment.adj_id}/`, {
            method : 'PATCH',
            headers : {
              'Content-type' : 'application/json',
              'Authorization': `Token ${authToken}`
            },
            body : JSON.stringify({
                approved : true
            })
          })
            .then(response => {
              if(!response.ok){
                throw response
              }
              else{
                return response.json()
              }

            })
            .then(json => {
              console.log(json)
              fetchShift()
              fetchAdjustments()
              addOpenShift(currentAdjustment.start, currentAdjustment.end, currentAdjustment.date)
              fetchOpenShifts()
              toast({
                title: 'Time-off request approved',
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            })
              .then(
                fetch('/send_notifs/', {
                  method: 'POST',
                  headers: {
                    'Content-type' : 'application/json',
                    'Authorization': `Token ${authToken}`,
                  },
                  body : JSON.stringify({'user' : currentAdjustment.user})
                }).then(response => response.json())
                  .then(json => console.log(json, 'email sent'))
              ).catch(error => console.error(error))
            

        }).catch(error => console.error(error))
        
    }
    else{

      fetch(`/shift/update_shift/${currentAdjustment.shift_id}/`, {
        method: 'PATCH',
        headers : {
          'Content-type' : 'application/json',
          'Authorization' : `Token ${authToken}`,
        },
        body : JSON.stringify({
          start_time : currentAdjustment.start,
          end_time : currentAdjustment.end
        })
      })
        .then(response => {
          if(!response.ok){
            throw response
          }
          else {
            return response.json()
          }
          
        })
        .then(json => {
          fetchShift()
        })
        .then(() => {
          fetch(`update_adjustment/${currentAdjustment.adj_id}/`, {
            method : 'PATCH',
            headers : {
              'Content-type' : 'application/json',
              'Authorization': `Token ${authToken}`
            },
            body : JSON.stringify({
                approved : true
            })
          })
            .then(response => {
              if(!response.ok){
                throw response
              }
              else{
                return response.json()
              }
            })
            .then(json => {
              fetchShift()
              fetchAdjustments()
              toast({
                title: 'Time-off request approved',
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            })
            .catch(error => console.error(error))
            

        }).catch(error => console.error(error))
    }  
    setIsOpen(false)
  }
  const reviewRequest = (adjustment) => {
    setIsOpen(true)
    setFull(adjustment.type_of_coverage === 'full')
    setCurrentAdjustment(adjustment)
  }

  useEffect(() => {
    fetchAdjustments()
  }, [fetchAdjustments])
     

  return (
      <Box>
        <Nav />
        
        <Flex alignItems="center" justifyContent="space-between"  p={4} color="white" bg='red.700' mb={4}>
            <Heading>
              { !role ? 'Welcome to the Employee Dashboard' : 'Welcome to the Supervisor Dashboard'}
            </Heading>
            {! role && <Text size='md'>Hours scheduled for the week: {hours}</Text>}
        </Flex>

        <Grid templateColumns={{base: "1fr", md: "1fr 1fr"}} gap={6}>
          {!role &&
            <Box bg="white" boxShadow="sm" p={4}>
              <Heading size='sm'>My time off requests:</Heading>
              {adjustments.length && adjustments.map((adjustment) => {
                return(
                  <Text key={adjustment.adj_id} mt={4} mb={4}>{adjustment.type_of_coverage} coverage request on {adjustment.date} Status: {adjustment.approved && <CheckCircleIcon color={'green'}/>} {!adjustment.approved && <TimeIcon color='red'/>} </Text>
                )
            })}
          </Box>
        }
        {!role &&  
          <Box bg="white" boxShadow="sm" p={4}> 
            <Heading size='sm'>Shifts Available for coverage</Heading>
            {openShifts.length && openShifts.map((item) => {
              return (
                <Card key={item.id} padding={6} mt={4} mb={4}>{item.date} from {item.start} to {item.end} <Button onClick={() => triggerConfirmCoverage(item)}>Cover Shift</Button></Card>
            )})}
            
          </Box>
        }
          
        {role &&
          <Box bg="white" boxShadow="sm" p={4}>
            <Heading size='md'>Time off Requests</Heading>      
              {adjustments.filter(adjustment => !adjustment.approved).map((adjustment) => {
                return(
                  <Card key={adjustment.adj_id} padding={6} mt={4} mb={4}>{adjustment.employee} is requesting a {adjustment.type_of_coverage} shift adjustment on {adjustment.date} <Button onClick={() => reviewRequest(adjustment)}>Review</Button></Card>
                )
              })}
          </Box> 
        }
           
        </Grid>

          <ReviewRequestDialog 
            isOpen={isOpen}
            closeRequestDialog={closeRequestDialog}
            full={full}
            date={currentAdjustment?.date}
            start={currentAdjustment?.start}
            end={currentAdjustment?.end}
            approveRequest={approveRequest}
          />

          <ConfirmCoverage 
            isConfirmCoverageDialogOpen={isConfirmCoverageDialogOpen}
            closeConfirmCoverageDialog={closeConfirmCoverageDialog}
            confirmShiftCoverage={confirmShiftCoverage}
          />
              

          <Box mt={4} bg="white" boxShadow="sm" p={4}>
            <Heading size="md">Schedule for today</Heading>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridDay"
              weekends={false}
              events={shifts}
              slotMinTime="07:00:00"
              slotMaxTime="22:00:00"
              eventColor="#378006"
              selectable={false}
              slotEventOverlap={false}
              allDaySlot={false}      
            />  
        </Box>
      </Box>
    );
  }
  
export default Dashboard;
  