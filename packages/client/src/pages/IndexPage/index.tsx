import React from 'react';
import Layout from '../../components/Layout';

const IndexPage = () => {
  return (
    <Layout>
      <h2>Secure Auth using JWT and Refresh-Token</h2>
      <p>
        This is a page demonstrating a secure way of authenticating with JWT without having to store the JWT in a cookie
        or localStorage but still remain login capability over multiple sessions.
      </p>
      <h3>Instructions</h3>
      <p>
        Register a new account and log in afterwards. You'll be redirected to a profile page which is only accessible
        using JWT authentication.
      </p>
      <p>Inspect network traffic for more details.</p>
    </Layout>
  );
};

export default IndexPage;
