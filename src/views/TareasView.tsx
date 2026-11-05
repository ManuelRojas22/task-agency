// src/views/TareasView.tsx
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { TaskFilters } from '../components/tasks/TaskFilters';
import { TaskList } from '../components/tasks/TaskList';
import { ModalContainer } from '../components/common/ModalContainer';
import { BotonAccion } from '../components/common/BotonAccion';
import { useAgendaStore } from '../store/useAgendaStore';
import type { Prioridad } from '../types/domain';

const prioridades: Prioridad[] = ['CRITICA', 'ALTA', 'MEDIA', 'BAJA'];

export function TareasView() {
    const [modalOpen, setModalOpen] = useState(false);
    const [nuevoTitulo, setNuevoTitulo] = useState('');
    const [nuevaPrioridad, setNuevaPrioridad] = useState<Prioridad>('MEDIA');
    const tareas = useAgendaStore((s) => s.tareas);
    const setEstadoTarea = useAgendaStore((s) => s.setEstadoTarea);

    const completadas = tareas.filter((t) => t.estado === 'COMPLETADA').length;
    const total = tareas.length;

    const handleAgregar = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nuevoTitulo.trim()) return;
        // Agregar tarea directamente al store (extendemos con acción inline)
        useAgendaStore.setState((s) => ({
            tareas: [
                ...s.tareas,
                {
                    id: `t${Date.now()}`,
                    titulo: nuevoTitulo.trim(),
                    prioridad: nuevaPrioridad,
                    estado: 'PENDIENTE' as const,
                    fechaCreacion: new Date(),
                },
            ],
        }));
        setNuevoTitulo('');
        setNuevaPrioridad('MEDIA');
        setModalOpen(false);
    };

    return (
        <div className="space-y-5">
            {/* Cabecera */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                    <h1 className="text-h1 font-bold text-gray-50">Tareas</h1>
                    <p className="text-xs text-gray-500 mt-0.5">
                        {completadas}/{total} completadas
                    </p>
                </div>
                <BotonAccion
                    id="btn-nueva-tarea"
                    variante="primary"
                    icono={<Plus size={16} />}
                    onClick={() => setModalOpen(true)}
                >
                    Nueva tarea
                </BotonAccion>
            </div>

            {/* Progreso */}
            <div>
                <div className="h-1 rounded-full bg-surface-container overflow-hidden">
                    <div
                        className="h-full bg-brand-600 rounded-full transition-all duration-500"
                        style={{ width: `${total > 0 ? (completadas / total) * 100 : 0}%` }}
                    />
                </div>
            </div>

            {/* Filtros */}
            <TaskFilters />

            {/* Lista */}
            <TaskList />

            {/* Modal nueva tarea */}
            <ModalContainer
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                titulo="Nueva tarea"
            >
                <form onSubmit={handleAgregar} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1.5" htmlFor="titulo-tarea">
                            Título
                        </label>
                        <input
                            id="titulo-tarea"
                            type="text"
                            value={nuevoTitulo}
                            onChange={(e) => setNuevoTitulo(e.target.value)}
                            placeholder="Descripción de la tarea…"
                            className="input-field"
                            autoFocus
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1.5" htmlFor="prioridad-tarea">
                            Prioridad
                        </label>
                        <select
                            id="prioridad-tarea"
                            value={nuevaPrioridad}
                            onChange={(e) => setNuevaPrioridad(e.target.value as Prioridad)}
                            className="input-field"
                        >
                            {prioridades.map((p) => (
                                <option key={p} value={p}>
                                    {p}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-2 justify-end pt-1">
                        <BotonAccion variante="ghost" type="button" onClick={() => setModalOpen(false)}>
                            Cancelar
                        </BotonAccion>
                        <BotonAccion variante="primary" type="submit" disabled={!nuevoTitulo.trim()}>
                            Crear tarea
                        </BotonAccion>
                    </div>
                </form>
            </ModalContainer>
        </div>
    );
}
