import React from 'react';
import "./Footer.scss";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
    return (
        <div className='footer'>
            <div className="top-footer">
                <div className="question">
                    <span>Question? Contact us. </span>
                </div>
                <div className="footer-icons">
                    <span><FacebookIcon /></span>
                    <span><InstagramIcon /></span>
                    <span><TwitterIcon /></span>
                    <span><YouTubeIcon /></span>
                </div>
            </div>
            <div className="middle-footer">
                <ul>
                    <li>FAQ</li>
                    <li>Investor Relations</li>
                    <li>Privacy</li>
                    <li>Speed Test</li>
                </ul>
                <ul>
                    <li>Help Center</li>
                    <li>Jobs</li>
                    <li>Cookie Preferences</li>
                    <li>Legal Notices</li>
                </ul>
                <ul>
                    <li>Account</li>
                    <li>Way to Watchs</li>
                    <li>Corporate Information</li>
                    <li>Only on Netflix</li>
                </ul>
                <ul>
                    <li>Media Center</li>
                    <li>Terms of Use</li>
                    <li>Contact US</li>
                </ul>
            </div>
            <div className="bottom-footer">
                &copy; {new Date().getFullYear()} All Rights Reserved
            </div>
        </div>
    )
}

export default Footer;