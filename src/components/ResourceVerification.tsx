import { useState } from 'react';
import { Resource } from '../App';
import { Plus, Trash2 } from 'lucide-react';

interface ResourceVerificationProps {
  projectId: string;
}

export function ResourceVerification({ projectId }: ResourceVerificationProps) {
  // Mock resources allocated to the project
  const [resources, setResources] = useState<(Resource & { verified: boolean })[]>([
    {
      id: '1',
      name: 'John Smith',
      role: 'Senior Developer',
      allocation: '100%',
      verified: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'UX Designer',
      allocation: '50%',
      verified: true
    },
    {
      id: '3',
      name: 'Mike Chen',
      role: 'QA Engineer',
      allocation: '75%',
      verified: false
    },
    {
      id: '4',
      name: 'Emily Davis',
      role: 'Business Analyst',
      allocation: '100%',
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
    const newResource = {
      id: Date.now().toString(),
      name: '',
      role: '',
      allocation: '',
      verified: false
    };
    setResources([...resources, newResource]);
  };

  const removeResource = (id: string) => {
    if (resources.length > 1) {
      setResources(resources.filter(resource => resource.id !== id));
    }
  };

  const updateResource = (id: string, field: keyof Resource, value: string) => {
    setResources(resources.map(resource =>
      resource.id === id ? { ...resource, [field]: value } : resource
    ));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <label>Team Utilization</label>
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
              <th className="px-4 py-3 text-left">Resource Name</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Allocation</th>
              <th className="px-4 py-3 text-center w-32">Verified</th>
              <th className="px-4 py-3 text-left w-16"></th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={resource.name}
                    onChange={(e) => updateResource(resource.id, 'name', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter name"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={resource.role}
                    onChange={(e) => updateResource(resource.id, 'role', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter role"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={resource.allocation}
                    onChange={(e) => updateResource(resource.id, 'allocation', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. 100%"
                  />
                </td>
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={resource.verified}
                    onChange={() => toggleVerification(resource.id)}
                    className="w-5 h-5 cursor-pointer accent-blue-600"
                  />
                </td>
                <td className="px-4 py-3">
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