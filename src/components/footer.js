import React from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Assests/Logo.png';

export default function Footer() {
  return (
    <div className="Footer">
        <div className='foot'>
        <div className="foot-section-1">
            <ul className='list list-1'>
                <li id="foottop" >Founders</li>
                <li>Saharsh</li>
                <li>Sreyan</li>
                <li>Abhishek</li>
                <li>Vikram</li>
                <li>Pankaj</li>
            </ul>
        </div>
        <div className="foot-section-2">
            <ul className='list list-2'>
                <li id="foottop" >Info</li>
                <li>leader</li>
                <li>Supporter</li>
                <li>Supporter</li>
                <li>Supporter</li>
                <li>Supporter</li>
            </ul>
        </div>
        <div className="foot-section-3">
            <ul className='list list-3'>
                <li id="foottop" >mail</li>
                <li>
                    <a href="mailto:ee240002063@iiti.ac.in" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faEnvelope} className="social-icon gmail1" />
                    </a>
                </li>
                <li>
                    <a href="mailto:ep240051018@iiti.ac.in" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faEnvelope} className="social-icon gmail2" />
                    </a>
                </li>
                <li>
                    <a href="mailto:mems240005038@iiti.ac.in" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faEnvelope} className="social-icon gmail3" />
                    </a>
                </li>
                <li>
                    <a href="mailto:cse240001078@iiti.ac.in" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faEnvelope} className="social-icon gmail4" />
                    </a>
                </li>
                <li>
                    <a href="mailto:ee240002048@iiti.ac.in" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faEnvelope} className="social-icon gmail5" />
                    </a>
                </li>
            </ul>
        </div>
        <div className="foot-section-4">
            <ul className='list list-4'>
                <li id="foottop" >Visit at</li>
                <li>
                    <a href="https://www.linkedin.com/in/saharsh-chokhandre-a0748121a/? 
                    utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FontAwesomeIcon icon={faLinkedinIn} className="icon linkedin" /></a>
                    <a href="https://github.com/Saharsh525"><FontAwesomeIcon icon={faGithub} className="icon Git" /></a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/sreyan-reddy-regatte-865849314/"><FontAwesomeIcon icon={faLinkedinIn} className="icon linkedin" /></a>
                    <a href="https://github.com/SreyanReddy"><FontAwesomeIcon icon={faGithub} className="icon Git" /></a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/rathod-abhishek-349617367/"><FontAwesomeIcon icon={faLinkedinIn} className="icon linkedin" 
                    /></a>
                    <a href="https://github.com/Abhishek1175"><FontAwesomeIcon icon={faGithub} className="icon Git" /></a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/velpula-vikram-varma-3137aa339/? 
                    utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FontAwesomeIcon icon={faLinkedinIn} 
                    className="icon linkedin" /></a>
                    <a href="https://github.com/vikky737"><FontAwesomeIcon icon={faGithub} className="icon Git" /></a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/pankaj-kumar-yadav-110037331/? 
                    utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FontAwesomeIcon icon={faLinkedinIn} 
                    className="icon linkedin" /></a>
                    <a href="https://github.com/Pankajydv123"><FontAwesomeIcon icon={faGithub} className="icon Git" /></a>
                </li>
            </ul>
        </div>
    </div>
    <hr />
    <div className="down">
        <div className="downHead">
            <img src={Logo} alt="GenAi logo" style={{width:"3.2vw"}} />
            <h1>Progen</h1>
        </div>
        <div className="downPara">
            <p>
            We are building the future of digital content creation with cutting-edge generative AI. Our platform enables users to seamlessly edit   
            photos and videos, enhance visuals, apply intelligent effects, and explore artistic possibilities—without complex tools. Whether you’re 
            a creator, editor, or storyteller, our technology helps you bring your vision to life faster and smarter.
        </p>
        </div>
    </div>
    <div className="last">
        <a href="/">FAQ</a> 
        <div className="verticalLine"></div>
        <a href="/">Contact Us</a>
        <div className="verticalLine"></div>
        <a href="/">Refund Policy</a>
        <div className="verticalLine"></div>
        <a href="/">Privacy Policy</a>
        <div className="verticalLine"></div>
        <a href="/">Terms of use</a>
        <div className="verticalLine"></div>
        <a href="/">&copy; 2025 | Progen AI</a>
    </div>
    </div>
  )
}
