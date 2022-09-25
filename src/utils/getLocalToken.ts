import { store } from "../redux/store";

export const getLocalToken = () => {
	const state = store.getState();
	const token: string | undefined = state.auth.token;
	return token;
};
