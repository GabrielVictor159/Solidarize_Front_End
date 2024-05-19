
import LoginResponse from '@/Domain/Model/Login/LoginResponse';
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './Slices/LoginSlice';

export const store = configureStore({
  reducer: {
    loginResponse: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
