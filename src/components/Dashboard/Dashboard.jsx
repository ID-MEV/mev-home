// src/components/Dashboard/Dashboard.jsx
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { UserStatus } from '../../utils/types';
import HomeTab from './TabContents/HomeTab';
import NotesTab from './TabContents/NotesTab';
import SearchTab from './TabContents/SearchTab';
import SettingsTab from './TabContents/SettingsTab';
import MemberSearchContent from './TabContents/MemberSearchContent'; // Import new component

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isSearchModuleLoggedIn, setIsSearchModuleLoggedIn] = useState(false); // New state for search login
  const { setUserStatusTo } = useContext(AppContext);

  const handleLogout = () => {
    setUserStatusTo(UserStatus.LoggedOut);
    setIsSearchModuleLoggedIn(false); // Reset search module login status on global logout
  };

  const handleSearchLoginSuccess = useCallback(() => {
    setIsSearchModuleLoggedIn(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.code) {
        case 'Digit1':
          setActiveTab('home');
          break;
        case 'Digit2':
          setActiveTab('search');
          break;
        case 'Digit3':
          setActiveTab('notes');
          event.preventDefault();
          break;
        case 'Digit4':
          setActiveTab('settings');
          break;
        case 'KeyQ':
          handleLogout();
          event.preventDefault();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleLogout]);

  return (
    <div id="app-menu">
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <div
            className={`sidebar-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <i className="fa-solid fa-house"></i>
          </div>

          <div
            className={`sidebar-item ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            <i className="fa-regular fa-calendar"></i>
          </div>

          <div
            className={`sidebar-item ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            <i className="fa-solid fa-book"></i>
          </div>

          <div
            className={`sidebar-item bot ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <i className="fa-solid fa-gear"></i>
          </div>

          <div
            className="sidebar-item logout-button"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
          </div>
        </div>

        <div className="dashboard-main-content">
          {activeTab === 'home' && <HomeTab />}
          {activeTab === 'notes' && <NotesTab />}
          {activeTab === 'settings' && <SettingsTab />}
          
          {/* Conditional rendering for Search tab */}
          {activeTab === 'search' && (
            isSearchModuleLoggedIn ? (
              <MemberSearchContent />
            ) : (
              <SearchTab onSearchLoginSuccess={handleSearchLoginSuccess} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;