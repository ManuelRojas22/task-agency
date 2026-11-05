// src/components/layout/TabNavigation.tsx
import { LayoutDashboard, CheckSquare, CalendarCheck, Calendar } from 'lucide-react';
import { clsx } from 'clsx';
import { useAgendaStore } from '../../store/useAgendaStore';
import type { Vista } from '../../types/domain';

const tabs: { vista: Vista; label: string; icon: typeof LayoutDashboard }[] = [
    { vista: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { vista: 'tareas', label: 'Tareas', icon: CheckSquare },
    { vista: 'compromisos', label: 'Compromisos', icon: CalendarCheck },
    { vista: 'calendario', label: 'Calendario', icon: Calendar },
];

export function TabNavigation() {
    const vistaActiva = useAgendaStore((s) => s.vistaActiva);
    const setVistaActiva = useAgendaStore((s) => s.setVistaActiva);

    return (
        <>
            {/* ── Sidebar desktop (md+) ── */}
            <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-surface-border bg-surface-card py-4 gap-1 px-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
                    Navegación
                </p>
                {tabs.map(({ vista, label, icon: Icon }) => {
                    const activo = vistaActiva === vista;
                    return (
                        <button
                            key={vista}
                            id={`tab-${vista}`}
                            onClick={() => setVistaActiva(vista)}
                            className={clsx(
                                'group flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-button transition-all duration-150 text-sm font-medium',
                                activo
                                    ? 'bg-brand-950/60 text-brand-500 border border-brand-800/60'
                                    : 'text-gray-400 hover:text-gray-100 hover:bg-surface-container'
                            )}
                        >
                            <Icon size={17} className="shrink-0" />
                            <span>{label}</span>
                            {activo && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-500" />
                            )}
                        </button>
                    );
                })}
            </aside>

            {/* ── Bottom Nav mobile (<md) ── */}
            <nav
                className="md:hidden fixed bottom-0 inset-x-0 z-40 flex items-center justify-around
                   border-t border-zinc-800 bg-[#09090B]/95 backdrop-blur-md h-[60px]"
                aria-label="Navegación principal"
            >
                {tabs.map(({ vista, label, icon: Icon }) => {
                    const activo = vistaActiva === vista;
                    return (
                        <button
                            key={vista}
                            id={`mobile-tab-${vista}`}
                            onClick={() => setVistaActiva(vista)}
                            className={clsx(
                                'relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all duration-150',
                                activo ? 'text-[#DC2626]' : 'text-[#71717A] hover:text-[#E4E4E7]'
                            )}
                            aria-current={activo ? 'page' : undefined}
                        >
                            {activo && (
                                <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-600" />
                            )}
                            <Icon size={20} strokeWidth={activo ? 2.2 : 1.8} />
                            <span className="text-xs font-medium leading-none">{label}</span>
                        </button>
                    );
                })}
            </nav>
        </>
    );
}
