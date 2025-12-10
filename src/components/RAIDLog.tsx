import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface RAIDItem {
  id: string;
  riskId: string;
  description: string;
  mitigationPlan: string;
  priority: string;
  status: string;
}

export function RAIDLog() {
  const [items, setItems] = useState<RAIDItem[]>([
    {
      id: '1',
      riskId: 'R-001',
      description: 'Potential delay in third-party API integration due to vendor response time',
      mitigationPlan: 'Escalate to vendor management and set up daily sync calls',
      priority: 'High',
      status: 'In Progress'
    },
    {
      id: '2',
      riskId: 'R-002',
      description: 'Database performance issues with large dataset queries',
      mitigationPlan: 'Implement query optimization and add database indexing',
      priority: 'Medium',
      status: 'Open'
    },
    {
      id: '3',
      riskId: 'D-001',
      description: 'Dependency on security audit completion before production deployment',
      mitigationPlan: 'Schedule early audit and prepare documentation in advance',
      priority: 'Critical',
      status: 'Open'
    }
  ]);

  const addRow = () => {
    const newItem: RAIDItem = {
      id: Date.now().toString(),
      riskId: '',
      description: '',
      mitigationPlan: '',
      priority: '',
      status: ''
    };
    setItems([...items, newItem]);
  };

  const removeRow = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof RAIDItem, value: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label>RAID</label>
        <button
          type="button"
          onClick={addRow}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Row
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-300 rounded-md">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-1.5 text-left text-sm w-20">Risk ID</th>
              <th className="px-2 py-1.5 text-left text-sm">Description</th>
              <th className="px-2 py-1.5 text-left text-sm">Mitigation Plan</th>
              <th className="px-2 py-1.5 text-left text-sm w-24">Priority</th>
              <th className="px-2 py-1.5 text-left text-sm w-28">Status</th>
              <th className="px-2 py-1.5 text-left w-10"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-2 py-1">
                  <input
                    type="text"
                    value={item.riskId}
                    onChange={(e) => updateItem(item.id, 'riskId', e.target.value)}
                    className="w-full px-1.5 py-0.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="R-001"
                  />
                </td>
                <td className="px-2 py-1">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="w-full px-1.5 py-0.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Describe the risk..."
                  />
                </td>
                <td className="px-2 py-1">
                  <input
                    type="text"
                    value={item.mitigationPlan}
                    onChange={(e) => updateItem(item.id, 'mitigationPlan', e.target.value)}
                    className="w-full px-1.5 py-0.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Mitigation steps..."
                  />
                </td>
                <td className="px-2 py-1">
                  <select
                    value={item.priority}
                    onChange={(e) => updateItem(item.id, 'priority', e.target.value)}
                    className="w-full px-1.5 py-0.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </td>
                <td className="px-2 py-1">
                  <select
                    value={item.status}
                    onChange={(e) => updateItem(item.id, 'status', e.target.value)}
                    className="w-full px-1.5 py-0.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
                <td className="px-2 py-1">
                  <button
                    type="button"
                    onClick={() => removeRow(item.id)}
                    disabled={items.length === 1}
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