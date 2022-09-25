import { Formik } from "formik";

import { ErrorRegistrationSchema } from "../../utils/validationSchemas";
import { ButtonTypes } from "../../constants/frontenConstants";
import { useAppDispatch } from "../../utils/useAppDispatch";
import { signUpUser } from "../../redux/auth/authOperations";

import { Button } from "../../reusable/components/Button";
import { FormikInput } from "../../reusable/components/FormikInput";

import styles from "../../reusable/styles/FormStyles.module.scss";

interface ISignUpValues {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const initialValues: ISignUpValues = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
};

interface IProps {
	onCloseModal: () => void;
};

export const SignUpForm = ({ onCloseModal }: IProps) => {
	const dispatch = useAppDispatch();

	return (
		<div>
			<h3 className={styles.formTitle}>Sign Up</h3>
			<Formik
				initialValues={initialValues}
				validationSchema={ErrorRegistrationSchema}
				onSubmit={({ name, email, password }, { resetForm }) => {
					dispatch(signUpUser({ name, email, password }));
					onCloseModal();
					resetForm();
				}}
			>
				{props => (
					<form onSubmit={props.handleSubmit} className={styles.form}>
						<FormikInput
							type="text"
							onChange={props.handleChange}
							value={props.values.name}
							name="name"
							error={props.errors.name}
							placeholder={"Name"}
						/>
						<FormikInput
							type="email"
							onChange={props.handleChange}
							value={props.values.email}
							name="email"
							error={props.errors.email}
							placeholder={"Email"}
						/>
						<FormikInput
							type="password"
							onChange={props.handleChange}
							value={props.values.password}
							name="password"
							error={props.errors.password}
							placeholder={"Password"}
						/>
						<FormikInput
							type="password"
							onChange={props.handleChange}
							value={props.values.confirmPassword}
							name="confirmPassword"
							error={props.errors.confirmPassword}
							placeholder={"Confirm password"}
						/>
						<Button
							type={ButtonTypes.SUBMIT}
							className={styles.continueButton}
						>
							Continue
						</Button>
					</form>
				)}
			</Formik>
		</div>
	);
};
