import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import các component của bạn
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import Booking from './pages/Booking';
import SendCode from './pages/Login/SendCode';
import ResetPass from './pages/Login/ResetPass';
import ForgotPassword from './components/Login/ForgetPasswordForm'; // Đảm bảo đã tạo component này

function App() {
  return (
    <Router>
      {/* Định nghĩa các route */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sendcode" element={<SendCode />} />
        <Route path="/resetpassword" element={<ResetPass />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <div>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/booking">Booking</Link> |{" "}
        <Link to="/forgot-password">Forgot Password</Link> |{" "}
        <Link to="/sendcode">Send Code</Link> |{" "}
        <Link to="/resetpassword">Reset Password</Link>
      </div>
    </div>
  );
}

export default App;
