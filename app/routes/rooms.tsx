import { Navigation, Outlet, useLoaderData, useLocation, useOutletContext } from '@remix-run/react';
import { Container, LinkButton, LocationBar, EndContainer } from '@components';
import { RoomCardList } from '@features';
import { roomListPageAction } from '@server/actions';
import { roomListPageLoader } from '@server/loaders';

export const loader = roomListPageLoader;

export const action = roomListPageAction;

const RoomListPage = () => {
	const loaderData = useLoaderData<typeof loader>();
	if ('message' in loaderData) {
		throw Error(loaderData.message);
	}
	const { rooms } = loaderData;

	const { pathname } = useLocation();

	return (
		<>
			<Container>
				<LocationBar pathname={pathname} title={'Rooms'} />
			</Container>
			<EndContainer>
				<LinkButton to={'./new'}>Create Room</LinkButton>
			</EndContainer>
			<Container>
				<RoomCardList rooms={rooms} />
			</Container>
			<Outlet context={useOutletContext<Navigation>()} />
		</>
	);
};

export default RoomListPage;
