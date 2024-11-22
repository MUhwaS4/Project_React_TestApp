import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import { Outlet } from 'react-router-dom'

// 레이아웃: "헤더" + "상세화면"으로 구성

// Outlet: 자식 컴포넌트의 위치

// Layout: 부모 컴포넌트
// Home, Login, Register: 자식 컴포넌트

const LayoutContainer = styled.div`
	background-color: #e9e9e9;
	display: flex; /* flex 컨테이너 */
	flex-direction: column;
	align-items: center;
`;

const Layout = () => {
	return (
		<LayoutContainer>
			<Header></Header>
			<Outlet></Outlet> {/* Home, Login, Register*/}
		</LayoutContainer>
	)
}

export default Layout;