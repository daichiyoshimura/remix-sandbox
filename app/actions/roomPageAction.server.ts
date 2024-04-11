import { ActionFunctionArgs, TypedResponse, redirect } from '@remix-run/node';
import { deleteRoom, patchRoom } from '@api';
import { isString, writeRequestLog } from '@util';
import {
	InvalidMethodErrorActionResponse,
	InternalSeverErrorActionResponse,
	internalServerErrorAction,
	invalidMethodErrorAction,
	ValidationErrorActionActionResponse,
	validationErrorAction,
} from '@actions';
import { getFormDataValue } from '@util/server';

export type RoomPageActionResponses =
	| DeleteRoomActionResponse
	| PatchRoomActionResponse
	| InvalidMethodErrorActionResponse;

export const roomPageAction = async (
	args: ActionFunctionArgs,
): Promise<TypedResponse<RoomPageActionResponses>> => {
	switch (args.request.method) {
		case 'DELETE':
			return await deleteRoomAction(args);
		case 'PATCH':
			return await patchRoomAction(args);
		default:
			return await invalidMethodErrorAction();
	}
};

type DeleteRoomActionResponse = never | InternalSeverErrorActionResponse;

const deleteRoomAction = async (
	{ request, params }: ActionFunctionArgs,
): Promise<TypedResponse<DeleteRoomActionResponse>> => {
	try {
		const accountId: string = isString(params.accountId) ? params.accountId : '';
		const roomId: string = isString(params.id) ? params.id : '';

		const deleteRoomRequest = { id: roomId, accountId: accountId };
		const deleteRoomResponse = await deleteRoom(deleteRoomRequest);

		writeRequestLog({
			path: `/rooms/${roomId}`,
			method: request.method,
			request: deleteRoomRequest,
			response: deleteRoomResponse,
		});
		return redirect(`/rooms`);
	} catch (error) {
		return internalServerErrorAction(error);
	}
};

type PatchRoomActionResponse =
	| never
	| ValidationErrorActionActionResponse
	| InternalSeverErrorActionResponse;

const patchRoomAction = async (
	{ request, params }: ActionFunctionArgs,
): Promise<TypedResponse<PatchRoomActionResponse>> => {
	try {
		const accountId: string = isString(params.accountId) ? params.accountId : '';
		const roomId: string = isString(params.id) ? params.id : '';
		const formData = await request.formData();
		const name = getFormDataValue(formData, 'name');
		if (!isString(name)) {
			return validationErrorAction('name is required');
		}
		const patchRoomRequest = {
			accountId: accountId,
			room: {
				id: roomId,
				name: name,
			},
		};
		const patchRoomResponse = await patchRoom(patchRoomRequest);
		writeRequestLog({
			path: `/rooms/${roomId}`,
			method: request.method,
			request: patchRoomRequest,
			response: patchRoomResponse,
		});
		return new Response(null, {
			status: 204,
			statusText: 'No Content',
		});
	} catch (error) {
		return internalServerErrorAction(error);
	}
};
