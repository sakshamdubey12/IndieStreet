import React from 'react';
import Error from 'next/error';

const CustomError = ({ statusCode }) => {
  if (statusCode === 500) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>500 - Internal Server Error</h1>
        <p>Something went wrong on our end. Please try again later.</p>
      </div>
    );
  }

  return <Error statusCode={statusCode} />;
};

CustomError.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomError;
