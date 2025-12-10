import { useState } from 'react';
import { Save, Plus, X, Mail } from 'lucide-react';

export function EmailSettings() {
  const [recipients, setRecipients] = useState<string[]>([
    'leadership@company.com',
    'stakeholders@company.com'
  ]);
  const [newRecipient, setNewRecipient] = useState('');
  const [defaultSubject, setDefaultSubject] = useState('Weekly Project Status Update - {project_name}');
  const [defaultBody, setDefaultBody] = useState(`Hi Team,

Please find below the weekly status update for {project_name}.

{check_in_details}

Best regards,
{pm_name}`);
  const [ccEnabled, setCcEnabled] = useState(true);
  const [ccEmail, setCcEmail] = useState('pm-reports@company.com');
  const [saved, setSaved] = useState(false);

  const addRecipient = () => {
    if (newRecipient && !recipients.includes(newRecipient)) {
      setRecipients([...recipients, newRecipient]);
      setNewRecipient('');
    }
  };

  const removeRecipient = (email: string) => {
    setRecipients(recipients.filter(r => r !== email));
  };

  const handleSave = () => {
    // Save settings logic here
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl mb-1">Email Settings</h1>
        <p className="text-gray-600 text-sm">Configure default email settings for project status updates</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Recipients */}
        <div>
          <label className="block mb-2 font-medium">Default Recipients</label>
          <p className="text-sm text-gray-500 mb-3">These recipients will be pre-filled when sending project emails</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {recipients.map((email) => (
              <div
                key={email}
                className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
              >
                <Mail className="w-3 h-3" />
                <span>{email}</span>
                <button
                  onClick={() => removeRecipient(email)}
                  className="ml-1 hover:text-blue-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="email"
              value={newRecipient}
              onChange={(e) => setNewRecipient(e.target.value)}
              placeholder="Add recipient email"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && addRecipient()}
            />
            <button
              onClick={addRecipient}
              className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        {/* CC Settings */}
        <div>
          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={ccEnabled}
              onChange={(e) => setCcEnabled(e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="font-medium">CC a copy to</span>
          </label>
          {ccEnabled && (
            <input
              type="email"
              value={ccEmail}
              onChange={(e) => setCcEmail(e.target.value)}
              placeholder="CC email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>

        {/* Default Subject */}
        <div>
          <label className="block mb-2 font-medium">Default Email Subject</label>
          <p className="text-sm text-gray-500 mb-2">Use {'{project_name}'} as a placeholder</p>
          <input
            type="text"
            value={defaultSubject}
            onChange={(e) => setDefaultSubject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Default Body */}
        <div>
          <label className="block mb-2 font-medium">Default Email Body</label>
          <p className="text-sm text-gray-500 mb-2">
            Available placeholders: {'{project_name}'}, {'{check_in_details}'}, {'{pm_name}'}
          </p>
          <textarea
            value={defaultBody}
            onChange={(e) => setDefaultBody(e.target.value)}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-2 rounded-md transition-colors ${
              saved 
                ? 'bg-green-600 text-white' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Save className="w-4 h-4" />
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}

