import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './EventBookingCalendar.css'; // Import your CSS file

function EventBookingCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookedEvents, setBookedEvents] = useState([]);

  // Define a list of events with date, time slots, event name, and location
  const events = [
    {
      id: 1,
      eventName: 'Morning Event ',
      location: 'Basement ',
      timeSlots: ['10:00 AM - 2:00 PM '],
    },
    {
      id: 2,
      eventName: 'Evening Event ',
      location: 'Basement',
      timeSlots: ['3:00 PM - 8:00 PM'],
    },
    // Add more events here
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
  };

  const handleEventChange = (event) => {
    setSelectedEvent(event);
  };
  const handleBooking = () => {
    if (selectedDate && selectedEvent) {
      // Get the date from the selected date object
      const selectedDateString = selectedDate.toDateString();

      // Check if there is already a booking for the selected date and event type
      const isDateAlreadyBooked = bookedEvents.some((bookedEvent) =>
        bookedEvent.includes(selectedDateString) &&
        bookedEvent.includes(selectedEvent.eventName)
      );

      if (isDateAlreadyBooked) {
        alert(`No place is available for ${selectedEvent.eventName} on ${selectedDateString}. Please choose another date or event.`);
      } else {
        const bookedEvent = `${selectedEvent.eventName} at ${selectedEvent.location} on ${selectedDateString} at ${selectedEvent.timeSlots[0]}`; // Use the correct property here
        setBookedEvents([...bookedEvents, bookedEvent]);
        alert(`Booking for ${bookedEvent} is successful!`);
      }
    } else {
      alert('Please select a date and event for booking.');
    }
  };
  const handleDeleteEvent = (index) => {
    const updatedBookedEvents = [...bookedEvents];
    updatedBookedEvents.splice(index, 1);
    setBookedEvents(updatedBookedEvents);
  };

  return (
    <div className="event-booking-calendar">
      <h2>Event Booking System</h2>
      <Calendar onChange={handleDateChange} value={selectedDate} />
      <div>
        <h3>Available Events:</h3>
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <label>
                <input
                  type="radio"
                  name="event"
                  value={event.id}
                  checked={selectedEvent && selectedEvent.id === event.id}
                  onChange={() => handleEventChange(event)}
                />
                {event.eventName} at {event.location} - {event.date}
              </label>
            </li>
          ))}
        </ul>
      </div>
      {selectedEvent && (
        <div>
          <h3>Time Slots for {selectedEvent.eventName}:</h3>
          <ul>
            {selectedEvent.timeSlots.map((timeSlot) => (
              <li key={timeSlot}>{timeSlot}</li>
            ))}
          </ul>
        </div>
      )}
      <button className="book-button" onClick={handleBooking}>Book</button>
      <div>
        <h3>Booked Events:</h3>
        <ul className="booked-events">
          {bookedEvents.map((bookedEvent, index) => (
            <li key={index}>{bookedEvent}
              <button className="book-button" onClick={() => handleDeleteEvent(index)}>Delete</button></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EventBookingCalendar;
