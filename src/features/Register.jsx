import React, { useContext } from 'react'
import { CustomCard, CustomContainer } from '../components/styled'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Context } from '../index';

// 회원가입 화면을 반환하는 컴포넌트

const Register = () => {

	// navigate 생성
	const navigate = useNavigate();

	// 사용자가 입력한 회원 정보를 state에 저장
	const [member, setMember] = useState({});

	const { host } = useContext(Context);

	// 입력 필드 이벤트 함수 
	function handleChange(e) {

		// 이벤트가 발생한 엘리먼트에서 name과 value 추출
		const { name, value } = e.target;

		// 사용자가 입력한 값을 member state에 업데이트
    const newMember = {...member};

    newMember[name] = value;
        
    setMember(newMember);

	}

	// 폼 태그 이벤트 함수
	const handleSubmit = async (e) => {

		// 버튼의 이동 동작을 방지
		e.preventDefault();

		// 회원 등록 API 호출
		// 등록은 POST
		// 인자: 주소, 바디 데이터, 헤더
		const response = await axios.post(
			`${host}/register`,
			member
		);

		// 요청에 실패했으면
		if (response.status !== 201) {
			throw new Error(`api error: ${response.status} ${response.statusText}`);
		} else {
			navigate('/login');
		}

	}

	return (
		<CustomCard>
			<CustomContainer>

				<h3>회원가입</h3>

				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="member.id">
						<Form.Label>아이디</Form.Label>
						<Form.Control type="text" name="id" onChange={handleChange}/>
					</Form.Group>
					
					<Form.Group className="mb-3" controlId="member.password">
						<Form.Label>비밀번호</Form.Label>
						<Form.Control type="password" name="password" onChange={handleChange}/>
					</Form.Group>
					
					<Form.Group className="mb-3" controlId="member.name">
						<Form.Label>이름</Form.Label>
						<Form.Control type="text" name="name" onChange={handleChange}/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="member.role">
						<Form.Check
							type="radio"
							label="사용자"
							id="member.role1"
							name="role"
							value="ROLE_USER"
							onChange={handleChange}
						/>
						<Form.Check
							type="radio"
							label="관리자"
							id="member.role2"
							name="role"
							value="ROLE_ADMIN"
							onChange={handleChange}
						/>
					</Form.Group>

					<Button variant="secondary" type="submit">
						Submit
					</Button>

				</Form>
			</CustomContainer>
		</CustomCard>
	)
}

export default Register