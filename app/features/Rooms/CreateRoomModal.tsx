import { z } from 'zod';
import { useState } from 'react';
import { Form } from '@remix-run/react';
import { MutationState, useMutationState, useMutationSwitcher } from '@hooks';
import {
	Button,
	Container,
	DescriptionText,
	TitleText,
	TextInput,
	ErrorTextList,
	LoadingIcon,
	Modal,
	MessageModal,
} from '@components';

const createRoomSchema = z.object({
	name: z
		.string()
		.min(1)
		.max(64)
		.regex(/^[^\W_]*$/, 'alphanumeric characters only, excluding symbols and spaces'),
});

type CreateRoomSchema = z.infer<typeof createRoomSchema>;

export type CreateRoomModalProps = {
	isOpen: boolean;
	onClose: () => void;
	state?: MutationState;
};

export const CreateRoomModal: React.FC<CreateRoomModalProps> = (
	{ isOpen, onClose, state = 'init' },
) => {
	const [inputValue, setInputValue] = useState<string>('');
	const [modalState, setModalState] = useMutationState(state);

	const onChange = (value: string) => {
		setInputValue(value);
	};

	const validate = (body: CreateRoomSchema): string[] => {
		const result = createRoomSchema.safeParse(body);
		if (result.success) {
			return [];
		}
		return result.error.issues.map((issue) => issue.message);
	};

	const handleClose = () => {
		setModalState('init');
		setInputValue('');
		onClose();
	};

	const init = () => {
		const errorMessageList = validate({ name: inputValue });
		const isValid = errorMessageList.length === 0;

		return (
			<Modal isOpen={isOpen} onClose={handleClose}>
				<TitleText title={'Create Room'} />
				<DescriptionText
					description={`
							Please enter only alphanumeric characters in this
							field. It is limited to a maximum length of 64
							characters. The use of symbols such as underscores,
							hyphens, and spaces is not permitted.
						`}
				/>
				<Form action="/rooms" method="POST">
					<TextInput
						name="name"
						value={inputValue}
						onChange={onChange}
						placeholder="name"
						required
					/>
					<ErrorTextList textList={errorMessageList} />
					<Container alignment="right">
						<Button onClick={handleClose}>Do not create</Button>
						<Button type="submit" color="safe" disabled={!isValid}>
							Create
						</Button>
					</Container>
				</Form>
			</Modal>
		);
	};

	const loading = () => {
		return (
			<Modal isOpen={isOpen} onClose={handleClose}>
				<LoadingIcon />
			</Modal>
		);
	};

	const success = () => {
		return (
			<MessageModal
				title={'Success'}
				description={'The Room is created'}
				isOpen={isOpen}
				onClose={handleClose}
			/>
		);
	};

	const failure = () => {
		return (
			<MessageModal
				title={'Failed'}
				description={'Please try again later, or contact support if the issue persists'}
				isOpen={isOpen}
				onClose={handleClose}
			/>
		);
	};

	return useMutationSwitcher(modalState, init, loading, success, failure);
};
