// src/components/Dashboard/TabContents/SettingsTab.jsx
import React from 'react';

const SettingsTab = () => {
    return (
        <div className="settings-container fade-in">
            <h2>설정</h2>
            <p>여기는 설정 페이지입니다. 앱의 다양한 설정을 관리할 수 있습니다.</p>
            {/* 여기에 향후 앱 설정과 관련된 UI 요소를 추가할 수 있습니다. */}
            <ul>
                <li>사용자 정보 관리 (나중에 구현)</li>
                <li>알림 설정 (나중에 구현)</li>
                <li>테마 변경 (나중에 구현)</li>
                <li>데이터 백업 (나중에 구현)</li>
                <li>배경화면 수정(나중에 구현</li>
                <li>날씨 위치 설정하는 버튼</li>
            </ul>
        </div>
    );
};

export default SettingsTab;