// src/utils/conflictChecker.ts
// Algoritmo de detección de solape de horarios (Anti-Gravity README)

import type { Compromiso, ResultadoConflicto, SlotHorario } from '../types/domain';

export function detectarConflictoHorario(
    nuevo: SlotHorario,
    existentes: Compromiso[]
): ResultadoConflicto {
    // Ignorar compromisos cancelados
    const activos = existentes.filter((c) => c.estado !== 'CANCELADO');

    for (const c of activos) {
        // Regla de solape estricta: inicioA < finB && finA > inicioB
        if (nuevo.inicio < c.fin && nuevo.fin > c.inicio) {
            const inicioColision = Math.max(nuevo.inicio.getTime(), c.inicio.getTime());
            const finColision = Math.min(nuevo.fin.getTime(), c.fin.getTime());
            const minutosSolape = Math.round((finColision - inicioColision) / (1000 * 60));

            return {
                hayConflicto: true,
                compromisoColision: c,
                minutosSolape,
                sugerenciaProximoSlotLibre: new Date(c.fin.getTime() + 15 * 60 * 1000), // +15 min buffer
            };
        }
    }

    return { hayConflicto: false, compromisoColision: null, minutosSolape: 0 };
}
