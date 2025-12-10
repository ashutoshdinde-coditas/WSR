interface RAGStatusSelectorProps {
  value: 'red' | 'amber' | 'green';
  onChange: (value: 'red' | 'amber' | 'green') => void;
}

export function RAGStatusSelector({ value, onChange }: RAGStatusSelectorProps) {
  const ragDescriptions = {
    red: 'Critical issues requiring immediate attention. Project is at risk of significant delays or failure. Escalation needed.',
    amber: 'Some concerns or minor issues present. Project may face delays but is manageable with attention. Close monitoring required.',
    green: 'Project is on track. No significant issues. Progressing as planned within scope, schedule, and budget.'
  };

  const getDescriptionStyle = (status: 'red' | 'amber' | 'green') => {
    switch (status) {
      case 'green':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'amber':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'red':
        return 'bg-red-50 border-red-200 text-red-800';
    }
  };

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
    <div>
      <label className="block mb-2">Health Status</label>

      <div className="flex gap-4 mb-3">
        {(['green', 'amber', 'red'] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => onChange(status)}
            className={`flex items-center gap-2 px-4 py-2 border-2 rounded-md transition-all ${
              value === status
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className={`w-6 h-6 rounded-full ${getRagColor(status)}`} />
            <span className="capitalize">{status}</span>
          </button>
        ))}
      </div>

      {/* Description of selected status - always visible */}
      <div className={`p-3 rounded-md border text-sm ${getDescriptionStyle(value)}`}>
        <span className="font-medium capitalize">{value}:</span> {ragDescriptions[value]}
      </div>
    </div>
  );
}
