import { ActionFunction, ActionFunctionArgs, TypedResponse, json } from '@remix-run/node';
import { Room, RoomAttributes, postRoom } from '@apis/room.server';
import { invalidMethodAction } from './invalidMethodAction.server';
import { Message } from './message.server';
import { MappedTypes } from '@apis/util/mappedTypes.server';

export const roomsAction: ActionFunction = async (args: ActionFunctionArgs) => {
	switch (args.request.method) {
		case 'POST':
			return await postRoomsAction(args);
		default:
			return await invalidMethodAction(args);
	}
};

type RoomActionRequest = RoomAttributes;

type RoomsActionResponse = MappedTypes<
	{
		room?: Room;
	} & Message
>;

const postRoomsAction: ActionFunction = async (
	{ request, params }: ActionFunctionArgs,
): Promise<TypedResponse<RoomsActionResponse>> => {
	try {
		const accountId: string = typeof params.accountId === 'string' ? params.accountId : '';
		const body: RoomActionRequest = await request.json();
		const room = await postRoom({ accountId: accountId, roomAttributes: body });
		console.log(`path:/rooms method:${request.method} request:${body} response:${room}`);
		return json({ room: room }, 200);
	} catch (error) {
		const err = error instanceof Error ? error : new Error('unexpected error');
		console.log(`server error: ${err.message}`);
		return json({ message: err.message }, 500);
	}
};
