import { FolderKanban, Settings } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: 'projects' | 'emailSettings') => void;
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'emailSettings', label: 'Email Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen no-print">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white">P</span>
          </div>
          <span className="text-lg">PROJECT PULSE</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id || 
                           (currentView === 'checkin' && item.id === 'projects');
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as 'projects' | 'emailSettings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
