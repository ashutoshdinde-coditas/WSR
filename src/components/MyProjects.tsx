import { CheckCircle2, Clock, AlertCircle, ClipboardEdit, Mail, X, Send, Paperclip, CalendarClock } from 'lucide-react';
import { Project } from '../App';
import { useState } from 'react';

interface MyProjectsProps {
  onViewCheckIn: (project: Project) => void;
  onLogCheckIn: (project: Project, mode: 'add' | 'edit') => void;
}

export function MyProjects({ onViewCheckIn, onLogCheckIn }: MyProjectsProps) {
  const [emailProject, setEmailProject] = useState<Project | null>(null);
  const [emailBody, setEmailBody] = useState('');
  const [attachments, setAttachments] = useState<string[]>(['Weekly_Status_Report.pdf']);

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

  const openEmailPopup = (project: Project) => {
    setEmailProject(project);
    setEmailBody(`Hi Team,

Please find below the weekly status update for ${project.name}.

Project Status: ${project.projectStatus === 'on-track' ? 'On Track' : project.projectStatus === 'at-risk' ? 'At Risk' : 'Off Track'}
Health Status: ${project.ragStatus.charAt(0).toUpperCase() + project.ragStatus.slice(1)}
Week: ${project.weekNumber}

Best regards,
Project Manager`);
  };

  const handleSendEmail = () => {
    alert(`Email sent for ${emailProject?.name}!`);
    setEmailProject(null);
    setEmailBody('');
  };

  const removeAttachment = (name: string) => {
    setAttachments(attachments.filter(a => a !== name));
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
              <th className="text-center px-3 py-1.5 text-sm font-medium">Actions</th>
              <th className="text-center px-3 py-1.5 text-sm font-medium">Email</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b hover:bg-gray-50">
                <td 
                  className="px-3 py-1.5 cursor-pointer text-sm font-medium"
                  onClick={() => onViewCheckIn(project)}
                >
                  {project.name}
                </td>
                <td 
                  className="px-3 py-1.5 cursor-pointer text-sm"
                  onClick={() => onViewCheckIn(project)}
                >
                  {project.client}
                </td>
                <td 
                  className="px-3 py-1.5 cursor-pointer text-sm text-gray-600"
                  onClick={() => onViewCheckIn(project)}
                >
                  {project.startDate}
                </td>
                <td 
                  className="px-3 py-1.5 cursor-pointer text-sm text-gray-600"
                  onClick={() => onViewCheckIn(project)}
                >
                  {project.endDate}
                </td>
                <td 
                  className="px-3 py-1.5 cursor-pointer"
                  onClick={() => onViewCheckIn(project)}
                >
                  {getProjectStatusBadge(project.projectStatus)}
                </td>
                <td 
                  className="px-3 py-1.5 cursor-pointer text-center"
                  onClick={() => onViewCheckIn(project)}
                >
                  {getCheckInStatusIcon(project.checkInStatus)}
                </td>
                <td 
                  className="px-3 py-1.5 cursor-pointer"
                  onClick={() => onViewCheckIn(project)}
                >
                  <div className="flex items-center gap-1 text-sm text-amber-600">
                    <CalendarClock className="w-3.5 h-3.5" />
                    <span>{getNextDueDate()}</span>
                  </div>
                </td>
                <td 
                  className="px-3 py-1.5 cursor-pointer text-center"
                  onClick={() => onViewCheckIn(project)}
                >
                  <div className={`w-5 h-5 rounded-full mx-auto ${getRagColor(project.ragStatus)}`} />
                </td>
                <td className="px-3 py-1.5 text-center">
                  <button
                    onClick={() => onLogCheckIn(project, 'add')}
                    className="flex items-center justify-center w-7 h-7 mx-auto bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    title="Check-in"
                  >
                    <ClipboardEdit className="w-4 h-4" />
                  </button>
                </td>
                <td className="px-3 py-1.5 text-center">
                  <button
                    onClick={() => openEmailPopup(project)}
                    className="flex items-center justify-center w-7 h-7 mx-auto bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Email Popup Modal */}
      {emailProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium">Send Status Email</h3>
              </div>
              <button
                onClick={() => setEmailProject(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Project</p>
                <p className="font-medium">{emailProject.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">To</p>
                <p className="text-sm">leadership@company.com, stakeholders@company.com</p>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Email Body</label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Paperclip className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Attachments</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {attachments.map((file) => (
                    <div
                      key={file}
                      className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm"
                    >
                      <span>{file}</span>
                      <button
                        onClick={() => removeAttachment(file)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button className="px-2 py-1 border border-dashed border-gray-300 rounded text-sm text-gray-500 hover:border-gray-400">
                    + Add file
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-4 py-3 border-t bg-gray-50">
              <button
                onClick={() => setEmailProject(null)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                <Send className="w-4 h-4" />
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}