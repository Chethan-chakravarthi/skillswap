import React from 'react';
import { ArrowRight, Award, Flame, Zap } from 'lucide-react';
import './LandingPage.css';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="landing-page-container">
      {/* Mesh background glow elements */}
      <div className="landing-bg-glow glow-1"></div>
      <div className="landing-bg-glow glow-2"></div>
      
      {/* Header Navigation Bar */}
      <header className="landing-header">
        <div className="landing-logo">
          {/* Dotted cluster logo mimicking Image 3 */}
          <div className="logo-icon-cluster">
            <span className="dot dot-1"></span>
            <span className="dot dot-2"></span>
            <span className="dot dot-3"></span>
            <span className="dot dot-4"></span>
            <span className="dot dot-5"></span>
          </div>
          <span className="logo-text">SkillSwap</span>
        </div>

        <nav className="landing-nav-links">
          <div className="nav-dropdown">
            <span>Product</span> <span className="dropdown-arrow">▼</span>
          </div>
          <div className="nav-dropdown">
            <span>Company</span> <span className="dropdown-arrow">▼</span>
          </div>
          <div className="nav-dropdown">
            <span>Resources</span> <span className="dropdown-arrow">▼</span>
          </div>
          <div className="nav-dropdown">
            <span>Legal</span> <span className="dropdown-arrow">▼</span>
          </div>
        </nav>

        <button className="get-started-btn-header" onClick={onGetStarted}>
          Get started
        </button>
      </header>

      {/* Hero Content Section */}
      <main className="landing-hero-content">
        {/* Floating Background Panels (Activity & Badges from Mockup Background) */}
        <div className="hero-floating-elements">
          {/* Mock Activity Circle Panel */}
          <div className="floating-card activity-card-mock">
            <div className="card-header-mock">
              <span>Activity</span>
              <span className="time-select-mock">All time ▾</span>
            </div>
            <div className="chart-wrapper-mock">
              <svg viewBox="0 0 100 100" className="circular-chart-mock">
                <circle className="circle-bg-mock" cx="50" cy="50" r="40" />
                <circle className="circle-progress-mock" strokeDasharray="70, 100" cx="50" cy="50" r="40" />
              </svg>
              <div className="chart-center-text-mock">
                <span className="chart-lbl-mock">Total</span>
                <span className="chart-val-mock">30h 45m</span>
              </div>
            </div>
            <div className="chart-legend-mock">
              <span className="legend-item-mock"><span className="legend-dot learning-dot"></span> Learning: 10h 30m</span>
              <span className="legend-item-mock"><span className="legend-dot teaching-dot"></span> Teaching: 20h 15m</span>
            </div>
          </div>

          {/* Mock Badges Achievement Panel */}
          <div className="floating-card badges-card-mock">
            <div className="card-header-mock">
              <span>Badges</span>
              <span className="see-all-mock">see all</span>
            </div>
            <div className="badges-grid-mock">
              <div className="badge-item-mock badge-glow-purple">
                <div className="badge-icon-frame-mock"><Zap size={22} /></div>
                <span className="badge-title-mock">GOOD START</span>
              </div>
              <div className="badge-item-mock badge-glow-blue">
                <div className="badge-icon-frame-mock"><Flame size={22} /></div>
                <span className="badge-title-mock">7 DAYS</span>
              </div>
              <div className="badge-item-mock badge-glow-silver">
                <div className="badge-icon-frame-mock"><Award size={22} /></div>
                <span className="badge-title-mock">PRO LEVEL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="hero-text-box">
          <h1 className="hero-title">
            Learn anything.<br />
            Teach what you love.
          </h1>
          <p className="hero-description">
            A global platform where people exchange skills instead of money. Real-time AI matching.
            No fees, no gatekeeping — just human connection and meaningful growth.
          </p>

          <div className="hero-actions">
            <button className="hero-btn-primary" onClick={onGetStarted}>
              Get started <ArrowRight size={16} style={{ marginLeft: '8px' }} />
            </button>
            <button className="hero-btn-secondary" onClick={onGetStarted}>
              Explore features
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
