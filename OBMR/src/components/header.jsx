// components/Header.js
import React from 'react';

const Header = ({ toggleSidebar }) => {
    return (
        <header className="app-header d-flex justify-content-between align-items-center text-white px-3 py-2">
            <button className="btn btn-menu" onClick={toggleSidebar}>
                <i className="fa fa-list"></i>
            </button>
            <div className="d-flex align-items-center">
                <div className='d-flex align-items-center me-5'>
                    <div className="rounded-circle bg-secondary" style={{ width: '50px', height: '50px' }}></div>
                    <span className="ms-3">Username</span>
                </div>
                <button className='btn btn-noti'>
                    <i className="fa-regular fa-bell"></i>
                </button>
            </div>
        </header>
    );
};

export default Header;
