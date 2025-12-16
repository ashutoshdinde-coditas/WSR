import { useState } from 'react';
import { MyProjects } from './components/MyProjects';
import { WeeklyCheckIn } from './components/WeeklyCheckIn';
import { Sidebar } from './components/Sidebar';
import { EmailSettings } from './components/EmailSettings';
import { ProjectDetails, WSREntry } from './components/ProjectDetails';

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
  const [currentView, setCurrentView] = useState<'projects' | 'projectDetails' | 'checkin' | 'emailSettings'>('projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [checkInMode, setCheckInMode] = useState<'view' | 'edit' | 'add'>('view');

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('projectDetails');
  };

  const handleViewWSR = (wsr: WSREntry) => {
    setCheckInMode('view');
    setCurrentView('checkin');
  };

  const handleEditWSR = (wsr: WSREntry) => {
    setCheckInMode('edit');
    setCurrentView('checkin');
  };

  const handleAddWSR = () => {
    setCheckInMode('add');
    setCurrentView('checkin');
  };

  const handleBackToProjects = () => {
    setCurrentView('projects');
    setSelectedProject(null);
  };

  const handleBackToProjectDetails = () => {
    setCurrentView('projectDetails');
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
          <MyProjects onViewProject={handleViewProject} />
        ) : currentView === 'projectDetails' && selectedProject ? (
          <ProjectDetails
            project={selectedProject}
            onBack={handleBackToProjects}
            onViewWSR={handleViewWSR}
            onEditWSR={handleEditWSR}
            onAddWSR={handleAddWSR}
          />
        ) : currentView === 'emailSettings' ? (
          <EmailSettings />
        ) : (
          <WeeklyCheckIn 
            project={selectedProject!} 
            onBack={handleBackToProjectDetails}
            mode={checkInMode}
          />
        )}
      </div>
    </div>
  );
}

export default App;