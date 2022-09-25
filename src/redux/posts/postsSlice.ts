import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";

import { IPosts } from "./typings";
import { getAllPosts, getPostById, addPost, deletePost, updatePost } from "./postsOperations";

const initialState: IPosts = {
	posts: [],
	page: 1,
	postsAmount: 0,
	currentPost: null,
	isLoading: false,
	error: null
};

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		removeCurrentPost: (state) => ({
			...state,
			currentPost: null,
		}),
		setPage: (state, { payload }: PayloadAction<number>) => ({
			...state,
			page: payload
		}),
	},
	extraReducers: (builder) => {
		builder.addCase(
			getAllPosts.fulfilled,
			(state, { payload }) => {
				state.posts = payload?.posts ?? initialState.posts;
				state.postsAmount = payload?.postsAmount ?? initialState.postsAmount;
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
		builder.addCase(
			updatePost.fulfilled,
			(state, { payload }) => {
				state.posts = state.posts.map((item) => item._id === payload?._id ? payload : item);
				state.isLoading = false;
			}
		);
		builder.addCase(
			addPost.fulfilled,
			(state, { payload }) => {
				state.posts = payload ? [payload, ...state.posts,] : state.posts;
				state.isLoading = false;
			}
		);
		builder.addCase(
			getPostById.fulfilled,
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
export const { removeCurrentPost, setPage } = postsSlice.actions;
