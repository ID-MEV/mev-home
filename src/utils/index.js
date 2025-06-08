// src/utils/index.js (JavaScript 파일)

// Default는 이제 types.js에서 일반 JavaScript 객체로 export 되므로 type 키워드 없이 import합니다.
import { Default } from './types';

// interface는 JavaScript에서 의미가 없으므로 해당 import type 라인은 삭제합니다.
// import type { INumberUtility, IPosition, ITimeUtility, ILogInUtility } from './types';

export const defaultPosition = () => ({ // <-- ': IPosition' 삭제
  left: 0,
  x: 0,
});

export const N = { // <-- ': INumberUtility' 삭제
  clamp: (min, value, max) => // <-- ': number' 타입 선언 모두 삭제
    Math.min(Math.max(min, value), max),
  rand: (min, max) => // <-- ': number' 타입 선언 모두 삭제
    Math.floor(Math.random() * (max - min + 1) + min)
};

export const T = { // <-- ': ITimeUtility' 삭제
  format: (date) => { // <-- ': Date): string' 타입 선언 모두 삭제
    const hours = T.formatHours(date.getHours());
    const minutes = date.getMinutes(); // <-- ': number' 타입 선언 삭제

    return `<span class="math-inline">\{hours\}\:</span>{T.formatSegment(minutes)}`;
  },
  formatHours: (hours) => { // <-- ': number): string' 타입 선언 모두 삭제
    return (hours % 12 === 0 ? 12 : hours % 12).toString();
  },
  formatSegment: (segment) => { // <-- ': number): string' 타입 선언 모두 삭제
    return segment < 10 ? `0${segment}` : segment.toString();
  }
};

export const LogInUtility = { // <-- ': ILogInUtility' 삭제
  verify: async (pin) => { // <-- ': string): Promise<boolean>' 타입 선언 모두 삭제
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (pin === Default.PIN) {
          resolve(true);
        } else {
          reject(`Invalid pin: ${pin}`);
        }
      }, N.rand(300, 700));
    });
  }
};