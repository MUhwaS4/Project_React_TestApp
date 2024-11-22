import React from 'react'
import { CustomCard, CustomContainer } from '../components/styled'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Context } from '../index';
import { useContext } from 'react';

import { useSelector } from 'react-redux';

const BoardRegister = () => {
  
	// 스토어에서 token state를 가져오기
  const token = useSelector(state => state.member.token);

	console.log(token);

	// navigate 생성
	const navigate = useNavigate();

	// 사용자가 입력한 새로운 데이터를 state로 저장
	let [board, setBoard] = useState({});

	const { host } = useContext(Context);

	// 제목과 내용 입력 필드에서 이벤트가 발생되면 값을 꺼내 state에 저장
	const handler = (e) => {
		
		// 입력 필드에서 이름과 값 꺼내기
		const { name, value, files } = e.target;

		// 새로운 게시물 만들기
		// 기존 게시물을 사용하지 않고 복사하는 이유?
		// => 객체는 주소값을 가지므로 값을 추가해도 변화가 감지되지 않음
		let newBoard = { ...board };

		// 파일이 첨부되었을 경우
		if (name === 'uploadFile') {
			newBoard[name] = files[0]; // value는 파일의 이름. files[0]이 실제 파일
		} else {
			// 제목이나 내용이 변경되었을 경우
			newBoard[name] = value;
		}

		// 변경된 게시물을 state에 업데이트
		setBoard(newBoard);
	}

	// 폼의 submit 버튼을 클릭하면 등록 API 호출

	const handleSubmit = async (e) => {

		// 버튼의 기본 동작을 방지
		// 버튼을 클릭하면 서버에 요청을 보낸 후 화면이 새로고침
		e.preventDefault();

		// Form 객체를 생성하여 게시물 데이터 담기
		// 파일 스트림은 JSON 데이터로 전송할 수 없음

		const formData = new FormData();
		formData.append('title', board.title);
		formData.append('content', board.content);

		if (board.uploadFile !== undefined) {
			formData.append('uploadFile', board.uploadFile);
		};


		// 등록은 post 조회는 get
		// 인자: 주소, 게시물 데이터, 헤더
		// 게시물 데이터는 JSON 형식으로 전달
		const response = await axios.post(`${host}/board/register`,
			formData,
			{
				headers: {
					Authorization: token
				}
			}
		);

		// 요청에 실패했으면
		if (response.status !== 201) {
			throw new Error(`api error: ${response.status} ${response.statusText}`);
		} else {
			navigate('/board/list');
		}

	}

	return (
		<CustomCard>
			<CustomContainer>
				
				<h3>게시물 등록</h3>
				
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="board.title">
						<Form.Label>제목</Form.Label>
						<Form.Control type="text" name="title" onChange={handler}/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="board.content">
						<Form.Label>내용</Form.Label>
						<Form.Control as="textarea" rows={3} name="content" onChange={handler}/>
					</Form.Group>
					<Form.Group controlId="board.uploadFile">
						<Form.Label>이미지</Form.Label>
						<Form.Control type="file" name="uploadFile" onChange={handler}/>
					</Form.Group>

					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
				
			</CustomContainer>
		</CustomCard>
	)
}

export default BoardRegister