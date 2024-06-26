import { BrowserRouter } from 'react-router-dom';
import { Meta, StoryFn } from '@storybook/react';
import { RoomCard, RoomCardProps } from '@features';

const meta: Meta = {
	title: 'RoomCard',
	component: RoomCard,
	tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<RoomCardProps> = (args) => (
	<BrowserRouter>
		<RoomCard {...args} />
	</BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
	id: '123',
	name: 'Test Room',
	createdAt: '2024-03-31',
};
