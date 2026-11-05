// src/components/tasks/TaskList.tsx
import { ListChecks } from 'lucide-react';
import { useTaskFilters } from '../../hooks/useTaskFilters';
import { TaskCard } from './TaskCard';

export function TaskList() {
    const tareas = useTaskFilters();

    if (tareas.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500 gap-3">
                <ListChecks size={36} className="text-zinc-700" />
                <p className="text-sm">Sin tareas para el filtro actual</p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {tareas.map((t) => (
                <TaskCard key={t.id} tarea={t} />
            ))}
        </div>
    );
}
