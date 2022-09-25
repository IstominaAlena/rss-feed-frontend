import classnames from "classnames";

import styles from "./SectionWrapper.module.scss";

interface IProps {
	className?: string,
	children: React.ReactNode,
};

export const SectionWrapper = ({ className, children }: IProps) => (
	<section className={styles.contentSection}>
		<div className={classnames(styles.contentContainer, className)}>
			{children}
		</div>
	</section>
); 
