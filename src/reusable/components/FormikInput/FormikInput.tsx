import styles from "./FormikInput.module.scss";
import classnames from "classnames";

interface IProps {
	type: string,
	onChange: (e: any) => void,
	value: string,
	name: string,
	error?: string,
	placeholder?: string,
	label?: string,
	className?: string;
};

export const FormikInput = ({
	type,
	onChange,
	value,
	name,
	error,
	placeholder,
	label,
	className = ""
}: IProps) => (
	<div className={styles.inputContainer}>
		{label && (
			<label htmlFor={name} className={styles.lable}>{label}</label>
		)}

		{type === "textarea"
			? (<textarea
				id={name}
				className={classnames(styles.textarea, className)}
				rows={5}
				onChange={onChange}
				value={value}
				name={name}
				placeholder={placeholder}
			/>)
			: (<input
				id={name}
				className={classnames(styles.input, className)}
				type={type}
				onChange={onChange}
				value={value}
				name={name}
				placeholder={placeholder}
			/>)}

		{error && <div id="feedback" className={styles.error}>{error}</div>}
	</div>
);
