export const parseFromArrayToHashtagString = (array: Array<string> | undefined) => {
	return array?.map((item) => `#${item}`).join(" ");
};

export const parseFromHashtagStringToArray = (sting: string) => {
	return sting.split(" ").map((item) => item.replace("#", ""));
};
