// src/components/Dashboard/TabContents/SettingsTab.jsx
import React, { useContext, useState } from 'react';
import { AppContext } from '../../../contexts/AppContext';





const WeatherSettings = ({
  weatherLocation, setWeatherLocation, // AppContext에서 전달된 날씨 위치와 업데이트 함수
  weatherUnit, setWeatherUnit,       // AppContext에서 전달된 날씨 단위와 업데이트 함수
  inputWeatherLocation, setInputWeatherLocation, // SettingsTab 내부 상태 (날씨 위치)
  inputWeatherUnit, setInputWeatherUnit,     // SettingsTab 내부 상태 (날씨 단위)
  // isEditing, setIsEditing, // 이제 각 설정 항목에서 직접 편집 상태를 관리
  // handleSave, handleCancel, // 이제 WeatherSettings 내부에서 직접 저장/취소 로직 처리
  cities,
  onBack // 뒤로 가기 버튼을 위한 prop 추가
}) => {
  const [isEditingLocation, setIsEditingLocation] = useState(false); // 날씨 위치 편집 상태
  const [isEditingUnit, setIsEditingUnit] = useState(false);     // 날씨 단위 편집 상태

  const handleSaveLocation = () => {
    setWeatherLocation(inputWeatherLocation);
    setIsEditingLocation(false);
    alert('날씨 위치가 저장되었습니다.');
  };

  const handleCancelLocation = () => {
    setInputWeatherLocation(weatherLocation);
    setIsEditingLocation(false);
  };

  const handleSaveUnit = () => {
    setWeatherUnit(inputWeatherUnit);
    setIsEditingUnit(false);
    alert('날씨 단위가 저장되었습니다.');
  };

  const handleCancelUnit = () => {
    setInputWeatherUnit(weatherUnit);
    setIsEditingUnit(false);
  };

  return (
    <div className="setting-detail-view fade-in">
      <button onClick={onBack} className="back-button">
        <i className="fa-solid fa-arrow-left"></i> 뒤로
      </button>
      <h3>날씨 위치 설정</h3>
      <div className="setting-item">
        <label>현재 위치:</label>
        {isEditingLocation ? (
          <div>
            <select
              value={inputWeatherLocation}
              onChange={(e) => setInputWeatherLocation(e.target.value)}
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <button onClick={handleSaveLocation}>저장</button>
            <button onClick={handleCancelLocation}>취소</button>
          </div>
        ) : (
          <div onClick={() => setIsEditingLocation(true)} style={{ cursor: 'pointer' }}>
            <span>{weatherLocation || '지역을 설정해주세요'}</span>
            <i className="fa-solid fa-pencil" style={{ marginLeft: '10px' }}></i>
          </div>
        )}
      </div>

      <h3 style={{ marginTop: '20px' }}>날씨 단위 설정</h3>
      <div className="setting-item">
        <label>현재 단위:</label>
        {isEditingUnit ? (
          <div>
            <select
              value={inputWeatherUnit}
              onChange={(e) => setInputWeatherUnit(e.target.value)}
            >
              <option value="celsius">섭씨 (°C)</option>
              <option value="fahrenheit">화씨 (°F)</option>
            </select>
            <button onClick={handleSaveUnit}>저장</button>
            <button onClick={handleCancelUnit}>취소</button>
          </div>
        ) : (
          <div onClick={() => setIsEditingUnit(true)} style={{ cursor: 'pointer' }}>
            <span>{weatherUnit === 'celsius' ? '섭씨 (°C)' : '화씨 (°F)'}</span>
            <i className="fa-solid fa-pencil" style={{ marginLeft: '10px' }}></i>
          </div>
        )}
      </div>
    </div>
  );
};

const BackgroundSettings = ({ backgroundOptions, handleBackgroundChange, onBack }) => {
  return (
    <div className="setting-detail-view fade-in">
      <button onClick={onBack} className="back-button">
        <i className="fa-solid fa-arrow-left"></i> 뒤로
      </button>
      <h3>배경화면 선택</h3>
      <div className="background-options">
        {backgroundOptions.map(bg => (
          <button key={bg.path} onClick={() => handleBackgroundChange(bg.path)}>
            {bg.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const ThemeSettings = ({ selectedThemeColor, setSelectedThemeColor, onBack }) => {
  const colors = [
    '#1E4040', // 기존 초록색 계열
    '#646cff', // Vite 기본 파란색
    '#FF5733', // 주황색
    '#C70039', // 짙은 빨강
    '#900C3F', // 보라색
    'transparent', // 투명
    '#FFFFFF', // 흰색
  ];

  return (
    <div className="setting-detail-view fade-in">
      <button onClick={onBack} className="back-button">
        <i className="fa-solid fa-arrow-left"></i> 뒤로
      </button>
      <h3>테마 색상 선택</h3>
      <div className="theme-color-options">
        {colors.map(color => (
          <button
            key={color}
            className={color === selectedThemeColor ? 'selected' : ''}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedThemeColor(color)}
          >
            {color === selectedThemeColor && <i className="fa-solid fa-check"></i>}
          </button>
        ))}
      </div>
    </div>
  );
};


const SettingsTab = () => {
    // Vite의 glob import 기능을 사용하여 public 폴더의 배경화면을 동적으로 가져옵니다.
    const backgroundModules = import.meta.glob('/public/backgrounds/*.{jpeg,jpg,png,gif}');

    // 파일 이름을 예쁜 이름으로 매핑 (선택 사항)
    const backgroundNameMap = {
      'main1.jpeg': '웅장한 숲',
      'main2.jpg': '구름과 달',
      'main3.jpg': '예쁜 바다'
    };

    // backgroundModules 객체를 기반으로 선택 옵션을 생성합니다.
    const backgroundOptions = Object.keys(backgroundModules).map(path => {
        const fileName = path.split('/').pop();
        const name = backgroundNameMap[fileName] || fileName.split('.').slice(0, -1).join('.');
        const publicPath = path.replace('/public', ''); // public 경로를 제거하여 URL로 사용
        return { name, path: publicPath };
    });

    const {
        // region, setRegionTo, // 기존 region 관련, 더 이상 사용하지 않으므로 제거 예정
        selectedBackground, setSelectedBackground,
        selectedThemeColor, setSelectedThemeColor,
        weatherLocation, setWeatherLocation, // AppContext에서 가져온 날씨 위치 및 업데이트 함수
        weatherUnit, setWeatherUnit,       // AppContext에서 가져온 날씨 단위 및 업데이트 함수
    } = useContext(AppContext);
    const [inputWeatherLocation, setInputWeatherLocation] = useState(weatherLocation || 'Seoul'); // 날씨 위치용 내부 상태
    const [inputWeatherUnit, setInputWeatherUnit] = useState(weatherUnit || 'celsius');     // 날씨 단위용 내부 상태
    // 새로 추가된 상태: 날씨 설정 상세 페이지 표시 여부
    const [showWeatherSettings, setShowWeatherSettings] = useState(false);
    // 새로 추가된 상태: 배경화면 설정 상세 페이지 표시 여부
    const [showBackgroundSettings, setShowBackgroundSettings] = useState(false);
    // 새로 추가된 상태: 테마 설정 상세 페이지 표시 여부
    const [showThemeSettings, setShowThemeSettings] = useState(false);

    const handleBackgroundChange = (path) => {
        // 컨텍스트의 함수를 호출하면 AppProvider가 서버에 저장합니다.
        setSelectedBackground(path);
        alert('배경화면이 변경되었습니다.');
    };

    const cities = ['Seoul', 'Incheon', 'Gwangju', 'Busan', 'Daegu'];



    return (
        <div className="settings-container fade-in">
            <h2>설정</h2>
            
            {showWeatherSettings ? (
                // 날씨 설정 상세 페이지
                <WeatherSettings
                  weatherLocation={weatherLocation}
                  setWeatherLocation={setWeatherLocation}
                  weatherUnit={weatherUnit}
                  setWeatherUnit={setWeatherUnit}
                  inputWeatherLocation={inputWeatherLocation}
                  setInputWeatherLocation={setInputWeatherLocation}
                  inputWeatherUnit={inputWeatherUnit}
                  setInputWeatherUnit={setInputWeatherUnit}
                  cities={cities}
                  onBack={() => setShowWeatherSettings(false)} // 뒤로 가기
                />
            ) : showBackgroundSettings ? (
                // 배경화면 설정 상세 페이지
                <BackgroundSettings
                    backgroundOptions={backgroundOptions}
                    handleBackgroundChange={handleBackgroundChange}
                    onBack={() => setShowBackgroundSettings(false)} // 뒤로 가기
                />
            ) : showThemeSettings ? (
                // 테마 설정 상세 페이지
                <ThemeSettings
                    selectedThemeColor={selectedThemeColor}
                    setSelectedThemeColor={setSelectedThemeColor}
                    onBack={() => setShowThemeSettings(false)} // 뒤로 가기
                />
            ) : (
                // 메인 설정 목록
                <>
                    <ul className="settings-list-grid">
                        <li onClick={() => setShowBackgroundSettings(true)} style={{ cursor: 'pointer' }}>
                            배경화면 선택
                        </li>
                        <li onClick={() => setShowWeatherSettings(true)} style={{ cursor: 'pointer' }}>
                            날씨 위치 설정
                        </li>
                        <li>사용자 정보 관리 (나중에 구현)</li>
                        <li>알림 설정 (나중에 구현)</li>
                        <li onClick={() => setShowThemeSettings(true)} style={{ cursor: 'pointer' }}>
                            테마 변경
                        </li>
                        <li>데이터 백업 (나중에 구현)</li>
                        <li>배경화면 수정(나중에 구현</li>
                    </ul>
                </>
            )}
        </div>
    );
};

export default SettingsTab;
