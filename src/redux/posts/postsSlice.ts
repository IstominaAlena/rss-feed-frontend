import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { IPosts } from "./typings";
import { getAllPosts, getPostById, addPost, deletePost, updatePost } from "./postsOperations";

const initialState: IPosts = {
	posts: [],
	currentPost: null,
	isLoading: false,
	error: null
};

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			getAllPosts.fulfilled,
			(state, { payload }) => {
				state.posts = payload ?? initialState.posts;
				state.isLoading = false;
				state.currentPost = initialState.currentPost;
			}
		);
		builder.addCase(
			deletePost.fulfilled,
			(state, { payload }) => {
				state.posts = state.posts.filter((item) => item._id !== payload);
				state.isLoading = false;
				state.currentPost = initialState.currentPost;
			}
		);
		builder.addMatcher(
			isAnyOf(
				getPostById.fulfilled,
				addPost.fulfilled,
				updatePost.fulfilled
			),
			(state, { payload }) => {
				state.currentPost = payload ?? initialState.currentPost;
				state.isLoading = false;
			}
		);
		builder.addMatcher(
			isAnyOf(
				getAllPosts.pending,
				getPostById.pending,
				addPost.pending,
				deletePost.pending,
				updatePost.pending
			),
			(state) => {
				state.isLoading = true;
				state.error = null;
			}
		);
		builder.addMatcher(
			isAnyOf(
				getAllPosts.rejected,
				getPostById.rejected,
				addPost.rejected,
				deletePost.rejected,
				updatePost.rejected
			),
			(state, { error }) => {
				state.error = error.message ?? initialState.error;
				state.isLoading = false;
			}
		);
	}
});

export const postsReducer = postsSlice.reducer;
