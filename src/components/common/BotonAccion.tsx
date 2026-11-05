// src/components/common/BotonAccion.tsx
import { clsx } from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variante?: 'primary' | 'secondary' | 'ghost';
    children: ReactNode;
    icono?: ReactNode;
    full?: boolean;
}

export function BotonAccion({
    variante = 'primary',
    children,
    icono,
    full = false,
    className,
    ...rest
}: Props) {
    return (
        <button
            {...rest}
            className={clsx(
                'inline-flex items-center gap-2 font-semibold transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500',
                variante === 'primary' && 'btn-primary',
                variante === 'secondary' && 'btn-secondary',
                variante === 'ghost' && 'btn-ghost',
                full && 'w-full justify-center',
                className
            )}
        >
            {icono && <span className="shrink-0">{icono}</span>}
            {children}
        </button>
    );
}
