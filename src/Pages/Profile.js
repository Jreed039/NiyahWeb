import React from 'react';
import './Profile.css';
import Navigation from '../Components/Navigation';

const Profile = () => {
return(
<div>
<Navigation/>
<div className="profile">
<div id="user">
<img src={require('../images/8.jpg')} />
<p><strong><i>janiyahareed</i></strong></p>

</div>
<div id="bio">
<p><strong><i>Beyonce & Chief Keef fan</i></strong></p>
</div>

<div className="posts">
<div className="image-icon"><img src={require('../images/1.jpg')} alt="Icon 1" /></div>
<div className="image-icon"><img src={require('../images/7.jpg')} alt="Icon 2" /></div>
<div className="image-icon"><img src={require('../images/2.jpg')} alt="Icon 3" /></div>
<div className="image-icon"><img src={require('../images/6.jpg')} alt="Icon 4" /></div>
<div className="image-icon"><img src={require('../images/3.jpg')} alt="Icon 5" /></div>
</div>
</div>
</div>
)
}
export default Profile;