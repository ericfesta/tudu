import React, { useState, useEffect } from 'react';
import { Task } from './types/Task';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import { CheckSquare, ListTodo } from 'lucide-react';
import { useTheme } from './context/ThemeContext';

function App() {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      // Aggiungi priorità ai task esistenti se non ce l'hanno
      return parsedTasks.map((task: any) => ({
        ...task,
        priority: task.priority || 'media'
      }));
    }
    return [];
  });
  
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string, priority: 'alta' | 'media' | 'bassa') => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority
    };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id: string, newText: string, newPriority: 'alta' | 'media' | 'bassa') => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText, priority: newPriority } : task
    ));
  };

  // Ordina i task per priorità (alta -> media -> bassa)
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { 'alta': 0, 'media': 1, 'bassa': 2 };
    // Prima ordina per priorità
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    
    // Se la priorità è uguale, mantieni l'ordine originale
    return priorityDiff;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center py-12 px-4 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors">
        <header className="mb-6 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ListTodo className="text-blue-500" size={28} />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">T.U.D.U.</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">The Useful Daily Utility</p>
          </div>
          <ThemeToggle />
        </header>

        <TaskForm onAddTask={addTask} />

        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">{pendingCount}</span> da completare, 
            <span className="font-medium ml-1">{completedCount}</span> completati
          </div>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-1 text-sm px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
          >
            <CheckSquare size={16} />
            {showCompleted ? 'Nascondi completati' : 'Mostra completati'}
          </button>
        </div>

        <TaskList
          tasks={sortedTasks}
          showCompleted={showCompleted}
          onToggleComplete={toggleComplete}
          onDelete={deleteTask}
          onEdit={editTask}
        />
        
        <Footer />
      </div>
    </div>
  );
}

export default App;
