export interface Task {
  id: number;
  title: string;
  complete: boolean;
  description: string;
  dueDate?: Date | null;
  priority: 0 | 1 | 2;
  tags: string[];
  updatedAt?: Date | null;
  createdAt: Date;
}
