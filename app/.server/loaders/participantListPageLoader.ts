import { LoaderFunctionArgs, TypedResponse, json } from '@remix-run/node';
import { MappedTypes, isString, writeRequestLog } from '@util';
import { handleServerError } from '@.server/util';
import { Participant, getParticipantListOfAccount } from '@server/api';

type ParticipantListOfAccount = MappedTypes<{
	participants: Participant[];
}>;

export type ParticipantListOfAccountLoaderResponse = ParticipantListOfAccount;

export const participantListPageLoader = async (
	{ request, params }: LoaderFunctionArgs,
): Promise<TypedResponse<ParticipantListOfAccountLoaderResponse>> => {
	try {
		const accountId: string = isString(params.accountId) ? params.accountId : '';
		const getParticipantListOfAccountRequest = { accountId: accountId };
		const getParticipantListOfAccountResponse = await getParticipantListOfAccount(
			getParticipantListOfAccountRequest,
		);

		writeRequestLog({
			path: `/participants`,
			method: request.method,
			request: getParticipantListOfAccountRequest,
			response: getParticipantListOfAccountResponse,
		});
		return json(getParticipantListOfAccountResponse, 200);
	} catch (error) {
		return handleServerError(error);
	}
};
