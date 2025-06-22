# Node.js 22 버전 기반 이미지 사용 (npm 포함)
FROM node:22-alpine

# Git 설치 (필요시)
RUN apk add --no-cache git

# 작업 디렉토리 설정
WORKDIR /app

# 개발 서버 기본 포트 열기
EXPOSE 5173

# 기본 셸로 컨테이너 실행 (터미널 접속용)
CMD ["sh"]
