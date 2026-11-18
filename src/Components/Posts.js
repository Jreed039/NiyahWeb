import React, { useState, useEffect } from 'react';
import './Posts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/posts.json');

                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }

                const postsData = await response.json();

                setPosts(Array.isArray(postsData) ? postsData.reverse() : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = async (postId) => {
        if (!newComment.trim()) return;

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (!currentUser) {
            alert('You must be logged in to comment');
            return;
        }

        const commentData = {
            postId,
            comment: newComment,
            username: currentUser.username,
            profile: currentUser.profile,
        };

        try {
            const response = await fetch('http://localhost:5000/add-comment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(commentData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add comment');
            }

            setPosts(prev =>
                prev.map(post =>
                    post.id === postId
                        ? { ...post, comments: data.post.comments || [] }
                        : post
                )
            );

            setNewComment('');
        } catch (err) {
            console.error(err);
        }
    };

    // Loading / error states
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="post-container">
            {posts.map((post) => (
                <div className="post-form" key={post.id}>
                    
                    {/* USER INFO */}
                    <div className="user">
                        <img
                            className="user"
                            src={post.user?.profile}
                            alt="User Avatar"
                        />
                        <p className="username">{post.user?.username}</p>
                    </div>

                    {/* POST CARD */}
                    <div className="card post-item">
                        <div className="card-image">
                            <img
                                className="post-image"
                                src={post.image}
                                alt={post.description}
                            />
                        </div>

                        <div className="card-comment-like">
                            <FontAwesomeIcon icon={faComment} /> Comments
                            <FontAwesomeIcon icon={faThumbsUp} /> {post.likes}
                        </div>

                        <div className="card-content">
                            <h5 className="post-description">{post.description}</h5>
                            <p className="post-created">{post.created}</p>
                        </div>

                        {/* ADD COMMENT */}
                        <div className="add-comment">
                            <input
                                type="text"
                                value={newComment}
                                onChange={handleCommentChange}
                                placeholder="Add a comment"
                            />
                            <button onClick={() => handleAddComment(post.id)}>
                                Add Comment
                            </button>
                        </div>

                        {/* COMMENTS */}
                        <div className="comments-section">
                            {Array.isArray(post.comments) &&
                                post.comments.map((comment, index) => (
                                    <div key={index} className="comment">
                                        <p>
                                            <img
                                                src={comment.profile}
                                                alt="profile"
                                                style={{ width: 20, borderRadius: '50%' }}
                                            />
                                            <strong> {comment.username}</strong>:{" "}
                                            {comment.comment}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Posts;