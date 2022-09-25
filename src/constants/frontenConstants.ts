export enum ButtonTypes {
	BUTTON = "button",
	SUBMIT = "submit",
	RESET = "reset",
};

export enum EAuthFormState {
	SIGN_UP = "signUp",
	SIGN_IN = "signIn"
};

export enum EPostFormState {
	ADD_POST = "addPost",
	EDIT_POST = "editPost"
};

export const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

interface IErrorMessage {
	[name: string]: string;
};

export const errorMessage: IErrorMessage = {
	name: "* The field must contain from 2 to 15 characters.",
	email: "* Invalid email address.",
	password:
		"* At least 6 characters, one uppercase and one number character.",
	samePassword: "* This field should match to the previous one.",
	required: "* The field is required."
};

export const accentColor = "rgb(97, 149, 237)";
