import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Sidebar } from '../../components/SidebarMenu/sidebarmenu';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
};

export default meta;

const menuItems = [
  { title: 'Main' },
  { 
    title: 'Catalog', 
    children: [
      { title: 'Electronics' },
      { title: 'Cloth', children: [{ title: "Men's" }, { title: "Women's" }] }
    ] 
  },
  { title: 'Settings', children: [{ title: 'Profile' }, { title: 'Safety' }] },
  { title: 'Help' },
];

const SidebarWrapper = (args: any) => {
  const [open, setOpen] = useState(args.isOpen);
  return (
    <div>
      <button 
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Open sidebar
      </button>
      <Sidebar {...args} isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export const NestedMenu: StoryObj<typeof Sidebar> = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    items: menuItems,
    isOpen: false,
  },
};

export const FlatMenu: StoryObj<typeof Sidebar> = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    items: [{ title: 'One' }, { title: 'Two' }, { title: 'Three' }],
    isOpen: true,
  },
};
