import EventCalendar from 'react-native-events-calendar'
import { Dimensions } from 'react-native';

let { width } = Dimensions.get('window')


const Calendar = () => {
  const events = [
    { start: '2023-07-24 00:30:00', end: '2023-07-24 01:30:00', title: 'hackUMBC event 1', summary: 'Room 1' },
    { start: '2023-07-24 01:30:00', end: '2023-07-24 02:20:00', title: 'hackUMBC event 2', summary: 'Room 2' },
    
]
  return (
    <EventCalendar
      events={events}
      width={width}
      initDate={'2023-07-24'}
    />
  )
};

export default Calendar;
