import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import './Register.css';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill out all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const wasRegistered = register({
      name,
      email,
      password,
    });

    if (!wasRegistered) {
      setError('An account with this email already exists.');
      return;
    }

    navigate('/');
  }

  return (
    <main className="register-page">
      <section className="register-shell">
        <div className="register-info">
          <div className="brand-mark">🍂📖</div>

          <h1>Autumn&apos;s Nook</h1>

          <p className="tagline">
            Your personal reading sanctuary
          </p>

          <p className="intro">
            Track your reading, organize your bookshelves, discover new
            stories, and connect with a community that loves to read.
          </p>

          <div className="feature-list">
            <article>
              <span>📚</span>
              <div>
                <h2>Organize</h2>
                <p>Build and manage your personal bookshelves with ease.</p>
              </div>
            </article>

            <article>
              <span>🔍</span>
              <div>
                <h2>Discover</h2>
                <p>Find new books and add them to your journey.</p>
              </div>
            </article>

            <article>
              <span>👥</span>
              <div>
                <h2>Connect with our Reading Community</h2>
                <p>
                  Share recommendations, join discussions, and connect with
                  fellow book lovers.
                </p>
              </div>
            </article>
          </div>

          <blockquote>
            “You can&apos;t use up creativity. The more you use, the more you
            have.”
            <cite>— Maya Angelou</cite>
          </blockquote>
        </div>

        <div className="register-form-panel">
          <div className="form-decoration">— 🍂 —</div>

          <h2>Create Your Account</h2>

          <p>
            Join Autumn&apos;s Nook and start your reading adventure today.
          </p>

          <form className="register-form" onSubmit={handleSubmit}>
            <label>
              Full Name
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Full Name"
              />
            </label>

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

            <small>Password must be at least 6 characters.</small>

            {error && <p className="register-error">{error}</p>}

            <button type="submit">
              🍂 Create My Reading Space
            </button>
          </form>

          <div className="divider">
            <span />
            <p>or</p>
            <span />
          </div>

          <p className="login-link">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
