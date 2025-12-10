import { useState } from 'react';
import { MyProjects } from './components/MyProjects';
import { WeeklyCheckIn } from './components/WeeklyCheckIn';
import { Sidebar } from './components/Sidebar';
import { EmailSettings } from './components/EmailSettings';

export interface Project {
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  checkInStatus: 'done' | 'pending' | 'overdue';
  projectStatus: 'on-track' | 'off-track' | 'at-risk';
  weekNumber: string;
  month: string;
  year: string;
  ragStatus: 'red' | 'amber' | 'green';
}

export interface Resource {
  id: string;
  name: string;
  role: string;
  allocation: string;
}

function App() {
  const [currentView, setCurrentView] = useState<'projects' | 'checkin' | 'emailSettings'>('projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [checkInMode, setCheckInMode] = useState<'view' | 'edit' | 'add'>('view');

  const handleViewCheckIn = (project: Project) => {
    setSelectedProject(project);
    setCheckInMode('view');
    setCurrentView('checkin');
  };

  const handleLogCheckIn = (project: Project, mode: 'add' | 'edit') => {
    setSelectedProject(project);
    setCheckInMode(mode);
    setCurrentView('checkin');
  };

  const handleBackToProjects = () => {
    setCurrentView('projects');
    setSelectedProject(null);
  };

  const handleNavigate = (view: 'projects' | 'emailSettings') => {
    setCurrentView(view);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentView={currentView} onNavigate={handleNavigate} />
      <div className="flex-1">
        {currentView === 'projects' ? (
          <MyProjects 
            onViewCheckIn={handleViewCheckIn}
            onLogCheckIn={handleLogCheckIn} 
          />
        ) : currentView === 'emailSettings' ? (
          <EmailSettings />
        ) : (
          <WeeklyCheckIn 
            project={selectedProject!} 
            onBack={handleBackToProjects}
            mode={checkInMode}
          />
        )}
      </div>
    </div>
  );
}

export default App;