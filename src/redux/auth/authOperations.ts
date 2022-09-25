import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { EPath } from "../../constants/apiConstants";
import { ISignUpBody, ISignUpResponce, ISignInBody, ISignInResponce } from "./typings";
import { instance } from "../../utils/axiosInstance";
import { getLocalToken } from "../../utils/getLocalToken";

export const signUpUser = createAsyncThunk<void, ISignUpBody>(
	"auth/signUpUser",
	async (signUpBody) => {
		try {
			const { data } = await instance.post<string>(EPath.SIGN_UP, signUpBody);
			toast.success(data);
			return;
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
				throw new Error(error.message);
			};
		}
	}
);

export const signInUser = createAsyncThunk<ISignInResponce | undefined, ISignInBody>(
	"auth/signInUser",
	async (signInBody) => {
		try {
			const { data } = await instance.post<ISignInResponce>(EPath.SIGN_IN, signInBody);
			return data;
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
				throw new Error(error.message);
			};
		}
	}
);

export const getCurrentUser = createAsyncThunk<ISignUpResponce | undefined>(
	"auth/getCurrentUser",
	async () => {
		try {
			const token = getLocalToken();
			const { data } = await instance.get<ISignUpResponce>(EPath.CURRENT, {
				params: {
					bearer_token: token,
				}
			});
			return data;
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
				throw new Error(error.message);
			};
		}
	}
);

export const logoutUser = createAsyncThunk<void>(
	"auth/logoutUser",
	async () => {
		try {
			const token = getLocalToken();
			await instance.get(EPath.LOGOUT, {
				params: {
					bearer_token: token,
				}
			});
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
				throw new Error(error.message);
			};
		}
	}
);
