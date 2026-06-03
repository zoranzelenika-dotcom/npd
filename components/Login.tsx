import React from 'react';

export function Login({ onLogin }) {
  return (
    <main className="loginPage">
      <section className="loginCard">
        <div className="loginBody">
          <h2>Platform</h2>
          <h1>Log in to your account</h1>
          <p>Enter your credentials to access your workspace.</p>
          <form onSubmit={(event) => { event.preventDefault(); onLogin(); }}>
            <label className="uiField">
              <span className="uiLabel">Email address</span>
              <input className="uiInput" placeholder="name@company.com" />
            </label>
            <label className="uiField">
              <span className="uiLabel">Password</span>
              <input className="uiInput" type="password" placeholder="Enter your password" />
            </label>
            <button className="uiButton uiButtonPrimary">Log in</button>
            <div className="loginRow">
              <label><input type="checkbox" /> Remember me</label>
              <a>Forgot password?</a>
            </div>
          </form>
        </div>
        <footer>
          <b>New to Platform?</b>
          <button className="uiButton">Create account</button>
        </footer>
      </section>
    </main>
  );
}
