import React, { FC, useContext, useEffect, useState } from 'react';
import { history, TokenCtx } from '../../App';
import { IUseAuth } from '../../hooks/useAuth';

interface IProps {}

const ProfilePage: FC<IProps> = () => {
  const [user, setUser] = useState({ username: '' });

  const [token, setToken] = useContext<IUseAuth>(TokenCtx);

  useEffect(() => {
    const getProfile = async () => {
      if (token.jwt_token) {
        const result = await fetch('http://localhost:8000/api/profile', {
          headers: {
            Authorization: `Bearer ${token.jwt_token}`
          }
        });
        const json = await result.json();
        setUser(json);
      } else {
        history.push('/login');
      }
    };

    getProfile();
  }, [token.jwt_token]);

  return (
    <div className="container">
      <h2>Profile Page</h2>
      <p>Hello {user.username}! </p>
      <p>This is a protected site only accessible with a valid JWT Token.</p>
    </div>
  );
};

export default ProfilePage;
