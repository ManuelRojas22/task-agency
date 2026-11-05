// src/hooks/useConflictDetector.ts
import { useMemo } from 'react';
import { useAgendaStore } from '../store/useAgendaStore';
import { detectarConflictoHorario } from '../utils/conflictChecker';
import type { SlotHorario, ResultadoConflicto } from '../types/domain';

export function useConflictDetector(slot: SlotHorario | null, excludeId?: string): ResultadoConflicto {
    const compromisos = useAgendaStore((s) => s.compromisos);

    return useMemo(() => {
        if (!slot || slot.inicio >= slot.fin) {
            return { hayConflicto: false, compromisoColision: null, minutosSolape: 0 };
        }
        const lista = excludeId ? compromisos.filter((c) => c.id !== excludeId) : compromisos;
        return detectarConflictoHorario(slot, lista);
    }, [slot, compromisos, excludeId]);
}
