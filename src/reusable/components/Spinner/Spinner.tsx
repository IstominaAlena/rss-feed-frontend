import { CSSProperties } from "react";
import PuffLoader from "react-spinners/PuffLoader";

import { accentColor } from "../../../constants/frontenConstants";

const override: CSSProperties = {
	position: "fixed",
	top: "50%",
	left: "50%",
	display: "block",
	transform: "translate(-50%, -50%)",
	zIndex: 1000
};

export const Spinner = () => (
	<PuffLoader size={60} color={accentColor} cssOverride={override} />
);
