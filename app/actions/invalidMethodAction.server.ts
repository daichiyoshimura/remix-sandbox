import {
	ActionFunction,
	ActionFunctionArgs,
	TypedResponse,
	json,
} from '@remix-run/node';
import { Message } from '~/hooks/useHttpClient';

export const invalidMethodAction: ActionFunction = async ({
	request,
}: ActionFunctionArgs): Promise<TypedResponse<Message>> => {
	console.log(`/invalid ${request.method}`);
	return json({ message: 'invalid method' }, 400);
};