import React from 'react';

export const AppContext = React.createContext({
    selectedThemeColor: '#1E4040', // 기본 테마 색상
    setSelectedThemeColor: () => {}, // 더미 함수
});