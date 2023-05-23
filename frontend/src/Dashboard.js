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
    Stack,
    Text,
    Card,
    CardBody,
    CardHeader,
    
} from '@chakra-ui/react';

import Nav from './Nav';
import useAuth from './UseAuth';

import { useContext, useCallback, useEffect, useState } from 'react';
import EmployeeShiftContext from './EmployeeShiftContext';

import useRole from './useRole';
import Cookies from 'js-cookie';
import ReviewRequestDialog from './ReviewRequestDialog';
  
const Dashboard = () => {

  
  useAuth();
  const authToken = Cookies.get("authToken")
  const role = useRole()
  const { shifts, adjustments, setAdjustments } = useContext(EmployeeShiftContext)

  //state variables and functions for Review Request Dialog
  const [ isOpen, setIsOpen ] = useState(false)
  const [ full, setFull ] = useState(false)
  const [ currentAdjustment, setCurrentAdjustment] = useState(null)

  const closeRequestDialog = () => {
    setIsOpen(false)
  }

  const approveRequest = () => {
    
    if(currentAdjustment.full){
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
          return response.json()
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

        })
        
    }


    setIsOpen(false)
  }

  const reviewRequest = (adjustment) => {
    setIsOpen(true)
    setCurrentAdjustment(adjustment)
    setFull(adjustment.type_of_coverage === 'full')
  }


  const fetchAdjustments = useCallback(() => {

    fetch('retrieve_adjustments', {
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
          shift_id : adjustment.shift_id,
          type_of_coverage : adjustment.type_of_coverage,
          start : adjustment.start,
          end : adjustment.end,
          approved : adjustment.approved,

        }))

        setAdjustments(data)
      })




  }, [authToken, setAdjustments])

  
  useEffect(() => {
    if (role){
      fetchAdjustments()
    }
  }, [fetchAdjustments, role])
  
    
  return (
      <>
        <Nav />
        <Box p={4}>
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
            <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>

                { !role && <Text>Welcome to the Employee Dashboard</Text>}
                { role && <Text>Welcome to the Supervisor Dashboard</Text>}
            </Heading>
        </Stack>

        <Container maxW={'5xl'} mt={12}>
            <Flex flexWrap="wrap" gridGap={6} justify="center">
              {!role &&
                <Card>
                  <CardHeader><Heading>Total Hours Worked</Heading></CardHeader>
                  <CardBody>This should return total hours worked for the week</CardBody>
                </Card>
              }
              {!role &&<Card>
                <CardHeader><Heading>Shifts available for coverage</Heading></CardHeader>
                <CardBody>List of approved shifts for coverage</CardBody>
              </Card>}
              
              <Card
                  heading={'Time Off Requests'}
                  icon={'FcManager'}
                  description={
                    'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
                  }
              />
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
              

            <Box >
              <Stack spacing={2}>
                <Box mt={2}>
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
              </Stack>
            </Box>
        </Container>
        </Box>
        </>
    );
  }
  
export default Dashboard;
  