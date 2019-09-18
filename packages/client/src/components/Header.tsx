import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { history, TokenCtx } from '../App';
import { IJwtTokenContext } from '../hooks/useJwtToken';

interface IProps {
  loggedIn: boolean;
}

const Header: FC<IProps> = ({ loggedIn }) => {
  const [token, setToken] = useContext<IJwtTokenContext>(TokenCtx);

  const logout = async () => {
    try {
      const result = await fetch('http://localhost:8000/api/auth/logout', { method: 'POST', credentials: 'include' });
      if (result.status === 200) {
        setToken({});
        window.localStorage.setItem('logout', Date.now().toString());
        history.push('/login');
      } else {
        console.error('Server unreachable...');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link className="logo-link" to="/">
          Secure-Auth-Example
        </Link>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {!loggedIn && (
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          )}
          {!loggedIn && (
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          )}
          {loggedIn && (
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
          )}
          {loggedIn && (
            <li className="nav-item">
              <span className="nav-link" onClick={logout}>
                Logout
              </span>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
