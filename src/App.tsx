import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppDispatch } from "./utils/useAppDispatch";
import { getCurrentUser } from "./redux/auth/authOperations";
import { useAppSelector } from "./utils/useAppSelector";
import { selectToken, selectUserError, selectUserIsLoading } from "./redux/auth/authSelectors";

import { Header } from "./components/Header";
import { Toolbar } from "./components/Toolbar";
import { FeedsGallery } from "./components/FeedsGallery";
import { Pagination } from "./components/Pagination";
import { Footer } from "./components/Footer";
import { Spinner } from "./reusable/components/Spinner";
import { Error } from "./reusable/components/Error";

import './styles/App.scss';

export const App = () => {
	const dispatch = useAppDispatch();

	const token = useAppSelector(selectToken);
	const userIsLoading = useAppSelector(selectUserIsLoading);
	const error = useAppSelector(selectUserError);

	useEffect(() => {
		token && dispatch(getCurrentUser());
	}, []);

	return (
		<>
			<div className="App">
				<Header />
				{userIsLoading && <Spinner />}
				{error
					? (<Error errorMessage={error} />)
					: (<>
						<Toolbar />
						<FeedsGallery />
						<Pagination />
					</>)
				}
				<Footer />

			</div>
			<ToastContainer autoClose={2000} position="bottom-right" />
		</>
	);
};
