import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Slicer/AuthSlice'; // Create this in step 1.2

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
