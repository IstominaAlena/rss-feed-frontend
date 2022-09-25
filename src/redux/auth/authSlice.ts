import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { IAuth } from "./typings";
import { signUpUser, signInUser, getCurrentUser, logoutUser } from "./authOperations";

const initialState: IAuth = {
	user: null,
	isLoggedIn: false,
	isLoading: false,
	error: null
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			signUpUser.fulfilled,
			(state) => {
				state.isLoggedIn = false;
				state.isLoading = false;
			}
		);
		builder.addCase(
			signInUser.fulfilled,
			(state, { payload }) => {
				state.user = payload?.user ?? initialState.user;
				state.token = payload?.token;
				state.isLoggedIn = true;
				state.isLoading = false;
			}
		);
		builder.addCase(
			getCurrentUser.fulfilled,
			(state, { payload }) => {
				state.user = payload?.user ?? initialState.user;
				state.isLoggedIn = true;
				state.isLoading = false;
			}
		);
		builder.addCase(
			logoutUser.fulfilled,
			() => initialState
		);
		builder.addMatcher(
			isAnyOf(
				signUpUser.pending,
				signInUser.pending,
				getCurrentUser.pending,
				logoutUser.pending
			),
			(state) => {
				state.error = null;
				state.isLoading = true;
			}
		);
		builder.addMatcher(
			isAnyOf(
				signUpUser.rejected,
				signInUser.rejected,
				getCurrentUser.rejected,
				logoutUser.rejected
			),
			(state, { error }) => {
				state.error = error.message ?? initialState.error;
				state.isLoggedIn = false;
				state.isLoading = false;
			}
		);

	}
});

export const authReducer = authSlice.reducer;
