import { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../back';

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/admin/users');
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch users");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/admin/users/${id}`);
            setUsers(prev => prev.filter(user => user.user_id !== id));
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    if (loading) return <div>Loading users...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <BackButton/>
        <div className="user-management">
            <h2>User Management</h2>
            {users.length === 0 ? (
                <p>No users found</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.user_id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button
                                    onClick={() => handleDeleteUser(user.user_id)}
                                    className="delete-btn"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
        </div>
    );
}
