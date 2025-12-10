import { CheckCircle2, Clock, ChevronDown } from 'lucide-react';
import { Project } from '../App';
import { useState } from 'react';

interface MyProjectsProps {
  onViewCheckIn: (project: Project) => void;
  onLogCheckIn: (project: Project, mode: 'add' | 'edit') => void;
}

export function MyProjects({ onViewCheckIn, onLogCheckIn }: MyProjectsProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Mock data for currently allocated projects
  const projects: Project[] = [
    {
      id: '1',
      name: 'Customer Portal Redesign',
      client: 'Acme Corp',
      status: 'ontime',
      weekNumber: 'W49',
      month: 'Dec',
      year: '2025',
      ragStatus: 'green'
    },
    {
      id: '2',
      name: 'Mobile App Development',
      client: 'TechStart Inc',
      status: 'ontime',
      weekNumber: 'W48',
      month: 'Nov',
      year: '2025',
      ragStatus: 'amber'
    },
    {
      id: '3',
      name: 'Data Migration Project',
      client: 'Global Systems',
      status: 'delayed',
      weekNumber: 'W45',
      month: 'Nov',
      year: '2025',
      ragStatus: 'red'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ontime':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'delayed':
        return <Clock className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getRagColor = (rag: string) => {
    switch (rag) {
      case 'green':
        return 'bg-green-500';
      case 'amber':
        return 'bg-amber-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">My Projects</h1>
        <p className="text-gray-600">Currently allocated projects</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left px-6 py-4">Project Name</th>
              <th className="text-left px-6 py-4">Client</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Week</th>
              <th className="text-left px-6 py-4">RAG Status</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b hover:bg-gray-50">
                <td 
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => onViewCheckIn(project)}
                >
                  {project.name}
                </td>
                <td 
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => onViewCheckIn(project)}
                >
                  {project.client}
                </td>
                <td 
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => onViewCheckIn(project)}
                >
                  <div className="flex items-center gap-2">
                    {getStatusIcon(project.status)}
                    <span className="capitalize">{project.status === 'ontime' ? 'On Time' : 'Delayed'}</span>
                  </div>
                </td>
                <td 
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => onViewCheckIn(project)}
                >
                  {project.weekNumber}-{project.month}-{project.year}
                </td>
                <td 
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => onViewCheckIn(project)}
                >
                  <div className={`w-8 h-8 rounded-full ${getRagColor(project.ragStatus)}`} />
                </td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === project.id ? null : project.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Log Weekly Check-in
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {openDropdown === project.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                        <button
                          onClick={() => {
                            onLogCheckIn(project, 'add');
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                        >
                          Add New Check-in
                        </button>
                        <button
                          onClick={() => {
                            onLogCheckIn(project, 'edit');
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 border-t transition-colors"
                        >
                          Edit Latest Check-in
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}