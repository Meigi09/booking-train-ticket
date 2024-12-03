import { Routes, Route, NavLink } from 'react-router-dom';
import TrainManagement from './TrainManagement';
import UserManagement from './UserMnagement';
import './AdminContent.css'

export default function AdminContent() {
    return (
        <div className="admin-dashboard">
            <nav className="admin-nav">
                <NavLink
                    to="/admin/trains"
                    className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                    }
                >
                    Trains
                </NavLink>
                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                    }
                >
                    Users
                </NavLink>
            </nav>

            <div className="admin-content">
                <Routes>
                    <Route path="/admin/trains" element={<TrainManagement />} />
                    <Route path="/admin/users" element={<UserManagement />} />
                </Routes>
            </div>
        </div>
    );
}

