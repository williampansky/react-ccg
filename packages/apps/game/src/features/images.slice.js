import { createSlice } from '@reduxjs/toolkit';
import { MECHANICS } from '@ccg/images';

let initialState = {
  MECHANICS_IMAGES: MECHANICS
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {}
});

// export const { setCurrentStep } = imagesSlice.actions;
export default imagesSlice.reducer;
