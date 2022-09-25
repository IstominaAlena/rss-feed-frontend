export interface IAuthSlice {
	auth: IAuth;
};

export interface IAuth {
	user: IUser | null,
	token?: string,
	isLoggedIn: boolean;
	isLoading: boolean;
	error: string | null;
};

export interface IUser {
	name: string,
	email: string;
};

export interface ISignUpBody extends IUser {
	password: string,
};

export interface ISignUpResponce {
	user: IUser;
};

export interface ISignInBody {
	email: string,
	password: string;
};

export interface ISignInResponce extends ISignUpResponce {
	token: string;
};
