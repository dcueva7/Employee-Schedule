import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; 

import { Container, Box } from '@chakra-ui/react';
import Nav from './Nav';




const Schedule = () => {
    const shifts = [
       
        { title: 'John', start: '2023-05-011T09:00:00', end: '2023-05-11T14:00:00', backgroundColor : 'red' },
        { title: 'Jim', start: '2023-05-11T12:00:00', end: '2023-05-11T17:00:00' },
        { title: 'Snoopy', start: '2023-05-11T16:00:00', end: '2023-05-11T20:00:00' },
        { title: 'Snoopy', start: '2023-05-11T09:00:00', end: '2023-05-11T22:00:00' },
        { title: 'Jane', start: '2023-05-12T10:00:00', end: '2023-05-12T15:00:00' },
        
      ];

      

    return (
        <>
            <Nav/>

            <Box height="1rem" />

            <Container maxH='20vh' maxW='container.xl' >

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
                    
                />
            </Container>
        </>
       
    );
}

export default Schedule