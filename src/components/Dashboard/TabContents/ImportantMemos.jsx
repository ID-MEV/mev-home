import React, { useState, useEffect } from 'react';
import './ImportantMemos.css';

const ImportantMemos = () => {
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제 데이터 로딩 로직 (예: localStorage, API 호출)이 여기에 들어갑니다.
    // 현재는 목 데이터를 사용합니다.
    const fetchImportantMemos = () => {
      setLoading(true);
      setTimeout(() => {
        const mockMemos = [
          { id: 1, title: '중요 메모 1', content: '이것은 첫 번째 중요 메모입니다.' },
          { id: 2, title: '중요 메모 2', content: '두 번째 중요 메모 내용입니다.' },
        ];
        setMemos(mockMemos);
        setLoading(false);
      }, 1000);
    };

    fetchImportantMemos();
  }, []);

  if (loading) {
    return (
      <div className="important-memos-container">
        <h2>중요 메모</h2>
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="important-memos-container">
      <h2>중요 메모</h2>
      {memos.length > 0 ? (
        <ul>
          {memos.map(memo => (
            <li key={memo.id} className="important-memo-item">
              <h3>{memo.title}</h3>
              <p>{memo.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state-message">
          <p>중요 메모가 없습니다.</p>
          <p>메모 탭에서 중요 메모를 추가해보세요!</p>
        </div>
      )}
    </div>
  );
};

export default ImportantMemos;
