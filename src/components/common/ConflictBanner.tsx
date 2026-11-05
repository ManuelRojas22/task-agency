// src/components/common/ConflictBanner.tsx
import { AlertTriangle, Lock, ArrowRight } from 'lucide-react';
import type { ResultadoConflicto } from '../../types/domain';
import { formatHora } from '../../utils/dateHelpers';
import { BotonAccion } from './BotonAccion';

interface Props {
    resultado: ResultadoConflicto;
    onUsarSugerencia?: (fecha: Date) => void;
}

export function ConflictBanner({ resultado, onUsarSugerencia }: Props) {
    if (!resultado.hayConflicto || !resultado.compromisoColision) return null;

    const { compromisoColision, minutosSolape, sugerenciaProximoSlotLibre } = resultado;

    return (
        <div
            role="alert"
            className="rounded-xl p-4 space-y-3 border border-red-800/80 shadow-conflict"
            style={{ background: 'rgba(69, 10, 10, 0.40)' }}
        >
            {/* Cabecera */}
            <div className="flex items-start gap-3">
                <AlertTriangle className="text-[#EF4444] mt-0.5 shrink-0" size={18} />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-red-200">
                        Conflicto detectado — {minutosSolape} min de solape
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                        Colisiona con: <span className="text-gray-300">{compromisoColision.titulo}</span>&nbsp;
                        ({formatHora(compromisoColision.inicio)} – {formatHora(compromisoColision.fin)})
                    </p>
                </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-wrap items-center gap-2">
                {sugerenciaProximoSlotLibre && onUsarSugerencia && (
                    <BotonAccion
                        variante="secondary"
                        icono={<ArrowRight size={14} />}
                        onClick={() => onUsarSugerencia(sugerenciaProximoSlotLibre)}
                        className="text-xs py-1.5 px-3"
                    >
                        Mover a {formatHora(sugerenciaProximoSlotLibre)}
                    </BotonAccion>
                )}
                <button
                    disabled
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-button border border-red-900/60 text-red-400/40 font-semibold cursor-not-allowed"
                >
                    <Lock size={12} />
                    Confirmar
                </button>
            </div>
        </div>
    );
}
