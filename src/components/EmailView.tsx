import { useState } from 'react';
import { Send, Mail } from 'lucide-react';

export function EmailView() {
  const [emailSubject, setEmailSubject] = useState('Weekly Project Status Update');
  const [emailTo, setEmailTo] = useState('leadership@company.com');
  const [emailBody, setEmailBody] = useState('');

  const handleSendEmail = () => {
    // Handle email sending logic
    alert('Email sent to leadership!');
  };

  // Mock recent check-ins that could be included in email
  const recentCheckIns = [
    {
      id: '1',
      project: 'Customer Portal Redesign',
      date: 'Dec 8, 2025',
      ragStatus: 'green' as const,
      highlights: 'Completed user authentication module'
    },
    {
      id: '2',
      project: 'Mobile App Development',
      date: 'Dec 8, 2025',
      ragStatus: 'amber' as const,
      highlights: 'Design review pending from stakeholders'
    },
    {
      id: '3',
      project: 'Data Migration Project',
      date: 'Dec 7, 2025',
      ragStatus: 'red' as const,
      highlights: 'Critical blocker: Database access issues'
    }
  ];

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
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Email</h1>
        <p className="text-gray-600">Review and send updates to leadership</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Recent Check-ins Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl mb-4">Recent Weekly Check-ins</h2>
          <p className="text-gray-600 text-sm mb-4">
            Select which project updates to include in your email to leadership
          </p>

          <div className="space-y-3">
            {recentCheckIns.map((checkIn) => (
              <div
                key={checkIn.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 cursor-pointer accent-blue-600"
                    defaultChecked
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3>{checkIn.project}</h3>
                      <div className={`w-4 h-4 rounded-full ${getRagColor(checkIn.ragStatus)}`} />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{checkIn.highlights}</p>
                    <p className="text-xs text-gray-500">{checkIn.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Compose */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-6">
            <Mail className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl">Review & Send Email to Leadership</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">To</label>
              <input
                type="email"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="recipient@example.com"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Subject</label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email subject"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Message</label>
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Compose your message to leadership here...&#10;&#10;The selected project updates will be automatically included below your message."
              />
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                {recentCheckIns.length} project update(s) will be included
              </p>
              <button
                onClick={handleSendEmail}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
