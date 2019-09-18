import React from 'react';

const IndexPage = () => {
  return (
    <div className="container">
      <h2>Secure Auth using JWT and Refresh-Token</h2>
      <h3>TL;DR</h3>
      <p>
        This is a page demonstrating a secure way of authenticating with JWT without having to store the JWT in a cookie
        or localStorage but still remain login capability over multiple sessions.
      </p>
      <h3>How it works</h3>
      <p>
        After registering and logging in the client receives two token: 1) <strong>JWT</strong> and 2) a{' '}
        <strong>refresh_token</strong>.
      </p>
      <p>The refresh token gets saved in memory only, the refresh_token gets persisted using an httpOnly cookie.</p>
      <h3>Advantages</h3>
      <p>Test</p>
    </div>
  );
};

export default IndexPage;
