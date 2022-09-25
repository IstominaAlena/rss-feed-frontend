import sprite from "../../../images/svg/sprite.svg";

interface IProps {
	name: string;
	width: number;
	height: number;
	className?: string;
};

export const GetIcon = ({ name, width, height, className }: IProps) => (
	<svg width={width} height={height} className={className}>
		<use href={sprite + `#${name}`} />
	</svg>
);
