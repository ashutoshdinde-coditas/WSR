import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface RAIDItem {
  id: string;
  riskId: string;
  description: string;
  impact: string;
  priority: string;
  status: string;
}

export function RAIDLog() {
  const [items, setItems] = useState<RAIDItem[]>([
    {
      id: '1',
      riskId: 'R-001',
      description: 'Potential delay in third-party API integration due to vendor response time',
      impact: 'Medium',
      priority: 'High',
      status: 'In Progress'
    },
    {
      id: '2',
      riskId: 'R-002',
      description: 'Database performance issues with large dataset queries',
      impact: 'High',
      priority: 'Medium',
      status: 'Open'
    },
    {
      id: '3',
      riskId: 'D-001',
      description: 'Dependency on security audit completion before production deployment',
      impact: 'Critical',
      priority: 'Critical',
      status: 'Open'
    }
  ]);

  const addRow = () => {
    const newItem: RAIDItem = {
      id: Date.now().toString(),
      riskId: '',
      description: '',
      impact: '',
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
              <th className="px-3 py-2 text-left w-24">Risk ID</th>
              <th className="px-3 py-2 text-left">Description</th>
              <th className="px-3 py-2 text-left w-32">Impact</th>
              <th className="px-3 py-2 text-left w-32">Priority</th>
              <th className="px-3 py-2 text-left w-32">Status</th>
              <th className="px-3 py-2 text-left w-16"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={item.riskId}
                    onChange={(e) => updateItem(item.id, 'riskId', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="R-001"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Describe the risk..."
                  />
                </td>
                <td className="px-3 py-2">
                  <select
                    value={item.impact}
                    onChange={(e) => updateItem(item.id, 'impact', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select
                    value={item.priority}
                    onChange={(e) => updateItem(item.id, 'priority', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select
                    value={item.status}
                    onChange={(e) => updateItem(item.id, 'status', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Mitigated">Mitigated</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
                <td className="px-3 py-2">
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