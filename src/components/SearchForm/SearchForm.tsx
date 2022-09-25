import { Formik } from "formik";
import { ButtonTypes } from "../../constants/frontenConstants";
import { getAllPosts } from "../../redux/posts/postsOperations";
import { Button } from "../../reusable/components/Button";
import { FormikInput } from "../../reusable/components/FormikInput";
import { GetIcon } from "../../reusable/components/GetIcon";
import { useAppDispatch } from "../../utils/useAppDispatch";

import styles from "./SearchForm.module.scss";

interface ISearchValues {
	title: string;
};

const initialValues: ISearchValues = {
	title: ""
};

export const SearchForm = () => {
	const dispatch = useAppDispatch();

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={({ title }) => {
				dispatch(getAllPosts({ page: 1, title }));
			}}
		>
			{props => (
				<form onSubmit={props.handleSubmit} className={styles.searchForm}>
					<Button
						type={ButtonTypes.SUBMIT}
						className={styles.searchButton}
					>
						<GetIcon name="search" width={15} height={15} className={styles.icon} />
					</Button>
					<FormikInput
						type="text"
						onChange={props.handleChange}
						value={props.values.title}
						name="title"
						error={props.errors.title}
						placeholder="Search"
						className={styles.searchInput}
					/>
				</form>
			)}
		</Formik>
	);
};
