import { ToastContainer } from "react-toastify";

import './styles/App.scss';

export const App = () => {
	return (
		<>
			<div className="App">
				test
			</div>
			<ToastContainer autoClose={1500} position="bottom-right" />
		</>
	);
};
