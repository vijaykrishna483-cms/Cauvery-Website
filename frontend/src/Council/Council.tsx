import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import './Council.css';

const councilMembers = [
  {
    name: 'Annapureddy Suresh',
    position: 'Hostel Warden',
    image: 'dp.jpg',
    mobile: '123-456-7890',
    social: {
      facebook: 'https://facebook.com/suresh',
      twitter: 'https://twitter.com/suresh',
      linkedin: 'https://linkedin.com/in/suresh',
      instagram: 'https://instagram.com/suresh',
    },
  },
  {
    name: 'Sanjeev SS',
    position: 'General Secretary',
    image: 'dp.jpg',
    mobile: '234-567-8901',
    social: {
      facebook: 'https://facebook.com/sanjeev',
      twitter: 'https://twitter.com/sanjeev',
      linkedin: 'https://linkedin.com/in/sanjeev',
      instagram: 'https://instagram.com/sanjeev',
    },
  },
  // Add more members as needed
];

const Council = () => {
  return (
    <div className="container">
      <div className="row">
        {councilMembers.map((member, index) => (
          <div key={index} className="col-md-3 col-sm-6">
            <div className="our-team">
              <div className="pic">
                <img src={member.image} alt={member.name} />
                <ul className="social">
                  {member.social.facebook && (
                    <li>
                      <a href={member.social.facebook} target="_blank" rel="noopener noreferrer">
                        <FaFacebookF />
                      </a>
                    </li>
                  )}
                  {member.social.twitter && (
                    <li>
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                      </a>
                    </li>
                  )}
                  {member.social.linkedin && (
                    <li>
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <FaLinkedinIn />
                      </a>
                    </li>
                  )}
                  {member.social.instagram && (
                    <li>
                      <a href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
              <div className="team-content">
                <div className="team-info">
                  <h3 className="title">{member.name}</h3>
                  <span className="post">{member.position}</span>
                  <p className="member-mobile">{member.mobile}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Council;
