// src/components/tasks/TaskFilters.tsx
import { clsx } from 'clsx';
import { useAgendaStore } from '../../store/useAgendaStore';
import type { Prioridad } from '../../types/domain';

const opciones: { value: Prioridad | 'TODAS'; label: string }[] = [
    { value: 'TODAS', label: 'Todas' },
    { value: 'CRITICA', label: 'Crítica' },
    { value: 'ALTA', label: 'Alta' },
    { value: 'MEDIA', label: 'Media' },
    { value: 'BAJA', label: 'Baja' },
];

export function TaskFilters() {
    const filtro = useAgendaStore((s) => s.filtroPrioridad);
    const setFiltro = useAgendaStore((s) => s.setFiltroPrioridad);

    return (
        <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filtrar por prioridad">
            {opciones.map(({ value, label }) => {
                const activo = filtro === value;
                return (
                    <button
                        key={value}
                        onClick={() => setFiltro(value)}
                        className={clsx(
                            'px-3 py-1 rounded-badge text-xs font-semibold border transition-all duration-150',
                            activo
                                ? 'bg-brand-600 text-white border-brand-600'
                                : 'bg-surface-container text-gray-400 border-surface-border hover:text-gray-100 hover:border-zinc-500'
                        )}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
}
