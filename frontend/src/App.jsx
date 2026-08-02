import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import ProfileSetup from './components/ProfileSetup';
import Dashboard from './components/Dashboard';
import { checkBackendStatus } from './api';

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing'); // 'landing' | 'login' | 'profile-setup' | 'dashboard'
  const [userEmail, setUserEmail] = useState('');
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking' | 'online' | 'offline'

  // Lightweight connectivity check against the backend's /api/status endpoint.
  useEffect(() => {
    checkBackendStatus()
      .then(() => setBackendStatus('online'))
      .catch(() => setBackendStatus('offline'));
  }, []);

  // Check user session and profile setup on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('skillswap_current_user');
    if (savedUser) {
      setUserEmail(savedUser);
      
      // Check if user has completed their profile
      const savedProfile = localStorage.getItem(`skillswap_profile_${savedUser}`);
      if (savedProfile) {
        setCurrentScreen('dashboard');
      } else {
        setCurrentScreen('profile-setup');
      }
    } else {
      setCurrentScreen('landing');
    }
  }, []);

  const handleGetStarted = () => {
    setCurrentScreen('login');
  };

  const handleLoginSuccess = (email) => {
    localStorage.setItem('skillswap_current_user', email);
    setUserEmail(email);
    
    // Check if user has completed their profile
    const savedProfile = localStorage.getItem(`skillswap_profile_${email}`);
    if (savedProfile) {
      setCurrentScreen('dashboard');
    } else {
      setCurrentScreen('profile-setup');
    }
  };

  const handleProfileSetupComplete = () => {
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('skillswap_current_user');
    setUserEmail('');
    setCurrentScreen('landing');
  };

  return (
    <main>
      <h1 style={{ display: 'none' }}>SkillSwap</h1>

      <div
        title={`Backend: ${backendStatus}`}
        style={{
          position: 'fixed',
          bottom: 12,
          right: 12,
          zIndex: 9999,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: backendStatus === 'online' ? '#22c55e' : backendStatus === 'offline' ? '#ef4444' : '#a1a1aa',
        }}
      />

      {currentScreen === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
      
      {currentScreen === 'login' && (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
      
      {currentScreen === 'profile-setup' && (
        <ProfileSetup 
          userEmail={userEmail} 
          onComplete={handleProfileSetupComplete} 
          onLogout={handleLogout}
        />
      )}
      
      {currentScreen === 'dashboard' && (
        <Dashboard 
          userEmail={userEmail} 
          onLogout={handleLogout} 
        />
      )}
    </main>
  );
}

export default App;
