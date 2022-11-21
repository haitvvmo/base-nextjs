import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAuth } from "interfaces/auth.interface"; 

export interface IAuth {
  token?: string;
  refresh_token?: string;
  userAuth?: UserAuth;
}

const initialState: IAuth = {
  token: undefined,
  refresh_token: undefined,
  userAuth: undefined,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state: IAuth, action: PayloadAction<IAuth>) => {
      state.token = action.payload.token;
      state.refresh_token = action.payload.refresh_token;
      state.userAuth = action.payload.userAuth;
    },
    reset: () => {
      return initialState;
    },
  },
});

export default auth;
