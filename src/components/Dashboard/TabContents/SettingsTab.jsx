// src/components/Dashboard/TabContents/SettingsTab.jsx
import React, { useContext, useState } from 'react';
import { AppContext } from '../../../contexts/AppContext';

// Vite's glob import feature
const backgroundModules = import.meta.glob('/public/backgrounds/*.{jpeg,jpg,png,gif}');

// Optional: Map filenames to pretty names
const backgroundNameMap = {
  'main1.jpeg': '웅장한 숲',
  'main2.jpg': '구름과 달',
  'main3.jpg': '예쁜 바다'
};

const SettingsTab = () => {
    const { region, setRegionTo, setSelectedBackground } = useContext(AppContext);
    const [inputRegion, setInputRegion] = useState(region || 'Seoul');
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        setRegionTo(inputRegion);
        setIsEditing(false);
        alert('지역이 저장되었습니다.');
    };

    const handleCancel = () => {
        setInputRegion(region);
        setIsEditing(false);
    };

    const handleBackgroundChange = (path) => {
        setSelectedBackground(path);
        alert('배경화면이 변경되었습니다.');
    };

    const cities = ['Seoul', 'Incheon', 'Gwangju', 'SettingTab 21번줄에 추가하기'];

    const backgroundOptions = Object.keys(backgroundModules).map(path => {
        const fileName = path.split('/').pop();
        const name = backgroundNameMap[fileName] || fileName.split('.').slice(0, -1).join('.');
        const publicPath = path.replace('/public', '');
        return { name, path: publicPath };
    });

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

            <div className="setting-item">
                <h3>배경화면 선택</h3>
                <div className="background-options">
                    {backgroundOptions.map(bg => (
                        <button key={bg.path} onClick={() => handleBackgroundChange(bg.path)}>
                            {bg.name}
                        </button>
                    ))}
                </div>
            </div>

            <ul>
                <li>사용자 정보 관리 (나중에 구현)</li>
                <li>알림 설정 (나중에 구현)</li>
                <li>테마 변경 (나중에 구현)</li>
                <li>데이터 백업 (나중에 구현)</li>
                <li>배경화면 수정(나중에 구현</li>
                <li>할 일 메모 정리해보기</li>
            </ul>
        </div>
    );
};

export default SettingsTab;
