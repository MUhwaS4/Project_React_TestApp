import React from 'react'
import { CustomCard, CustomContainer } from '../components/styled'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from 'axios';

// useNavigate: 다른 페이지로 이동하는 기능

// 게시물 목록 표시 => <table> 태그 사용

// 게시물 리스트
// 가짜 데이터를 지우고 API를 통해서 리스트 받아오기

// async~await: 비동기 함수를 호출할 때 사용하는 문법
// 비동기 함수는 코드를 순차적으로 처리하지 않고,
// 응답이 오면 실행된다

// axios.get 함수는 서버에 응답을 받는 순간 종료
async function callAPI() {
	// 인자: 주소, 헤더
	const response = await axios.get('http://192.168.0.67/board/list', {
		headers: {
			Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzE1NjQwMTgsImV4cCI6MTczNDE1NjAxOCwic3ViIjoidXNlcjExIn0.LQ-Q98IllZIFt4N18Q4zl4XdlJaN0WTNdS-gSvf3xCI'
		}
	});

	// 응답코드가 200이 아니라면 에러 발생시키기
	if (response.status !== 200) {
		throw new Error(`api error: ${response.status} ${response.statusText}`);
	}

	console.log(response);
	console.log(response.data);

	return response.data;

}

const BoardList = () => {

	// navigate 함수 생성
	const navigate = useNavigate();

	// 게시물 리스트를 state로 생성
	const [data, setList] = useState([]);

	// 컴포넌트를 생성할 때 한 번만 호출되는 함수
	useEffect(() => {

		// callAPI();

		// 문제: 비동기 함수는 useEffect 안에서 바로 사용 불가
		// 비동기 함수를 한 번 더 정의하고 호출
		const getData = async () => {
			const data = await callAPI();
			setList(data); // state 업데이트
			console.log(data);
		}

		getData();

	}, []);

	return (
		<CustomCard>
			<CustomContainer>
				
				<Row>
					<Col sm={8}>
						<h3>게시물 리스트</h3>
					</Col>
					<Col sm={4}>
						<Button variant="secondary" onClick={ () => {
							navigate("/board/register");
						}}>게시물 등록</Button>
					</Col>
				</Row>

				{/* 목록은 모든 데이터를 표시할 필요가 없음 */}
				{/* 게시물 데이터 중 선택하여 표시 */}
				<Table striped bordered hover>
					{/* 제목: 고정 */}
					<thead>
						<tr>
							<th>#</th>
							<th>제목</th>
							<th>작성자</th>
							<th>등록일</th>
						</tr>
					</thead>
					{/* 데이터: 유동적 */}
					<tbody>
						
						{/* data가 있는지 확인 */}
						{/* 논리곱 연산자는 첫 번째 항이 false면 두 번째 항을 사용하지 않음 */}
						{/* 만약 data가 없는데 map 함수를 호출하면 nullpoint 에러 발생 */}

						{/* map 함수로 게시물 데이터를 <tr>행으로 생성 */}
						{
								data !==null && data.map( (board) => {

									console.log(board);
									return (
										<tr key={board.no}>
											<td><Link to={"/board/read/" + board.no}>{board.no}</Link></td>
											<td>{board.title}</td>
											<td>{board.writer}</td>
											<td>{board.regDate}</td>
										</tr>
									)
								} )
						}

					</tbody>
				</Table>

			</CustomContainer>
		</CustomCard>


	)
}

export default BoardList