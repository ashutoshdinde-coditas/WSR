import { useState } from 'react';
import { Info, X } from 'lucide-react';

interface RAGStatusSelectorProps {
  value: 'red' | 'amber' | 'green';
  onChange: (value: 'red' | 'amber' | 'green') => void;
}

export function RAGStatusSelector({ value, onChange }: RAGStatusSelectorProps) {
  const [showDescription, setShowDescription] = useState(false);

  const ragDescriptions = {
    red: 'Critical issues requiring immediate attention. Project is at risk of significant delays or failure. Escalation needed.',
    amber: 'Some concerns or minor issues present. Project may face delays but is manageable with attention. Close monitoring required.',
    green: 'Project is on track. No significant issues. Progressing as planned within scope, schedule, and budget.'
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
      <div className="flex items-center gap-2 mb-2">
        <label>RAG Status</label>
        <button
          type="button"
          onClick={() => setShowDescription(!showDescription)}
          className="text-gray-500 hover:text-gray-700"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {showDescription && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md relative">
          <button
            type="button"
            onClick={() => setShowDescription(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex-shrink-0 mt-1" />
              <div>
                <strong>Green:</strong> {ragDescriptions.green}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-500 flex-shrink-0 mt-1" />
              <div>
                <strong>Amber:</strong> {ragDescriptions.amber}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500 flex-shrink-0 mt-1" />
              <div>
                <strong>Red:</strong> {ragDescriptions.red}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4">
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
    </div>
  );
}
