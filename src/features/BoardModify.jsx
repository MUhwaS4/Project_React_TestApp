import React from 'react'
import { CustomCard, CustomContainer } from '../components/styled'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Context } from '../index';
import { useContext } from 'react';

import { useSelector } from 'react-redux';

const BoardModify = () => {
  
	// 로컬 스토리지에서 토큰 정보 호출
  const token = useSelector(state => state.member.token);

	// navigate 생성
	const navigate = useNavigate();

	// 기존 게시물 데이터 출력
	// URL 경로에서 파라미터를 추출하여 단건 조회

	const params = useParams();

	// 기존 게시물을 state에 저장
	let [board, setBoard] = useState({});

	const { host } = useContext(Context);

	// 첫 번째 인자: 처리할 코드
	// 두 번째 인자: useEffect가 실행되는 시점
	// 컴포넌트가 생성될 때 한 번만 실행됨
	useEffect(() => {

		// 게시물 조회 API 호출
		const apiCall = async () => {

			// 조회는 get
			// 주소, 헤더
			const response = await axios.get(`${host}/board/read?no=${params.no}`,
				{
					headers: {
						Authorization: token
					}
				}
			);

			// 요청에 실패했으면
			if (response.status !== 200) {
				throw new Error(`api error: ${response.status} ${response.statusText}`);
			} else {
				// api를 통해 받은 게시물 데이터를 state에 업데이트
				setBoard(response.data);
			}

		}

		apiCall();

	}, []);

	// 입력 필드 이벤트 처리
	const handleChange = (e) => {

		// 이벤트가 발생한 엘리먼트에서 name과 value 추출
		const { name, value } = e.target;

		// 입력 필드의 value가 state로 설정되어
		// 사용자가 값을 수정해도 변경되지 않는 문제 발생
		// 사용자가 입력한 값을 state로 업데이트해주면 됨

		// 게시물 복제본 생성
		const newBoard = {...board};

		// 입력 필드에 변경된 데이터를 업데이트
		newBoard[name] = value;

		// state 업데이트
		setBoard(newBoard);

	}

	// 게시물 데이터를 변경하고 수정 API를 요청하는 함수
	const handleSubmit = async (e) => {

		// 버튼의 기본 동작을 방지
		// 버튼을 클릭하면 서버에 요청을 보낸 후 화면이 새로고침
		e.preventDefault();

		// 수정 put
		// 인자: 주소, 수정된 게시물 데이터, 헤더
		const response = await axios.put('http://localhost:8080/board/modify', board,
			{
				headers: {
					Authorization: token
				}
			}
		);

		if (response.status !== 204) {
			throw new Error(`api error: ${response.status} ${response.statusText}`);
		} else {
			// 정상적으로 수정에 성공했으면, 상세화면으로 이동
			navigate(`/board/read/${board.no}`);
		}

	}

	// 게시물을 삭제하는 함수
	const handleRemove = async (e) => {

		// 버튼의 기본 동작을 방지
		// 버튼을 클릭하면 서버에 요청을 보낸 후 화면이 새로고침
		e.preventDefault();

		// 삭제는 Delete
		const response = await axios.delete(`http://localhost:8080/board/remove?no=${board.no}`,
			{
				headers: {
					Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzE2MzEyNTksImV4cCI6MTczNDIyMzI1OSwic3ViIjoidXNlciJ9.rT599z81bLiVj6XTT6AVpKUWNJwgImQ2Mke5_dc63HE' // 토큰
				}
			}
		);

		// 요청에 실패했다면
		if (response.status !== 204) {
			throw new Error(`api error: ${response.status} ${response.statusText}`);
		} else {
			// 삭제에 성공했다면, 리스트로 이동
			navigate('/board/list');
		}

	}

	return (
		<CustomCard>
			<CustomContainer>
				
				<h3>게시물 등록</h3>
				
				<Form onSubmit={handleSubmit}>
				<Form.Group controlId="board.title">
					<Form.Label>제목</Form.Label>
						<Form.Control type="text" name='title' value={board.title} onChange={handleChange}></Form.Control>
					</Form.Group>
					<Form.Group controlId="board.content">
						<Form.Label>내용</Form.Label>
						<Form.Control as="textarea" rows={3} name='content' value={board.content} onChange={handleChange}/>
					</Form.Group>
					<Form.Group controlId="board.content">
						<Form.Label>작성자</Form.Label>
						<Form.Control type="text" disabled value={board.writer} readOnly></Form.Control>
					</Form.Group>
					<Form.Group controlId="board.regDate">
							<Form.Label>등록일</Form.Label>
							<Form.Control type="text" disabled value={board.regDate} readOnly></Form.Control>
					</Form.Group>   
					<Form.Group controlId="board.modDate">
							<Form.Label>수정일</Form.Label>
							<Form.Control type="text" disabled value={board.modDate} readOnly></Form.Control>
					</Form.Group>  

					<Button variant="primary" type="submit">
						Submit
					</Button>
					<Button variant="danger" onClick={handleRemove}>삭제</Button>
				</Form>
				
			</CustomContainer>
		</CustomCard>
	)
}

export default BoardModify