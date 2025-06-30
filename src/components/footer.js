import React from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Assests/Logo.png';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="Footer">
        <div className='foot'>
        <div className="foot-section foot-section-1">
            <div className="item-head">Founders</div>
            <div className="item item-1">Saharsh</div>
            <div className="item item-2">Sreyan</div>
            <div className="item item-3">Abhishek</div>
            <div className="item item-4">Vikram</div>
            <div className="item item-5">Pankaj</div>
        </div>
        <div className="foot-section foot-section-2">
            <div className="item-head">Info</div>
            <div className="item item-1">leader</div>
            <div className="item item-2">Supporter</div>
            <div className="item item-3">Supporter</div>
            <div className="item item-4">Supporter</div>
            <div className="item item-5">Supporter</div>
        </div>
        <div className="foot-section foot-section-3">
            <div className="item-head">mail</div>
            <div className="item item-1">
                <a href="mailto:ee240002063@iiti.ac.in" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faEnvelope} className="social-icon gmail1" />
                </a>
            </div>
            <div className="item item-2">
                <a href="mailto:ep240051018@iiti.ac.in" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faEnvelope} className="social-icon gmail2" />
                </a>
            </div>
            <div className="item item-3">
                <a href="mailto:mems240005038@iiti.ac.in" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faEnvelope} className="social-icon gmail3" />
                </a>
            </div>
            <div className="item item-4">
                <a href="mailto:cse240001078@iiti.ac.in" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faEnvelope} className="social-icon gmail4" />
                </a>
            </div>
            <div className="item item-5">
                <a href="mailto:ee240002048@iiti.ac.in" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faEnvelope} className="social-icon gmail5" />
                </a>
            </div>
        </div>
        <div className="foot-section foot-section-4">
            <div className="item-head">
                Visit at
            </div>
            <div className="item item-1">
                <a href="https://www.linkedin.com/in/saharsh-chokhandre-a0748121a/? 
                utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FontAwesomeIcon icon={faLinkedinIn} className="icon linkedin" /></a>
                <a href="https://github.com/Saharsh525"><FontAwesomeIcon icon={faGithub} className="icon Git" /></a>
            </div>
            <div className="item item-2">
                <a href="https://www.linkedin.com/in/sreyan-reddy-regatte-865849314/"><FontAwesomeIcon icon={faLinkedinIn} className="icon linkedin" /></a>
                <a href="https://github.com/SreyanReddy"><FontAwesomeIcon icon={faGithub} className="icon Git" /></a>
            </div>
            <div className="item item-3">
                <a href="https://www.linkedin.com/in/rathod-abhishek-349617367/"><FontAwesomeIcon icon={faLinkedinIn} className="icon linkedin" 
                /></a>
                <a href="https://github.com/Abhishek1175"><FontAwesomeIcon icon={faGithub} className="icon Git" /></a>
            </div>
            <div className="item item-4">
                <a href="https://www.linkedin.com/in/velpula-vikram-varma-3137aa339/? 
                utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FontAwesomeIcon icon={faLinkedinIn} 
                className="icon linkedin" /></a>
                <a href="https://github.com/vikky737"><FontAwesomeIcon icon={faGithub} className="icon Git" /></a>
            </div>
            <div className="item item-5">
                <a href="https://www.linkedin.com/in/pankaj-kumar-yadav-110037331/? 
                utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FontAwesomeIcon icon={faLinkedinIn} 
                className="icon linkedin" /></a>
                <a href="https://github.com/Pankajydv123"><FontAwesomeIcon icon={faGithub} className="icon Git" /></a>
            </div>
        </div>
    </div>
    <hr />
    <div className="down">
        <div className="downHead">
            <img src={Logo} alt="GenAi logo" />
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
        <Link to="/FAQ">FAQ</Link> 
        <div className="verticalLine"></div>
        <Link to="/Contact">Contact Us</Link>
        <div className="verticalLine"></div>
        <Link to="/PrivacyPolicy">Privacy Policy</Link>
        <div className="verticalLine"></div>
        <Link to="/TermsOfUse">Terms of use</Link>
        <div className="verticalLine"></div>
        <Link to="#">&copy; 2025 | Progen AI</Link>
    </div>
    </div>
  )
}
