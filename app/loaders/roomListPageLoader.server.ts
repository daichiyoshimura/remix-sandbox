import { LoaderFunctionArgs, TypedResponse, json } from '@remix-run/node';
import { MappedTypes, isString, writeRequestLog } from '@util';
import { InternalSeverErrorLoaderResponse, internalServerErrorLoader } from '@loaders';
import { Room, getRoomList } from '@server/api';
import { MutationTimes } from '@server/util';

type RoomList = MappedTypes<{
	rooms: (Room & MutationTimes)[];
}>;

export type RoomListLoaderResponse = RoomList | InternalSeverErrorLoaderResponse;

export const roomListPageLoader = async (
	{ request, params }: LoaderFunctionArgs,
): Promise<TypedResponse<RoomListLoaderResponse>> => {
	try {
		const accountId: string = isString(params.accountId) ? params.accountId : '';
		const getRoomListRequest = { accountId: accountId };
		const getRoomListResponse = await getRoomList(getRoomListRequest);

		writeRequestLog({
			path: `/rooms`,
			method: request.method,
			request: getRoomListRequest,
			response: getRoomListResponse,
		});
		return json(getRoomListResponse, 200);
	} catch (error) {
		return internalServerErrorLoader(error);
	}
};
