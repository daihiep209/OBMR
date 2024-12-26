import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HelloComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Gọi API từ Backend
    axios.get('http://localhost:8080/api/hello')  // Đảm bảo URL đúng với API trên Backend
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default HelloComponent;
