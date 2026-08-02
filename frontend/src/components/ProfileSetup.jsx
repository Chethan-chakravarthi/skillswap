import React, { useState, useEffect } from 'react';
import { User, AlignLeft, Award, BookOpen, Globe, Upload } from 'lucide-react';
import './ProfileSetup.css';

const ProfileSetup = ({ userEmail, onComplete }) => {
  const [fullName, setFullName] = useState('Chethan');
  const [bio, setBio] = useState('');
  const [teachSkill, setTeachSkill] = useState('');
  const [learnSkill, setLearnSkill] = useState('');
  const [language, setLanguage] = useState('');
  const [avatarText, setAvatarText] = useState('C');
  const [avatarColor, setAvatarColor] = useState('#a855f7'); // default purple from mockup

  // Auto-fill details based on email
  useEffect(() => {
    if (userEmail) {
      if (userEmail.startsWith('chethan')) {
        setFullName('Chethan');
        setAvatarText('C');
      } else {
        const namePart = userEmail.split('@')[0];
        setFullName(namePart.charAt(0).toUpperCase() + namePart.slice(1));
        setAvatarText(namePart.charAt(0).toUpperCase());
      }
    }
  }, [userEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save profile settings to localStorage
    const profile = {
      fullName,
      bio,
      teachSkills: teachSkill ? [teachSkill] : ['Java'],
      learnSkills: learnSkill ? [learnSkill] : ['Guitar'],
      languages: language ? [language] : ['English'],
      photoUrl: '', // mock photo
      avatarText,
      avatarColor,
      points: 200 // Welcome points
    };
    
    localStorage.setItem(`skillswap_profile_${userEmail}`, JSON.stringify(profile));
    
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="profile-setup-container">
      <div className="profile-setup-card-container">
        
        {/* Set Up Your Profile Box (Image 2 style) */}
        <div className="setup-glass-card">
          <h2 className="setup-card-title">Set Up Your Profile</h2>
          
          <form onSubmit={handleSubmit} className="setup-form-element">
            {/* Input 1: Name */}
            <div className="setup-input-wrapper">
              <User size={18} className="setup-field-icon" />
              <input 
                type="text" 
                className="setup-field-input"
                placeholder="Name" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {/* Input 2: Short bio */}
            <div className="setup-input-wrapper textarea-wrapper">
              <AlignLeft size={18} className="setup-field-icon textarea-icon" />
              <textarea 
                className="setup-field-input setup-textarea"
                placeholder="Short bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
              />
            </div>

            {/* Dropdown 1: Skills to teach */}
            <div className="setup-input-wrapper">
              <Award size={18} className="setup-field-icon" />
              <select 
                className="setup-field-input setup-select"
                value={teachSkill}
                onChange={(e) => setTeachSkill(e.target.value)}
                required
              >
                <option value="" disabled>Skills you want to teach*</option>
                <option value="Java">Java (Technology)</option>
                <option value="Python">Python (Technology)</option>
                <option value="AWS">AWS (Technology)</option>
                <option value="AI">AI (Technology)</option>
                <option value="Singing">Singing (Music)</option>
                <option value="Guitar">Guitar (Music)</option>
                <option value="Painting">Painting (Arts)</option>
                <option value="Salsa">Salsa (Dance)</option>
                <option value="Baking">Baking (Cooking)</option>
                <option value="Japanese">Japanese (Languages)</option>
                <option value="DSLR">DSLR (Photography)</option>
                <option value="Cricket">Cricket (Sports)</option>
              </select>
            </div>

            {/* Dropdown 2: Skills to learn */}
            <div className="setup-input-wrapper">
              <BookOpen size={18} className="setup-field-icon" />
              <select 
                className="setup-field-input setup-select"
                value={learnSkill}
                onChange={(e) => setLearnSkill(e.target.value)}
                required
              >
                <option value="" disabled>Skills you want to learn*</option>
                <option value="Guitar">Guitar (Music)</option>
                <option value="Piano">Piano (Music)</option>
                <option value="Baking">Baking (Cooking)</option>
                <option value="Painting">Painting (Arts)</option>
                <option value="Salsa">Salsa (Dance)</option>
                <option value="Java">Java (Technology)</option>
                <option value="Japanese">Japanese (Languages)</option>
                <option value="Cricket">Cricket (Sports)</option>
                <option value="Chess">Chess (Sports)</option>
                <option value="Yoga">Yoga (Fitness)</option>
              </select>
            </div>

            {/* Dropdown 3: Languages speak */}
            <div className="setup-input-wrapper">
              <Globe size={18} className="setup-field-icon" />
              <select 
                className="setup-field-input setup-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                required
              >
                <option value="" disabled>Languages you speak*</option>
                <option value="English">English</option>
                <option value="Telugu">Telugu</option>
                <option value="Hindi">Hindi</option>
                <option value="Japanese">Japanese</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>

            {/* Photo setup picker */}
            <div className="setup-photo-block">
              <div className="photo-lbl-row">
                <Upload size={14} />
                <span>Using Google photo — click to change</span>
              </div>
              <div 
                className="setup-photo-avatar-circle"
                style={{ backgroundColor: avatarColor }}
                onClick={() => {
                  // Cycle color mock photo change
                  const colors = ['#a855f7', '#ec4899', '#10b981', '#3b82f6', '#f59e0b'];
                  const randomCol = colors[Math.floor(Math.random() * colors.length)];
                  setAvatarColor(randomCol);
                }}
              >
                {avatarText}
              </div>
            </div>

            {/* Submit button */}
            <button type="submit" className="setup-continue-btn">
              Continue
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProfileSetup;
