import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGameState } from '../types/gameDataTypes';

const initialState: IGameState = {
  earned: 0,
  currentStep: 0,
  fiftyFiftyUsedOnStep: false,
  disabledHelpOption: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setEarned(state: IGameState, action: PayloadAction<number>) {
      state.earned = action.payload;
    },
    setCurrentStep(state: IGameState, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    setFiftyFiftyUsedOnStep(state: IGameState, action: PayloadAction<boolean>) {
      state.fiftyFiftyUsedOnStep = action.payload;
    },
    setDisabledHelpOption(state: IGameState, action: PayloadAction<boolean>) {
      state.disabledHelpOption = action.payload;
    },
  },
});

export default gameSlice.reducer;
