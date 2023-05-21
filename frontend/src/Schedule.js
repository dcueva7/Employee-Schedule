import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; 
import { 
    Container, 
    Box, 
    Button, 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    Select, 
    ModalBody, 
    Input, 
    FormControl, 
    FormLabel,
    Text,
    } from '@chakra-ui/react';

import { 
    useEffect, 
    useState, 
    useContext, 
    useCallback 
} from 'react'

import Nav from './Nav';
import Cookies from 'js-cookie'

import useAuth from './UseAuth';
import EmployeeShiftContext from './EmployeeShiftContext';

import useRole from './useRole';
import useUserId from './useUserId';
import Dialog from './Dialog';





const Schedule = () => {

    useAuth();
    const role = useRole();
    const loggedInUser = useUserId();
    

    const {shifts, setShifts, employees, setEmployees } = useContext(EmployeeShiftContext)

    //isOpen state variable for the "addShift" Modal
    const [ isOpen, setIsOpen ] = useState(false)

    //state variables for the "editEvent" modal
    const [ eventModalOpen, setEventModalOpen ] = useState(false)
    const [ placeholder, setPlaceholder ] = useState('') //state to hold placeholder when updating shifts

    //state variable for employeeModal
    const [ employeeModalOpen, setEmployeeModalOpen ] = useState(false)

    //state variables and functions for alert dialog
    const [ alertDialogOpen, setAlertDialogOpen ] = useState(false)
    const [ full, setFull ] = useState(false) //variable that tells Dialog whether full or partial was clicked
    const [ shiftId, setShiftId ] = useState('') //variable to hold shift_id when employee requests a shift off

    const setAlertStartTime = (time) => {
        setStartTime(time)
    }

    const setAlertEndTime = (time) => {
        setEndTime(time)
    }

    const alertClose = () => {
        setAlertDialogOpen(false)
    }

    const alertConfirm = () => {
        const shift_id = shiftId
        const type_of_coverage = full ? 'full' : 'partial'

        if (full){
            fetch(`/request_adjustment/`, {
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json',
                    'Authorization': `Token ${authToken}`
                },
                body : JSON.stringify({
                    employee : student,
                    shift_id : shift_id,
                    type_of_coverage : type_of_coverage,
                    start : null,
                    end : null,
                    date: date,

                    
                })
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                })
                .catch(error => console.log(error))
            

        }

        else if (!full){
            fetch(`/request_adjustment/`, {
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json',
                    'Authorization': `Token ${authToken}`
                },
                body : JSON.stringify({
                    employee : student,
                    shift_id : shift_id,
                    type_of_coverage : type_of_coverage,
                    start : startTime,
                    end : endTime,
                    date: date,
                    
                })
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                })
                .catch(error => console.log(error))
            
        }


        resetInputs()
        setEmployeeModalOpen(false)
        setAlertDialogOpen(false)
    }
    
    // state variables to hold values of addShift form
    const [ student, setStudent ] = useState('') 
    const [date, setDate ] = useState('')
    const [ startTime, setStartTime ] = useState('')
    const [ endTime, setEndTime ] = useState('')

    // state variable to hold selected event after event click
    const [ selectedEvent, setSelectedEvent ] = useState([])


    const authToken = Cookies.get("authToken")

    
    //retrive all employees
    useEffect(() => {
        fetch('/employee/get_all_employees/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${authToken}`,
            },
        })
            .then(response => response.json())
            .then(json => {
                console.log(json, 'fetched all employees')
                const data = json.map(item => ({
                    name : `${item.first_name} ${item.last_name}`,
                    id : item.id
                }));
                setEmployees(data)
                
            }).catch(error => {
                console.error('Error:', error);
            })
    },[setEmployees, authToken] )


    //retrieve all shifts
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
    }, [setShifts, authToken])


    useEffect(() => {
        fetchShift();
    }, [fetchShift])

    

    const resetInputs = () => {
        setStudent('')
        setDate('')
        setEndTime('')
        setStartTime('')
    }

    const data = {

        "start_time": startTime,
        "end_time": endTime,
        "date": date,
        "student": student
    }

    //add shift onClose
    const addShift = () => {
        if (!student || !date || !startTime || !endTime) {
            alert('All fields must be filled in before submitting.');
            return;
        }

        
        fetch('/shift/add_shift/', {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json',
                'Authorization': `Token ${authToken}`
            },
            body : JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                console.log(json, 'added a shift');
                fetchShift();
            })
            .catch(error => console.log(error))
        

        resetInputs()
        setIsOpen(false)
    }

    //update Shift
    const updateShift = () => {

        fetch(`/shift/update_shift/${selectedEvent.id}/`, {
            method : 'PATCH',
            headers : {
                'Content-type' : 'application/json',
                'Authorization': `Token ${authToken}`
            },
            body : JSON.stringify({
                start_time : startTime,
                end_time : endTime,
                date : date,
                student : student
                
            })
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                fetchShift();
            })
            .catch(error => console.log(error))
        
        resetInputs()
        setEventModalOpen(false)
    }

    const deleteShift = () => {
        fetch(`/shift/delete_shift/${selectedEvent.id}/`,{
            method : 'DELETE',
            headers : {
                'Authorization' : `Token ${authToken}`,
            },
        })
            .then(() => fetchShift())
            .catch(error => console.log(error))

        resetInputs()
        setEventModalOpen(false)
    }

      

    return (
        <>
            <Nav/>

            <Box height="1rem" />

            <Container maxH='20vh' maxW='container.xl' >

                {/* add shift modal */}
                <Modal 
                    isOpen={isOpen} 
                    onClose={() => {
                        resetInputs()
                        setIsOpen(false)
                    }} 
                    isCentered={true}>
                    <ModalContent>
                        <ModalHeader>Enter Shift Details</ModalHeader>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Student</FormLabel>
                                    <Select placeholder='Select Student' onChange={(e) => setStudent(e.target.value)}>
                                        {employees.map((item) => {
                                            return (
                                                <option key={item.id} value={item.id}>{item.name}</option>
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
                            <Button 
                                onClick={() => {
                                    setIsOpen(false);
                                    resetInputs();
                                }} 
                                color='red'>Cancel</Button>

                            <Button onClick={addShift} ml={3}>Submit</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* edit event modal */}
                <Modal 
                    isOpen={eventModalOpen} 
                    onClose={() => {
                        resetInputs()
                        setEventModalOpen(false)
                    }} 
                    isCentered={true}>
                    <ModalContent>
                        <ModalHeader>Edit Shift</ModalHeader>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Student</FormLabel>
                                    <Select placeholder={placeholder} onChange={(e) => setStudent(e.target.value)}>
                                        {employees.map((item) => {
                                            return (
                                                <option key={item.id} value={item.id}>{item.name}</option>
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
                        <ModalFooter display='flex' justifyContent='space-between'>

                            <Button onClick={deleteShift} color='red'>Delete</Button>

                            <Box>
                                <Button 
                                    onClick={() => {
                                        setEventModalOpen(false);
                                        resetInputs();
                                    }} 
                                    color='red'>Cancel</Button>
                                <Button onClick={updateShift} ml={3}>Submit</Button>
                            </Box>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* employee modal */}
                <Modal 
                    isOpen={employeeModalOpen} 
                    onClose={() => {
                        setEmployeeModalOpen(false)
                    }} 
                    isCentered={true}>
                    <ModalContent>
                        <ModalHeader>Shift Requests</ModalHeader>
                        <ModalBody>
                            <Text>Request for full or partial coverage of your shift below:</Text>
                            
                        </ModalBody>
                        <ModalFooter display='flex' justifyContent='space-between'>

                            <Button onClick={() => setEmployeeModalOpen(false)} color='red'>Cancel</Button>

                            <Box>
                                <Button onClick={() => {
                                    setFull(false)
                                    setAlertDialogOpen(true)
                                    
                                }}> 
                                    Partial
                                </Button>

                                <Button onClick={() => {
                                    setFull(true)
                                    setAlertDialogOpen(true)  
                                }} ml={3}>
                                    Full
                                </Button>
                            </Box>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <Dialog 
                    alertDialogOpen={alertDialogOpen}
                    alertClose={alertClose}
                    full={full}
                    alertConfirm={alertConfirm}
                    date={date}
                    startTime={startTime}
                    endTime={endTime}
                    setAlertStartTime={setAlertStartTime}
                    setAlertEndTime={setAlertEndTime} 
                />



                {role && <Button onClick={() => setIsOpen(true)}>Add Shift</Button>}
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
                    eventClick={(info) => {

                        if (role){
                            setPlaceholder(info.event.title)
                            setStudent(info.event.extendedProps.employee_id)
                            setDate(info.event.startStr.substring(0,10))
                            setStartTime(info.event.startStr.substring(11,16)) 
                            setEndTime(info.event.endStr.substring(11,16)) 
                            setSelectedEvent(info.event)
                            setEventModalOpen(true);
                        }
    
                    
                        else if(info.event.extendedProps.student_id === loggedInUser ){
                            setShiftId(info.event.id)
                            setStudent(info.event.extendedProps.employee_id)
                            setDate(info.event.startStr.substring(0,10))
                            setEmployeeModalOpen(true)
                        }
                        
                    }}      
                />
            </Container>
        </>
       
    );
}

export default Schedule