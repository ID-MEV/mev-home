// src/components/Background.jsx
import React from 'react';
import { AppContext } from '../contexts/AppContext';

const Background = () => {
  const context = React.useContext(AppContext);

  if (!context) {
    console.warn("Background must be used within an AppProvider");
    return null;
  }

  const { selectedBackground } = context;

  const backgroundStyle = {
    backgroundImage: `url(${selectedBackground})`
  };

  return (
    <div id="app-background">
      <div id="app-background-image" className="background-image" style={backgroundStyle} />
    </div>
  );
};

export default Background;