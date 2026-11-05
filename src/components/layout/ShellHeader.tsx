// src/components/layout/ShellHeader.tsx
import { CalendarDays, Bell } from 'lucide-react';
import { formatDiaSemana } from '../../utils/dateHelpers';

export function ShellHeader() {
    const hoy = new Date();

    return (
        <header className="sticky top-0 z-30 bg-surface-base/95 backdrop-blur-md border-b border-surface-border">
            <div className="flex items-center justify-between px-4 sm:px-6 h-14">
                {/* Logo + Título */}
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-badge bg-brand-600 flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-xs">AG</span>
                    </div>
                    <div className="leading-tight">
                        <p className="text-sm font-bold text-gray-50 tracking-tight">Agenda Ejecutiva</p>
                        <p className="text-xs text-gray-500 hidden sm:block capitalize">
                            {formatDiaSemana(hoy)}
                        </p>
                    </div>
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-2">
                    <button
                        aria-label="Ver calendario"
                        className="p-2 rounded-button text-gray-400 hover:text-gray-100 hover:bg-surface-container transition-all"
                    >
                        <CalendarDays size={18} />
                    </button>
                    <button
                        aria-label="Notificaciones"
                        className="relative p-2 rounded-button text-gray-400 hover:text-gray-100 hover:bg-surface-container transition-all"
                    >
                        <Bell size={18} />
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-brand-500 rounded-full" />
                    </button>
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-surface-container border border-surface-border flex items-center justify-center ml-1">
                        <span className="text-xs font-semibold text-gray-300">EJ</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
