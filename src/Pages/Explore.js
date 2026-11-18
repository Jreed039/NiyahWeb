import React from 'react';
import './Explore.css';
// import Search from './Search';
import Navigation from '../Components/Navigation';
import Suggested from '../Components/Suggested';
const Explore = () => {
return(
<div>
<Navigation/>
{/* <Search/> */}
<div className="explore-content">
<h1><strong>Trending</strong></h1>
<div className="trending">
<div className="image-icon"><img src={require('../images/1.jpg')} alt="Icon 1" /></div>
<div className="image-icon"><img src={require('../images/7.jpg')} alt="Icon 2" /></div>
<div className="image-icon"><img src={require('../images/2.jpg')} alt="Icon 3" /></div>
<div className="image-icon"><img src={require('../images/6.jpg')} alt="Icon 4" /></div>
<div className="image-icon"><img src={require('../images/3.jpg')} alt="Icon 5" /></div>
</div>
<h1><strong>Suggested</strong></h1>
<div className="suggested">
<Suggested/>
</div>
</div>
</div>
)
}
export default Explore;