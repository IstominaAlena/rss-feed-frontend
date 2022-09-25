import { Formik } from "formik";

import { ButtonTypes, EPostFormState } from "../../constants/frontenConstants";
import { useAppDispatch } from "../../utils/useAppDispatch";
import { useAppSelector } from "../../utils/useAppSelector";
import { selectCurrentPost } from "../../redux/posts/postsSlelectors";
import { addPost, updatePost } from "../../redux/posts/postsOperations";
import {
	parseFromArrayToHashtagString,
	parseFromHashtagStringToArray
} from "../../utils/parseHashtagArrayString";

import { Button } from "../../reusable/components/Button";
import { FormikInput } from "../../reusable/components/FormikInput";

import styles from "../../reusable/styles/FormStyles.module.scss";

interface IEditPostValues {
	creator: string,
	title: string,
	link: string,
	contentSnippet: string,
	content: string,
	categories: string,
};

interface IProps {
	onCloseModal: () => void;
	formState: EPostFormState;
};

export const PostForm = ({ onCloseModal, formState }: IProps) => {
	const dispatch = useAppDispatch();

	const currentPost = useAppSelector(selectCurrentPost);

	const isEditFormState = formState === EPostFormState.EDIT_POST;

	const initialValues: IEditPostValues = {
		creator: isEditFormState ? currentPost?.creator ?? "No author" : "",
		title: isEditFormState ? currentPost?.title ?? "No header" : "",
		link: isEditFormState ? currentPost?.link ?? "No link" : "",
		content: isEditFormState ? currentPost?.content ?? "No content" : "",
		contentSnippet: isEditFormState ? currentPost?.contentSnippet ?? "No snippet" : "",
		categories: isEditFormState
			? parseFromArrayToHashtagString(currentPost?.categories)
			?? "No hashtags"
			: "",
	};

	return (
		<div>
			<h3 className={styles.formTitle}>Edit post</h3>
			<Formik
				initialValues={initialValues}
				onSubmit={(values, { resetForm }) => {
					const categories = parseFromHashtagStringToArray(values.categories);
					isEditFormState
						? dispatch(updatePost({
							id: currentPost?._id ?? "",
							updateBody: { ...values, categories }
						}))
						: dispatch(addPost({ ...values, categories }));
					onCloseModal();
					resetForm();
				}}
			>
				{props => (
					<form onSubmit={props.handleSubmit} className={styles.form}>
						<FormikInput
							type="text"
							onChange={props.handleChange}
							value={props.values.creator}
							name="creator"
							error={props.errors.creator}
							label="Author name:"
						/>
						<FormikInput
							type="text"
							onChange={props.handleChange}
							value={props.values.title}
							name="title"
							error={props.errors.title}
							label="Header:"
						/>
						<FormikInput
							type="text"
							onChange={props.handleChange}
							value={props.values.link}
							name="link"
							error={props.errors.link}
							label="Link to the article:"
						/>
						<FormikInput
							type="text"
							onChange={props.handleChange}
							value={props.values.categories}
							name="categories"
							error={props.errors.categories}
							label="Hashtags:"
						/>
						<FormikInput
							type="text"
							onChange={props.handleChange}
							value={props.values.contentSnippet}
							name="contentSnippet"
							error={props.errors.contentSnippet}
							label="Snippet:"
						/>
						<FormikInput
							type="textarea"
							onChange={props.handleChange}
							value={props.values.content}
							name="content"
							error={props.errors.content}
							label="Article's content:"
						/>
						<Button
							type={ButtonTypes.SUBMIT}
							className={styles.continueButton}
						>
							{isEditFormState ? "Edit" : "Add post"}
						</Button>
					</form>
				)}
			</Formik>
		</div>
	);
};
