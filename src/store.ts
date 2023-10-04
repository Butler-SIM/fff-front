// store.ts

import { createSlice, configureStore } from '@reduxjs/toolkit';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Slice 생성
export const urlSlice = createSlice({
    name: 'url',
    initialState: {
      lastSegment: '',
    },
    reducers: {
      setLastSegment: (state, action) => {
        state.lastSegment = action.payload;
      },
    },
  });
  
  export const { setLastSegment } = urlSlice.actions;
  
  // Store 설정
  const store = configureStore({
    reducer: {
      url: urlSlice.reducer,
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export default store;

// 액션 디스패치 함수화 
const useUpdateLastUrlSegment = () => {
    const location = useLocation();
    const dispatch = useDispatch();
 
    useEffect(() => {
 
       // URL을 '/'로 분할합니다.
       const segments = location.pathname.split('/');
 
       // 마지막 세그먼트를 찾습니다.
       const lastSegment = segments[segments.length - 1];
 
       console.log('last segment:', lastSegment); // 여기서 마지막 세그먼트 값을 출력합니다.
 
       // 마지막 세그먼트를 스토어에 저장합니다.
       dispatch(setLastSegment(lastSegment));
 
    }, [location, dispatch]);
 }
 
 

export { useUpdateLastUrlSegment };
