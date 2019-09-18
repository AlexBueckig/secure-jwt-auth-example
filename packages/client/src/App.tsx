import { createBrowserHistory } from 'history';
import React, { Context, createContext } from 'react';
import { Route, Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import useAuth, { IUseAuth } from './hooks/useAuth';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';

const history = createBrowserHistory();

export const TokenCtx: Context<IUseAuth | any> = createContext({});

// TODO: extract login/register function for token usage

const App: React.FC = () => {
  const [token, setToken] = useAuth();

  return (
    <TokenCtx.Provider value={[token, setToken]}>
      <Router history={history}>
        <Header loggedIn={!!token.jwt_token} />

        <Route path="/" exact component={IndexPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/profile" component={ProfilePage} />
      </Router>
    </TokenCtx.Provider>
  );
};

export { history };

export default App;
