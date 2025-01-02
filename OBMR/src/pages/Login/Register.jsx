import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import RightSide from "../../components/Login/rightside"
import '../../styles/style.css'

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Hàm toggle hiển thị/ẩn mật khẩu
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Xử lý khi submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Reset lỗi trước khi kiểm tra

        const { username, email, phoneNumber, password, confirmPassword } = formData;

        // Kiểm tra số điện thoại chỉ chứa số
        if (!/^\d+$/.test(phoneNumber)) {
            setError('Phone number must contain only numbers');
            return;
        }

        // Kiểm tra password và confirm password giống nhau
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Nếu tất cả kiểm tra đều hợp lệ
        alert('Registration successful');
        navigate('/'); // Chuyển hướng đến trang login sau khi đăng ký thành công
    };

    return (
        <div className="d-flex custom-vh bg-light">
            {/* Left Side - Register Form */}
            <div className="d-flex flex-column justify-content-center custom-w bg-white px-5 ">
                <h2 className="text-center mb-4 custom-h2">Register</h2>
                <form className="custom-p" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control custom-input"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control custom-input"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="phoneNumber" className="form-label">Phone number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            className="form-control custom-input"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="form-label">Your password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="form-control custom-input"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}"
                                title="Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."
                            />
                            <span onClick={togglePasswordVisibility} className="btn btn-custom1">
                                {showPassword ? (
                                    <i className="fa-solid fa-eye"></i>
                                ) : (
                                    <i className="fa-solid fa-eye-slash"></i>
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="confirmPassword" className="form-label">Confirm your password</label>
                        <div className="input-group">
                            <input
                                type="password"
                                id="confirmPassword"
                                className="form-control custom-input"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit" className="btn btn-custom w-100">Register</button>
                </form>
                <div className="mt-3 text-center">
                    <p className="mt-2">
                        Already have an account?{' '}
                        <a href="/" className="form-label text-decoration-none">Login now</a>
                    </p>
                </div>
            </div>

            {/* Right Side */}
            <RightSide />
        </div>
    );
}

export default Register;
