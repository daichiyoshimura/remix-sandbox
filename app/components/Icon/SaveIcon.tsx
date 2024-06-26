import { CheckCircle } from '@mui/icons-material';
import { NoSsr } from '@mui/base';

export type SaveIconProps = {
	className?: string;
};

export const SaveIcon = ({ className = '' }: SaveIconProps) => {
	return (
		<>
			<NoSsr>
				<CheckCircle className={className} />
			</NoSsr>
		</>
	);
};
