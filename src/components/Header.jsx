import React from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// styled: React에서 CSS 문법을 사용할 수 있도록 도와주는 기능
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/memberSlice';
import store from '../store/store';

// 태그 이름 + 백틱``
const HeaderContainer = styled.div`
	width: 100%;
	height: 100%;
  background-color: #f8f9fa;
  display: flex; /* flex 컨테이너 */
  flex-direction: column;
  /* align-items: center; */
	justify-items: center;
	/* 그림자. 아래쪽으로 0.5rem만큼, 투명도 0.15 */
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`;

// 메뉴바 만들기

function Header() {

	// 페이지를 이동하는 함수
	const navigate = useNavigate();

	// 스토어에서 user info 상태값 가져오기
	
	// state 중에서 info를 선택
	const userInfo = useSelector((state) => {
		return state.member.info;
	});

	console.log(userInfo);

	return (
		<HeaderContainer>
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container>
					<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							{/* 사용자 정보가 없다면: 회원가입, 로그인 */}
							{/* 사용자 정보가 있다면: 로그아웃, 홈, 게시물 관리, 회원 관리 */}
							{/* 일반 사용자: 게시물 관리 */}
							{/* 관리자: 게시물 관리, 회원 관리 */}
							{
								userInfo === null ?
								<>
									<Nav.Link href="/login">로그인</Nav.Link>
									<Nav.Link href="/register">회원가입</Nav.Link>
								</>
								:
								<>

									<Nav.Link onClick={
										() => {
											// 로그아웃 시 로그인 데이터 초기화
											// dispatch를 통해 logout 함수 호출
											store.dispatch(logout());
											// 로그아웃 시 홈 화면으로 이동
											navigate('/');
										}
									}>로그아웃</Nav.Link>
									<Nav.Link href="/">홈</Nav.Link>
								</>
							}
							{
								userInfo !== null && userInfo.role === 'ROLE_USER' && 
								<Nav.Link href="/board/list">게시물관리</Nav.Link>
							}
							{
								userInfo !== null && userInfo.role === 'ROLE_ADMIN' &&
								<>
								<Nav.Link href="/board/list">게시물관리</Nav.Link>
								<Nav.Link href="/board/list">회원관리</Nav.Link>
								</>
							}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</HeaderContainer>
	)
	
}

export default Header