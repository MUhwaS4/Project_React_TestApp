import { configureStore } from "@reduxjs/toolkit";
import { memberSlice } from "./memberSlice";

// 스토어 생성
// 각 슬라이스의 리듀서를 모아서 생성
// 슬라이스 이름: 리듀서
const store = configureStore({
  reducer: {
    member: memberSlice.reducer
  }
});

export default store;

// default가 있으면, import 시 "import store" + 변수명 변경 가능
// defalut가 없으면, import 시 "import { store }"