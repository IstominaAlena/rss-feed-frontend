import styles from "./Error.module.scss";

interface IProps {
	errorMessage?: string;
};

export const Error = ({ errorMessage }: IProps) => (
	<div className={styles.errorContainer}>
		<span className={styles.icon}>&#128148;</span>
		<div className={styles.container}>
			<span className={styles.text}>Oops! Something went wrong =(</span>
			<div className={styles.message}>{errorMessage}</div>
		</div>
	</div>
);
