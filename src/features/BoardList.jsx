import React from 'react'
import { CustomCard, CustomContainer } from '../components/styled'

import { Link } from 'react-router-dom';
// import { NavLink } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Context } from '../index';
import { useContext } from 'react';

const BoardList = () => {

  const token = useSelector(state => state.member.token);

	const navigate = useNavigate();

	// 리스트 변수 선언 -> state로 배열 생성
	let [data, setData] = useState([]);

	const { host } = useContext(Context);

	useEffect(() => {

		// 게시물 목록 요청 API
		const getData = async () => {

			// 주소, 헤더
			// 연결 안 될 경우 선생님 서버 사용: http://192.168.0.67/board/list
			const response = await axios.get(`${host}/board/list`,
				{
					headers: {
						Authorization: token
					}
				}
			);

			// 요청에 실패했을 경우
			if (response.status != 200) {
				throw new Error(`api error: ${response.status} ${response.statusText}`);
			}

			// return response.data;

			setData(response.data); // API를 통해 응답받은 리스트를 업데이트

		}

		getData();

	}, []);

	// api 호출 -> state 변경 -> 컴포넌트 다시 렌더링
	// -> api 호출 -> state 변경 -> …… 무한루프 (이후 서버 다운)

	// 이런 무한루프를 막기 위해 useEffect 사용
	// useEffect: 컴포넌트를 생성할 때 한 번만 호출되는 함수

	// data.map is not a function
	// data가 빈값이다
	// axios는 비동기 함수이기 때문에 화면이 로드가 된 후에 응답이 온다
	// 따라서 화면이 생성되는 시점에 값을 출력할 수 없음

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

				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>제목</th>
							<th>작성자</th>
							<th>등록일</th>
						</tr>
					</thead>
					<tbody>

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