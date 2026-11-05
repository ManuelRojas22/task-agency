// src/hooks/useTaskFilters.ts
import { useMemo } from 'react';
import { useAgendaStore } from '../store/useAgendaStore';
import type { Tarea, Prioridad, EstadoTarea } from '../types/domain';

interface FiltrosOpcionales {
    prioridad?: Prioridad | 'TODAS';
    estado?: EstadoTarea | 'TODOS';
    query?: string;
}

export function useTaskFilters(opciones?: FiltrosOpcionales): Tarea[] {
    const tareas = useAgendaStore((s) => s.tareas);
    const filtroPrioridadGlobal = useAgendaStore((s) => s.filtroPrioridad);

    const prioridad = opciones?.prioridad ?? filtroPrioridadGlobal;
    const estado = opciones?.estado ?? 'TODOS';
    const query = opciones?.query ?? '';

    return useMemo(() => {
        return tareas.filter((t) => {
            const matchPrioridad = prioridad === 'TODAS' || t.prioridad === prioridad;
            const matchEstado = estado === 'TODOS' || t.estado === estado;
            const matchQuery = !query || t.titulo.toLowerCase().includes(query.toLowerCase());
            return matchPrioridad && matchEstado && matchQuery;
        });
    }, [tareas, prioridad, estado, query]);
}
