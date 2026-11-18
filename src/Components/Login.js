import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpider } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();
// Function to handle Login form submission
const handleLogin = async (e) => {
e.preventDefault();
setError('');
try {
const response = await fetch(
'http://localhost:8080/api/users/login',
{
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
username,
password
})
}
);
const message = await response.text();
if (!response.ok) {
setError(message || 'Invalid username or password.');
return;
}
console.log('Login successful:', message);
// Navigate after successful authentication
// localStorage.setItem('currentUser', username);
localStorage.setItem(
'currentUser',
JSON.stringify({ username: username })
);
navigate('/home');
} catch (err) {
console.error('Login error:', err);
setError('There was an error with the login process.');
}
};
//Render HTML Login form
return (
<div class="login-container">
<form class="login-form" onSubmit={handleLogin}>
<h2><FontAwesomeIcon icon={faSpider}/> <b>SPIDER</b>WEB</h2>
<div>
<input
type="text"
id="username"
placeholder="Username"
value={username}
onChange={(e) => setUsername(e.target.value)}
required
/>
</div>
<div>
<input
type="password"
id="password"
placeholder='Password'
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
</div>
<p>Do not have an account? <a href="/signup">Sign Up</a></p>
<button type="submit">Login</button>
</form>
{error && <p class="error-message">{error}</p>}
</div>
);
};
export default Login;