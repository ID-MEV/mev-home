import React, { useState, useEffect } from 'react';
import './NotesTab.css';

const NotesTab = () => { // ✨ NotesTab 컴포넌트 안으로 모든 로직을 가져옵니다.
  const [memos, setMemos] = useState([]);
  const [newMemo, setNewMemo] = useState('');

  const fetchMemos = async () => {
    try {
      const res = await fetch('https://api.mev.o-r.kr/api/memo');
      const data = await res.json();
      setMemos(data);
    } catch (error) {
      console.error('메모를 불러오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  const addMemo = async () => {
    if (!newMemo.trim()) return;

    try {
      const res = await fetch('https://api.mev.o-r.kr/api/memo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMemo }),
      });

      const newItem = await res.json();
      setMemos((prev) => [...prev, newItem]);
      setNewMemo('');
    } catch (error) {
      console.error('메모 추가 중 오류 발생:', error);
    }
  };

  const deleteMemo = async (id) => {
    try {
      await fetch(`https://api.mev.o-r.kr/api/memo/${id}`, {
        method: 'DELETE',
      });

      setMemos((prev) => prev.filter((memo) => memo.id !== id));
    } catch (error) {
      console.error('메모 삭제 중 오류 발생:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addMemo();
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 복사되었습니다.');
    } catch (error) {
      console.error('복사 실패:', error);
    }
  };

  return (
    // NotesTab의 최상위 div의 className을 memo-container로 변경하고 fade-in 추가
    <div className="memo-container fade-in">
      <h1>제목으로 메모 추가하기</h1>
      <div className="memo-input-group">
        <input
          type="text"
          value={newMemo}
          onChange={(e) => setNewMemo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메모를 입력하세요"
        />
        <button onClick={addMemo}>추가</button>
      </div>

      <ul className="memo-list">
        {memos.map((memo) => (
          <li key={memo.id} className="memo-item">
            <span
              onClick={() => copyToClipboard(memo.content)}
              title="클릭하여 복사"
            >
              {memo.content}
            </span>
            <button onClick={() => deleteMemo(memo.id)}>삭제</button>
          </li>
        ))}
      </ul>
      {/* ✨ CurrentTime 컴포넌트를 사용하지 않으려면 이 줄을 삭제합니다. */}
      {/* <CurrentTime /> */}
    </div>
  );
};

export default NotesTab;