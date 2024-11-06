import React, { useState, useEffect } from 'react';

const LoginRegisterForm = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState(''); // State to hold messages

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (isLoginMode) {
      // Login mode
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);

        // Delay redirect to show the message for 5 seconds
        setTimeout(() => {
          window.location.href = '/Dashboard'; // Redirect to dashboard in a real React Router setup
        }, 2000);
      } else {
        setMessage('Invalid username or password');
      }
    } else {
      // Registration mode
      const existingUser = users.find(u => u.username === username);
      if (existingUser) {
        setMessage('User already exists. Please log in.');
      } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        setMessage('Registration successful! You can now log in.');
        setIsLoginMode(true); // Switch back to login mode
      }
    }

    // Clear form inputs
    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setMessage('You have been logged out.');
  };

  if (currentUser) {
    return (
      <div>
        <h2>Welcome, {currentUser.username}!</h2>
        <button onClick={handleLogout}>Sign Out</button>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <h1 style={styles.navTitle}>LOGIN PLATFORM</h1>
      </nav>

      <div style={styles.formContainer}>
        {message && <p style={styles.message}>{message}</p>} {/* Display message on top */}
        <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            {isLoginMode ? 'Login' : 'Register'}
          </button>
        </form>
        <p>
          {isLoginMode ? 'Not registered? ' : 'Already have an account? '}
          <span
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setMessage(''); // Clear message on mode switch
            }}
            style={styles.toggleLink}
          >
            {isLoginMode ? 'Register here' : 'Login here'}
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'palevioletred',
  },
  nav: {
    backgroundColor: '#000435',
    padding: '10px',
    width: '100%',
    textAlign: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1,
    borderBottom: 'solid 5px crimson',
    borderRadius: '10px',
  },
  navTitle: {
    color: 'white',
    margin: 0,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '400px',
    marginTop: '80px',
  },
  input: {
    width: '90%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    width: '90%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  message: {
    color: 'green',
    fontSize: '14px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  toggleLink: {
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default LoginRegisterForm;
