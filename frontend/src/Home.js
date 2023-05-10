import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; 


const Home = () => {
    const shifts = [
       
        { title: 'John', start: '2023-06-07T09:00:00', end: '2023-06-07T14:00:00', backgroundColor : 'red' },
        { title: 'Jim', start: '2023-06-07T12:00:00', end: '2023-06-07T17:00:00' },
        { title: 'Snoopy', start: '2023-06-07T16:00:00', end: '2023-06-07T20:00:00' },
        { title: 'Snoopy', start: '2023-06-07T09:00:00', end: '2023-06-07T22:00:00' },
        { title: 'Jane', start: '2023-06-08T10:00:00', end: '2023-06-08T15:00:00' },
        
      ];

    return (
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
       
    );
}

export default Home