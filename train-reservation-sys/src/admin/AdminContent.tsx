import { Routes, Route, NavLink } from 'react-router-dom';
import TrainManagement from './TrainManagement';
import UserManagement from './UserMnagement';
import './AdminContent.css'

export default function AdminContent() {
    return (
        <div className="admin-dashboard">
            <h2>Welcome Admin!!</h2>

               <button className="admin-btn"> <NavLink
                    to="/admin/trains"
                    className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                    }
                >
                    Trains
                </NavLink>
               </button>
            <button className="admin-btn">
                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                    }
                >
                    Users
                </NavLink>

            </button>

            <div className="admin-content">
                <Routes>
                    <Route path="/admin/trains" element={<TrainManagement />} />
                    <Route path="/admin/users" element={<UserManagement />} />
                </Routes>
            </div>
        </div>
    );
}

