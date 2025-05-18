export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'alta' | 'media' | 'bassa';
}
