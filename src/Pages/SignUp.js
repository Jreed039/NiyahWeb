import React, {useState} from "react";
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpider } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [bio, setBio] = useState('');
    
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if(!username || !password){
            alert("One or more fields are missing");
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profileImage', profileImage);
        formData.append('bio', bio);

        try{
        const response = await fetch( 'http://localhost:8080/api/users/signup',
{
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
username,
email,
password
})
}
);

            const data = await response.json();
            console.log("Signup successful", data);

            //reset signup form
            setUserName('');
            setEmail('');
            setPassword('');
            setProfileImage(null);
            setBio('');

            navigate('/Login');
        }catch(error){
            console.log("Error:", error);
        }
}

//Render HTML Sign up form
    return(
        <div className="signup-container">
            <form onSubmit={handleSignUp} className="signup-form">
            <h2><FontAwesomeIcon icon={faSpider}/> <b>SPIDER</b>WEB</h2>
                <div>
                    <input 
                    type="text" 
                    id="username"
                    placeholder="Username" 
                    required 
                    onChange={(e) => setUserName(e.target.value)}>
                    </input>
                </div>
                <div>
                    <input 
                    type="text" 
                    id="email"
                    placeholder="Email" 
                    required 
                    onChange={(e) => setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <input 
                    type="password" 
                    id="password"
                    placeholder="Password" 
                    required 
                    onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="profile-image">Profile Image</label>
                    <input 
                    type="file" 
                    placeholder="Upload Profile Image" 
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files[0])}>
                    </input>
                </div>
                <div>
                    <input 
                    type="text" 
                    placeholder="Bio" 
                    onChange={(e) => setBio(e.target.value)}>
                    </input>
                </div>
                <p>Already have an account? <a href="/Login">Login</a></p>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;  