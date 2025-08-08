import React, { useEffect, useState } from 'react';
import './InfiniteScroller.css';

const InfiniteScroller = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="scroller" data-animated={isMounted}>
     
      <div className="scroller__inner">
        {children}
        
        {children}
      </div>
    </div>
  );
};

export default InfiniteScroller;