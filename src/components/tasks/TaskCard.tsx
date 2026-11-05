// src/components/tasks/TaskCard.tsx
import { Check, Circle } from 'lucide-react';
import { clsx } from 'clsx';
import type { Tarea } from '../../types/domain';
import { BadgePrioridad } from '../common/BadgePrioridad';
import { etiquetaDia } from '../../utils/dateHelpers';
import { useAgendaStore } from '../../store/useAgendaStore';

interface Props {
    tarea: Tarea;
}

export function TaskCard({ tarea }: Props) {
    const setEstadoTarea = useAgendaStore((s) => s.setEstadoTarea);
    const completada = tarea.estado === 'COMPLETADA';

    return (
        <div
            className={clsx(
                'group flex items-start gap-3 p-4 rounded-card border transition-all duration-150 hover:border-zinc-600',
                completada
                    ? 'bg-surface-card/50 border-surface-border/40 opacity-60'
                    : 'bg-surface-card border-surface-border'
            )}
        >
            {/* Checkbox */}
            <button
                aria-label={completada ? 'Marcar como pendiente' : 'Completar tarea'}
                onClick={() =>
                    setEstadoTarea(tarea.id, completada ? 'PENDIENTE' : 'COMPLETADA')
                }
                className="mt-0.5 w-5 h-5 rounded shrink-0 border-2 border-surface-border flex items-center justify-center
                   hover:border-brand-600 transition-all duration-150 group-hover:border-zinc-500"
            >
                {completada ? (
                    <Check size={12} className="text-brand-600" />
                ) : (
                    <Circle size={10} className="text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
            </button>

            {/* Contenido */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <p
                        className={clsx(
                            'text-sm font-medium leading-snug',
                            completada ? 'line-through text-gray-500' : 'text-gray-100'
                        )}
                    >
                        {tarea.titulo}
                    </p>
                    <BadgePrioridad prioridad={tarea.prioridad} />
                </div>

                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    {tarea.etiquetas?.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs text-gray-500 bg-surface-container px-1.5 py-0.5 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                    {tarea.fechaVencimiento && (
                        <span className="text-xs text-gray-500">
                            Vence: {etiquetaDia(tarea.fechaVencimiento)}
                        </span>
                    )}
                    {tarea.estado === 'EN_PROGRESO' && (
                        <span className="flex items-center gap-1 text-xs text-brand-500">
                            <span className="pulse-dot" />
                            En progreso
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
