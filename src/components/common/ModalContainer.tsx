// src/components/common/ModalContainer.tsx
import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface Props {
    open: boolean;
    onClose: () => void;
    titulo: string;
    children: ReactNode;
}

export function ModalContainer({ open, onClose, titulo, children }: Props) {
    // Cerrar con Escape
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={titulo}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="relative z-10 w-full max-w-lg card p-6 animate-in fade-in slide-in-from-bottom-4 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-h2 font-bold text-gray-50">{titulo}</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-button text-gray-400 hover:text-gray-100 hover:bg-surface-container transition-all"
                        aria-label="Cerrar"
                    >
                        <X size={18} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
