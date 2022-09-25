import { createAsyncThunk } from "@reduxjs/toolkit";

import { EPath, POSTS_PER_PAGE } from "../../constants/apiConstants";
import {
	IPostItem,
	IAddPostBody,
	IDeletePost,
	IUpdatePostBody,
	IGetAllPostsBody,
	IGetAllPostsResponce
} from "./typings";
import { instance } from "../../utils/axiosInstance";

export const getAllPosts = createAsyncThunk<IGetAllPostsResponce | undefined, IGetAllPostsBody>(
	"posts/getAllPosts",
	async ({ page, title }) => {
		try {
			const { data } = await instance.get<IGetAllPostsResponce>(EPath.POSTS, {
				params: {
					limit: POSTS_PER_PAGE,
					page,
					title
				}
			});
			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			};
		}
	}
);

export const getPostById = createAsyncThunk<IPostItem | undefined, string>(
	"posts/getPostById",
	async (id) => {
		try {
			const { data } = await instance.get<IPostItem>(EPath.POSTS + "/" + id);
			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			};
		}
	}
);

export const addPost = createAsyncThunk<IPostItem | undefined, IAddPostBody>(
	"posts/addPost",
	async (post) => {
		try {
			const { data } = await instance.post<IPostItem>(EPath.POSTS, post);
			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			};
		}
	}
);

export const deletePost = createAsyncThunk<string | undefined, string>(
	"posts/deletePost",
	async (id) => {
		try {
			await instance.delete<IDeletePost>(EPath.POSTS + "/" + id);
			return id;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			};
		}
	}
);

export const updatePost = createAsyncThunk<IPostItem | undefined, IUpdatePostBody>(
	"posts/updatePost",
	async ({ id, updateBody }) => {
		try {
			const { data } = await instance.put<IPostItem>(EPath.POSTS + "/" + id, updateBody);
			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			};
		}
	}
);
