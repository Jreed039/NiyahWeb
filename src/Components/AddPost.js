import React, { useState } from 'react';
import './AddPost.css';
import Navigation from './Navigation';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const navigate = useNavigate();

    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    // 🔥 STRONG USER PARSER (100% SAFE)
    const getCurrentUser = () => {
        const stored = localStorage.getItem('currentUser');

        if (!stored) return null;

        try {
            const user = JSON.parse(stored);

            // if string stored accidentally
            if (typeof user === "string") {
                return { username: user };
            }

            return {
                username:
                    user?.username ||
                    user?.userName ||
                    user?.user?.username,
                profile:
                    user?.profile ||
                    user?.user?.profile
            };

        } catch (err) {
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentUser = getCurrentUser();

        const username = currentUser?.username?.trim();
        const profile = currentUser?.profile || '';

        // 🚨 BLOCK IF NOT LOGGED IN
        if (!username) {
            alert('You must be logged in to create a post');
            return;
        }

        if (!image) {
            alert('Please upload an image!');
            return;
        }

        const formData = new FormData();
        formData.append('description', description);
        formData.append('image', image);
        formData.append('username', username);
        formData.append('profile', profile);

        try {
            const response = await fetch('http://localhost:5000/add-post', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to add post');
            }

            const data = await response.json();
            console.log('Post added successfully:', data);

            // reset form
            setDescription('');
            setImage(null);
            setPreview(null);

            navigate('/Home');

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Navigation />

            <div className="add-post-container">
                <h2>Add a New Post</h2>

                <form onSubmit={handleSubmit} className="add-post-form">

                    <div className="input-group">
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Upload Image</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            required
                        />
                    </div>

                    {preview && (
                        <div className="image-preview">
                            <p>Image Preview:</p>
                            <img src={preview} alt="Preview" className="preview-img" />
                        </div>
                    )}

                    <button type="submit" className="submit-btn">
                        Submit Post
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddPost;