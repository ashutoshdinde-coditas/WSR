import { useState } from 'react';
import { Resource } from '../App';
import { Plus, Trash2, Check } from 'lucide-react';

interface ResourceVerificationProps {
  projectId: string;
}

interface ExtendedResource extends Resource {
  startDate: string;
  endDate: string;
  billableType: 'billable' | 'non-billable';
  verified: boolean;
}

export function ResourceVerification({ projectId }: ResourceVerificationProps) {
  // Mock resources allocated to the project
  const [resources, setResources] = useState<ExtendedResource[]>([
    {
      id: '1',
      name: 'John Smith',
      role: 'Senior Developer',
      allocation: '100%',
      startDate: 'Sep 1, 2025',
      endDate: 'Feb 28, 2026',
      billableType: 'billable',
      verified: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'UX Designer',
      allocation: '50%',
      startDate: 'Sep 15, 2025',
      endDate: 'Jan 31, 2026',
      billableType: 'billable',
      verified: true
    },
    {
      id: '3',
      name: 'Mike Chen',
      role: 'QA Engineer',
      allocation: '75%',
      startDate: 'Oct 1, 2025',
      endDate: 'Dec 31, 2025',
      billableType: 'non-billable',
      verified: false
    },
    {
      id: '4',
      name: 'Emily Davis',
      role: 'Business Analyst',
      allocation: '100%',
      startDate: 'Sep 1, 2025',
      endDate: 'Feb 28, 2026',
      billableType: 'billable',
      verified: true
    }
  ]);

  const toggleVerification = (id: string) => {
    setResources(resources.map(resource =>
      resource.id === id
        ? { ...resource, verified: !resource.verified }
        : resource
    ));
  };

  const addResource = () => {
    const newResource: ExtendedResource = {
      id: Date.now().toString(),
      name: '',
      role: '',
      allocation: '',
      startDate: '',
      endDate: '',
      billableType: 'billable',
      verified: false
    };
    setResources([...resources, newResource]);
  };

  const updateBillableType = (id: string, billableType: 'billable' | 'non-billable') => {
    setResources(resources.map(resource =>
      resource.id === id
        ? { ...resource, billableType }
        : resource
    ));
  };

  const removeResource = (id: string) => {
    if (resources.length > 1) {
      setResources(resources.filter(resource => resource.id !== id));
    }
  };

  const updateResource = (id: string, field: string, value: string) => {
    setResources(resources.map(resource =>
      resource.id === id 
        ? { ...resource, [field]: value } 
        : resource
    ));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <label>Team Structure</label>
          <p className="text-sm text-gray-600 mt-1">
            Verify the allocation details for each team member. Check the box if the information is correct.
          </p>
        </div>
        <button
          type="button"
          onClick={addResource}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Resource
        </button>
      </div>

      <div className="border border-gray-300 rounded-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-1.5 text-center text-sm w-14">Sr. No</th>
              <th className="px-2 py-1.5 text-left text-sm">Resource</th>
              <th className="px-2 py-1.5 text-left text-sm">Role</th>
              <th className="px-2 py-1.5 text-left text-sm w-20">Utilization</th>
              <th className="px-2 py-1.5 text-left text-sm">Start Date</th>
              <th className="px-2 py-1.5 text-left text-sm">End Date</th>
              <th className="px-2 py-1.5 text-center text-sm w-28">Billable</th>
              <th className="px-2 py-1.5 text-center text-sm w-16">Verify</th>
              <th className="px-2 py-1.5 text-left w-10"></th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource, index) => (
              <tr key={resource.id} className="border-t hover:bg-gray-50">
                <td className="px-2 py-1 text-center text-sm text-gray-600">
                  {index + 1}
                </td>
                <td className="px-2 py-1">
                  <input
                    type="text"
                    value={resource.name}
                    onChange={(e) => updateResource(resource.id, 'name', e.target.value)}
                    className="w-full px-1.5 py-0.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter name"
                  />
                </td>
                <td className="px-2 py-1">
                  <input
                    type="text"
                    value={resource.role}
                    onChange={(e) => updateResource(resource.id, 'role', e.target.value)}
                    className="w-full px-1.5 py-0.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter role"
                  />
                </td>
                <td className="px-2 py-1">
                  <input
                    type="text"
                    value={resource.allocation}
                    onChange={(e) => updateResource(resource.id, 'allocation', e.target.value)}
                    className="w-full px-1.5 py-0.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. 100%"
                  />
                </td>
                <td className="px-2 py-1">
                  <input
                    type="text"
                    value={resource.startDate}
                    onChange={(e) => updateResource(resource.id, 'startDate', e.target.value)}
                    className="w-full px-1.5 py-0.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. Sep 1, 2025"
                  />
                </td>
                <td className="px-2 py-1">
                  <input
                    type="text"
                    value={resource.endDate}
                    onChange={(e) => updateResource(resource.id, 'endDate', e.target.value)}
                    className="w-full px-1.5 py-0.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. Feb 28, 2026"
                  />
                </td>
                <td className="px-2 py-1">
                  <select
                    value={resource.billableType}
                    onChange={(e) => updateBillableType(resource.id, e.target.value as 'billable' | 'non-billable')}
                    className="w-full px-1.5 py-0.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="billable">Billable</option>
                    <option value="non-billable">Non-Billable</option>
                  </select>
                </td>
                <td className="px-2 py-1 text-center">
                  <button
                    type="button"
                    onClick={() => toggleVerification(resource.id)}
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                      resource.verified 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {resource.verified && <Check className="w-4 h-4" />}
                  </button>
                </td>
                <td className="px-2 py-1">
                  <button
                    type="button"
                    onClick={() => removeResource(resource.id)}
                    disabled={resources.length === 1}
                    className="p-1 text-red-600 hover:text-red-800 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}