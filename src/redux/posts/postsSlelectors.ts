import { IPostsSlice } from "./typings";

export const selectAllPosts = (state: IPostsSlice) => state.newsFeed.posts;
export const selectPostsIsLoading = (state: IPostsSlice) => state.newsFeed.isLoading;
export const selectPostsError = (state: IPostsSlice) => state.newsFeed.error;
export const selectCurrentPost = (state: IPostsSlice) => state.newsFeed.currentPost;
export const selectPage = (state: IPostsSlice) => state.newsFeed.page;
export const selectPostsAmount = (state: IPostsSlice) => state.newsFeed.postsAmount;
