// src/components/Dashboard/TabContents/SettingsTab.jsx
import React, { useContext } from 'react';
import { AppContext } from '../../../contexts/AppContext';
import './SettingsTab.css';

const SettingsTab = () => {
    const context = useContext(AppContext);
    
    if (!context) {
        console.warn("SettingsTab must be used within an AppProvider");
        return null;
    }

    const { changeBackground } = context;

    const backgroundOptions = [
        {
            name: "기본 배경",
            url: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80"
        },
        {
            name: "도시 야경",
            url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-1.2.1&auto=format&fit=crop&w=2076&q=80"
        },
        {
            name: "자연 풍경",
            url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2076&q=80"
        },
        {
            name: "바다",
            url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2076&q=80"
        },
        {
            name: "산",
            url: "https://images.unsplash.com/photo-1464822759844-d150baec0134?ixlib=rb-1.2.1&auto=format&fit=crop&w=2076&q=80"
        },
        {
            name: "숲",
            url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2076&q=80"
        }
    ];

    const handleBackgroundChange = (imageUrl) => {
        changeBackground(imageUrl);
    };

    return (
        <div className="settings-container fade-in">
            <h2>설정</h2>
            
            <div className="settings-section">
                <h3>배경화면 설정</h3>
                <p>원하는 배경화면을 선택하세요.</p>
                
                <div className="background-grid">
                    {backgroundOptions.map((option, index) => (
                        <div 
                            key={index} 
                            className="background-option"
                            onClick={() => handleBackgroundChange(option.url)}
                        >
                            <div 
                                className="background-preview"
                                style={{ backgroundImage: `url(${option.url})` }}
                            />
                            <span className="background-name">{option.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="settings-section">
                <h3>기타 설정</h3>
                <ul>
                    <li>사용자 정보 관리 (나중에 구현)</li>
                    <li>알림 설정 (나중에 구현)</li>
                    <li>테마 변경 (나중에 구현)</li>
                    <li>데이터 백업 (나중에 구현)</li>
                    <li>날씨 위치 설정하는 버튼</li>
                    <li>할 일 메모 정리해보기</li>
                </ul>
            </div>
        </div>
    );
};

export default SettingsTab;