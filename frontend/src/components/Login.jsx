import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, X, Sparkles, User } from 'lucide-react';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [view, setView] = useState('login'); // 'login' | 'signup'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);
  
  // Custom Google OAuth popup state (Image 1)
  const [showGooglePopup, setShowGooglePopup] = useState(false);

  // Initialize a mock database of registered users in localStorage
  useEffect(() => {
    const existingUsers = localStorage.getItem('skillswap_registered_users');
    if (!existingUsers) {
      const defaultUsers = [
        { name: 'Chethan Kumar', email: 'user@skillswap.com', password: 'password123' },
        { name: 'Rahul Sharma', email: 'rahul@skillswap.com', password: 'password123' }
      ];
      localStorage.setItem('skillswap_registered_users', JSON.stringify(defaultUsers));
    }
  }, []);

  const handleToggleView = () => {
    setView(view === 'login' ? 'signup' : 'login');
    setErrorMessage('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
  };

  const getRegisteredUsers = () => {
    const usersJson = localStorage.getItem('skillswap_registered_users');
    return usersJson ? JSON.parse(usersJson) : [];
  };

  const saveRegisteredUsers = (users) => {
    localStorage.setItem('skillswap_registered_users', JSON.stringify(users));
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const users = getRegisteredUsers();

    if (view === 'login') {
      // 1. Check if user account exists
      const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!matchedUser) {
        setErrorMessage("Account doesn't exist. Please sign up first.");
        return;
      }

      // 2. Validate password
      if (matchedUser.password !== password) {
        setErrorMessage("Check your email or password");
        return;
      }

      // Successful login
      setToastText(`Welcome back, ${matchedUser.name}!`);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        if (onLoginSuccess) {
          onLoginSuccess(matchedUser.email);
        }
      }, 2000);

    } else {
      // Sign-Up validations
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }

      // Check if email already registered
      const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (userExists) {
        setErrorMessage("Account already exists. Please login instead.");
        return;
      }

      // Create new account
      const newUser = { name: fullName, email, password };
      saveRegisteredUsers([...users, newUser]);

      setToastText("Account created successfully!");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setView('login');
        setPassword('');
        setConfirmPassword('');
      }, 2000);
    }
  };

  // Google Login popup trigger (Image 1)
  const handleGoogleLogin = () => {
    setShowGooglePopup(true);
  };

  const handleGooglePopupContinue = () => {
    setShowGooglePopup(false);
    setErrorMessage('');
    
    const googleEmail = 'chethanchaitu2405@gmail.com';
    const users = getRegisteredUsers();
    
    // Auto-register if google account doesn't exist
    const userExists = users.some(u => u.email.toLowerCase() === googleEmail.toLowerCase());
    if (!userExists) {
      const newGoogleUser = { name: 'Chethan K', email: googleEmail, password: 'googlepassword123' };
      saveRegisteredUsers([...users, newGoogleUser]);
    }

    setToastText("Signed in with Google successfully!");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      if (onLoginSuccess) {
        onLoginSuccess(googleEmail);
      }
    }, 1500);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setShowForgot(false);
      setForgotEmail('');
    }, 2500);
  };

  return (
    <div className="login-page-container">

      {/* Custom Google OAuth Popup (Image 1 alignment) */}
      {showGooglePopup && (
        <div className="modal-overlay">
          <div className="google-oauth-card">
            <div className="google-oauth-domain">
              <span>34cc8.firebaseapp.com</span>
            </div>
            
            <div className="google-user-selector-row">
              <span className="google-avatar-circle-small">C</span>
              <span className="google-selected-email">chethanchaitu2405@gmail.com</span>
              <span className="dropdown-arrow-google">▼</span>
            </div>

            <div className="google-oauth-prompt-text">
              Google will allow skillswap-34cc8.firebaseapp.com to access this info about you
            </div>

            <div className="google-info-list">
              <div className="google-info-row">
                <span className="google-info-icon">👤</span>
                <div className="google-info-details">
                  <div className="google-info-title">Chethan K</div>
                  <div className="google-info-subtitle">Name and profile picture</div>
                </div>
              </div>
              <div className="google-info-row">
                <span className="google-info-icon">✉️</span>
                <div className="google-info-details">
                  <div className="google-info-title">chethanchaitu2405@gmail.com</div>
                  <div className="google-info-subtitle">Email address</div>
                </div>
              </div>
            </div>

            <div className="google-oauth-privacy-notice">
              Review skillswap-34cc8.firebaseapp.com's <span className="link-span font-semibold">Privacy Policy</span> and <span className="link-span font-semibold">Terms of Service</span> to understand how skillswap-34cc8.firebaseapp.com will process and protect your data.
            </div>

            <div className="google-oauth-footer-notice font-light">
              To make changes at any time, go to your <span className="link-span">Google Account</span>.
            </div>
            <div className="google-oauth-learn-more font-light">
              Learn more about <span className="link-span">Sign in with Google</span>.
            </div>

            <div className="google-oauth-actions">
              <button type="button" className="google-cancel-btn" onClick={() => setShowGooglePopup(false)}>
                Cancel
              </button>
              <button type="button" className="google-continue-btn" onClick={handleGooglePopupContinue}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animated Success Toast */}
      {showToast && (
        <div className="toast-success">
          <Sparkles size={16} className="toast-icon" />
          <span>{toastText}</span>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Reset Password</h3>
              <button type="button" className="close-modal-btn" onClick={() => setShowForgot(false)}>
                <X size={18} />
              </button>
            </div>
            {forgotSuccess ? (
              <div className="modal-success-message">
                <Sparkles size={18} style={{ color: '#10b981', marginBottom: '10px' }} />
                <p>A password reset link has been sent to your email.</p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="modal-form">
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', marginBottom: '20px', lineHeight: '1.4' }}>
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                <div className="input-group">
                  <Mail className="input-icon" size={18} />
                  <input
                    type="email"
                    className="input-field"
                    placeholder="Enter Email ID"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="login-btn modal-submit-btn">
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <div className="login-card">
        {/* Profile Avatar silhouette matching mock-up */}
        <div className="avatar-container">
          <svg viewBox="0 0 24 24" fill="none" className="avatar-silhouette" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
              fill="currentColor"
            />
            <path
              d="M12 14C8.66667 14 2 15.6667 2 19V21H22V19C22 15.6667 15.3333 14 12 14Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: '600', margin: '0 0 20px 0', letterSpacing: '-0.5px' }}>
          {view === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>

        {/* Error message banner */}
        {errorMessage && (
          <div className="error-banner">
            <AlertCircle size={16} className="error-icon" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          
          {/* Full Name field (Only in Sign-Up view) */}
          {view === 'signup' && (
            <div className="input-group">
              <User className="input-icon" size={18} />
              <input
                id="name-input"
                type="text"
                className="input-field"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          {/* Email input field */}
          <div className="input-group">
            <Mail className="input-icon" size={18} />
            <input
              id="email-input"
              type="email"
              className="input-field"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password input field with visibility toggle */}
          <div className="input-group password-group">
            <Lock className="input-icon" size={18} />
            <input
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password input field (Only in Sign-Up view) */}
          {view === 'signup' && (
            <div className="input-group">
              <Lock className="input-icon" size={18} />
              <input
                id="confirm-password-input"
                type="password"
                className="input-field"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          {/* Options Row (Only in Login view) */}
          {view === 'login' && (
            <div className="action-row">
              <label className="remember-me">
                <input
                  id="remember-me-checkbox"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkbox-custom"></span>
                Remember me
              </label>
              <button
                type="button"
                id="forgot-password-link"
                className="forgot-password-link-btn"
                onClick={() => setShowForgot(true)}
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Buttons */}
          <div className="button-container">
            <button type="submit" id="submit-button" className="login-btn" style={{ marginTop: view === 'signup' ? '15px' : '0' }}>
              {view === 'login' ? 'Login' : 'Sign Up'}
            </button>
            
            <button
              type="button"
              id="google-signin-button"
              className="google-sign-in-btn"
              onClick={handleGoogleLogin}
            >
              {/* Google SVG Logo */}
              <svg viewBox="0 0 24 24" className="google-logo-svg" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              {view === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
            </button>
          </div>
        </form>

        {/* View Switch Link */}
        <div style={{ marginTop: '25px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
          {view === 'login' ? (
            <>
              Don't have an account?{' '}
              <button className="forgot-password-link-btn" onClick={handleToggleView} style={{ fontStyle: 'normal', color: '#a5b4fc', textDecoration: 'underline' }}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button className="forgot-password-link-btn" onClick={handleToggleView} style={{ fontStyle: 'normal', color: '#a5b4fc', textDecoration: 'underline' }}>
                Login
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Login;
