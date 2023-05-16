import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; 

import { Container, Box, Button, Modal, ModalContent, ModalHeader, ModalFooter, Select, ModalBody, Input, FormControl, FormLabel } from '@chakra-ui/react';

import { useEffect, useState } from 'react'
import Nav from './Nav';




const Schedule = () => {

    const [ isOpen, setIsOpen ] = useState(false)

    const [ employees, setEmployees ] = useState([])
    

    // state variables to hold values of 
    const [ student, setStudent ] = useState('') 
    const [date, setDate ] = useState('')
    const [ startTime, setStartTime ] = useState('')
    const [ endTime, setEndTime ] = useState('')


    
    

    useEffect(() => {
        fetch('/employee/get_all_employees/')
            .then(response => response.json())
            .then(json => {
                const data = json.map(item => ({
                    name : `${item.first_name} ${item.last_name}`,
                    id : item.id
                }));
                setEmployees(data)
            }).catch(error => {
                console.error('Error:', error);
            })
    }, [])
    

    const shifts = [
        
    ];

    const onClose = () => {
        setIsOpen(false)
    }

      

    return (
        <>
            <Nav/>

            <Box height="1rem" />

            <Container maxH='20vh' maxW='container.xl' >

                <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                    <ModalContent>
                        <ModalHeader>Enter Shift Details</ModalHeader>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Student</FormLabel>
                                    <Select placeholder='Select student' onChange={(e) => setStudent(e.target.value)}>
                                        {employees.map((item) => {
                                            return (
                                                <option key={item.id} value={item.name}>{item.name}</option>
                                            )
                                        })}
                                    </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Date</FormLabel>
                                    <Input type='date' onChange={(e) => setDate(e.target.value)} value={date}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Start Time</FormLabel>
                                    <Input type='time' value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>End Time</FormLabel>
                                    <Input type='time' value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                            </FormControl>
                        
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => setIsOpen(false)} color='red'>Cancel</Button>
                            <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <Button onClick={() => setIsOpen(true)}>Add Shift</Button>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    weekends={false}
                    events={shifts}
                    slotMinTime="07:00:00"
                    slotMaxTime="22:00:00"
                    eventColor="#378006"
                    selectable={true}
                    slotEventOverlap={false}
                    allDaySlot={false}
                    eventClick={() => alert('lol you clicked this fool')}      
                />
            </Container>
        </>
       
    );
}

export default Schedule