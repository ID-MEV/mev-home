// src/components/Dashboard/TabContents/SettingsTab.jsx
import React, { useContext, useState } from 'react';
import { AppContext } from '../../../contexts/AppContext';

const SettingsTab = () => {
    const { region, setRegionTo } = useContext(AppContext);
    const [inputRegion, setInputRegion] = useState(region || 'Seoul'); // 기본값 설정
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        setRegionTo(inputRegion);
        setIsEditing(false); // 저장 후 편집 모드 종료
        alert('지역이 저장되었습니다.');
    };

    const handleCancel = () => {
        setInputRegion(region); // 취소 시 원래 값으로 복원
        setIsEditing(false);
    };

    const cities = ['Seoul', 'Incheon', 'Gwangju', 'SettingTab 21번줄에 추가하기']; // 선택할 도시 목록

    return (
        <div className="settings-container fade-in">
            <h2>설정</h2>
            <p>여기는 설정 페이지입니다. 앱의 다양한 설정을 관리할 수 있습니다.</p>
            
            <div className="setting-item">
                <h3>날씨 위치 설정</h3>
                {isEditing ? (
                    <div>
                        <select
                            value={inputRegion}
                            onChange={(e) => setInputRegion(e.target.value)}
                        >
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                        <button onClick={handleSave}>저장</button>
                        <button onClick={handleCancel}>취소</button>
                    </div>
                ) : (
                    <div onClick={() => setIsEditing(true)} style={{ cursor: 'pointer' }}>
                        <span>{region || '지역을 설정해주세요'}</span>
                        <i className="fa-solid fa-pencil" style={{ marginLeft: '10px' }}></i>
                    </div>
                )}
            </div>

            <ul>
                <li>사용자 정보 관리 (나중에 구현)</li>
                <li>알림 설정 (나중�� 구현)</li>
                <li>테마 변경 (나중에 구현)</li>
                <li>데이터 백업 (나중에 구현)</li>
                <li>배경화면 수정(나중에 구현</li>
                <li>할 일 메모 정리해보기</li>
            </ul>
        </div>
    );
};

export default SettingsTab;