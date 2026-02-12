import { useState } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';

interface MenuItem {
  title: string;
  children?: MenuItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
}

const NavItem = ({ item, depth = 0 }: { item: MenuItem; depth?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between p-3 hover:bg-gray-100 transition-colors ${
          depth > 0 ? 'pl-8 text-sm' : 'font-medium'
        }`}
      >
        <span>{item.title}</span>
        {hasChildren && (
          isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
        )}
      </button>
      
      {hasChildren && isOpen && (
        <div className="bg-gray-50/50">
          {item.children?.map((child, idx) => (
            <NavItem key={idx} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar = ({ isOpen, onClose, items }: SidebarProps) => {
  return (
    <>
      {/* Overlay (Backdrop) */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={24} />
          </button>
        </div>

        <nav className="overflow-y-auto h-[calc(100%-64px)]">
          {items.map((item, idx) => (
            <NavItem key={idx} item={item} />
          ))}
        </nav>
      </aside>
    </>
  );
};
