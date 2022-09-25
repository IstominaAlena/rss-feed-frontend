export const BASE_URL = "http://localhost:4000/api";

export const POSTS_PER_PAGE = 10;

export enum EPath {
	POSTS = "/posts",
	SIGN_UP = "/auth/signup",
	SIGN_IN = "/auth/signin",
	LOGOUT = "/auth/logout",
	CURRENT = "/auth/current"
};
