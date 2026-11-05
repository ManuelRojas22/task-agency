// src/views/DashboardView.tsx
import { CheckSquare, AlertOctagon, CalendarCheck, AlertTriangle } from 'lucide-react';
import { useAgendaStore } from '../store/useAgendaStore';
import { clsx } from 'clsx';

interface KpiCardProps {
    titulo: string;
    valor: number;
    sub: string;
    icon: React.ReactNode;
    destacado?: boolean;
}

function KpiCard({ titulo, valor, sub, icon, destacado }: KpiCardProps) {
    return (
        <div
            className={clsx(
                'card p-5 flex flex-col gap-3',
                destacado && 'border-brand-800/60 shadow-conflict'
            )}
        >
            <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{titulo}</p>
                <span className={clsx('p-2 rounded-badge', destacado ? 'bg-brand-950 text-brand-500' : 'bg-surface-container text-gray-400')}>
                    {icon}
                </span>
            </div>
            <div>
                <p className={clsx('text-kpi font-bold', destacado ? 'text-brand-500' : 'text-gray-50')}>
                    {valor}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
            </div>
        </div>
    );
}

export function DashboardView() {
    const tareas = useAgendaStore((s) => s.tareas);
    const compromisos = useAgendaStore((s) => s.compromisos);
    const setVistaActiva = useAgendaStore((s) => s.setVistaActiva);

    const criticas = tareas.filter((t) => t.prioridad === 'CRITICA' && t.estado !== 'COMPLETADA').length;
    const pendientes = tareas.filter((t) => t.estado !== 'COMPLETADA').length;
    const hoyCompromisos = compromisos.filter((c) => c.estado !== 'CANCELADO').length;
    const conflictos = 0; // Computed on-demand in compromisos view

    return (
        <div className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <KpiCard
                    titulo="Tareas pendientes"
                    valor={pendientes}
                    sub="Requieren atención"
                    icon={<CheckSquare size={16} />}
                />
                <KpiCard
                    titulo="Críticas"
                    valor={criticas}
                    sub="Acción inmediata"
                    icon={<AlertOctagon size={16} />}
                    destacado={criticas > 0}
                />
                <KpiCard
                    titulo="Compromisos hoy"
                    valor={hoyCompromisos}
                    sub="Agendados activos"
                    icon={<CalendarCheck size={16} />}
                />
                <KpiCard
                    titulo="Conflictos"
                    valor={conflictos}
                    sub="Solapes detectados"
                    icon={<AlertTriangle size={16} />}
                    destacado={conflictos > 0}
                />
            </div>

            {/* Tareas de alta prioridad */}
            <section>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-h2 font-bold text-gray-50">Prioridades urgentes</h2>
                    <button
                        onClick={() => setVistaActiva('tareas')}
                        className="text-xs text-brand-500 hover:text-brand-600 font-semibold transition-colors"
                    >
                        Ver todas →
                    </button>
                </div>
                <div className="space-y-2">
                    {tareas
                        .filter((t) => (t.prioridad === 'CRITICA' || t.prioridad === 'ALTA') && t.estado !== 'COMPLETADA')
                        .slice(0, 4)
                        .map((t) => (
                            <div key={t.id} className="flex items-center gap-3 p-3.5 card">
                                <span
                                    className={clsx(
                                        'w-2 h-2 rounded-full shrink-0',
                                        t.prioridad === 'CRITICA' ? 'bg-brand-800' : 'bg-brand-500'
                                    )}
                                />
                                <p className="text-sm text-gray-200 flex-1 truncate">{t.titulo}</p>
                                <span className="text-xs text-gray-500 shrink-0">
                                    {t.prioridad === 'CRITICA' ? '🔴' : '🟠'}
                                </span>
                            </div>
                        ))}
                </div>
            </section>

            {/* Compromisos del día */}
            <section>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-h2 font-bold text-gray-50">Agenda del día</h2>
                    <button
                        onClick={() => setVistaActiva('compromisos')}
                        className="text-xs text-brand-500 hover:text-brand-600 font-semibold transition-colors"
                    >
                        Ver agenda →
                    </button>
                </div>
                <div className="space-y-2">
                    {compromisos
                        .filter((c) => c.estado !== 'CANCELADO')
                        .slice(0, 3)
                        .map((c) => (
                            <div key={c.id} className="flex items-center gap-3 p-3.5 card">
                                <div className="w-1 self-stretch rounded-full bg-brand-600 shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-100 truncate">{c.titulo}</p>
                                    <p className="text-xs text-gray-500">
                                        {c.inicio.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })} –{' '}
                                        {c.fin.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                                <span className={clsx(
                                    'text-xs px-1.5 py-0.5 rounded-badge font-medium border',
                                    c.estado === 'CONFIRMADO'
                                        ? 'text-brand-500 bg-brand-950/60 border-brand-800/60'
                                        : 'text-gray-500 bg-surface-container border-surface-border'
                                )}>
                                    {c.estado === 'CONFIRMADO' ? 'Confirmado' : 'Programado'}
                                </span>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
}
