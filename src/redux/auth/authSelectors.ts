import { IAuthSlice } from "./typings";

export const selectUserName = (state: IAuthSlice) => state.auth.user?.name;
export const selectToken = (state: IAuthSlice) => state.auth.token;
export const selectUserIsLoading = (state: IAuthSlice) => state.auth.isLoading;
export const selectUserIsLoggedIn = (state: IAuthSlice) => state.auth.isLoggedIn;
export const selectUserError = (state: IAuthSlice) => state.auth.error;
