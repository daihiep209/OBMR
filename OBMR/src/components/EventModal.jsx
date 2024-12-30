import React, { useState } from 'react';
import "../styles/EventModal.css"
import { format } from 'date-fns';
import DeleteEventModal from './deleteEventModal';
import EditEventModal from './editEventModal';

const EventModal = ({ event, onClose }) => {
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (eventId) => {
    // Gọi API hoặc xử lý xóa sự kiện
    console.log('Event Deleted:', eventId);
    setShowDeleteModal(false);
    onClose();
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteBtnClick = () => {
    setShowDeleteModal(true);
  }

  const handleEditBtnClick = () => {
    setEditMode(true);
  }

  const handleEditSubmit = (updatedData) => {
    // Xử lý dữ liệu sự kiện được cập nhật
    console.log("Updated Event:", updatedData);
    onClose();  // Đóng modal sau khi cập nhật
  };

  const closeEventModal = () => {
    onClose();
  };

  const handleModalClick = (e) => {
    // Ngăn không cho sự kiện click vào modal đóng modal
    e.stopPropagation();
  };

  if (!event) return null;

  return (
    <div onClick={closeEventModal} className='position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-25' style={{ zIndex: 1050 }}>
      <div onClick={handleModalClick} className="my-event-modal p-3">
        <div className='button-area'>
          <button className='btn btn-modal' onClick={handleEditBtnClick}><i className="fa-solid fa-pen" aria-hidden="true"></i></button>
          {showDeleteModal && (
            <DeleteEventModal
              event={event}
              onDelete={handleDelete}
              onCancel={handleCancelDelete}
            />
          )}
          <button className='btn btn-modal' onClick={handleDeleteBtnClick}><i className="fa-solid fa-trash" aria-hidden="true"></i></button>
        </div>
        <div className="my-event-modal-title">
          <i class="fa-regular fa-calendar-days me-2"></i>
          {event.title}
        </div>
        <div className='mt-2'>
          <i className="fa fa-clock-o me-2" aria-hidden="true"></i>
          {format(event.start, "MMM d, yyyy")} | {format(event.start, "H:mm a")} - {format(event.end, "H:mm a")}
        </div>
        <div className='mt-2'>
          <i className="fa fa-location-dot me-2"></i>
          {event.location}
        </div>
        <div className='mt-2'>
          <i className="fa-regular fa-user me-2"></i>
          Member: {event.people}
        </div>
        <div className='mt-2'>
          Description: {event.description}
        </div>
        {editMode && (
          <EditEventModal
            event={event}
            onClose={onClose}
            onSubmit={handleEditSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default EventModal;

