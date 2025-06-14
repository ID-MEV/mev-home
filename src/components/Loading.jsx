import React from 'react';

const Loading = () => { // <-- ': React.FC' 부분을 삭제합니다.
  return (
    <div id="app-loading-icon">
      <i className="fa-solid fa-circle-notch" />
    </div>
  );
};

export default Loading;