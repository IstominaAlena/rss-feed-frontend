import { useEffect, useState, useRef } from "react";

import { EAuthFormState } from "../../constants/frontenConstants";
import { useAppSelector } from "../../utils/useAppSelector";
import { selectUserIsLoggedIn, selectUserName } from "../../redux/auth/authSelectors";
import { useAppDispatch } from "../../utils/useAppDispatch";
import { logoutUser } from "../../redux/auth/authOperations";
import { selectPage } from "../../redux/posts/postsSlelectors";

import { Button } from "../../reusable/components/Button";
import { Modal } from "../../reusable/components/Modal";
import { SignUpForm } from "../SignUpForm";
import { SignInForm } from "../SignInForm";

import styles from "./Header.module.scss";

export const Header = () => {
	const dispatch = useAppDispatch();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formState, setFormState] = useState(EAuthFormState.SIGN_UP);

	const userName = useAppSelector(selectUserName);
	const isUserLoggedIn = useAppSelector(selectUserIsLoggedIn);
	const currentPage = useAppSelector(selectPage);

	const listStartRef = useRef<null | HTMLDivElement>(null);

	const scrollToStart = () => {
		listStartRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToStart();
	}, [currentPage]);

	const onOpenModal = () => {
		setIsModalOpen(true);
	};

	const onCloseModal = () => {
		setIsModalOpen(false);
	};

	const onSignUpButton = () => {
		setFormState(EAuthFormState.SIGN_UP);
		onOpenModal();
	};

	const onSignInButton = () => {
		setFormState(EAuthFormState.SIGN_IN);
		onOpenModal();
	};

	const onLogoutButton = () => {
		dispatch(logoutUser());
	};

	return (
		<>
			<div ref={listStartRef}></div>
			<header className={styles.headerContainer}>
				<a href="https://lifehacker.com/" className={styles.logoLink}>
					News from <span>Lifehacker</span>
				</a>

				<div className={styles.authContainer}>
					{isUserLoggedIn && (<span className={styles.username}>{userName}</span>)}
					{!isUserLoggedIn && (
						<Button className={styles.authButton} onClick={onSignUpButton} >
							Sign up
						</Button>
					)}
					<Button
						className={styles.authButton}
						onClick={isUserLoggedIn ? onLogoutButton : onSignInButton}
					>
						{isUserLoggedIn ? "Logout" : "Sign in"}
					</Button>
				</div>
			</header>


			{isModalOpen && (
				<Modal onClose={onCloseModal}>
					{formState === EAuthFormState.SIGN_UP && (<SignUpForm onCloseModal={onCloseModal} />)}
					{formState === EAuthFormState.SIGN_IN && (<SignInForm onCloseModal={onCloseModal} />)}
				</Modal>
			)}
		</>
	);
};
