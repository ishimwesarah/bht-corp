import React from 'react';
import InfiniteScroller from '../InfiniteScroller/InfiniteScroller';
import './PartnersSection.css';


import logoRDB from '../../assets/rdb.png';
import logoMTN from '../../assets/mtn-logo.png';
import logoBK from '../../assets/bank of kigali.png';
import logoMarriott from '../../assets/marriot-logo.png';
import logoRwandair from '../../assets/rwandair.jpg';
import logoIhuzo from '../../assets/ihuzo.jpg';

// --- UPDATE THE DATA ARRAY ---
const partners = [
  { name: 'Rwanda Development Board', logo: logoRDB },
  { name: 'MTN Rwanda', logo: logoMTN },
  { name: 'Bank of Kigali', logo: logoBK },
  { name: 'Kigali Marriott Hotel', logo: logoMarriott },
  { name: 'RwandAir', logo: logoRwandair },
  { name: 'Ihuzo', logo: logoIhuzo },
  // Add more partners here as needed
];

const PartnersSection = () => {
  return (
    <section className="partners-section">
      <div className="container">
        <h2 className="scroller-title">Trusted By & Companies We've Worked With</h2>
      </div>
      <InfiniteScroller>
        {partners.map((partner, index) => (
          // The container now holds an <img> tag instead of an icon
          <div key={index} className="partner-logo-container">
            <img 
              src={partner.logo} 
              alt={`${partner.name} logo`} 
              className="partner-logo" 
            />
          </div>
        ))}
      </InfiniteScroller>
    </section>
  );
};

export default PartnersSection;