import styled from "styled-components";

// 상세 화면에서 공통으로 사용할 태그들

// 카드
export const CustomCard = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	
	/* 크기; */
	width: 1150px;
	height: 700px;

	/* 여백 */
	padding: 24px;
	margin: 50px;

	/* 배경 */
	background-color: white;

	/* 모서리 */
	border-radius: 16px;
	border: none;

	/* 그림자 */
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`;

export const CustomContainer = styled.div`
	/* 크기 */
	width: 100%;
	height: 100%;

	/* flex 컨테이너 */
	display: flex;
	flex-direction: column;

	/* 자식 요소들의 간격 */
	gap: 10px;
`