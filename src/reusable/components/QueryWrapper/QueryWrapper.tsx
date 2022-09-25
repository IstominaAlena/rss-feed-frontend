import { Spinner } from "../Spinner";
import { Error } from "../Error";

interface IProps {
	loading: boolean,
	error: string | null,
	data: any,
	children: React.ReactNode;
};

export const QueryWrapper = ({ loading, error, data, children }: IProps) => (
	<>
		{error && (<Error errorMessage={error} />)}
		{loading && (<Spinner />)}
		{(data.length === 0 || !data) && !error && !loading && (
			<Error errorMessage={"Nothing to show"} />
		)}
		{data && !error && children}
	</>
);
