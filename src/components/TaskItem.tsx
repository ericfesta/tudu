import React, { useState } from 'react';
import { Task } from '../types/Task';
import { Trash2, Edit, Check, X, Flag, AlertTriangle, AlertCircle, ArrowDown } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string, newPriority: 'alta' | 'media' | 'bassa') => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState<'alta' | 'media' | 'bassa'>(task.priority);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = () => {
    if (editText.trim() !== '') {
      onEdit(task.id, editText, editPriority);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(task.text);
    setEditPriority(task.priority);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(task.id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const getPriorityIcon = (priority: 'alta' | 'media' | 'bassa') => {
    switch (priority) {
      case 'alta':
        return <AlertTriangle size={14} className="text-red-500 dark:text-red-400" />;
      case 'media':
        return <AlertCircle size={14} className="text-yellow-500 dark:text-yellow-400" />;
      case 'bassa':
        return <ArrowDown size={14} className="text-green-500 dark:text-green-400" />;
      default:
        return null;
    }
  };

  const getPriorityBadgeColor = (priority: 'alta' | 'media' | 'bassa') => {
    switch (priority) {
      case 'alta':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200';
      case 'media':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200';
      case 'bassa':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200';
      default:
        return '';
    }
  };

  const getPriorityLabel = (priority: 'alta' | 'media' | 'bassa') => {
    switch (priority) {
      case 'alta':
        return 'Alta';
      case 'media':
        return 'Media';
      case 'bassa':
        return 'Bassa';
      default:
        return '';
    }
  };

  return (
    <>
      <li className="flex items-center gap-3 py-3 border-b border-gray-200 dark:border-gray-700 group transition-colors">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500 dark:bg-gray-700 transition-colors"
        />
        
        {isEditing ? (
          <div className="flex-1">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                autoFocus
              />
              <button 
                onClick={handleEdit}
                className="p-1 text-green-600 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400"
              >
                <Check size={18} />
              </button>
              <button 
                onClick={handleCancel}
                className="p-1 text-red-600 dark:text-red-500 hover:text-red-800 dark:hover:text-red-400"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 ml-1">
              <Flag size={14} className="text-gray-500 dark:text-gray-400" />
              <span>Priorità:</span>
              <div className="flex gap-2">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name={`priority-${task.id}`}
                    checked={editPriority === 'alta'}
                    onChange={() => setEditPriority('alta')}
                    className="sr-only"
                  />
                  <span className={`px-2 py-0.5 rounded-md text-xs flex items-center gap-1 ${editPriority === 'alta' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'} transition-colors`}>
                    <AlertTriangle size={12} />
                    Alta
                  </span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name={`priority-${task.id}`}
                    checked={editPriority === 'media'}
                    onChange={() => setEditPriority('media')}
                    className="sr-only"
                  />
                  <span className={`px-2 py-0.5 rounded-md text-xs flex items-center gap-1 ${editPriority === 'media' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'} transition-colors`}>
                    <AlertCircle size={12} />
                    Media
                  </span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name={`priority-${task.id}`}
                    checked={editPriority === 'bassa'}
                    onChange={() => setEditPriority('bassa')}
                    className="sr-only"
                  />
                  <span className={`px-2 py-0.5 rounded-md text-xs flex items-center gap-1 ${editPriority === 'bassa' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'} transition-colors`}>
                    <ArrowDown size={12} />
                    Bassa
                  </span>
                </label>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 flex items-center gap-2">
              <span className={`${task.completed ? 'line-through text-gray-500 dark:text-gray-500' : 'text-gray-900 dark:text-white'} transition-colors`}>
                {task.text}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-md flex items-center gap-1 ${getPriorityBadgeColor(task.priority)}`} title={`Priorità ${getPriorityLabel(task.priority)}`}>
                {getPriorityIcon(task.priority)}
              </span>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Modifica task"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={handleDeleteClick}
                className="p-1 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                aria-label="Elimina task"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </>
        )}
      </li>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        message="Sei sicuro di voler eliminare questo task?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default TaskItem;
