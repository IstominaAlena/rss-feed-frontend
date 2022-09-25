import * as Yup from "yup";

import { emailRegex, errorMessage, passwordRegex } from "../constants/frontenConstants";

export const ErrorRegistrationSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.min(2, errorMessage.name)
		.max(15, errorMessage.name)
		.required(errorMessage.required),
	email: Yup.string()
		.trim()
		.email(errorMessage.email)
		.matches(emailRegex, errorMessage.email)
		.required(errorMessage.required),
	password: Yup.string()
		.trim()
		.min(6, errorMessage.password)
		.matches(passwordRegex, errorMessage.password)
		.required(errorMessage.required),
	confirmPassword: Yup.string()
		.when("password", {
			is: (val: string | any[]) => (val && val.length > 0 ? true : false),
			then: Yup.string().oneOf(
				[Yup.ref("password")],
				errorMessage.samePassword
			),
		})
		.required(errorMessage.required),
});

export const ErrorLoginSchema = Yup.object().shape({
	email: Yup.string()
		.trim()
		.required(errorMessage.required),
	password: Yup.string()
		.trim()
		.min(6, errorMessage.password)
		.matches(passwordRegex, errorMessage.password)
		.required(errorMessage.required),
});
