// src/components/TabContents/SearchTab.jsx
import React, { useState, useContext } from 'react';
import { AppContext } from '../../../contexts/AppContext';
import { UserStatus } from '../../../utils/types';
import styles from './SearchTab.module.scss';

const SearchTab = ({ onSearchLoginSuccess }) => { // onSearchLoginSuccess prop 추가
    const { setUserStatusTo } = useContext(AppContext);
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const API_BASE_URL = 'https://api.mev.o-r.kr'; 

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');

        try {
            const res = await fetch(`${API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: loginUsername, password: loginPassword }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || '로그인 실패');
            }

            const data = await res.json();
            console.log('로그인 성공:', data.token);

            setUserStatusTo(UserStatus.LoggedIn); // 전역 로그인 상태 업데이트
            if (typeof onSearchLoginSuccess === 'function') { // Added check to prevent error if prop is missing
                onSearchLoginSuccess(); // Dashboard에 검색 모듈 로그인 성공 알림
            } else {
                console.error('onSearchLoginSuccess is not a function or is undefined in SearchTab.jsx');
            }
            

            setLoginUsername('');
            setLoginPassword('');

        } catch (error) {
            console.error('로그인 오류:', error);
            setLoginError(error.message || '로그인 중 알 수 없는 오류가 발생했습니다.');
        }
    };

    return (
        <div className={`${styles.loginContainer} ${styles.fadeIn}`}>
            <h2>Search 탭 로그인</h2>
            <form onSubmit={handleLogin}>
                <div className={styles.loginInputGroup}>
                    <label htmlFor="username">아이디:</label>
                    <input
                        type="text"
                        id="username"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                        onKeyDown={(e) => e.stopPropagation()}
                        required
                    />
                </div>
                <div className={styles.loginInputGroup}>
                    <label htmlFor="password">비밀번호:</label>
                    <input
                        type="password"
                        id="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        onKeyDown={(e) => e.stopPropagation()}
                        required
                    />
                </div>
                {loginError && <p className={styles.errorMessage}>{loginError}</p>}
                <button type="submit" className={styles.loginSubmitButton}>로그인</button>
            </form>
        </div>
    );
};

export default SearchTab;
