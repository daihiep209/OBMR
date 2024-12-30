import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import RoomData from "../data/RoomData.json";

const EditEventModal = ({ event, onClose, onSubmit }) => {

    const [roomData, setRoomData] = useState(RoomData);

    // // Tải dữ liệu phòng từ file JSON (hoặc từ API nếu cần)
    // useEffect(() => {
    //     // Giả sử bạn có file roomData.json trong thư mục public
    //     fetch("../data/RoomData.json")
    //         .then((response) => response.json())
    //         .then((data) => setRoomData(data))
    //         .catch((error) => console.error("Error loading room data:", error));
    // }, []);

    const [formData, setFormData] = useState({
        title: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        description: "",
        member: "",
        location: "",
    });

    useEffect(() => {
        // Cập nhật dữ liệu khi nhận được sự kiện mới
        if (event) {
            setFormData({
                title: event.title || "",
                startDate: format(event.start, 'yyyy-MM-dd'),
                startTime: format(event.start, 'HH:mm'),
                endDate: format(event.end, 'yyyy-MM-dd'),
                endTime: format(event.end, 'HH:mm'),
                description: event.description || "",
                member: event.people || "",
                location: event.location || "",
            });
        }
    }, [event]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);  // Gửi dữ liệu chỉnh sửa cho parent
        onClose();  // Đóng modal sau khi submit
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50" style={{ zIndex: 1050 }}>
            <div className="bg-white p-5 rounded shadow" style={{ width: "800px", position: "relative" }}>
                <button
                    onClick={onClose}
                    className="close-button position-absolute top-0 end-0 btn btn-link"
                    style={{
                        fontSize: "1.5rem",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        padding: "0.5rem",
                        height: "50px",
                        width: "50px",
                        color: "#1B374D",
                    }}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>

                <div className="d-flex justify-content-center">
                    <h4 className="mb-3 fw-bold" style={{ color: "#1B374D" }}>EDIT EVENT MEETING</h4>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3 flex-grow-1">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-control"
                            placeholder="Add title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3 flex-grow-1">
                        <input
                            type="text"
                            id="member"
                            name="member"
                            className="form-control"
                            placeholder="Add member"
                            value={formData.member}
                            onChange={handleChange}

                        />
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            className="form-control"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            className="form-control ms-2"
                            value={formData.startTime}
                            onChange={handleChange}
                            required
                        />
                        <i className="fa-solid fa-arrow-right mx-3"></i>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className="form-control"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="time"
                            id="endTime"
                            name="endTime"
                            className="form-control ms-2"
                            value={formData.endTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3 flex-grow-1">
                        <select
                            id="location"
                            name="location"
                            className="form-control"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Location</option>
                            {roomData.map((room) => (
                                <option key={room.id} value={room.name}>
                                    {room.name} - {room.status}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-control"
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-new-meeting px-5">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEventModal;
