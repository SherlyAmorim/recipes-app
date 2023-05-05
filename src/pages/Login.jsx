import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [enableBtn, setEnableBtn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleEmail = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handlePassword = ({ target }) => {
    const { value } = target;
    setPassword(value);
  };

  const isValidEmail = (param) => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validEmail.test(param);
  };

  useEffect(() => {
    const maxNumber = 6;
    setEnableBtn(isValidEmail(email) && password.length > maxNumber);
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataEmail = { email };
    localStorage.setItem('user', JSON.stringify(dataEmail));
    history.push('/meals');
  };

  return (
    <form>
      <h1>Login</h1>
      <label htmlFor="email">
        <input
          type="email"
          name="email"
          data-testid="email-input"
          placeholder="Email"
          value={ email }
          onChange={ handleEmail }
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          name="password"
          data-testid="password-input"
          placeholder="Password"
          value={ password }
          onChange={ handlePassword }
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ !enableBtn }
        onClick={ handleSubmit }
      >
        Enter
      </button>
    </form>
  );
}
