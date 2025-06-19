// src/components/Dashboard/Dashboard.jsx
import React, { useState, useContext } from 'react'; // useContext 훅을 임포트합니다.
import { AppContext } from '../../contexts/AppContext'; // AppContext를 임포트합니다.
import { UserStatus } from '../../utils/types'; // UserStatus 타입을 임포트합니다.
import HomeTab from './TabContents/HomeTab';
import NotesTab from './TabContents/NotesTab';
import SearchTab from './TabContents/SearchTab';
import SettingsTab from './TabContents/SettingsTab';

// 아직 생성되지 않은 탭 컴포넌트들은 주석 처리합니다.
// import CalendarTab from './TabContents/CalendarTab';
// import AnalyticsTab from './TabContents/AnalyticsTab';
// import CalculatorTab from './TabContents/CalculatorTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { setUserStatusTo } = useContext(AppContext);
  const handleLogout = () => {
    setUserStatusTo(UserStatus.LoggedOut);}
    
  return (
    <div id="app-menu">
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          {/* 1. 홈 탭 아이템 */}
          <div
            className={`sidebar-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')} // 클릭 시 'home' 탭으로 변경
          >
            <i className="fa-solid fa-house"></i> {/* Font Awesome 홈 아이콘 */}
          </div>

          {/* 2. 검색 탭 아이템 (임시로 달력 아이콘에 연결) */}
          {/* 사용자님의 요청에 따라 SearchTab을 연결합니다. 아이콘은 임시로 달력 아이콘을 사용합니다.
              나중에 검색과 어울리는 돋보기 아이콘 (fa-solid fa-magnifying-glass) 등으로 변경할 수 있습니다. */}
          <div
            className={`sidebar-item ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')} // 클릭 시 'search' 탭으로 변경
          >
            <i className="fa-regular fa-calendar"></i> {/* 현재는 달력 아이콘 */}
          </div>

          {/* 3. 메모 탭 아이템 */}
          <div
            className={`sidebar-item ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')} // 클릭 시 'notes' 탭으로 변경
          >
            <i className="fa-solid fa-book"></i> {/* Font Awesome 책 아이콘 */}
          </div>

          {/* --- 아직 생성되지 않은 탭 아이템들 (주석 처리) --- */}
          {/* 나중에 CalendarTab, AnalyticsTab, CalculatorTab 파일을 만들고,
              이곳의 주석을 해제한 후, 각 탭에 맞는 `activeTab` 상태와 `onClick` 함수를 연결합니다.
              그리고 해당하는 Font Awesome 아이콘을 `<i className="fa-solid ..."></i>` 부분에 넣어줍니다. */}
          {/* <div
            className={`sidebar-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <i className="fa-solid fa-chart-line"></i>
          </div>
          <div
            className={`sidebar-item ${activeTab === 'calculator' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculator')}
          >
            <i className="fa-solid fa-calculator"></i>
          </div>
          */}
          {/* 이 부분에 더 많은 탭 아이템을 추가할 수 있습니다. */}

          {/* ✨ 4. 설정 탭 아이템 추가 (로그아웃 버튼 바로 위) ✨ */}
          <div
            className={`sidebar-item bot ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')} // 클릭 시 'settings' 탭으로 변경
          >
            <i className="fa-solid fa-gear"></i> {/* Font Awesome 톱니바퀴 아이콘 */}
          </div>

          <div
            className="sidebar-item logout-button"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-right-from-bracket"></i> {/* Font Awesome 책 아이콘 */}
          </div>
        </div>

        {/* --- 오른쪽 메인 콘텐츠 영역 --- */}
        {/* `dashboard-main-content` 클래스는 메인 콘텐츠 영역이 남은 공간을 모두 차지하도록 하고,
            내부 패딩, 스크롤바, 배경색 등을 담당합니다. */}
        <div className="dashboard-main-content">
          {/* `activeTab` 상태에 따라 해당하는 컴포넌트만 조건부로 렌더링합니다. */}
          {/* `&&` 연산자를 사용하여 `activeTab`이 특정 값일 때만 컴포넌트를 렌더링합니다. */}

          {activeTab === 'home' && <HomeTab />}       {/* activeTab이 'home'일 때 HomeTab 컴포넌트 렌더링 */}
          {activeTab === 'notes' && <NotesTab />}     {/* activeTab이 'notes'일 때 NotesTab 컴포넌트 렌더링 */}
          {activeTab === 'search' && <SearchTab />}   {/* activeTab이 'search'일 때 SearchTab 컴포넌트 렌더링 */}
          {activeTab === 'settings' && <SettingsTab />}
          
          {/* --- 아직 생성되지 않은 탭의 콘텐츠 (주석 처리) --- */}
          {/* 나중에 CalendarTab, AnalyticsTab, CalculatorTab 파일을 만들면,
              이곳의 주석을 해제하고 `<CalendarTab />`, `<AnalyticsTab />`, `<CalculatorTab />` 등으로 대체합니다. */}
          {/* {activeTab === 'calendar' && (
            <div className="tab-content">
              <h2>Calendar Tab Content</h2>
              <p>This is where your calendar will go.</p>
            </div>
          )}
          {activeTab === 'analytics' && (
            <div className="tab-content">
              <h2>Analytics Tab Content (Real-time Metrics)</h2>
              <p>This is where your real-time analytics will go.</p>
            </div>
          )}
          {activeTab === 'calculator' && (
            <div className="tab-content">
              <h2>Calculator Tab Content</h2>
              <p>This is where your calculator will go.</p>
            </div>
          )}
          */}
          {/* 여기에 다른 탭의 콘텐츠를 추가할 수 있습니다. */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;