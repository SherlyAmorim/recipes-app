import React from 'react';

export default function Login() {
  return (
    <form>
      <h1>Login</h1>
      <label htmlFor="email">
        <input
          type="email"
          name="email"
          data-testid="email-input"
          placeholder="Email"
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          name="password"
          data-testid="password-input"
          placeholder="Password"
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </form>
  );
}
