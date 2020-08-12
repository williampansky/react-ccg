import { createSlice } from '@reduxjs/toolkit';
import { CARD_ASSETS, HEROS, MECHANICS } from '@ccg/images';

let initialState = {
  CARD_ASSET_IMAGES: CARD_ASSETS,
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
