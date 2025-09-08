import React from 'react';
import InfiniteScroller from '../InfiniteScroller/InfiniteScroller';
import './PartnersSection.css';


import logo1 from '../../assets/cep.jpg';
import logo2 from '../../assets/atha.jpg';
import logo3 from '../../assets/hb.jpg';
import logo4 from '../../assets/helping.jpg';
// import logoMarriott from '../../assets/marriot-logo.png';
// import logoRwandair from '../../assets/rwandair.jpg';
// import logoIhuzo from '../../assets/ihuzo.jpg';


const partners = [
  { name: 'CEP', logo: logo1 },
  { name: 'MTN Rwanda', logo: logo2 },
  { name: 'Bank of Kigali', logo: logo3 },
  { name: 'Helping Heart', logo: logo4 },
  // { name: 'Kigali Marriott Hotel', logo: logoMarriott },
  // { name: 'RwandAir', logo: logoRwandair },
  // { name: 'Ihuzo', logo: logoIhuzo },
 
];

const PartnersSection = () => {
  return (
    <section className="partners-section">
      <div className="container">
        <h2 className="scroller-title">Trusted By & Companies We've Worked With</h2>
      </div>
      <InfiniteScroller>
        {partners.map((partner, index) => (
          
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