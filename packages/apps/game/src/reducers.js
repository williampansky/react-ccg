import { combineReducers } from '@reduxjs/toolkit';

import configSlice from './features/config.slice';
import imagesSlice from './features/images.slice';

const rootReducer = combineReducers({
  config: configSlice,
  images: imagesSlice
});

export default rootReducer;
