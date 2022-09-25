import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, } from "axios";

import { BASE_URL } from "../constants/apiConstants";
import { getLocalToken } from "./getLocalToken";

export const instance: AxiosInstance = axios.create({
	baseURL: BASE_URL,
});

instance.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const token = getLocalToken();
		if (token) {
			config.headers!.Authorization = `Bearer ${token}`;
		}
		return config;
	}
);

instance.interceptors.response.use(
	(response: AxiosResponse) => response
);
