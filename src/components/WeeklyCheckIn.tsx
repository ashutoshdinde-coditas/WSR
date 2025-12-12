import { useState } from 'react';
import { ArrowLeft, Info, Edit2, Calendar, Download } from 'lucide-react';
import { Project, Resource } from '../App';
import { RAGStatusSelector } from './RAGStatusSelector';
import { RAIDLog } from './RAIDLog';
import { ResourceVerification } from './ResourceVerification';

interface WeeklyCheckInProps {
  project: Project;
  onBack: () => void;
  mode: 'view' | 'edit' | 'add';
}

export function WeeklyCheckIn({ project, onBack, mode }: WeeklyCheckInProps) {
  const [isEditing, setIsEditing] = useState(mode !== 'view');
  const [weekNumber, setWeekNumber] = useState('1');
  const [month, setMonth] = useState('Dec');
  const [year, setYear] = useState('2025');
  const [ragStatus, setRagStatus] = useState<'red' | 'amber' | 'green'>('amber');
  const [updateHighlights, setUpdateHighlights] = useState(`• Successfully completed the user authentication module with OAuth integration
• Design team finalized the new dashboard mockups and received stakeholder approval
• Backend API development is 70% complete, on track for end-of-month delivery
• Conducted user testing sessions with 15 participants, feedback overall positive`);
  const [completedMilestones, setCompletedMilestones] = useState(`• User Authentication Module - Completed on Dec 5
• Dashboard Design Approval - Completed on Dec 7
• Phase 1 API Endpoints - Completed on Dec 8`);
  const [plannedMilestones, setPlannedMilestones] = useState(`• Complete remaining API endpoints by Dec 15
• Begin frontend integration with backend services by Dec 16
• Conduct security audit and penetration testing by Dec 18
• Prepare staging environment for UAT by Dec 20`);
  const [comments, setComments] = useState(`Need additional QA resources for the upcoming testing phase. The current team member is allocated at 75% which may not be sufficient given the scope of testing required.

Also requesting early access to production-like data for performance testing.`);
  const [raidEnabled, setRaidEnabled] = useState(true);

  // Calculate week date range from week number, month, and year
  const getWeekDateRange = (weekNum: string, monthName: string, yr: string) => {
    const weekNumber = parseInt(weekNum);
    const monthIndex = months.indexOf(monthName);
    const yearNum = parseInt(yr);
    
    // Simple week calculation: Week 1 = days 1-7, Week 2 = days 8-14, etc.
    const startDay = (weekNumber - 1) * 7 + 1;
    const endDay = startDay + 6;
    
    // Get last day of month to cap the end date
    const lastDayOfMonth = new Date(yearNum, monthIndex + 1, 0).getDate();
    const cappedEndDay = Math.min(endDay, lastDayOfMonth);
    
    const startDate = new Date(yearNum, monthIndex, startDay);
    const endDate = new Date(yearNum, monthIndex, cappedEndDay);
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}, ${yr}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Check-in submitted');
    alert('Weekly check-in submitted successfully!');
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  // Months
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Years (current year and next year)
  const years = ['2024', '2025', '2026'];

  // Get number of weeks in a month (typically 4-5)
  const getWeeksForMonth = (monthName: string, yr: string) => {
    const monthIndex = months.indexOf(monthName);
    const yearNum = parseInt(yr);
    
    // Get last day of the month
    const lastDayOfMonth = new Date(yearNum, monthIndex + 1, 0);
    const totalDays = lastDayOfMonth.getDate();
    
    // Calculate number of weeks (7 days per week)
    const numWeeks = Math.ceil(totalDays / 7);
    
    // Return array of week numbers (1, 2, 3, 4, 5)
    return Array.from({ length: numWeeks }, (_, i) => String(i + 1));
  };

  // Get weeks based on selected month
  const weekNumbers = getWeeksForMonth(month, year);

  // Update week when month changes to ensure valid selection
  const handleMonthChange = (newMonth: string) => {
    setMonth(newMonth);
    const newWeeks = getWeeksForMonth(newMonth, year);
    if (!newWeeks.includes(weekNumber)) {
      setWeekNumber('1');
    }
  };

  // Update week when year changes to ensure valid selection
  const handleYearChange = (newYear: string) => {
    setYear(newYear);
    const newWeeks = getWeeksForMonth(month, newYear);
    if (!newWeeks.includes(weekNumber)) {
      setWeekNumber('1');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 print-content">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 no-print"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Projects
      </button>

      <div className="bg-white rounded-lg shadow p-8">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl mb-2">Weekly Check-in</h1>
            <p className="text-gray-600">{project.name}</p>
            {mode === 'view' && (
              <p className="text-sm text-gray-500 mt-1">Last updated: Dec 8, 2025</p>
            )}
          </div>
          {!isEditing && mode === 'view' && (
            <div className="flex items-center gap-2 no-print">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Reporting Period */}
          <div>
            <label className="block mb-2">Reporting Period</label>
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <select
                    value={month}
                    onChange={(e) => handleMonthChange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    value={year}
                    onChange={(e) => handleYearChange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                  <select
                    value={weekNumber}
                    onChange={(e) => setWeekNumber(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {weekNumbers.map((week) => (
                      <option key={week} value={week}>
                        Week {week}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <div className="px-4 py-2 bg-gray-50 rounded-md">
                  {month} {year} - Week {weekNumber}
                </div>
              )}
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-md">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-700 font-medium">{getWeekDateRange(weekNumber, month, year)}</span>
              </div>
            </div>
          </div>

          {/* RAG Status */}
          {isEditing ? (
            <RAGStatusSelector value={ragStatus} onChange={setRagStatus} />
          ) : (
            <div>
              <label className="block mb-2">Health Status</label>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-full ${
                  ragStatus === 'green' ? 'bg-green-500' : 
                  ragStatus === 'amber' ? 'bg-amber-500' : 
                  'bg-red-500'
                }`} />
                <span className="capitalize">{ragStatus}</span>
              </div>
              <div className={`p-3 rounded-md border text-sm ${
                ragStatus === 'green' ? 'bg-green-50 border-green-200 text-green-800' :
                ragStatus === 'amber' ? 'bg-amber-50 border-amber-200 text-amber-800' :
                'bg-red-50 border-red-200 text-red-800'
              }`}>
                <span className="font-medium capitalize">{ragStatus}:</span>{' '}
                {ragStatus === 'green' && 'Project is on track. No significant issues. Progressing as planned within scope, schedule, and budget.'}
                {ragStatus === 'amber' && 'Some concerns or minor issues present. Project may face delays but is manageable with attention. Close monitoring required.'}
                {ragStatus === 'red' && 'Critical issues requiring immediate attention. Project is at risk of significant delays or failure. Escalation needed.'}
              </div>
            </div>
          )}

          {/* Update Highlights */}
          <div>
            <label className="block mb-2">
              Update Highlights
            </label>
            {isEditing ? (
              <textarea
                value={updateHighlights}
                onChange={(e) => setUpdateHighlights(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Highlight key updates from this week..."
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 rounded-md whitespace-pre-wrap">
                {updateHighlights}
              </div>
            )}
          </div>

          {/* RAID Log */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block">RAID</label>
              {isEditing && (
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={raidEnabled}
                    onChange={(e) => setRaidEnabled(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                  Applicable
                </label>
              )}
            </div>
            
            {!raidEnabled ? (
              <div className="px-4 py-3 bg-gray-50 rounded-md text-gray-500 text-sm">
                RAID tracking is disabled for this project.
              </div>
            ) : isEditing ? (
              <RAIDLog />
            ) : (
              <div className="border border-gray-300 rounded-md overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-2 py-1.5 text-left w-20">Risk ID</th>
                      <th className="px-2 py-1.5 text-left">Description</th>
                      <th className="px-2 py-1.5 text-left">Mitigation Plan</th>
                      <th className="px-2 py-1.5 text-left w-20">Priority</th>
                      <th className="px-2 py-1.5 text-left w-24">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-2 py-1">R-001</td>
                      <td className="px-2 py-1">Potential delay in third-party API integration due to vendor response time</td>
                      <td className="px-2 py-1">Escalate to vendor management and set up daily sync calls</td>
                      <td className="px-2 py-1">High</td>
                      <td className="px-2 py-1">In Progress</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-2 py-1">R-002</td>
                      <td className="px-2 py-1">Database performance issues with large dataset queries</td>
                      <td className="px-2 py-1">Implement query optimization and add database indexing</td>
                      <td className="px-2 py-1">Medium</td>
                      <td className="px-2 py-1">Open</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-2 py-1">D-001</td>
                      <td className="px-2 py-1">Dependency on security audit completion before production deployment</td>
                      <td className="px-2 py-1">Schedule early audit and prepare documentation in advance</td>
                      <td className="px-2 py-1">Critical</td>
                      <td className="px-2 py-1">Open</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Completed Milestones */}
          <div>
            <label className="block mb-2">
              Completed Milestones
            </label>
            {isEditing ? (
              <textarea
                value={completedMilestones}
                onChange={(e) => setCompletedMilestones(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="List milestones completed this week..."
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 rounded-md whitespace-pre-wrap">
                {completedMilestones}
              </div>
            )}
          </div>

          {/* Planned Milestones */}
          <div>
            <label className="block mb-2">
              Planned Milestones
            </label>
            {isEditing ? (
              <textarea
                value={plannedMilestones}
                onChange={(e) => setPlannedMilestones(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="List planned milestones for next week..."
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 rounded-md whitespace-pre-wrap">
                {plannedMilestones}
              </div>
            )}
          </div>

          {/* Comments/Help Needed/Concerns */}
          <div>
            <label className="block mb-2">
              Comments / Help Needed / Concerns
            </label>
            {isEditing ? (
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any additional comments, help needed, or concerns..."
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 rounded-md whitespace-pre-wrap">
                {comments}
              </div>
            )}
          </div>

          {/* Resource Verification / Team Structure */}
          {isEditing ? (
            <ResourceVerification projectId={project.id} />
          ) : (
            <div>
              <label className="block mb-2">Team Structure</label>
              <div className="border border-gray-300 rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-2 py-1.5 text-center w-14">Sr. No</th>
                      <th className="px-2 py-1.5 text-left">Resource</th>
                      <th className="px-2 py-1.5 text-left">Role</th>
                      <th className="px-2 py-1.5 text-left w-20">Utilization</th>
                      <th className="px-2 py-1.5 text-left">Start Date</th>
                      <th className="px-2 py-1.5 text-left">End Date</th>
                      <th className="px-2 py-1.5 text-center w-24">Billable</th>
                      <th className="px-2 py-1.5 text-center w-14">Verify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-2 py-1 text-center">1</td>
                      <td className="px-2 py-1">John Smith</td>
                      <td className="px-2 py-1">Senior Developer</td>
                      <td className="px-2 py-1">100%</td>
                      <td className="px-2 py-1">Sep 1, 2025</td>
                      <td className="px-2 py-1">Feb 28, 2026</td>
                      <td className="px-2 py-1 text-center">Billable</td>
                      <td className="px-2 py-1 text-center text-green-600">✓</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-2 py-1 text-center">2</td>
                      <td className="px-2 py-1">Sarah Johnson</td>
                      <td className="px-2 py-1">UX Designer</td>
                      <td className="px-2 py-1">50%</td>
                      <td className="px-2 py-1">Sep 15, 2025</td>
                      <td className="px-2 py-1">Jan 31, 2026</td>
                      <td className="px-2 py-1 text-center">Billable</td>
                      <td className="px-2 py-1 text-center text-green-600">✓</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-2 py-1 text-center">3</td>
                      <td className="px-2 py-1">Mike Chen</td>
                      <td className="px-2 py-1">QA Engineer</td>
                      <td className="px-2 py-1">75%</td>
                      <td className="px-2 py-1">Oct 1, 2025</td>
                      <td className="px-2 py-1">Dec 31, 2025</td>
                      <td className="px-2 py-1 text-center">Non-Billable</td>
                      <td className="px-2 py-1 text-center text-gray-400">-</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-2 py-1 text-center">4</td>
                      <td className="px-2 py-1">Emily Davis</td>
                      <td className="px-2 py-1">Business Analyst</td>
                      <td className="px-2 py-1">100%</td>
                      <td className="px-2 py-1">Sep 1, 2025</td>
                      <td className="px-2 py-1">Feb 28, 2026</td>
                      <td className="px-2 py-1 text-center">Billable</td>
                      <td className="px-2 py-1 text-center text-green-600">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Submit Button */}
          {isEditing && (
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Submit Check-in
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}