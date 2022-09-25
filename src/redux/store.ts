import { configureStore, PreloadedState, combineReducers } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { postsReducer } from "./posts/postsSlice";
import { authReducer } from "./auth/authSlice";

const authPersistConfig = {
	key: "auth/userData",
	storage,
	whitelist: ["token", "user"]
};

const postsPersistConfig = {
	key: "posts/currentPage",
	storage,
	whitelist: ["page"]
};

const authPersistedReducer = persistReducer(authPersistConfig, authReducer);
const postsPersistedReducer = persistReducer(postsPersistConfig, postsReducer);

const rootReducer = combineReducers({
	newsFeed: postsPersistedReducer,
	auth: authPersistedReducer
});

const setupStore = (preloadedState?: PreloadedState<RootState>) => configureStore(
	{
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}),
		devTools: process.env.NODE_ENV === "development",
		preloadedState
	}
);

export const store = setupStore();
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
