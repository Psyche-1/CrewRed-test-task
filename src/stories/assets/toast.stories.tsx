import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastProvider, useToast } from '../../components/Toast/toast';

const ToastDemo = ({ message, type, duration }: any) => {
  const { addToast } = useToast();
  return (
    <button 
      onClick={() => addToast({ message, type, duration })}
      className="px-4 py-2 bg-slate-800 text-white rounded-md"
    >
      Show Toast
    </button>
  );
};

const meta: Meta = {
  title: 'Components/Toast',
  decorators: [(Story) => <ToastProvider><Story /></ToastProvider>],
  tags: ['autodocs'],
};

export default meta;

export const Success: StoryObj = {
  render: () => <ToastDemo message="Action successful!" type="success" />,
};

export const Error: StoryObj = {
  render: () => <ToastDemo message="Something went wrong" type="error" />,
};

export const Warning: StoryObj = {
  render: () => <ToastDemo message="Check your input" type="warning" />,
};

export const Info: StoryObj = {
  render: () => <ToastDemo message="New update available" type="info" />,
};

export const LongDuration: StoryObj = {
  render: () => <ToastDemo message="I will stay for 10s" type="info" duration={10000} />,
};
