import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    const wasLoggedIn = login(email, password);

    if (!wasLoggedIn) {
      setError('Invalid email or password.');
      return;
    }

    navigate('/home');
  }

  return (
    <main className="login-page">
      <section className="login-shell">
        <div className="login-info">
          <div className="login-brand-mark">🍂📖</div>

          <h1>Welcome Back</h1>

          <p className="login-tagline">
            Return to your reading sanctuary
          </p>

          <p className="login-intro">
            Pick up where you left off, continue tracking your progress,
            and keep building your personal bookshelf.
          </p>

          <blockquote className="login-quote">
            “There is no greater agony than bearing an untold story inside you.”
            <cite>— Maya Angelou</cite>
          </blockquote>
        </div>

        <div className="login-form-panel">
          <div className="login-decoration">— 🍂 —</div>

          <h2>Log In</h2>

          <p>
            Sign in to continue your reading journey.
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Email Address
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email Address"
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />
            </label>

            <button className="forgot-button" type="button">
              Forgot password?
            </button>

            {error && <p className="login-error">{error}</p>}

            <button type="submit">
              🍂 Enter My Reading Space
            </button>
          </form>

          <div className="divider">
            <span />
            <p>or</p>
            <span />
          </div>

          <p className="register-link">
            New to Autumn&apos;s Nook?{' '}
            <Link to="/register">
              Create Account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;