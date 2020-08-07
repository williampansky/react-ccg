import { createSlice } from '@reduxjs/toolkit';
import { HEROS, MECHANICS } from '@ccg/images';

let initialState = {
  HERO_IMAGES: HEROS,
  MECHANICS_IMAGES: MECHANICS
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {}
});

// export const { setCurrentStep } = imagesSlice.actions;
export default imagesSlice.reducer;
