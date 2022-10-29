import React from 'react';

const Content = ({children}) => (
  <div className='content bg-white' style={{zIndex: 0}}>
    {children}
  </div>
);

export default Content;
