import { RoomIcon, LinkButton, EditIcon } from '@components';
import { BetweenContainer } from '@components/Container/BetweenContainer';

export type RoomProfileProps = {
	id: string;
	name: string;
	createdAt: string;
};

export const RoomProfile = ({ id, name, createdAt }: RoomProfileProps) => {
	return (
		<>
			<BetweenContainer>
				<RoomIcon />
				<div className="flex flex-col w-full">
					<h2 className="text-lg font-semibold">{name}</h2>
					<p>ID: {id}</p>
					<p>Created At: {createdAt}</p>
				</div>
				<div className="flex items-center">
					<LinkButton to={'./edit'}>
						<EditIcon />
					</LinkButton>
				</div>
			</BetweenContainer>
		</>
	);
};
