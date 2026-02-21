// src/components/TabContents/SearchTab.jsx (로그인 기능 통합)
import React, { useState, useContext } from 'react';
import { AppContext } from '../../../contexts/AppContext'; // AppContext 임포트
import { UserStatus } from '../../../utils/types'; // UserStatus 임포트
import styles from './SearchTab.module.scss'; // CSS Modules 임포트

const SearchTab = () => {
    const { userStatus, setUserStatusTo } = useContext(AppContext); // AppContext에서 userStatus와 setUserStatusTo 가져오기
    // ✨ 로그인 기능 관련 상태 추가
    const [loginUsername, setLoginUsername] = useState(''); // 입력할 ID
    const [loginPassword, setLoginPassword] = useState(''); // 입력할 PW
    const [loginError, setLoginError] = useState(''); // 로그인 에러 메시지
    const [isSearchTabLoggedIn, setIsSearchTabLoggedIn] = useState(false); // SearchTab 전용 로그인 상태

    // 검색 기능 관련 상태 (로그인 후에 사용될 것)
    const [searchOption, setSearchOption] = useState('이름');
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);

    // 백엔드 서버 주소 (이전과 동일, 환경에 맞게 수정)
    const API_BASE_URL = 'https://api.mev.o-r.kr'; 

    // ✨ 로그인 처리 함수
    const handleLogin = async (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
        setLoginError(''); // 기존 에러 메시지 초기화

        try {
            const res = await fetch(`${API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: loginUsername, password: loginPassword }),
            });

            if (!res.ok) { // HTTP 상태 코드가 200번대가 아닌 경우 (예: 401 Unauthorized, 400 Bad Request)
                const errorData = await res.json();
                throw new Error(errorData.message || '로그인 실패');
            }

            // 로그인 성공
            const data = await res.json();
            console.log('로그인 성공:', data.token); // 개발자 도구 콘솔에서 토큰 확인 가능

                        // 로그인 성공 상태로 전환
                        setUserStatusTo(UserStatus.LoggedIn);
                        setIsSearchTabLoggedIn(true); // SearchTab 전용 로그인 상태를 true로 변경
                        // 입력 필드 초기화            setLoginUsername(''); 
            setLoginPassword(''); 

            // 선택 사항: JWT 토큰을 localStorage에 저장하여 페이지 새로고침 시에도 로그인 유지 가능
            // localStorage.setItem('authToken', data.token);

        } catch (error) {
            console.error('로그인 오류:', error);
            setLoginError(error.message || '로그인 중 알 수 없는 오류가 발생했습니다.');
        }
    };

    // 검색 관련 함수 (로그인 성공 후에만 호출될 것)
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
        handleSearch(input); // 검색 옵션 변경 시 현재 입력된 값으로 다시 검색 (선택 사항)
    };

    // --- 조건부 렌더링: 로그인 상태에 따라 다른 화면 표시 ---
    if (!isSearchTabLoggedIn) {
        // 로그인되지 않았다면 로그인 폼을 보여줍니다.
        return (
            <div className={`${styles.loginContainer} ${styles.fadeIn}`}>
                <h2>Search 탭 로그인</h2>
                <form onSubmit={handleLogin}> {/* 폼 제출 시 handleLogin 함수 호출 */}
                    <div className={styles.loginInputGroup}>
                        <label htmlFor="username">아이디:</label>
                        <input
                            type="text"
                            id="username"
                            value={loginUsername}
                            onChange={(e) => setLoginUsername(e.target.value)}
                            onKeyDown={(e) => e.stopPropagation()} // 키다운 이벤트 전파 중지
                            required // 필수 입력 필드
                        />
                    </div>
                    <div className={styles.loginInputGroup}>
                        <label htmlFor="password">비밀번호:</label>
                        <input
                            type="password"
                            id="password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            onKeyDown={(e) => e.stopPropagation()} // 키다운 이벤트 전파 중지
                            required // 필수 입력 필드
                        />
                    </div>
                    {loginError && <p className={styles.errorMessage}>{loginError}</p>} {/* 에러 메시지 표시 */}
                    <button type="submit" className={styles.loginSubmitButton}>로그인</button> {/* 폼 제출 버튼 */}
                </form>
            </div>
        );
    }

    // 로그인 성공 시 렌더링될 검색 기능 (기존 SearchPage 내용)
    return (
        <div className={`${styles.searchContainer} ${styles.fadeIn}`}>
            <h1>회원 검색</h1>
            <div>
                <select value={searchOption} onChange={handleSearchOptionChange}>
                    <option value="이름">이름</option>
                    <option value="ID">ID</option>
                    <option value="직분">직분</option>
                    <option value="휴대번호">휴대번호</option>
                    {/* 필요에 따라 다른 검색 옵션 추가 */}
                </select>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={(e) => e.stopPropagation()} // 키다운 이벤트 전파 중지
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

export default SearchTab;