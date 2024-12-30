import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import RightSide from '../../components/Login/rightside';
import '../../styles/style.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Toggle mật khẩu hiển thị
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Kiểm tra dữ liệu đầu vào
  const validateFormData = () => {
    const { email, password } = formData;
    const errors = [];

    if (email.includes(' ')) errors.push('Username must not contain spaces');
    if (password.includes(' ')) errors.push('Password must not contain spaces');
    if (password.length < 8) errors.push('Password must be at least 8 characters long');
    if (!/[a-z]/.test(password)) errors.push('Password must contain at least 1 lowercase letter');
    if (!/[A-Z]/.test(password)) errors.push('Password must contain at least 1 uppercase letter');
    if (!/[0-9]/.test(password)) errors.push('Password must contain at least 1 number');
    if (!/[!/#/@]/.test(password)) errors.push('Password must contain at least 1 special character (!/#/@)');

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateFormData();

    if (errors.length > 0) {
      setError(errors.join(', '));
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: errors.join(', '),
      });
      return;
    }

    setError('');
    setIsLoading(true);

    // Gửi yêu cầu đăng nhập tới server
    axios.post('http://localhost:8080/api/login', {
      username: formData.email,
      password: formData.password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Login successful!',
          text: response.data.greetingMessage || 'Welcome back!',
        });
        navigate('/home');
      })
      .catch(error => {
        const message = error.response?.data?.message || 'Something went wrong!';
        setError(message);
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="d-flex custom-vh bg-light">
      {/* Left Side - Login Form */}
      <div className="d-flex flex-column justify-content-center custom-w bg-white px-5 ">
        <h2 className="text-center mb-4 custom-h2">Login</h2>
        <form className="custom-p" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">User name or email address</label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-control custom-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label">Your password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="form-control custom-input"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <span onClick={togglePasswordVisibility} className="btn btn-custom1">
                {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
              </span>
            </div>
          </div>
          <div className="form-check mb-2 d-flex justify-content-between">
            <div>
              <input type="checkbox" id="rememberMe" className="form-check-input" />
              <label htmlFor="rememberMe" className="form-label">Remember Me</label>
            </div>
            <span
              onClick={() => navigate('/sendcode')}
              className="form-label text-decoration-none"
              style={{ cursor: 'pointer', color: 'blue' }}
            >
              Forgot password
            </span>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="btn btn-custom w-100" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-3 text-center">
          <p className="mt-2">
            Don’t have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              className="form-label text-decoration-none"
              style={{ cursor: 'pointer', color: 'blue' }}
            >
              Register now
            </span>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <RightSide />
    </div>
  );
}

export default Login;
