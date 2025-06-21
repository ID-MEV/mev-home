// src/components/Dashboard/TabContents/SettingsTab.jsx
import React from 'react';
// import { useState } from 'react';

// function WearherAPI() {
//     const [city, setCity] = useState();

//     const hinputchage = ()=> {

//     }
// }

const SettingsTab = () => {
    return (
        <div className="settings-container fade-in">
            {/* <h1>날씨 앱</h1>
            <input
                type="text"
                placeholder="도시를 입력"
                value={city}
                onChange={hinputchage}></input>
            <button>날씨 정보 인확</button> */}
            
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
                <li>할 일 메모 정리해보기</li>
            </ul>
        </div>
    );
};

export default SettingsTab;