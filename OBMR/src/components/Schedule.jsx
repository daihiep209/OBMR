import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'

import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'
import { calendars } from '../data/calendarData'
import { events } from '../data/eventData'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import EventModal from '../components/EventModal';
import BookingForm from './BookingForm'
import { format } from 'date-fns'


const CalendarApp = () => {
  const eventsService = useState(() => createEventsServicePlugin())[0]

  // State để mở BookingForm
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDayClick = (date) => {
    console.log('Day clicked:', date); // Log ngày được click
    setSelectedDate(date); // Lưu ngày được chọn
    setIsBookingFormOpen(true); // Mở BookingForm
  };

  const handleCloseBookingForm = () => {
    setIsBookingFormOpen(false); // Đóng BookingForm
  };

  const handleSubmitBookingForm = (formData) => {
    console.log('Form Data:', formData); // Xử lý dữ liệu từ form
    // Logic để thêm sự kiện mới vào lịch
    setIsBookingFormOpen(false); // Đóng form sau khi submit
  };

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = (event) => {
    console.log(event);
    setSelectedEvent(event); // Gán sự kiện được chọn
    setIsModalOpen(true); // Mở modal
  };

  const closeModal = () => {
    setSelectedEvent(null); // Xóa sự kiện được chọn
    setIsModalOpen(false); // Đóng modal
  };

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    calendars: calendars,
    events: events,
    plugins: [
      eventsService,
      createDragAndDropPlugin(30),
      // createEventModalPlugin(),
    ],
    callbacks: {
      onEventClick: (event) => {
        handleEventClick(event);
      },
      onClickDate: (date) => {
        console.log('Date clicked:', date); // Log ngày được click
        setSelectedDate(date); // Lưu ngày được click
        setIsBookingFormOpen(true); // Mở form hoặc modal
      },
    }
  })




  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
      {isBookingFormOpen && (
        <BookingForm
          onClose={handleCloseBookingForm}
          onSubmit={handleSubmitBookingForm}
          initialData={{
            startDate: format(selectedDate, "dd-mm-yyyy"), // Gán ngày đã chọn
            startTime: '09:00', // Mặc định giờ bắt đầu
          }}
        />
      )}
        {isModalOpen && (
          <EventModal event={selectedEvent} onClose={closeModal} />
        )}
    </div>
  )
}

export default CalendarApp