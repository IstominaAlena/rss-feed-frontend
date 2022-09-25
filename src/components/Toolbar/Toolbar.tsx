import { useState } from "react";

import { useAppSelector } from "../../utils/useAppSelector";
import { selectUserIsLoggedIn } from "../../redux/auth/authSelectors";
import { EPostFormState } from "../../constants/frontenConstants";

import { Button } from "../../reusable/components/Button";
import { SectionWrapper } from "../../reusable/components/SectionWrapper";
import { SearchForm } from "../../components/SearchForm";
import { Modal } from "../../reusable/components/Modal";
import { PostForm } from "../PostForm";
import { GetIcon } from "../../reusable/components/GetIcon";

import styles from "./Toolbar.module.scss";

export const Toolbar = () => {
	const isUserLoggedIn = useAppSelector(selectUserIsLoggedIn);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const onOpenModal = () => {
		setIsModalOpen(true);
	};

	const onCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<SectionWrapper>
				<div className={styles.toolbarContainer}>
					<SearchForm />

					{isUserLoggedIn && (
						<Button
							className={styles.addPostButton}
							onClick={onOpenModal}
						>
							<GetIcon name="add" width={10} height={10} className={styles.icon} />
							Add post
						</Button>
					)}
				</div>
			</SectionWrapper>

			{isModalOpen && (
				<Modal onClose={onCloseModal}>
					<PostForm formState={EPostFormState.ADD_POST} onCloseModal={onCloseModal} />
				</Modal>
			)}
		</>
	);
};
