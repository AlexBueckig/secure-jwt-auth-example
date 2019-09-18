import React, { FC, useContext } from 'react';
import { history, TokenCtx } from '../../App';
import UsernamePasswordForm from '../../components/UsernamePasswordForm';

interface IProps {}

const LoginPage: FC<IProps> = () => {
  const [token, setToken] = useContext(TokenCtx);

  const onSubmit = async (values: { username: string; password: string }) => {
    try {
      const result = await fetch(`http://localhost:8000/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(values)
      });
      const json = await result.json();
      if (result.status === 200) {
        setToken(json);
        history.push('/profile');
      } else {
        console.log(json);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return <UsernamePasswordForm title="Login" onSubmit={onSubmit} />;
};

export default LoginPage;
