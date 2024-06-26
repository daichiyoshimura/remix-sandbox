import { Link } from '@remix-run/react';
import { Button } from '@components';

export type CautionTextLinkButtonProps = {
	to: string;
	caption: string;
	disabled?: boolean;
};

export const CautionTextLinkButton = (
	{ to, caption, disabled = false }: CautionTextLinkButtonProps,
) => {
	return (
		<Link to={to}>
			<Button color="caution" disabled={disabled}>
				<p>{caption}</p>
			</Button>
		</Link>
	);
};
