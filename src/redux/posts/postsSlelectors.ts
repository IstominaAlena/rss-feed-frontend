import { IPostsSlice } from "./typings";

export const selectAllPosts = (state: IPostsSlice) => state.newsFeed.posts;
export const selectPostsIsLoading = (state: IPostsSlice) => state.newsFeed.isLoading;
export const selectPostsError = (state: IPostsSlice) => state.newsFeed.error;
