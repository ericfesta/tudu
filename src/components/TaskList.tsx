import React from 'react';
import { Task } from '../types/Task';
import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  showCompleted: boolean;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string, newPriority: 'alta' | 'media' | 'bassa') => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  showCompleted,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  const filteredTasks = showCompleted 
    ? tasks 
    : tasks.filter(task => !task.completed);

  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-500 dark:text-gray-400 transition-colors">
        <ClipboardList size={48} className="mb-2" />
        <p>Nessun task da mostrare</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700 transition-colors">
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default TaskList;
