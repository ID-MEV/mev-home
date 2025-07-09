// HomeTab.jsx
import React from 'react';

const HomeTab = () => {
  return (
    <div className="tab-content">
      <h1>Home Tab Content (Profile)</h1>
      {/* 여기에 스크린샷의 프로필 섹션 (Abubaker Saeed) 내용이 들어갑니다. */}
      <div className="profile-header">
          <div className="profile-icon">
              <i className="fa-solid fa-chart-line"></i> {/* 스크린샷 아이콘과 유사하게 */}
          </div>
          <div className="profile-info">
              <h2>새로운 기능 추가 알림</h2>
              <p>앞으로 추가 예정 : </p>
              <p className="collaborators">1.---</p>
              <p className="collaborators">2.---</p>
          </div>
      </div>
      <h3 className="section-title">최근 추가 기능</h3>
      <div className="recent-visit-item">깃허브 연결</div>
    </div>
  );
};

export default HomeTab;