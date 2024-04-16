import { Edit } from '@mui/icons-material';
import { Button } from '@components';
import { NoSsr } from '@mui/base';

export type EditButtonProps = {
	onClick?: () => void;
	disabled?: boolean;
};

export const EditButton = ({ onClick = () => {}, disabled = false }: EditButtonProps) => {
	return (
		<Button onClick={onClick} disabled={disabled} size="icon">
			<NoSsr>
				<Edit />
			</NoSsr>
		</Button>
	);
};
