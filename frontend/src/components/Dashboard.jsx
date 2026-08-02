import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  Flame, 
  Bell, 
  Plus, 
  ChevronDown, 
  Sparkles,
  Send,
  X,
  Award,
  BookOpen,
  User,
  LogOut,
  AlignLeft,
  Globe
} from 'lucide-react';
import './Dashboard.css';

// Contextual lively replies dictionary
const LIVELY_REPLIES = {
  Malik: (msg) => {
    const text = msg.toLowerCase();
    if (text.includes('figma') || text.includes('ui') || text.includes('ux') || text.includes('design')) {
      return "Figma is awesome! I can teach you auto-layouts, components, and prototyping. Do you have any design projects in mind?";
    }
    if (text.includes('schedule') || text.includes('free') || text.includes('time') || text.includes('meet') || text.includes('when') || text.includes('saturday')) {
      return "I'm free this Saturday afternoon. Shall we schedule it on the calendar for 03:00 PM?";
    }
    if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
      return "Hey Chethan! Hope you're doing well. Excited to swap UI/UX for your Java lessons!";
    }
    return "Sounds good! Let's schedule a Zoom session to go over this in detail.";
  },
  Princes: (msg) => {
    const text = msg.toLowerCase();
    if (text.includes('illustrator') || text.includes('logo') || text.includes('vector') || text.includes('graphic')) {
      return "I love graphic design! We can start with logo design principles and vector pathing in Adobe Illustrator.";
    }
    if (text.includes('schedule') || text.includes('free') || text.includes('time') || text.includes('meet') || text.includes('when') || text.includes('monday')) {
      return "I can meet on Monday at 4:00 PM. Does that work for you? Let's book it.";
    }
    if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
      return "Hello! Ready to dive into Graphic Design? I want to learn more about Java backends from you.";
    }
    return "Awesome. Let's map out our syllabus for the swap session!";
  },
  Vaishnavi: (msg) => {
    const text = msg.toLowerCase();
    if (text.includes('python') || text.includes('django') || text.includes('backend')) {
      return "Python/Django backends are powerful. I can teach you REST APIs, database queries, and routing.";
    }
    if (text.includes('schedule') || text.includes('free') || text.includes('time') || text.includes('meet') || text.includes('when') || text.includes('sunday')) {
      return "Sunday morning works best for me. Let's set it up on the calendar!";
    }
    if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
      return "Hi Chethan! Ready to exchange Java for Python tips? Let know what you want to build.";
    }
    return "Perfect! Looking forward to swapping coding tips with you.";
  },
  'Rahul Sharma': (msg) => {
    const text = msg.toLowerCase();
    if (text.includes('guitar') || text.includes('sing') || text.includes('chords') || text.includes('music')) {
      return "I'd love to teach you acoustic guitar chords and fingerpicking patterns! Have you played before?";
    }
    if (text.includes('schedule') || text.includes('free') || text.includes('time') || text.includes('meet') || text.includes('when')) {
      return "How about Saturday morning? We can do a 1-hour session. Can you select the date on the Calendar?";
    }
    if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
      return "Hey Chethan! Glad we matched. Let's swap some Java knowledge for music chords!";
    }
    return "Great! Looking forward to chatting more and getting our session scheduled.";
  },
  'Sneha Reddy': (msg) => {
    const text = msg.toLowerCase();
    if (text.includes('salsa') || text.includes('dance') || text.includes('painting') || text.includes('sketch')) {
      return "Salsa dancing is incredibly fun! I can also show you canvas painting techniques. What would you like to start with?";
    }
    if (text.includes('schedule') || text.includes('free') || text.includes('time') || text.includes('meet') || text.includes('when')) {
      return "I'm free Tuesday after 6:00 PM. Let's book a date and time!";
    }
    if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
      return "Hi Chethan! Let's swap salsa dancing for your photography tips!";
    }
    return "Sounds like a solid plan. Let's make it happen!";
  },
  'Kenji Sato': (msg) => {
    const text = msg.toLowerCase();
    if (text.includes('japanese') || text.includes('language') || text.includes('chess')) {
      return "Japanese has three writing systems, but we can start with basic Hiragana and useful greetings! Or do you want to play a chess game?";
    }
    if (text.includes('schedule') || text.includes('free') || text.includes('time') || text.includes('meet') || text.includes('when')) {
      return "We can do Wednesday evening. Let's select it on the Calendar widget.";
    }
    if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
      return "Konnichiwa Chethan! Let's swap chess strategies or Japanese language tips!";
    }
    return "Hai! Let's coordinate on details.";
  },
  'Vikram Singh': (msg) => {
    const text = msg.toLowerCase();
    if (text.includes('bake') || text.includes('pizza') || text.includes('italian') || text.includes('cook')) {
      return "I can teach you how to bake authentic Italian pizzas and sourdough bread from scratch! It's all in the dough temperature.";
    }
    if (text.includes('schedule') || text.includes('free') || text.includes('time') || text.includes('meet') || text.includes('when')) {
      return "Thursday evening is cooking time! Let's schedule it.";
    }
    if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
      return "Hey Chethan! Let's swap Italian baking secrets for your Java tutorials.";
    }
    return "Benissimo! Let's set it up on the calendar.";
  }
};

const Dashboard = ({ userEmail, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'matches' | 'chat' | 'calendar' | 'progress' | 'community' | 'profile'
  const [profile, setProfile] = useState({
    fullName: 'Chethan',
    phone: '+91 98765 43210',
    bio: 'reds',
    teachSkills: ['Graphic Design', 'UI/UX Design (Figma, Sketch)'],
    learnSkills: ['Graphic Design', 'UI/UX Design (Figma, Sketch)'],
    languages: ['English'],
    avatarText: 'C',
    avatarColor: '#a855f7',
    points: 200
  });

  // Modal displays
  const [showWelcomeBonus, setShowWelcomeBonus] = useState(true);
  const [showScheduler, setShowScheduler] = useState(false);
  const [toastText, setToastText] = useState('');

  // Profile Edit states
  const [editName, setEditName] = useState('Chethan');
  const [editPhone, setEditPhone] = useState('+91 98765 43210');
  const [editBio, setEditBio] = useState('reds');
  const [editTeachSkill, setEditTeachSkill] = useState('Graphic Design, UI/UX Design (Figma, Sketch)');
  const [editLearnSkill, setEditLearnSkill] = useState('Graphic Design, UI/UX Design (Figma, Sketch)');
  const [editLanguage, setEditLanguage] = useState('English');
  const [editAvatarColor, setEditAvatarColor] = useState('#a855f7');

  // Scheduler states
  const [scheduleDate, setScheduleDate] = useState({
    day: '11',
    month: 'July',
    year: '2026',
    hour: '03',
    minute: '00',
    period: 'PM'
  });
  const [scheduleTargetUser, setScheduleTargetUser] = useState('Malik');

  // Suggestions (Matches list)
  const [suggestions, setSuggestions] = useState([
    { id: 1, name: 'Malik', teach: 'UI/UX Design (Figma, Sketch)', level: '93%', avatar: '👤', status: 'idle' },
    { id: 2, name: 'Princes', teach: 'Graphic Design', level: '93%', avatar: '🐱', status: 'idle' },
    { id: 3, name: 'Vaishnavi', teach: 'Python & Django Backend', level: '88%', avatar: '👩', status: 'idle' },
    { id: 4, name: 'Rahul Sharma', teach: 'Acoustic Guitar & Vocals', level: '95%', avatar: '🎸', status: 'idle' },
    { id: 5, name: 'Sneha Reddy', teach: 'Salsa & Acrylic Painting', level: '82%', avatar: '🎨', status: 'idle' },
    { id: 6, name: 'Kenji Sato', teach: 'Japanese Language & Chess', level: '75%', avatar: '🗣', status: 'idle' },
    { id: 7, name: 'Vikram Singh', teach: 'Italian Baking & Culinary Arts', level: '80%', avatar: '🍕', status: 'idle' }
  ]);

  // Direct Messages
  const [chats, setChats] = useState([
    { 
      id: 1, 
      name: 'Malik', 
      avatar: '👤', 
      messages: [
        { sender: 'them', text: "Hey Chethan! Ready for our swap session?", time: "11:30 AM" }
      ] 
    }
  ]);
  const [activeChatId, setActiveChatId] = useState(1);
  const [chatMessageText, setChatMessageText] = useState('');

  // Lesson list
  const [lessons, setLessons] = useState([
    { id: 1, title: 'UI/UX Design Swap with Malik', date: 'July 11, 2026', time: '03:00 PM' }
  ]);

  // Sync tab with browser URL path dynamically (pushState)
  useEffect(() => {
    const path = activeTab === 'dashboard' ? '/dashboard' : `/${activeTab}`;
    window.history.pushState({}, '', path);
  }, [activeTab]);

  // Load profile from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`skillswap_profile_${userEmail}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfile(parsed);
      setEditName(parsed.fullName);
      setEditPhone(parsed.phone || '+91 98765 43210');
      setEditBio(parsed.bio || 'reds');
      setEditAvatarColor(parsed.avatarColor || '#a855f7');
      if (parsed.teachSkills && parsed.teachSkills.length > 0) {
        setEditTeachSkill(parsed.teachSkills.join(', '));
      }
      if (parsed.learnSkills && parsed.learnSkills.length > 0) {
        setEditLearnSkill(parsed.learnSkills.join(', '));
      }
      if (parsed.languages && parsed.languages.length > 0) {
        setEditLanguage(parsed.languages[0]);
      }
    }
  }, [userEmail]);

  const triggerToast = (msg) => {
    setToastText(msg);
    setTimeout(() => setToastText(''), 2500);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...profile,
      fullName: editName,
      phone: editPhone,
      bio: editBio,
      avatarText: editName.charAt(0).toUpperCase(),
      avatarColor: editAvatarColor,
      teachSkills: editTeachSkill.split(',').map(s => s.trim()),
      learnSkills: editLearnSkill.split(',').map(s => s.trim()),
      languages: [editLanguage]
    };
    setProfile(updated);
    localStorage.setItem(`skillswap_profile_${userEmail}`, JSON.stringify(updated));
    triggerToast("Profile updated successfully!");
    setActiveTab('dashboard'); // return to dashboard
  };

  // Change avatar theme circle color
  const cycleAvatarColor = () => {
    const colors = ['#a855f7', '#ec4899', '#10b981', '#3b82f6', '#f59e0b'];
    const idx = colors.indexOf(editAvatarColor);
    const nextIdx = (idx + 1) % colors.length;
    setEditAvatarColor(colors[nextIdx]);
  };

  // Match toggle suggestions
  const handleMatchRequest = (id, name) => {
    setSuggestions(suggestions.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'idle' ? 'requested' : 'idle';
        if (nextStatus === 'requested') {
          triggerToast(`Swap request sent to ${name}!`);
        }
        return { ...s, status: nextStatus };
      }
      return s;
    }));

    // Auto accept after 3 seconds (simulating real user)
    setTimeout(() => {
      setSuggestions(prev => prev.map(s => {
        if (s.id === id && s.status === 'requested') {
          triggerToast(`${name} accepted your swap request!`);
          
          setChats(prevChats => {
            if (prevChats.some(c => c.name === name)) return prevChats;
            return [...prevChats, {
              id: Date.now(),
              name: name,
              avatar: s.avatar,
              messages: [{ sender: 'them', text: `Hi! Let's swap skills! Can we coordinate on a schedule?`, time: 'Just now' }]
            }];
          });

          return { ...s, status: 'accepted' };
        }
        return s;
      }));
    }, 3000);
  };

  // Calendar dates scheduler
  const handleCalendarCellClick = (dayNum) => {
    setScheduleDate({
      ...scheduleDate,
      day: dayNum.toString(),
      month: 'July',
      year: '2026'
    });
    setShowScheduler(true);
  };

  const handleConfirmSchedule = (e) => {
    e.preventDefault();
    const newLesson = {
      id: Date.now(),
      title: `Swap session with ${scheduleTargetUser}`,
      date: `${scheduleDate.month} ${scheduleDate.day}, ${scheduleDate.year}`,
      time: `${scheduleDate.hour}:${scheduleDate.minute} ${scheduleDate.period}`
    };
    
    setLessons([...lessons, newLesson]);
    setShowScheduler(false);
    triggerToast(`Session scheduled with ${scheduleTargetUser} on ${newLesson.date} at ${newLesson.time}!`);
  };

  // Sending lively, dynamic chat message
  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatMessageText.trim()) return;

    // 1. Add my message to chat
    const updatedChats = chats.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            { sender: 'me', text: chatMessageText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          ]
        };
      }
      return chat;
    });
    setChats(updatedChats);

    const typedMsg = chatMessageText;
    const partner = chats.find(c => c.id === activeChatId)?.name || 'Malik';
    setChatMessageText('');

    // 2. Trigger lively reply response
    setTimeout(() => {
      setChats(prev => prev.map(chat => {
        if (chat.id === activeChatId) {
          const replyGen = LIVELY_REPLIES[partner] || LIVELY_REPLIES['Malik'];
          const replyText = replyGen(typedMsg);
          return {
            ...chat,
            messages: [
              ...chat.messages,
              { sender: 'them', text: replyText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            ]
          };
        }
        return chat;
      }));
    }, 1500);
  };

  const selectedChat = chats.find(c => c.id === activeChatId);

  return (
    <div className="dashboard-page-container">
      {/* Toast notifications */}
      {toastText && (
        <div className="toast-success dashboard-toast">
          <Sparkles size={16} className="toast-icon" />
          <span>{toastText}</span>
        </div>
      )}

      {/* Welcome Bonus popup */}
      {showWelcomeBonus && (
        <div className="modal-overlay">
          <div className="welcome-bonus-modal">
            <h3 className="welcome-bonus-title">Welcome Bonus!</h3>
            <div className="bonus-coin-container">
              <svg viewBox="0 0 100 100" className="bonus-coin-svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="8" />
                <circle cx="50" cy="50" r="35" fill="#1e3a8a" />
                <circle cx="50" cy="50" r="12" fill="#3b82f6" />
                <circle cx="35" cy="40" r="4" fill="#60a5fa" />
                <circle cx="65" cy="40" r="4" fill="#60a5fa" />
                <circle cx="35" cy="60" r="4" fill="#60a5fa" />
                <circle cx="65" cy="60" r="4" fill="#60a5fa" />
              </svg>
              <div className="bonus-coin-amount">+200 SP</div>
            </div>
            <p className="welcome-bonus-desc">
              You just received a welcome gift. Enjoy swapping! 🎉
            </p>
            <button className="bonus-awesome-btn" onClick={() => setShowWelcomeBonus(false)}>
              Awesome!
            </button>
          </div>
        </div>
      )}

      {/* Scheduler Modal */}
      {showScheduler && (
        <div className="modal-overlay">
          <div className="scheduler-glass-card">
            <div className="scheduler-header">
              <h3>Schedule Lesson Swap</h3>
              <button className="close-editor-btn" onClick={() => setShowScheduler(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleConfirmSchedule} className="scheduler-form">
              <div className="form-input-group">
                <label>Swap Partner</label>
                <select 
                  className="scheduler-select-input"
                  value={scheduleTargetUser}
                  onChange={(e) => setScheduleTargetUser(e.target.value)}
                >
                  <option value="Malik">Malik (UI/UX Design)</option>
                  <option value="Princes">Princes (Graphic Design)</option>
                  <option value="Vaishnavi">Vaishnavi (Python)</option>
                </select>
              </div>

              {/* Date Inputs */}
              <div className="scheduler-datetime-grid">
                <div className="form-input-group">
                  <label>Day</label>
                  <select 
                    value={scheduleDate.day}
                    onChange={(e) => setScheduleDate({ ...scheduleDate, day: e.target.value })}
                  >
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i+1} value={String(i+1).padStart(2, '0')}>{i+1}</option>
                    ))}
                  </select>
                </div>
                <div className="form-input-group">
                  <label>Month</label>
                  <select 
                    value={scheduleDate.month}
                    onChange={(e) => setScheduleDate({ ...scheduleDate, month: e.target.value })}
                  >
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
                <div className="form-input-group">
                  <label>Year</label>
                  <select 
                    value={scheduleDate.year}
                    onChange={(e) => setScheduleDate({ ...scheduleDate, year: e.target.value })}
                  >
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                  </select>
                </div>
              </div>

              {/* Time Inputs */}
              <div className="scheduler-datetime-grid">
                <div className="form-input-group">
                  <label>Hour</label>
                  <select 
                    value={scheduleDate.hour}
                    onChange={(e) => setScheduleDate({ ...scheduleDate, hour: e.target.value })}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i+1} value={String(i+1).padStart(2, '0')}>{String(i+1).padStart(2, '0')}</option>
                    ))}
                  </select>
                </div>
                <div className="form-input-group">
                  <label>Minute</label>
                  <select 
                    value={scheduleDate.minute}
                    onChange={(e) => setScheduleDate({ ...scheduleDate, minute: e.target.value })}
                  >
                    <option value="00">00</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                  </select>
                </div>
                <div className="form-input-group">
                  <label>AM/PM</label>
                  <select 
                    value={scheduleDate.period}
                    onChange={(e) => setScheduleDate({ ...scheduleDate, period: e.target.value })}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="save-profile-btn editor-save-btn">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <header className="dashboard-header-bar">
        <div className="dashboard-logo" onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon-cluster">
            <span className="dot dot-1"></span>
            <span className="dot dot-2"></span>
            <span className="dot dot-3"></span>
            <span className="dot dot-4"></span>
            <span className="dot dot-5"></span>
          </div>
          <span className="logo-text">SkillSwap</span>
        </div>

        {/* 200 SP Points Badge */}
        <div className="header-points-badge" onClick={() => triggerToast("Add points: Billing feature coming soon!")}>
          <div className="points-coin-small">
            <svg viewBox="0 0 100 100" className="points-coin-svg-small">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#60a5fa" strokeWidth="8" />
              <circle cx="50" cy="50" r="35" fill="#1d4ed8" />
              <circle cx="50" cy="50" r="10" fill="#60a5fa" />
            </svg>
          </div>
          <span className="points-value-text">{profile.points} SP</span>
          <div className="points-add-btn">
            <Plus size={12} />
          </div>
        </div>

        {/* Profile menu */}
        <div className="header-profile-section">
          <button className="header-bell-btn" onClick={() => triggerToast("You have no new notifications.")}>
            <Bell size={20} />
            <span className="bell-red-badge"></span>
          </button>
          
          <div className="header-profile-menu-container" onClick={() => setActiveTab('profile')}>
            <div 
              className="header-avatar-circle"
              style={{ backgroundColor: profile.avatarColor }}
              title="Click to edit profile"
            >
              {profile.avatarText}
            </div>
            <div className="header-username-wrapper">
              <span className="header-username-lbl">{profile.fullName}</span>
              <ChevronDown size={14} className="username-chevron" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid: Sidebar + Workspace */}
      <div className="dashboard-layout">
        
        {/* Left Sidebar */}
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'matches' ? 'active' : ''}`}
              onClick={() => setActiveTab('matches')}
            >
              <Users size={18} />
              <span>Matches</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              <MessageSquare size={18} />
              <span>Chat</span>
              <span className="nav-badge green-badge">Live</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`}
              onClick={() => setActiveTab('calendar')}
            >
              <CalendarIcon size={18} />
              <span>Calendar</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'progress' ? 'active' : ''}`}
              onClick={() => setActiveTab('progress')}
            >
              <TrendingUp size={18} />
              <span>Progress</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'community' ? 'active' : ''}`}
              onClick={() => setActiveTab('community')}
            >
              <Award size={18} />
              <span>Community</span>
            </button>
          </nav>

          <div className="sidebar-footer">
            <button className="logout-btn-sidebar" onClick={onLogout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Right content workspace */}
        <main className="dashboard-content">
          
          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="tab-pane dashboard-home-pane">
              <div className="dashboard-two-column-grid">
                
                {/* Left Side: Activity circle progress chart */}
                <div className="grid-card activity-chart-glass-card">
                  <div className="grid-card-header">
                    <h3>Activity</h3>
                    <span className="time-select-mock">All time ▾</span>
                  </div>

                  <div className="chart-center-wrapper">
                    <svg viewBox="0 0 100 100" className="dashboard-circular-svg">
                      <circle className="circle-bg-mock" cx="50" cy="50" r="40" />
                      <circle className="circle-progress-mock" strokeDasharray="68, 100" cx="50" cy="50" r="40" />
                    </svg>
                    <div className="circular-center-labels">
                      <span className="lbl-mock">Total</span>
                      <span className="val-mock">30h 45m</span>
                    </div>
                  </div>

                  <div className="circular-legends-list">
                    <div className="legend-row">
                      <span className="legend-marker marker-learning"></span>
                      <span className="legend-desc-text">Hours spent on learning: <strong>10h 30m</strong></span>
                    </div>
                    <div className="legend-row">
                      <span className="legend-marker marker-teaching"></span>
                      <span className="legend-desc-text">Hours spent on teaching: <strong>20h 15m</strong></span>
                    </div>
                  </div>
                </div>

                {/* Right Side: July 2026 Calendar Grid card */}
                <div className="grid-card calendar-glass-card">
                  <div className="calendar-card-header">
                    <span className="cal-prev-btn">◀</span>
                    <h3 className="calendar-card-title">July 2026</h3>
                    <span className="cal-next-btn">▶</span>
                  </div>

                  <div className="calendar-grid-wrapper">
                    <div className="cal-weekday">Mon</div>
                    <div className="cal-weekday">Tue</div>
                    <div className="cal-weekday">Wed</div>
                    <div className="cal-weekday">Thu</div>
                    <div className="cal-weekday">Fri</div>
                    <div className="cal-weekday">Sat</div>
                    <div className="cal-weekday">Sun</div>

                    <div className="cal-cell empty">29</div>
                    <div className="cal-cell empty">30</div>
                    
                    {Array.from({ length: 31 }, (_, i) => {
                      const dayNum = i + 1;
                      const hasScheduled = lessons.some(l => l.date.includes(`July ${dayNum}`));
                      return (
                        <div 
                          key={dayNum} 
                          className={`cal-cell ${hasScheduled ? 'scheduled-date' : ''}`}
                          onClick={() => handleCalendarCellClick(dayNum)}
                          title="Click date to schedule a lesson!"
                        >
                          {dayNum}
                        </div>
                      );
                    })}
                  </div>
                  <div className="calendar-card-footer">
                    <span className="cal-footer-icon">📅</span>
                    <span>Click any date cell to schedule a session</span>
                  </div>
                </div>
              </div>

              {/* Suggestions matches grid (Image 5 style) */}
              <div className="grid-card matches-suggestions-block">
                <div className="grid-card-header">
                  <h3>Matches</h3>
                  <button className="link-action-btn" onClick={() => setActiveTab('matches')}>see all</button>
                </div>

                <div className="suggestions-cards-layout">
                  {suggestions.map((sug) => (
                    <div key={sug.id} className="suggested-user-card">
                      <div className="sug-avatar-circle">{sug.avatar}</div>
                      <h4 className="sug-username">{sug.name}</h4>
                      <p className="sug-teach-desc">
                        {sug.name} can teach you:
                        <span className="sug-tag-pill">{sug.teach}</span>
                      </p>
                      <div className="sug-match-level">
                        <div className="match-level-lbl">Match level:</div>
                        <div className="match-level-val">{sug.level}</div>
                      </div>
                      {sug.status === 'accepted' ? (
                        <button className="sug-match-btn-connected" onClick={() => setActiveTab('chat')}>
                          Start Chatting 💬
                        </button>
                      ) : sug.status === 'requested' ? (
                        <button className="sug-match-btn-requested" onClick={() => handleMatchRequest(sug.id, sug.name)}>
                          Requested
                        </button>
                      ) : (
                        <button className="sug-match-btn" onClick={() => handleMatchRequest(sug.id, sug.name)}>
                          Match
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: MATCHES */}
          {activeTab === 'matches' && (
            <div className="tab-pane matches-pane">
              <div className="grid-card full-width-card">
                <div className="grid-card-header">
                  <h3>Suggestions Recommendations</h3>
                  <span className="header-subtitle">Click "Match" to request connections, just like Instagram profiles.</span>
                </div>
                <div className="suggestions-cards-layout" style={{ marginTop: '20px' }}>
                  {suggestions.map((sug) => (
                    <div key={sug.id} className="suggested-user-card">
                      <div className="sug-avatar-circle">{sug.avatar}</div>
                      <h4 className="sug-username">{sug.name}</h4>
                      <p className="sug-teach-desc">
                        {sug.name} can teach you:
                        <span className="sug-tag-pill">{sug.teach}</span>
                      </p>
                      <div className="sug-match-level">
                        <div className="match-level-lbl">Match level:</div>
                        <div className="match-level-val">{sug.level}</div>
                      </div>
                      {sug.status === 'accepted' ? (
                        <button className="sug-match-btn-connected" onClick={() => setActiveTab('chat')}>
                          Start Chatting 💬
                        </button>
                      ) : sug.status === 'requested' ? (
                        <button className="sug-match-btn-requested" onClick={() => handleMatchRequest(sug.id, sug.name)}>
                          Requested
                        </button>
                      ) : (
                        <button className="sug-match-btn" onClick={() => handleMatchRequest(sug.id, sug.name)}>
                          Match
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: CHAT (Lively conversations) */}
          {activeTab === 'chat' && (
            <div className="tab-pane chat-pane">
              <div className="dashboard-chat-wrapper-grid">
                <div className="chat-left-connections-sidebar">
                  <div className="chat-list-header">
                    <h4>Direct Messages</h4>
                  </div>
                  <div className="chat-sidebar-users-list">
                    {chats.map(c => (
                      <div 
                        key={c.id}
                        className={`chat-sidebar-user-row ${activeChatId === c.id ? 'active' : ''}`}
                        onClick={() => setActiveChatId(c.id)}
                      >
                        <div className="chat-user-row-avatar">{c.avatar}</div>
                        <div className="chat-user-row-info">
                          <strong>{c.name}</strong>
                          <p className="last-msg-snippet">
                            {c.messages.length > 0 ? c.messages[c.messages.length - 1].text : 'Start chatting'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="chat-right-window-thread">
                  {selectedChat ? (
                    <>
                      <div className="chat-window-header">
                        <div className="chat-header-avatar-circle">{selectedChat.avatar}</div>
                        <div className="chat-header-name">
                          <h4>{selectedChat.name}</h4>
                          <span className="online-badge-text">Connected</span>
                        </div>
                      </div>

                      <div className="chat-window-messages-list">
                        {selectedChat.messages.map((m, idx) => (
                          <div key={idx} className={`chat-bubble-row ${m.sender}`}>
                            <div className="chat-bubble">
                              <p>{m.text}</p>
                              <span className="bubble-time-text">{m.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handleSendChatMessage} className="chat-window-input-form">
                        <input 
                          type="text" 
                          placeholder="Type your message..." 
                          value={chatMessageText}
                          onChange={(e) => setChatMessageText(e.target.value)}
                        />
                        <button type="submit" className="chat-send-btn">
                          <Send size={16} />
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="empty-chat-state">
                      <MessageSquare size={48} style={{ opacity: 0.2, marginBottom: '15px' }} />
                      <p>Select a chat swapper to exchange ideas.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: CALENDAR SCHEDULER VIEW */}
          {activeTab === 'calendar' && (
            <div className="tab-pane calendar-pane">
              <div className="grid-card full-width-card">
                <div className="grid-card-header">
                  <h3>Lessons Calendar Scheduler</h3>
                  <button className="setup-continue-btn" style={{ padding: '10px 20px', borderRadius: '15px' }} onClick={() => setShowScheduler(true)}>
                    Schedule New Swap
                  </button>
                </div>
                <div className="scheduled-lessons-list" style={{ marginTop: '20px' }}>
                  <h4>Scheduled Lesson Swaps:</h4>
                  {lessons.length === 0 ? (
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', marginTop: '10px' }}>No scheduled lessons yet.</p>
                  ) : (
                    <div className="lessons-grid-timeline" style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {lessons.map(l => (
                        <div key={l.id} className="scheduled-lesson-item-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span style={{ fontSize: '24px' }}>📅</span>
                            <div>
                              <h5 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '500' }}>{l.title}</h5>
                              <p style={{ margin: '0', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Scheduled on {l.date}</p>
                            </div>
                          </div>
                          <span style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#60a5fa', padding: '6px 14px', borderRadius: '12px', fontSize: '13px' }}>
                            {l.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: PROGRESS */}
          {activeTab === 'progress' && (
            <div className="tab-pane progress-pane">
              <div className="grid-card full-width-card">
                <div className="grid-card-header">
                  <h3>Swap Progress tracker</h3>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>
                  Progress metrics, badges, and certificates are tracked automatically as you complete swap lessons.
                </p>
                <div className="badges-grid-mock" style={{ marginTop: '30px', maxWidth: '400px' }}>
                  <div className="badge-item-mock badge-glow-purple">
                    <div className="badge-icon-frame-mock" style={{ width: '70px', height: '70px' }}><Sparkles size={32} /></div>
                    <span className="badge-title-mock" style={{ fontSize: '12px' }}>GOOD START</span>
                  </div>
                  <div className="badge-item-mock badge-glow-blue">
                    <div className="badge-icon-frame-mock" style={{ width: '70px', height: '70px' }}><Flame size={32} /></div>
                    <span className="badge-title-mock" style={{ fontSize: '12px' }}>7 DAYS STREAK</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: COMMUNITY */}
          {activeTab === 'community' && (
            <div className="tab-pane community-pane">
              <div className="grid-card full-width-card">
                <div className="grid-card-header">
                  <h3>SkillSwap Community</h3>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>
                  Explore global swap topics, forums, and join local groups.
                </p>
              </div>
            </div>
          )}

          {/* 6. TAB: PROFILE WRITING (Image 6 Mockup Page) */}
          {activeTab === 'profile' && (
            <div className="tab-pane profile-edit-pane">
              <div className="grid-card full-width-card profile-mock-card">
                
                {/* Dual Column Layout matching mockup */}
                <div className="profile-mock-split-grid">
                  
                  {/* Left Column: Avatar & Change Avatar button */}
                  <div className="profile-mock-left-col">
                    <div 
                      className="profile-mock-avatar-circle"
                      style={{ backgroundColor: editAvatarColor }}
                      onClick={cycleAvatarColor}
                      title="Click to cycle theme color"
                    >
                      {editName ? editName.charAt(0).toUpperCase() : 'C'}
                    </div>
                    <button 
                      type="button" 
                      className="profile-mock-change-avatar-btn"
                      onClick={cycleAvatarColor}
                    >
                      Change Avatar
                    </button>
                  </div>

                  {/* Right Column: Profile forms */}
                  <div className="profile-mock-right-col">
                    <form onSubmit={handleSaveProfile} className="profile-mock-form">
                      
                      {/* Name input */}
                      <div className="profile-mock-input-group">
                        <label>Your name</label>
                        <div className="profile-mock-field-container">
                          <User size={16} className="profile-mock-field-icon" />
                          <input 
                            type="text" 
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Bio text area */}
                      <div className="profile-mock-input-group">
                        <label>Profile description</label>
                        <div className="profile-mock-field-container textarea-container">
                          <AlignLeft size={16} className="profile-mock-field-icon" style={{ marginTop: '3px' }} />
                          <textarea 
                            value={editBio}
                            onChange={(e) => setEditBio(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Skills to teach select dropdown */}
                      <div className="profile-mock-input-group">
                        <label>Skills you want to teach</label>
                        <div className="profile-mock-field-container">
                          <Award size={16} className="profile-mock-field-icon" />
                          <select 
                            value={editTeachSkill}
                            onChange={(e) => setEditTeachSkill(e.target.value)}
                            className="profile-mock-select"
                            required
                          >
                            <option value="Graphic Design, UI/UX Design (Figma, Sketch)">Graphic Design, UI/UX Design (Figma, Sketch)</option>
                            <option value="Java Coding, Databases">Java Coding, Databases</option>
                            <option value="Baking, Culinary Arts">Baking, Culinary Arts</option>
                            <option value="Japanese Speaking">Japanese Speaking</option>
                          </select>
                        </div>
                      </div>

                      {/* Skills to learn select dropdown */}
                      <div className="profile-mock-input-group">
                        <label>Skills you want to learn</label>
                        <div className="profile-mock-field-container">
                          <BookOpen size={16} className="profile-mock-field-icon" />
                          <select 
                            value={editLearnSkill}
                            onChange={(e) => setEditLearnSkill(e.target.value)}
                            className="profile-mock-select"
                            required
                          >
                            <option value="Graphic Design, UI/UX Design (Figma, Sketch)">Graphic Design, UI/UX Design (Figma, Sketch)</option>
                            <option value="Guitar Playing, Piano">Guitar Playing, Piano</option>
                            <option value="Python Coding, Django">Python Coding, Django</option>
                            <option value="Yoga, Meditation">Yoga, Meditation</option>
                          </select>
                        </div>
                      </div>

                      {/* Languages speak select dropdown */}
                      <div className="profile-mock-input-group">
                        <label>Languages you speak</label>
                        <div className="profile-mock-field-container">
                          <Globe size={16} className="profile-mock-field-icon" />
                          <select 
                            value={editLanguage}
                            onChange={(e) => setEditLanguage(e.target.value)}
                            className="profile-mock-select"
                            required
                          >
                            <option value="English">English</option>
                            <option value="Telugu">Telugu</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Japanese">Japanese</option>
                          </select>
                        </div>
                      </div>

                      {/* Action buttons matching mockup layout */}
                      <div className="profile-mock-buttons-row">
                        <button type="submit" className="profile-mock-save-btn">
                          Save Profile
                        </button>
                        <button 
                          type="button" 
                          className="profile-mock-view-btn"
                          onClick={() => {
                            triggerToast("Loading public view profile...");
                            setActiveTab('dashboard');
                          }}
                        >
                          View My Public Profile
                        </button>
                      </div>

                    </form>
                  </div>

                </div>

              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
