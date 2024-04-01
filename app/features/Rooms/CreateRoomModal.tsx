import React, { useState } from 'react';
import { useHttpClient } from '~/hooks/useHttpClient';
import { useRequestState } from '~/hooks/useRequestState';

import Modal from '~/components/Modal/Modal';
import Container from '~/components/Container/Container';
import TextInput from '~/components/TextInput/TextInput';
import Button from '~/components/Button/Button';
import ModalTitle from '~/components/ModalContent/ModalTitle';
import ModalDescription from '~/components/ModalContent/ModalDescription';
import LoadingIcon from '~/components/LoadingIcon/LoadingIcon';

export interface CreateRoomModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
	isOpen,
	onClose,
}) => {
	const [inputValue, setInputValue] = useState('');
	const [requestStatus, setRequestStatus] = useRequestState();

	const handleCreate = async () => {
		try {
			await useHttpClient({
				path: 'rooms',
				method: 'POST',
				body: JSON.stringify({ inputValue }),
				setRequestStatus: setRequestStatus,
			});
		} catch (error) {
			console.error('Error while creating room:', error);
		}
	};

	const handleClose = () => {
		setInputValue('');
		setRequestStatus('init');
		onClose();
	};

	const renderContent = () => {
		switch (requestStatus) {
			case 'init':
				return (
					<>
						<ModalTitle title={'Create Room'} />
						<ModalDescription
							description={`
							Please enter only alphanumeric characters in this
							field. It is limited to a maximum length of 64
							characters. The use of symbols such as underscores,
							hyphens, and spaces is not permitted.
						`}
						/>
						<TextInput
							value={inputValue}
							onChange={setInputValue}
							placeholder="room name"
							required
						/>
						<Container alignment="right">
							<Button onClick={handleClose}>do not create</Button>
							<Button
								onClick={() => handleCreate()}
								disabled={inputValue.length === 0}
								color="safe"
							>
								create
							</Button>
						</Container>
					</>
				);
			case 'loading':
				return <LoadingIcon />;
			case 'success':
				return (
					<>
						<ModalTitle title={'Success'} />
						<Container alignment="right">
							<Button onClick={handleClose}>close</Button>
						</Container>
					</>
				);
			case 'failure':
				return (
					<>
						<ModalTitle title={'Failed to create room'} />
						<ModalDescription
							description={`
							Please try again later, or contact support if the issue persists
						`}
						/>
						<Container alignment="right">
							<Button onClick={handleClose}>close</Button>
						</Container>
					</>
				);
			default:
				return null;
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose}>
			{renderContent()}
		</Modal>
	);
};

export default CreateRoomModal;
