// src/components/commitments/CommitmentCard.tsx
import { MapPin, Users, Clock } from 'lucide-react';
import { clsx } from 'clsx';
import type { Compromiso } from '../../types/domain';
import { formatSlot } from '../../utils/dateHelpers';
import { useAgendaStore } from '../../store/useAgendaStore';

interface Props {
    compromiso: Compromiso;
}

const estadoConfig = {
    CONFIRMADO: { label: 'Confirmado', className: 'bg-brand-950/60 text-brand-500 border-brand-800/60' },
    PROGRAMADO: { label: 'Programado', className: 'bg-surface-container text-gray-400 border-surface-border' },
    CANCELADO: { label: 'Cancelado', className: 'bg-zinc-900 text-gray-600 border-zinc-800 line-through' },
};

export function CommitmentCard({ compromiso }: Props) {
    const cancelarCompromiso = useAgendaStore((s) => s.cancelarCompromiso);
    const cfg = estadoConfig[compromiso.estado];

    return (
        <div
            className={clsx(
                'p-4 rounded-card border transition-all duration-150',
                compromiso.estado === 'CANCELADO'
                    ? 'bg-surface-card/40 border-surface-border/30 opacity-50'
                    : 'bg-surface-card border-surface-border hover:border-zinc-600'
            )}
        >
            <div className="flex items-start justify-between gap-3">
                {/* Franja horaria */}
                <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                    <Clock size={14} className="text-brand-500" />
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatSlot(compromiso.inicio, compromiso.fin)}
                    </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-gray-100">{compromiso.titulo}</p>
                        <span
                            className={clsx(
                                'inline-flex items-center px-1.5 py-0.5 rounded-badge text-xs font-medium border',
                                cfg.className
                            )}
                        >
                            {cfg.label}
                        </span>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        {compromiso.ubicacion && (
                            <span className="flex items-center gap-1">
                                <MapPin size={11} />
                                {compromiso.ubicacion}
                            </span>
                        )}
                        {(compromiso.participantes?.length ?? 0) > 0 && (
                            <span className="flex items-center gap-1">
                                <Users size={11} />
                                {compromiso.participantes?.map((p) => p.nombre).join(', ')}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Acción cancelar */}
            {compromiso.estado !== 'CANCELADO' && (
                <div className="mt-3 flex justify-end">
                    <button
                        onClick={() => cancelarCompromiso(compromiso.id)}
                        className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
                    >
                        Cancelar compromiso
                    </button>
                </div>
            )}
        </div>
    );
}
