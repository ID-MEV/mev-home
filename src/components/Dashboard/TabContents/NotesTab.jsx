import React, { useState, useEffect } from 'react';
import './NotesTab.css';

const NotesTab = () => { // ✨ NotesTab 컴포넌트 안으로 모든 로직을 가져옵니다.
  const [memos, setMemos] = useState([]);
  const [newMemo, setNewMemo] = useState('');

  const fetchMemos = async () => {
    try {
      const res = await fetch('https://api.mev.o-r.kr/api/memo');
      const data = await res.json();
      // 기존 메모에 isImportant 필드가 없을 경우 false로 초기화
      const updatedMemos = data.map(memo => ({
        ...memo,
        isImportant: memo.isImportant !== undefined ? memo.isImportant : false,
      }));
      setMemos(updatedMemos);
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
      setMemos((prev) => [...prev, { ...newItem, isImportant: false }]);
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

  const toggleMemoImportance = (memoId) => {
    setMemos((prevMemos) => {
      const updatedMemos = prevMemos.map((memo) =>
        memo.id === memoId ? { ...memo, isImportant: !memo.isImportant } : memo
      );
      // 5.4 서브태스크: 업데이트된 상태를 localStorage에 저장 (여기서 API 호출로 변경)
      // 서버에 중요도 변경 요청
      const targetMemo = updatedMemos.find(memo => memo.id === memoId);
      if (targetMemo) {
        fetch(`https://api.mev.o-r.kr/api/memo/${memoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isImportant: targetMemo.isImportant }),
        })
        .catch(error => console.error('메모 중요도 업데이트 실패:', error));
      }
      return updatedMemos;
    });
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
            <i
              className={`star-icon ${memo.isImportant ? 'fa-solid' : 'fa-regular'} fa-star`}
              onClick={() => toggleMemoImportance(memo.id)}
              title="중요 표시 토글"
            ></i>
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