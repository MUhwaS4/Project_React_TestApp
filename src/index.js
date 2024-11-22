import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

import store from './store/store';
import { Provider } from 'react-redux';
import { createContext } from 'react';

import { login } from './store/memberSlice';

// createContext: 여러 컴포넌트에서 값을 공유할 때 사용
// 스토어, 슬라이스: 여러 컴포넌트에서 state를 공유할 때 사용

// context 생성하고 export
export const Context = createContext();

// index.js: 앱의 시작점

// 앱이 시작될 때 스토리지에 있는 로그인 정보를 확인하여 로그인 상태를 유지

// 로컬 스토리지에서 로그인 데이터 꺼내기
let info = localStorage.getItem('info');
let token = localStorage.getItem('token');

// dispatch를 사용하여 login 액션 함수 호출
if (info !== null) {
  // json string => object
  const loginData = { user: JSON.parse(info), token: token };
  store.dispatch(login(loginData));
}

// API 주소
// let host = 'http://localhost:8080';

// AWS 서버의 API 주소로 변경
// let host = 'http://43.203.240.120:8080';

// 로컬 컴퓨터에서 React App을 실행할 때는 API 주소도 localhost로 설정
// 그렇지 않으면 (Netlify에서) AWS 서버로 설정
let host;
if (window.location.hostname === 'localhost') {
  host = 'http://localhost:8080'
} else {
  host = 'http://43.203.240.120:8080';
}

console.log(host);

// Router: URL 주소에 따라 화면을 전환하는 기능

// 리액트 라우터를 사용하기 위해 최상위 태그를 <BrowserRouter>로 감싸야함
// 스토어를 사용할 위치에 Provider로 감싸기
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
    {/* 컨텍스트를 통해 하위 컴포넌트들에게 host 데이터를 공유 */}
    <Context.Provider value={{ host }}>
      {/* Provider를 통해 앱에 store 주입 */}
      {/* 하위 컴포넌트들이 state를 공유 */}
      <Provider store={store}>
        <App />
      </Provider>
    </Context.Provider>
  </BrowserRouter>
);