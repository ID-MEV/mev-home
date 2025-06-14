// HomeTab.jsx
import React from 'react';

const HomeTab = () => {
  return (
    <div className="tab-content">
      <h2>Home Tab Content (Profile)</h2>
      {/* 여기에 스크린샷의 프로필 섹션 (Abubaker Saeed) 내용이 들어갑니다. */}
      <div className="profile-header">
          <div className="profile-icon">
              <i className="fa-solid fa-chart-line"></i> {/* 스크린샷 아이콘과 유사하게 */}
          </div>
          <div className="profile-info">
              <h2>Abubaker Saeed</h2>
              <p>Mixtures of places that I've visited & traveled which are worth to check out again ^_^</p>
              <p className="collaborators">Profile Collaborators: Cloud Strife & Jack Sparrow</p>
          </div>
      </div>
      <h3 className="section-title">RECENTLY VISIT</h3>
      <div className="recent-visit-item">Center Point</div>
    </div>
  );
};

export default HomeTab;