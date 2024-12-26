import React, { useState, useEffect } from "react";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [rooms, setRooms] = useState([]); // State để lưu danh sách phòng họp

  // Gọi API từ backend khi component được render lần đầu
  useEffect(() => {
    fetch("http://localhost:8080/view") // Endpoint API từ Spring Boot
      .then((response) => response.json())
      .then((data) => setRooms(data)) // Gán dữ liệu nhận được vào state
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div className="rooms-list">
        <h2>Meeting Rooms:</h2>
        {rooms.length > 0 ? (
          <ul>
            {rooms.map((room) => (
              <li key={room.id}>{room.name}</li> // Hiển thị danh sách phòng họp
            ))}
          </ul>
        ) : (
          <p>Loading rooms...</p> // Hiển thị khi đang tải dữ liệu
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
