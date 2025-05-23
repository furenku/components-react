import type { Meta, StoryObj } from '@storybook/react';
import { Test } from './Test';

const meta: Meta<typeof Test> = {
  title: 'Test',
  component: Test,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A test component.',
      },
    },
  },
  argTypes: {},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
