import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiStar, FiSettings, FiLogOut, FiMenu } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ isMobileOpen, toggleSidebar }) => {
    const { logout, user } = useContext(AuthContext);

    return (
        <>
            <div className={`sidebar-overlay ${isMobileOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
            <aside className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Notes App</h2>
                </div>
                
                <nav className="sidebar-nav">
                    <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
                        <FiHome className="nav-icon" />
                        <span>All Notes</span>
                    </NavLink>
                    {/* Additional nav links can go here */}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>
                        <span>{user?.name}</span>
                    </div>
                    <button className="logout-btn" onClick={logout}>
                        <FiLogOut />
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
