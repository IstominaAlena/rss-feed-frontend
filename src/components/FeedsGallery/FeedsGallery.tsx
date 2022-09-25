import { useEffect, useState } from "react";

import { IPostItem } from "../../redux/posts/typings";
import { getAllPosts, deletePost, getPostById } from "../../redux/posts/postsOperations";
import {
	selectAllPosts,
	selectCurrentPost,
	selectPage,
	selectPostsError,
	selectPostsIsLoading
} from "../../redux/posts/postsSlelectors";
import { useAppSelector } from "../../utils/useAppSelector";
import { useAppDispatch } from "../../utils/useAppDispatch";
import { selectUserIsLoggedIn } from "../../redux/auth/authSelectors";
import { removeCurrentPost } from "../../redux/posts/postsSlice";
import { EPostFormState } from "../../constants/frontenConstants";

import { QueryWrapper } from "../../reusable/components/QueryWrapper";
import { SectionWrapper } from "../../reusable/components/SectionWrapper";
import { Button } from "../../reusable/components/Button";
import { GetIcon } from "../../reusable/components/GetIcon";
import { Modal } from "../../reusable/components/Modal";
import { PostForm } from "../PostForm";

import styles from "./FeedsGallery.module.scss";

export const FeedsGallery = () => {
	const dispatch = useAppDispatch();

	const posts = useAppSelector(selectAllPosts);
	const currentPage = useAppSelector(selectPage);
	const postsIsLoading = useAppSelector(selectPostsIsLoading);
	const postsError = useAppSelector(selectPostsError);
	const isUserLoggedIn = useAppSelector(selectUserIsLoggedIn);
	const currentPost = useAppSelector(selectCurrentPost);

	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		dispatch(getAllPosts({ page: currentPage, title: "" }));
	}, [currentPage]);

	const renderFeedsItem = ({ _id, content, title }: IPostItem) => (
		<li key={_id} className={styles.feedsItem}>
			<div
				className={styles.feedsContainer}
				dangerouslySetInnerHTML={{ __html: `<h2>${title}</h2>${content}` }}
			/>
			{isUserLoggedIn && renderEditButtons(_id)}
		</li>
	);

	const renderEditButtons = (id: string) => {
		return (
			<div className={styles.editButtonsContainer}>
				<Button
					className={styles.editButton}
					onClick={onEditButton(id)}
				>
					<GetIcon name="edit" width={15} height={15} className={styles.icon} />
				</Button>
				<Button
					className={styles.editButton}
					onClick={onDeleteButton(id)}
				>
					<GetIcon name="delete" width={15} height={15} className={styles.icon} />
				</Button>
			</div>
		);
	};

	const onDeleteButton = (id: string) => () => {
		dispatch(deletePost(id));
	};

	const onEditButton = (id: string) => async () => {
		await dispatch(getPostById(id));
		setIsModalOpen(true);
	};

	const onCloseModal = () => {
		if (currentPost?._id) {
			dispatch(removeCurrentPost());
		};

		setIsModalOpen(false);
	};

	return (
		<>
			<SectionWrapper className={styles.section}>
				<QueryWrapper data={posts} loading={postsIsLoading} error={postsError}>
					<ul className={styles.feedsList}>
						{posts.map(renderFeedsItem)}
					</ul>
				</QueryWrapper>
			</SectionWrapper>

			{isModalOpen && (
				<Modal onClose={onCloseModal} >
					<PostForm onCloseModal={onCloseModal} formState={EPostFormState.EDIT_POST} />
				</Modal>
			)}
		</>
	);
};
