import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserManagement = () => {
    const [userList, setUserList] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [updateUsername, setUpdateUsername] = useState('');
    const [updatePassword, setUpdatePassword] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [message, setMessage] = useState(''); // State to hold messages

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUserList(storedUsers);
    }, []);

    const saveUsers = (users) => {
        localStorage.setItem('users', JSON.stringify(users));
        setUserList(users);
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        if (userList.find(user => user.username === username)) {
            setMessage('Username already exists!');
            return;
        }
        const newUserList = [...userList, { username, password }];
        saveUsers(newUserList);
        setMessage('User added successfully');
        setUsername('');
        setPassword('');
    };

    const handleUpdateUser = () => {
        if (!editingUser) return;

        const updatedUserList = userList.map(user => {
            if (user.username === editingUser) {
                return { ...user, username: updateUsername || user.username, password: updatePassword || user.password };
            }
            return user;
        });
        saveUsers(updatedUserList);
        setMessage('User updated successfully');
        setEditingUser(null);
        setUpdateUsername('');
        setUpdatePassword('');
    };

    const handleDeleteUser = (username) => {
        const newUserList = userList.filter(user => user.username !== username);
        saveUsers(newUserList);
        setMessage('User deleted successfully');
    };

    return (
        <div style={styles.container}>
            <nav style={styles.navHeader}>
                <h1>Wings Cafe - User Management</h1>
            </nav>

            <div style={styles.navButtons}>
                <Link to="/Dashboard" style={styles.link}>Dashboard</Link>
                <Link to="/ProductManagement" style={styles.link}>Product Management</Link>
                <Link to="/UserManagement" style={styles.link}>User Management</Link>
                <Link to="/PurchasesManagement" style={styles.link}>Purchases Management</Link>
            </div>

            {/* Display message if exists */}
            {message && <p style={styles.message}>{message}</p>}

            <form onSubmit={handleAddUser} style={styles.userForm}>
                <h3>Add User</h3>
                <div style={styles.inputGroup}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.actionButton}>Add User</button>
            </form>

            <div style={styles.userListContainer}>
                <h3>Registered Users</h3>
                {userList.length > 0 ? (
                    <table style={styles.userTable}>
                        <thead>
                            <tr>
                                <th style={styles.tableHeader}>Username</th>
                                <th style={styles.tableHeader}>Password</th>
                                <th style={styles.tableHeader}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((user, index) => (
                                <tr key={index}>
                                    <td style={styles.tableData}>{user.username}</td>
                                    <td style={styles.tableData}>{user.password}</td>
                                    <td style={styles.tableData}>
                                        {editingUser === user.username ? (
                                            <>
                                                <input
                                                    type="text"
                                                    placeholder="New Username"
                                                    value={updateUsername}
                                                    onChange={(e) => setUpdateUsername(e.target.value)}
                                                    style={styles.input}
                                                />
                                                <input
                                                    type="password"
                                                    placeholder="New Password"
                                                    value={updatePassword}
                                                    onChange={(e) => setUpdatePassword(e.target.value)}
                                                    style={styles.input}
                                                />
                                                <button onClick={handleUpdateUser} style={styles.actionButton}>Save</button>
                                                <button onClick={() => setEditingUser(null)} style={styles.actionButton}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => setEditingUser(user.username)} style={styles.actionButton}>Edit</button>
                                                <button onClick={() => handleDeleteUser(user.username)} style={styles.actionButton}>Delete</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No users registered yet.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: 'palevioletred',
        minHeight: '100vh',
    },
    navHeader: {
        backgroundColor: '#000435',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '5px',
        marginBottom: '20px',
    },
    navButtons: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#000435',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '20px',
    },
    link: {
        textDecoration: 'none',
        color: 'aqua',
        fontSize: '18px',
        margin: '0 15px',
    },
    message: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '4px',
        textAlign: 'center',
        marginBottom: '20px',
    },
    userForm: {
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        padding: '15px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    actionButton: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginLeft: '5px',
    },
    userListContainer: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    userTable: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        padding: '10px',
        backgroundColor: '#000435',
        color: 'white',
        textAlign: 'left',
    },
    tableData: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
};

export default UserManagement;
