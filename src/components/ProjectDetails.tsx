import { ArrowLeft, Calendar, Users, Building, Plus, Eye, Edit2, Mail, X, Send, Paperclip, Filter, ChevronDown, ChevronRight } from 'lucide-react';
import { Project } from '../App';
import { useState, useMemo } from 'react';

export interface WSREntry {
  id: string;
  month: string;
  year: string;
  weekNumber: string;
  ragStatus: 'red' | 'amber' | 'green';
  submittedDate: string;
  isLatest: boolean;
}

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
  onViewWSR: (wsr: WSREntry) => void;
  onEditWSR: (wsr: WSREntry) => void;
  onAddWSR: () => void;
}

export function ProjectDetails({ project, onBack, onViewWSR, onEditWSR, onAddWSR }: ProjectDetailsProps) {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedWSRForEmail, setSelectedWSRForEmail] = useState<WSREntry | null>(null);
  const [emailTo, setEmailTo] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [attachments, setAttachments] = useState<string[]>(['Weekly_Status_Report.pdf']);
  
  // Filter states
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  
  // Accordion states - track which months are expanded
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());

  // Mock data for past WSRs
  const wsrEntries: WSREntry[] = [
    {
      id: 'wsr-1',
      month: 'December',
      year: '2025',
      weekNumber: 'Week 2',
      ragStatus: 'green',
      submittedDate: 'Dec 8, 2025',
      isLatest: true
    },
    {
      id: 'wsr-2',
      month: 'December',
      year: '2025',
      weekNumber: 'Week 1',
      ragStatus: 'amber',
      submittedDate: 'Dec 1, 2025',
      isLatest: false
    },
    {
      id: 'wsr-3',
      month: 'November',
      year: '2025',
      weekNumber: 'Week 4',
      ragStatus: 'green',
      submittedDate: 'Nov 24, 2025',
      isLatest: false
    },
    {
      id: 'wsr-4',
      month: 'November',
      year: '2025',
      weekNumber: 'Week 3',
      ragStatus: 'amber',
      submittedDate: 'Nov 17, 2025',
      isLatest: false
    },
    {
      id: 'wsr-5',
      month: 'November',
      year: '2025',
      weekNumber: 'Week 2',
      ragStatus: 'red',
      submittedDate: 'Nov 10, 2025',
      isLatest: false
    },
    {
      id: 'wsr-6',
      month: 'October',
      year: '2025',
      weekNumber: 'Week 4',
      ragStatus: 'green',
      submittedDate: 'Oct 27, 2025',
      isLatest: false
    },
    {
      id: 'wsr-7',
      month: 'October',
      year: '2025',
      weekNumber: 'Week 3',
      ragStatus: 'green',
      submittedDate: 'Oct 20, 2025',
      isLatest: false
    }
  ];

  // Get unique years and months for filters
  const years = useMemo(() => {
    const uniqueYears = [...new Set(wsrEntries.map(wsr => wsr.year))];
    return uniqueYears.sort((a, b) => b.localeCompare(a)); // Descending
  }, []);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Filter WSRs based on selected year and month
  const filteredWSRs = useMemo(() => {
    return wsrEntries.filter(wsr => {
      const yearMatch = selectedYear === 'all' || wsr.year === selectedYear;
      const monthMatch = selectedMonth === 'all' || wsr.month === selectedMonth;
      return yearMatch && monthMatch;
    });
  }, [selectedYear, selectedMonth]);

  // Group filtered WSRs by month and year
  const groupedWSRs = useMemo(() => {
    return filteredWSRs.reduce((acc, wsr) => {
      const key = `${wsr.month} ${wsr.year}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(wsr);
      return acc;
    }, {} as Record<string, WSREntry[]>);
  }, [filteredWSRs]);

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

  const getRagBadge = (rag: string) => {
    switch (rag) {
      case 'green':
        return (
          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            On Track
          </span>
        );
      case 'amber':
        return (
          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
            At Risk
          </span>
        );
      case 'red':
        return (
          <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
            Off Track
          </span>
        );
      default:
        return null;
    }
  };

  const openEmailModal = (e: React.MouseEvent, wsr: WSREntry) => {
    e.stopPropagation();
    setSelectedWSRForEmail(wsr);
    setEmailTo('leadership@company.com, stakeholders@company.com');
    setEmailBody(`Hi Team,

Please find below the weekly status update for ${project.name}.

Report Period: ${wsr.month} ${wsr.year} - ${wsr.weekNumber}
Health Status: ${wsr.ragStatus.charAt(0).toUpperCase() + wsr.ragStatus.slice(1)}
Submitted: ${wsr.submittedDate}

Best regards,
Project Manager`);
    setEmailModalOpen(true);
  };

  const handleSendEmail = () => {
    alert(`Email sent for ${project.name} - ${selectedWSRForEmail?.weekNumber}!`);
    setEmailModalOpen(false);
    setSelectedWSRForEmail(null);
    setEmailBody('');
  };

  const removeAttachment = (name: string) => {
    setAttachments(attachments.filter(a => a !== name));
  };

  const clearFilters = () => {
    setSelectedYear('all');
    setSelectedMonth('all');
  };

  const hasActiveFilters = selectedYear !== 'all' || selectedMonth !== 'all';

  // Toggle accordion for a month
  const toggleMonth = (monthYear: string) => {
    setExpandedMonths(prev => {
      const newSet = new Set(prev);
      if (newSet.has(monthYear)) {
        newSet.delete(monthYear);
      } else {
        newSet.add(monthYear);
      }
      return newSet;
    });
  };

  const isMonthExpanded = (monthYear: string) => expandedMonths.has(monthYear);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Projects
      </button>

      {/* Project Details Tile */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-semibold text-gray-900">{project.name}</h1>
              <div className={`w-4 h-4 rounded-full ${getRagColor(project.ragStatus)}`} title={`Status: ${project.ragStatus}`} />
            </div>
            
            {/* Horizontal Details */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Client:</span>
                <span className="font-medium">{project.client}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{project.startDate} - {project.endDate}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Status:</span>
                {getRagBadge(project.ragStatus)}
              </div>
            </div>
          </div>

          {/* Add WSR Button */}
          <button
            onClick={onAddWSR}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add WSR
          </button>
        </div>
      </div>

      {/* Past WSR List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Weekly Status Reports</h2>
          
          {/* Filters */}
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-gray-500" />
            
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Months</option>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        {hasActiveFilters && (
          <p className="text-sm text-gray-500 mb-4">
            Showing {filteredWSRs.length} of {wsrEntries.length} reports
          </p>
        )}
        
        {/* Accordion WSR List */}
        <div className="space-y-2">
          {Object.entries(groupedWSRs).map(([monthYear, wsrs]) => (
            <div key={monthYear} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Accordion Header */}
              <button
                onClick={() => toggleMonth(monthYear)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isMonthExpanded(monthYear) ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                  <span className="font-medium text-gray-900">{monthYear}</span>
                  <span className="text-sm text-gray-500">({wsrs.length} report{wsrs.length > 1 ? 's' : ''})</span>
                </div>
                
                {/* Mini RAG indicators */}
                <div className="flex items-center gap-1">
                  {wsrs.map((wsr) => (
                    <div
                      key={wsr.id}
                      className={`w-2 h-2 rounded-full ${getRagColor(wsr.ragStatus)}`}
                      title={`${wsr.weekNumber}: ${wsr.ragStatus}`}
                    />
                  ))}
                </div>
              </button>
              
              {/* Accordion Content */}
              {isMonthExpanded(monthYear) && (
                <div className="border-t border-gray-200">
                  <div className="p-2 space-y-2">
                    {wsrs.map((wsr) => (
                      <div
                        key={wsr.id}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${getRagColor(wsr.ragStatus)}`} />
                          <div>
                            <span className="font-medium text-gray-900">{wsr.weekNumber}</span>
                            {wsr.isLatest && (
                              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                Latest
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">Submitted: {wsr.submittedDate}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => openEmailModal(e, wsr)}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                            title="Send Email"
                          >
                            <Mail className="w-4 h-4" />
                            Email
                          </button>
                          <button
                            onClick={() => onViewWSR(wsr)}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                            title="View WSR"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          {wsr.isLatest && (
                            <button
                              onClick={() => onEditWSR(wsr)}
                              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors"
                              title="Edit WSR"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredWSRs.length === 0 && hasActiveFilters && (
          <div className="text-center py-8 text-gray-500">
            <p>No reports match the selected filters.</p>
            <button
              onClick={clearFilters}
              className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
            >
              Clear filters
            </button>
          </div>
        )}

        {wsrEntries.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No weekly status reports yet.</p>
            <p className="text-sm mt-1">Click "Add WSR" to create your first report.</p>
          </div>
        )}
      </div>

      {/* Email Modal */}
      {emailModalOpen && selectedWSRForEmail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium">Send Status Email</h3>
              </div>
              <button
                onClick={() => {
                  setEmailModalOpen(false);
                  setSelectedWSRForEmail(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Project</p>
                  <p className="font-medium">{project.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Report</p>
                  <p className="font-medium">{selectedWSRForEmail.month} {selectedWSRForEmail.year} - {selectedWSRForEmail.weekNumber}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">To</label>
                <input
                  type="text"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder="Enter recipient emails (comma-separated)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                onClick={() => {
                  setEmailModalOpen(false);
                  setSelectedWSRForEmail(null);
                }}
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
