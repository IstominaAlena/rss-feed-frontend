import { useAppSelector } from "../../utils/useAppSelector";
import { useAppDispatch } from "../../utils/useAppDispatch";
import { selectPage, selectPostsAmount } from "../../redux/posts/postsSlelectors";
import { setPage } from "../../redux/posts/postsSlice";
import { POSTS_PER_PAGE } from "../../constants/apiConstants";

import { Button } from "../../reusable/components/Button";
import { GetIcon } from "../../reusable/components/GetIcon";

import styles from "./Pagination.module.scss";

export const Pagination = () => {
	const dispatch = useAppDispatch();

	const currentPage = useAppSelector(selectPage);
	const postsAmount = useAppSelector(selectPostsAmount);
	const allPages = Math.ceil(postsAmount / POSTS_PER_PAGE);

	const incrementPage = () => {
		dispatch(setPage(currentPage + 1));
	};

	const decrementPage = () => {
		dispatch(setPage(currentPage - 1));
	};

	return (
		<div className={styles.paginationContainer}>
			{currentPage > 1 && (
				<Button
					className={styles.paginationButton}
					onClick={decrementPage}
				>
					<GetIcon name="arrow-left" width={15} height={15} className={styles.icon} />
				</Button>
			)}
			{currentPage < allPages && (
				<Button
					className={styles.paginationButton}
					onClick={incrementPage}
				>
					<GetIcon name="arrow-right" width={15} height={15} className={styles.icon} />
				</Button>
			)}
		</div>
	);
};
