export interface IPostsSlice {
	newsFeed: IPosts;
};

export interface IPosts {
	posts: Array<IPostItem>,
	currentPost: IPostItem | null,
	isLoading: boolean,
	error: string | null;
};

export interface IPostItem extends IAddPostBody {
	_id: string,
	isoDate: string,
};

export interface IAddPostBody {
	creator: string,
	title: string,
	link: string,
	content: string,
	contentSnippet: string,
	guid: string,
	categories: Array<string>;
};

export interface IDeletePost {
	message: string;
};

export interface IUpdatePostBody {
	id: string,
	updateBody: any;
};
