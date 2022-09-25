import React, { useEffect } from "react";
import { createPortal } from "react-dom";

import { Button } from "../Button";
import { GetIcon } from "../GetIcon";

import styles from "./Modal.module.scss";

const modalRoot = document.getElementById("modal-root") as HTMLDivElement;

interface IProps {
	onClose: () => void,
	children: React.ReactNode;
};

export const Modal = ({ onClose, children }: IProps) => {
	useEffect(() => {
		document.addEventListener("keydown", handleClose);
		return () => document.removeEventListener("keydown", handleClose);
	}, []);

	const handleClose = (e: any) => {
		if (e.code === "Escape") {
			return onClose();
		}
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return createPortal((
		<div onClick={handleClose} className={styles.backdrop}>
			<div className={styles.modal}>
				<Button
					className={styles.closeButton}
					onClick={onClose}
				>
					<GetIcon name="delete" width={15} height={15} className={styles.icon} />
				</Button>
				{children}
			</div>
		</div>
	), modalRoot);
};
