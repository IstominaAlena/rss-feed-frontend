import { Formik } from "formik";

import { ErrorLoginSchema } from "../../utils/validationSchemas";
import { ButtonTypes } from "../../constants/frontenConstants";
import { useAppDispatch } from "../../utils/useAppDispatch";
import { signInUser } from "../../redux/auth/authOperations";

import { Button } from "../../reusable/components/Button";
import { FormikInput } from "../../reusable/components/FormikInput";

import styles from "../../reusable/styles/FormStyles.module.scss";

interface ISignUpValues {
	email: string;
	password: string;
};

const initialValues: ISignUpValues = {
	email: "",
	password: "",
};

interface IProps {
	onCloseModal: () => void;
};

export const SignInForm = ({ onCloseModal }: IProps) => {
	const dispatch = useAppDispatch();

	return (
		<div>
			<h3 className={styles.formTitle}>Sign In</h3>
			<Formik
				initialValues={initialValues}
				validationSchema={ErrorLoginSchema}
				onSubmit={(values, { resetForm }) => {
					dispatch(signInUser(values));
					onCloseModal();
					resetForm();
				}}
			>
				{props => (
					<form onSubmit={props.handleSubmit} className={styles.form}>
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
