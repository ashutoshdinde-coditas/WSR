import { useState } from 'react';
import { ArrowLeft, Info, Edit2 } from 'lucide-react';
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
  const [weekNumber, setWeekNumber] = useState('W49');
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

  // Generate week numbers (W1 to W52)
  const weekNumbers = Array.from({ length: 52 }, (_, i) => `W${i + 1}`);
  
  // Months
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Years (current year and next year)
  const years = ['2024', '2025', '2026'];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Projects
      </button>

      <div className="bg-white rounded-lg shadow p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Weekly Check-in</h1>
            <p className="text-gray-600">{project.name}</p>
            {mode === 'view' && (
              <p className="text-sm text-gray-500 mt-1">Last updated: Dec 8, 2025</p>
            )}
          </div>
          {!isEditing && mode === 'view' && (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Week Selection */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-2">Week Number</label>
              {isEditing ? (
                <select
                  value={weekNumber}
                  onChange={(e) => setWeekNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {weekNumbers.map((week) => (
                    <option key={week} value={week}>
                      {week}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="px-4 py-2 bg-gray-50 rounded-md">
                  {weekNumber}
                </div>
              )}
            </div>
            <div>
              <label className="block mb-2">Month</label>
              {isEditing ? (
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="px-4 py-2 bg-gray-50 rounded-md">
                  {month}
                </div>
              )}
            </div>
            <div>
              <label className="block mb-2">Year</label>
              {isEditing ? (
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="px-4 py-2 bg-gray-50 rounded-md">
                  {year}
                </div>
              )}
            </div>
          </div>

          {/* RAG Status */}
          {isEditing ? (
            <RAGStatusSelector value={ragStatus} onChange={setRagStatus} />
          ) : (
            <div>
              <label className="block mb-2">RAG Status</label>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full ${
                  ragStatus === 'green' ? 'bg-green-500' : 
                  ragStatus === 'amber' ? 'bg-amber-500' : 
                  'bg-red-500'
                }`} />
                <span className="capitalize">{ragStatus}</span>
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
          {isEditing ? (
            <RAIDLog />
          ) : (
            <div>
              <label className="block mb-2">RAID</label>
              <div className="border border-gray-300 rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left w-24">Risk ID</th>
                      <th className="px-3 py-2 text-left">Description</th>
                      <th className="px-3 py-2 text-left w-32">Impact</th>
                      <th className="px-3 py-2 text-left w-32">Priority</th>
                      <th className="px-3 py-2 text-left w-32">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-3 py-2">R-001</td>
                      <td className="px-3 py-2">Potential delay in third-party API integration due to vendor response time</td>
                      <td className="px-3 py-2">Medium</td>
                      <td className="px-3 py-2">High</td>
                      <td className="px-3 py-2">In Progress</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 py-2">R-002</td>
                      <td className="px-3 py-2">Database performance issues with large dataset queries</td>
                      <td className="px-3 py-2">High</td>
                      <td className="px-3 py-2">Medium</td>
                      <td className="px-3 py-2">Open</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 py-2">D-001</td>
                      <td className="px-3 py-2">Dependency on security audit completion before production deployment</td>
                      <td className="px-3 py-2">Critical</td>
                      <td className="px-3 py-2">Critical</td>
                      <td className="px-3 py-2">Open</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

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

          {/* Resource Verification */}
          {isEditing ? (
            <ResourceVerification projectId={project.id} />
          ) : (
            <div>
              <label className="block mb-2">Team Utilization</label>
              <div className="border border-gray-300 rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left">Resource Name</th>
                      <th className="px-4 py-3 text-left">Role</th>
                      <th className="px-4 py-3 text-left">Allocation</th>
                      <th className="px-4 py-3 text-center w-32">Verified</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-3">John Smith</td>
                      <td className="px-4 py-3">Senior Developer</td>
                      <td className="px-4 py-3">100%</td>
                      <td className="px-4 py-3 text-center">✓</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3">Sarah Johnson</td>
                      <td className="px-4 py-3">UX Designer</td>
                      <td className="px-4 py-3">50%</td>
                      <td className="px-4 py-3 text-center">✓</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3">Mike Chen</td>
                      <td className="px-4 py-3">QA Engineer</td>
                      <td className="px-4 py-3">75%</td>
                      <td className="px-4 py-3 text-center">-</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-3">Emily Davis</td>
                      <td className="px-4 py-3">Business Analyst</td>
                      <td className="px-4 py-3">100%</td>
                      <td className="px-4 py-3 text-center">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

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