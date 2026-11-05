// src/views/CalendarioView.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useAgendaStore } from '../store/useAgendaStore';
import { clsx } from 'clsx';
import { format, startOfWeek, addDays, isSameDay, addWeeks, subWeeks } from 'date-fns';
import { es } from 'date-fns/locale';

export function CalendarioView() {
    const compromisos = useAgendaStore((s) => s.compromisos);
    const [semanaBase, setSemanaBase] = useState(new Date());

    const inicioSemana = startOfWeek(semanaBase, { weekStartsOn: 1 }); // Lunes
    const dias = Array.from({ length: 7 }, (_, i) => addDays(inicioSemana, i));

    const hoyDate = new Date();

    return (
        <div className="space-y-5">
            {/* Cabecera */}
            <div className="flex items-center justify-between">
                <h1 className="text-h1 font-bold text-gray-50">Calendario</h1>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setSemanaBase(subWeeks(semanaBase, 1))}
                        className="p-1.5 rounded-button text-gray-400 hover:text-gray-100 hover:bg-surface-container transition-all"
                        aria-label="Semana anterior"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs text-gray-400 font-medium">
                        {format(inicioSemana, 'dd MMM', { locale: es })} –{' '}
                        {format(addDays(inicioSemana, 6), 'dd MMM yyyy', { locale: es })}
                    </span>
                    <button
                        onClick={() => setSemanaBase(addWeeks(semanaBase, 1))}
                        className="p-1.5 rounded-button text-gray-400 hover:text-gray-100 hover:bg-surface-container transition-all"
                        aria-label="Semana siguiente"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Grid semanal */}
            <div className="grid grid-cols-7 gap-1">
                {dias.map((dia) => {
                    const esHoy = isSameDay(dia, hoyDate);
                    const eventsDia = compromisos.filter(
                        (c) => c.estado !== 'CANCELADO' && isSameDay(c.inicio, dia)
                    );
                    return (
                        <div
                            key={dia.toISOString()}
                            className={clsx(
                                'flex flex-col gap-1 p-2 rounded-card border min-h-[80px] transition-all',
                                esHoy
                                    ? 'border-brand-700 bg-brand-950/30'
                                    : 'border-surface-border bg-surface-card'
                            )}
                        >
                            {/* Nombre del día */}
                            <p className="text-xs text-gray-500 font-medium uppercase leading-none">
                                {format(dia, 'EEE', { locale: es })}
                            </p>
                            {/* Número del día */}
                            <p
                                className={clsx(
                                    'text-sm font-bold leading-none',
                                    esHoy ? 'text-brand-500' : 'text-gray-300'
                                )}
                            >
                                {format(dia, 'd')}
                            </p>
                            {/* Eventos */}
                            <div className="flex flex-col gap-0.5 mt-1">
                                {eventsDia.slice(0, 3).map((c) => (
                                    <div
                                        key={c.id}
                                        className="text-xs rounded px-1 py-0.5 truncate bg-brand-950/60 text-brand-400 border border-brand-800/40"
                                        title={c.titulo}
                                    >
                                        {format(c.inicio, 'HH:mm')} {c.titulo}
                                    </div>
                                ))}
                                {eventsDia.length > 3 && (
                                    <p className="text-xs text-gray-600">+{eventsDia.length - 3} más</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Leyenda */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-brand-950/60 border border-brand-800/40" />
                    Compromiso agendado
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm border border-brand-700 bg-brand-950/30" />
                    Hoy
                </span>
            </div>
        </div>
    );
}
