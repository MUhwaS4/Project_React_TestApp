import React, { useState } from 'react'
import { CustomCard, CustomContainer } from '../components/styled'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import { useEffect } from 'react';

import { Context } from '../index';
import { useContext } from 'react';

import { useSelector } from 'react-redux';

// 게시물 상세 화면: 게시물의 모든 정보를 출력

const BoardDetail = () => {

	// 파일 경로
	// const IMG_PATH = '=C:/uploadfile';
	const IMG_PATH = '/image/';

  const token = useSelector(state => state.member.token);

	console.log(token);

	// useParams: URL 주소에 포함된 파라미터를 추출하는 기능
	const params = useParams();

	// 게시물 데이터를 state로 저장
	let [board, setBoard] = useState(null);

	// navigate 함수 생성
	const navigate = useNavigate();

	const { host } = useContext(Context);

	// 컴포넌트가 생성될 때 한 번만 API를 호출하여 게시물 데이터를 출력
	useEffect(() => {

		// 상세 조회 API 호출
		const apiCall = async () => {
	
			// 주소, 헤더
			const response = await axios.get(`${host}/board/read?no=${params.no}`,
				{
					headers: {
						Authorization: token
					}
				}
			);
	
			// 요청에 실패했다면
			if (response.status !== 200) {
				throw new Error(`api error: ${response.status} ${response.statusText}`);
			}
	
			// API를 통해 응답받은 데이터를 state에 업데이트
			setBoard(response.data);
	
		}
	
		apiCall();

	}, []);

	// 실제 파일은 존재하지만
	// 브라우저 정책에 의해 프로젝트 외부 경로에 접근할 수 없음

	// 우선 >
	// 임시 방편으로 파일 저장

	// 이후 >
	// AWS 서버 배포 -> S3 스토리지 서비스
	// S3 스토리지 서비스: 가상 스토리지에 파일을 저장 -> 인터넷을 통해 파일을 가져옴

	return (
		<CustomCard>
			<CustomContainer>

				<h3>게시물 상세</h3>

				{/* 게시물 상세가 있다면 폼 표시 */}
				{/* 첫 번째 조건이 false라면 두 번째 항은 실행 안 됨  */}
				{
					board !== null &&

					<Form>
						<Form.Group className="mb-3" controlId="board.no">
							<Form.Label>번호</Form.Label>
							<Form.Control type="text" value={board.no} readOnly/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="board.title">
							<Form.Label>제목</Form.Label>
							<Form.Control type="text" value={board.title} readOnly/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="board.content">
							<Form.Label>내용</Form.Label>
							<Form.Control as="textarea" rows={3} value={board.content} readOnly/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="board.writer">
							<Form.Label>작성자</Form.Label>
							<Form.Control type="text" value={board.writer} readOnly/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="board.regDate">
							<Form.Label>등록일</Form.Label>
							<Form.Control type="text" value={board.regDate} readOnly/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="board.modDate">
							<Form.Label>수정일</Form.Label>
							<Form.Control type="text" value={board.modDate} readOnly/>
						</Form.Group>

						{/* 이미지가 있을 경우에만 항목이 나타나도록 */}
						{/* 해당 연산자를 사용하지 않으면 이미지가 없을 때 엑박이 뜸 */}
						{
							board.imgpath !== null && 
							// <img src={`${IMG_PATH}${board.imgpath}`} alt="test" />
							<img src={ board.imgpath } alt="test" />
						}

						<Button variant="primary" onClick={ () => {
							// 게시물 수정 화면으로 이동
							// 주소 예시: /board/modify/1
							navigate(`/board/modify/${board.no}`);
						}}>수정</Button>
					</Form>

				}

			</CustomContainer>
		</CustomCard>
	)
}

export default BoardDetail