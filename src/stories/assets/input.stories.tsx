import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Input } from '../../components/Input/input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

const ControlledInput = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Username',
    placeholder: 'Enter text...',
  },
};

export const Password: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
};

export const Clearable: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Search',
    clearable: true,
    placeholder: 'Type to see X button',
  },
};

export const NumberInput: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Age',
    type: 'number',
    placeholder: '0',
  },
};

export const PasswordWithClear: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Secret Code',
    type: 'password',
    clearable: true,
    placeholder: 'Hidden and clearable',
  },
};
