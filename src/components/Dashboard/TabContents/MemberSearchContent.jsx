import React, { useState } from 'react';
import styles from './SearchTab.module.scss'; // Assuming SearchTab.module.scss contains the relevant styles for the search results

const API_BASE_URL = 'https://api.mev.o-r.kr'; // Keep this as it's part of the search logic

const MemberSearchContent = () => {
    const [searchOption, setSearchOption] = useState('이름');
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = (newInput) => {
        setInput(newInput);
        if (newInput) {
            fetch(`${API_BASE_URL}/api/member?field=${encodeURIComponent(searchOption)}&value=${encodeURIComponent(newInput)}`)
                .then(res => res.json())
                .then(data => setResults(data))
                .catch(err => console.error('검색 오류', err));
        } else {
            setResults([]);
        }
    };

    const handleSearchOptionChange = (event) => {
        setSearchOption(event.target.value);
        handleSearch(input);
    };

    // This time, we don't use styles.searchContainer as the root,
    // instead, we'll wrap content in a new div with styles.memberSearchContentWrapper
    // to apply the visual styling that was intended for the search section.
    return (
        <div className={`${styles.memberSearchContentWrapper} ${styles.fadeIn}`}>
            <h1>명단 검색</h1>
            <div>
                <select value={searchOption} onChange={handleSearchOptionChange}>
                    <option value="이름">이름</option>
                    <option value="ID">ID</option>
                    <option value="직분">직분</option>
                    <option value="휴대번호">휴대번호</option>
                </select>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={(e) => e.stopPropagation()}
                    placeholder="검색어를 입력하세요"
                />
            </div>

            {results.length > 0 ? (
                <div className={styles.searchResultsTableContainer}>
                    <table className={styles.searchResultsTable}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>이름</th>
                                <th>순</th>
                                <th>직분</th>
                                <th>성별</th>
                                <th>배우자</th>
                                <th>양음력</th>
                                <th>생년월일</th>
                                <th>자택번호</th>
                                <th>휴대번호</th>
                                <th>가족사항</th>
                                <th>주소</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.ID}</td>
                                    <td>{item.이름}</td>
                                    <td>{item.순}</td>
                                    <td>{item.직분}</td>
                                    <td>{item.성별}</td>
                                    <td>{item.배우자}</td>
                                    <td>{item.양음력}</td>
                                    <td>{item.생년월일}</td>
                                    <td>{item.자택번호}</td>
                                    <td>{item.휴대번호}</td>
                                    <td>{item.가족사항}</td>
                                    <td>{item.주소}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className={styles.emptyStateMessage}>
                    <p>{input ? '검색 결과가 없습니다.' : '검색어를 입력하세요.'}</p>
                    <p>검색 조건을 선택하고 검색어를 입력해보세요.</p>
                </div>
            )}
        </div>
    );
};

export default MemberSearchContent;
