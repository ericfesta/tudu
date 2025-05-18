import React, { useState } from 'react';
import { Plus, Flag, AlertTriangle, AlertCircle, ArrowDown } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (text: string, priority: 'alta' | 'media' | 'bassa') => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<'alta' | 'media' | 'bassa'>('media');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text, priority);
      setText('');
      setPriority('media');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Aggiungi un nuovo task..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
        >
          <Plus size={18} />
          <span>Aggiungi</span>
        </button>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
        <Flag size={16} className="text-gray-500 dark:text-gray-400" />
        <span>Priorità:</span>
        <div className="flex gap-2">
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name="priority"
              checked={priority === 'alta'}
              onChange={() => setPriority('alta')}
              className="sr-only"
            />
            <span className={`px-2 py-1 rounded-md flex items-center gap-1 ${priority === 'alta' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'} transition-colors`}>
              <AlertTriangle size={14} />
              <span>Alta</span>
            </span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name="priority"
              checked={priority === 'media'}
              onChange={() => setPriority('media')}
              className="sr-only"
            />
            <span className={`px-2 py-1 rounded-md flex items-center gap-1 ${priority === 'media' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'} transition-colors`}>
              <AlertCircle size={14} />
              <span>Media</span>
            </span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name="priority"
              checked={priority === 'bassa'}
              onChange={() => setPriority('bassa')}
              className="sr-only"
            />
            <span className={`px-2 py-1 rounded-md flex items-center gap-1 ${priority === 'bassa' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'} transition-colors`}>
              <ArrowDown size={14} />
              <span>Bassa</span>
            </span>
          </label>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
