// pages/400.js
import React from 'react';

const BadRequest = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>400 - Bad Request</h1>
      <p>The request could not be understood by the server due to malformed syntax. Please modify your request and try again.</p>
    </div>
  );
};

export default BadRequest;
