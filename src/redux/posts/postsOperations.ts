import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { EPath } from "../../constants/apiConstants";
import { IPostItem, IAddPostBody, IDeletePost, IUpdatePostBody } from "./typings";
import { instance } from "../../utils/axiosInstance";

export const getAllPosts = createAsyncThunk<Array<IPostItem> | undefined>(
	"posts/getAllPosts",
	async () => {
		try {
			const { data } = await instance.get<Array<IPostItem>>(EPath.POSTS);
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
			const { data } = await instance.delete<IDeletePost>(EPath.POSTS + "/" + id);
			toast.success(data.message);
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
