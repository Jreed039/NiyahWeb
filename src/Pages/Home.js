import Navigation from "../Components/Navigation";
import Users from "../Components/Users";
import Posts from "../Components/Posts";
import { useNavigate } from "react-router-dom";
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleAddPost = () => {
        navigate('/AddPost');
    };

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return (
        <div>
            <Navigation />

            {/* USER PROFILE HEADER (NEW) */}
            <div className="home-profile">
                {currentUser?.profile && (
                    <img
                        src={currentUser.profile}
                        alt="Profile"
                        className="home-profile-img"
                    />
                )}
                <h3>{currentUser?.username}</h3>
            </div>

            <Users />

            <button id="add-post-btn" onClick={handleAddPost}>
                +
            </button>

            <Posts />
        </div>
    );
};

export default Home;