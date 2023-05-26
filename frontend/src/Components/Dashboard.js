import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; 

import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Card,
    CardBody,
    CardHeader,
} from '@chakra-ui/react';

import { TimeIcon, CheckCircleIcon } from '@chakra-ui/icons';

import Nav from './Nav';
import useAuth from '../Hooks/UseAuth';

import { useContext, useCallback, useEffect, useState } from 'react';
import EmployeeShiftContext from '../EmployeeShiftContext';

import useRole from '../Hooks/useRole';
import ReviewRequestDialog from '../Overlay/ReviewRequestDialog';
import useWeeklyHours from '../Hooks/useWeeklyHours';
  
const Dashboard = () => {

  const authToken = useAuth();
  const role = useRole()
  const { shifts, adjustments, setAdjustments, fetchShift } = useContext(EmployeeShiftContext)

  //fetch shifts on component mount
  useEffect(() => {
    fetchShift()
  }, [fetchShift])

  //fetch weekly hours for user
  const hours = useWeeklyHours()

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
            })

            .catch(error => console.error(error))
            

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
          console.log(json)
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
              console.log(json)
              
              fetchAdjustments()
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

  const fetchAdjustments = useCallback(() => {
    fetch('retrieve_adjustments/', {
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

        }))

        setAdjustments(data)
      })
  }, [authToken, setAdjustments])

  useEffect(() => {
    fetchAdjustments()
  }, [fetchAdjustments])
     
  return (
      <>
        <Nav />
        <Box padding={4}>
          <Container centerContent>
            <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'} mb={4} textAlign='center'>
              { !role ? 'Welcome to the Employee Dashboard' : 'Welcome to the Supervisor Dashboard'}
            </Heading>
          </Container>

          <Container maxW='container.xl' mt={12} mb={12}>
            <Flex wrap='wrap' justify='center' spacing={6}>
                {!role &&
                  <Card padding={4}>
                    <CardHeader><Heading size='sm'>Hours Scheduled This Week:</Heading></CardHeader>
                    <CardBody>{hours}</CardBody>
                  </Card>
                }

                {!role &&<Card padding={4}>
                  <CardHeader><Heading size='sm'>Shifts available for coverage</Heading></CardHeader>
                  <CardBody>
                    {adjustments.filter(adjustment => !adjustment.approved).map((adjustment) => {
                      return(
                        <Card key={adjustment.shift_id} padding={4}>{adjustment.employee} is requesting a {adjustment.type_of_coverage} shift adjustment on {adjustment.date} <Button onClick={() => reviewRequest(adjustment)}>Review</Button></Card>
                      )
                    })}
                  </CardBody>
                </Card>}

                {!role &&<Card padding={4}>
                  <CardHeader><Heading size='sm'>My time off requests:</Heading></CardHeader>
                  <CardBody>
                    {adjustments.map((adjustment) => {
                      return(
                        <Card key={adjustment.shift_id} padding={4}>{adjustment.type_of_coverage} coverage request on {adjustment.date} Status: {adjustment.approved && <CheckCircleIcon/>} {!adjustment.approved && <TimeIcon/>} </Card>
                      )
                    })}
                  </CardBody>
                </Card>}
                
                {role &&
                  <Card padding={4}>
                      <CardHeader mb={4}><Heading size='lg'>Time off requests</Heading></CardHeader>
                      <CardBody>
                        {adjustments.filter(adjustment => !adjustment.approved).map((adjustment) => {
                          return(
                            <Card key={adjustment.shift_id} padding={4}>{adjustment.employee} is requesting a {adjustment.type_of_coverage} shift adjustment on {adjustment.date} <Button onClick={() => reviewRequest(adjustment)}>Review</Button></Card>
                          )
                        })}
                      </CardBody>
                      
                  </Card>
                }
                  
            </Flex>

              <ReviewRequestDialog 
                isOpen={isOpen}
                closeRequestDialog={closeRequestDialog}
                full={full}
                date={currentAdjustment?.date}
                start={currentAdjustment?.start}
                end={currentAdjustment?.end}
                approveRequest={approveRequest}
            />
                

            <Box mt={4}>
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
          </Container>
        </Box>
        </>
    );
  }
  
export default Dashboard;
  