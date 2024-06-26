import { Navigation, Outlet, useLoaderData, useLocation, useOutletContext } from '@remix-run/react';
import {
	CautionTextLinkButton,
	Grid,
	DescriptionText,
	TitleText,
	EditLinkButton,
	BackLinkButton,
} from '@components';
import { ParticipantGridItem, ParticipantGridItemProps, RoomProfile } from '@features';
import { NavigationBarLayout, RoomProfilePageLayout, SplitPaneLayout } from '@layouts';
import { roomProfilePageLoader } from '@server/loaders';

export const loader = roomProfilePageLoader;

const RoomProfilePage = () => {
	const { id, name, createdAt, participants } = useLoaderData<typeof loader>();

	const { pathname } = useLocation();

	return (
		<>
			<SplitPaneLayout
				top={
					<NavigationBarLayout
						location={<DescriptionText description={pathname} />}
						title={<TitleText title={'Room Profile'} />}
						right={<EditLinkButton to={`/rooms/${id}/edit`} />}
						left={<BackLinkButton to={'/rooms'} />}
					/>
				}
				bottom={
					<RoomProfilePageLayout
						roomProfile={<RoomProfile id={id} name={name} createdAt={createdAt} />}
						participantGrid={
							<Grid<ParticipantGridItemProps>
								items={participants}
								render={({ id, name }) => (
									<ParticipantGridItem id={id} name={name} key={id} />
								)}
							/>
						}
						deleteRoomButton={
							<CautionTextLinkButton
								to={`/rooms/${id}/delete`}
								caption={'Delete This Room'}
							/>
						}
					/>
				}
			/>
			<Outlet context={useOutletContext<Navigation>()} />
		</>
	);
};

export default RoomProfilePage;
