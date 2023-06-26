import React from 'react';
import "./Footer.scss";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-container">
                <div className="top-footer">
                </div>
                <div className="middle-footer">
                    <ul>
                        <li><span>About Us</span></li>
                        <li>Our Story</li>
                        <li>Leadership</li>
                        <li>News</li>
                        <li>Press</li>
                    </ul>
                    <ul>
                        <li><span>Careers</span></li>
                        <li>Becoming A Citizen</li>
                        <li>Responsibilities</li>
                        <li>Perks</li>
                    </ul>
                    <ul>
                        <li><span>Where To Watch</span></li>
                        <li>Smart TV</li>
                        <li>Streaming Devices</li>
                        <li>Mobile App</li>
                        <li>Desktop App</li>
                        <li>Watch on the web</li>
                        <li>Accessibility</li>
                    </ul>
                    <ul>
                        <li><span>Partnes</span></li>
                        <li>Distribution</li>
                        <li>Content Providers</li>
                        <li>Advertisers</li>
                    </ul>
                </div>
                <div className="bottom-footer">
                    <div className="coppy">&copy; {new Date().getFullYear()} All Rights Reserved</div>
                    <div className="footer-icons">
                        <span><FacebookIcon /></span>
                        <span><InstagramIcon /></span>
                        <span><TwitterIcon /></span>
                        <span><YouTubeIcon /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;