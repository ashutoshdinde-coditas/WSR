import { CheckCircle2, Clock, AlertCircle, CalendarClock } from 'lucide-react';
import { Project } from '../App';

interface MyProjectsProps {
  onViewProject: (project: Project) => void;
}

export function MyProjects({ onViewProject }: MyProjectsProps) {
  // Mock data for currently allocated projects
  const projects: Project[] = [
    {
      id: '1',
      name: 'Customer Portal Redesign',
      client: 'Acme Corp',
      startDate: 'Sep 1, 2025',
      endDate: 'Feb 28, 2026',
      checkInStatus: 'done',
      projectStatus: 'on-track',
      weekNumber: 'W49',
      month: 'Dec',
      year: '2025',
      ragStatus: 'green'
    },
    {
      id: '2',
      name: 'Mobile App Development',
      client: 'TechStart Inc',
      startDate: 'Aug 15, 2025',
      endDate: 'Jan 31, 2026',
      checkInStatus: 'pending',
      projectStatus: 'at-risk',
      weekNumber: 'W48',
      month: 'Nov',
      year: '2025',
      ragStatus: 'amber'
    },
    {
      id: '3',
      name: 'Data Migration Project',
      client: 'Global Systems',
      startDate: 'Jul 1, 2025',
      endDate: 'Dec 31, 2025',
      checkInStatus: 'overdue',
      projectStatus: 'off-track',
      weekNumber: 'W45',
      month: 'Nov',
      year: '2025',
      ragStatus: 'red'
    }
  ];

  const getCheckInStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return (
          <div className="flex items-center justify-center text-green-600" title="Check-in Done">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center justify-center text-amber-500" title="Check-in Pending">
            <Clock className="w-4 h-4" />
          </div>
        );
      case 'overdue':
        return (
          <div className="flex items-center justify-center text-red-600" title="Check-in Overdue">
            <AlertCircle className="w-4 h-4" />
          </div>
        );
      default:
        return null;
    }
  };

  const getProjectStatusBadge = (status: string) => {
    switch (status) {
      case 'on-track':
        return (
          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            On Track
          </span>
        );
      case 'at-risk':
        return (
          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
            At Risk
          </span>
        );
      case 'off-track':
        return (
          <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
            Off Track
          </span>
        );
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

  // Calculate next check-in due date (7 days from now)
  const getNextDueDate = () => {
    const today = new Date();
    const nextDue = new Date(today);
    nextDue.setDate(today.getDate() + 7);
    return nextDue.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl mb-1">My Projects</h1>
        <p className="text-gray-600 text-sm">Currently allocated projects</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left px-3 py-1.5 text-sm font-medium">Project Name</th>
              <th className="text-left px-3 py-1.5 text-sm font-medium">Client</th>
              <th className="text-left px-3 py-1.5 text-sm font-medium">Start Date</th>
              <th className="text-left px-3 py-1.5 text-sm font-medium">End Date</th>
              <th className="text-left px-3 py-1.5 text-sm font-medium">Status</th>
              <th className="text-center px-3 py-1.5 text-sm font-medium">Check-In</th>
              <th className="text-left px-3 py-1.5 text-sm font-medium">Next Due</th>
              <th className="text-center px-3 py-1.5 text-sm font-medium">Health Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr 
                key={project.id} 
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => onViewProject(project)}
              >
                <td className="px-3 py-1.5 text-sm font-medium">
                  {project.name}
                </td>
                <td className="px-3 py-1.5 text-sm">
                  {project.client}
                </td>
                <td className="px-3 py-1.5 text-sm text-gray-600">
                  {project.startDate}
                </td>
                <td className="px-3 py-1.5 text-sm text-gray-600">
                  {project.endDate}
                </td>
                <td className="px-3 py-1.5">
                  {getProjectStatusBadge(project.projectStatus)}
                </td>
                <td className="px-3 py-1.5 text-center">
                  {getCheckInStatusIcon(project.checkInStatus)}
                </td>
                <td className="px-3 py-1.5">
                  <div className="flex items-center gap-1 text-sm text-amber-600">
                    <CalendarClock className="w-3.5 h-3.5" />
                    <span>{getNextDueDate()}</span>
                  </div>
                </td>
                <td className="px-3 py-1.5 text-center">
                  <div className={`w-5 h-5 rounded-full mx-auto ${getRagColor(project.ragStatus)}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
