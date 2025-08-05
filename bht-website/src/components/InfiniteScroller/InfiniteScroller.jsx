import React, { useEffect, useState } from 'react';
import './InfiniteScroller.css';

const InfiniteScroller = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  // We use this to prevent a flash of unstyled content on initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="scroller" data-animated={isMounted}>
      {/* The inner container holds the duplicated content */}
      <div className="scroller__inner">
        {children}
        {/* The duplicated content for the seamless loop effect */}
        {children}
      </div>
    </div>
  );
};

export default InfiniteScroller;