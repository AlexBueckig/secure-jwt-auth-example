import React, { FC } from 'react';
import UsernamePasswordForm from '../../components/UsernamePasswordForm';

interface IProps {}

const RegisterPage: FC<IProps> = () => {
  const onSubmit = async (values: { username: string; password: string }) => {
    try {
      const result = await fetch(`http://localhost:8000/api/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(values)
      });
      console.log(result);

      if (result.status === 200) {
        console.log('Successfully registered!');
      } else {
        const json = await result.json();
        console.log(json);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return <UsernamePasswordForm title="Register" onSubmit={onSubmit} />;
};

export default RegisterPage;
