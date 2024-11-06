import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [productList, setProductList] = useState([]);
    const [logoutMessage, setLogoutMessage] = useState(''); // State for logout message
    const navigate = useNavigate();

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProductList(storedProducts);
    }, []);

    const displayProducts = () => {
        return productList
            .filter((product) => product.quantity > 0)
            .map((product, index) => (
                <li key={index} style={styles.stockListItem}>
                    {product.name} - Previous: {product.previousQuantity || 0} units, Current: {product.quantity} units
                </li>
            ));
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setLogoutMessage('You have been logged out.'); // Set logout message
        setTimeout(() => {
            setLogoutMessage(''); // Clear message after a few seconds
            navigate('/'); // Navigate to the login page
        }, 2000);
    };

    return (
        <div style={{ ...styles.container, backgroundImage: 'url(/tre.webp)' }}>
            <nav style={styles.navHeader}>
                <h1 style={styles.headerText}>Wings Cafe - Dashboard</h1>
            </nav>

            <div style={styles.navButtons}>
                <Link to="/ProductManagement" style={styles.link}>Product Management</Link>
                <Link to="/UserManagement" style={styles.link}>User Management</Link>
                <Link to="/PurchasesManagement" style={styles.link}>Purchases Management</Link>
                <button style={styles.logoutBtnInline} onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {logoutMessage && <p style={styles.logoutMessage}>{logoutMessage}</p>} {/* Display logout message */}

            <h3>Stock Overview Levels</h3>
            <ul style={styles.stockList}>
                {displayProducts()}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
    headerText: {
        margin: '0',
        fontSize: '24px',
    },
    navButtons: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center',
        border: '2px solid #000435',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: 'palevioletred',
        marginBottom: '20px',
    },
    link: {
        textDecoration: 'none',
        color: 'aqua',
        fontSize: '18px',
        margin: '0 15px',
        padding: '10px 15px',
        borderBottom: '2px solid transparent',
        transition: 'border-bottom 0.3s',
    },
    logoutBtnInline: {
        backgroundColor: 'red',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginLeft: '15px',
    },
    logoutMessage: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '4px',
        textAlign: 'center',
        marginBottom: '20px',
    },
    stockList: {
        listStyleType: 'none',
        padding: '0',
    },
    stockListItem: {
        padding: '10px',
        marginBottom: '5px',
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '5px',
    },
};

export default Dashboard;
