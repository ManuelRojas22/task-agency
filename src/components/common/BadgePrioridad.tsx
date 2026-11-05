// src/components/common/BadgePrioridad.tsx
import { clsx } from 'clsx';
import type { Prioridad } from '../../types/domain';

interface Props {
    prioridad: Prioridad;
    size?: 'sm' | 'md';
}

const config: Record<Prioridad, { label: string; className: string }> = {
    CRITICA: {
        label: 'CRÍTICA',
        className: 'bg-[#991B1B] text-[#FEE2E2] border border-[#DC2626]',
    },
    ALTA: {
        label: 'ALTA',
        className: 'bg-red-500/15 text-[#EF4444] border border-red-500/30',
    },
    MEDIA: {
        label: 'MEDIA',
        className: 'bg-[#27272A] text-[#D1D5DB] border border-zinc-700',
    },
    BAJA: {
        label: 'BAJA',
        className: 'bg-[#18181B] text-[#9CA3AF] border border-zinc-800',
    },
};

export function BadgePrioridad({ prioridad, size = 'sm' }: Props) {
    const { label, className } = config[prioridad];
    return (
        <span
            className={clsx(
                'inline-flex items-center font-semibold tracking-wide rounded-badge',
                size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2.5 py-1 text-sm',
                className
            )}
        >
            {label}
        </span>
    );
}
