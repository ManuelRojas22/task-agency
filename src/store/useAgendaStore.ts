// src/store/useAgendaStore.ts
import { create } from 'zustand';
import type { Tarea, Compromiso, Vista, Prioridad, EstadoTarea } from '../types/domain';

// — Mock data —
const hoy = new Date();
const d = (h: number, m = 0) => {
    const d = new Date(hoy);
    d.setHours(h, m, 0, 0);
    return d;
};

const mockTareas: Tarea[] = [
    { id: 't1', titulo: 'Revisar propuesta de presupuesto Q1', prioridad: 'CRITICA', estado: 'PENDIENTE', fechaCreacion: new Date(), fechaVencimiento: new Date(Date.now() + 86400000), etiquetas: ['Finanzas'] },
    { id: 't2', titulo: 'Preparar deck para comité directivo', prioridad: 'ALTA', estado: 'EN_PROGRESO', fechaCreacion: new Date(), fechaVencimiento: new Date(Date.now() + 2 * 86400000), etiquetas: ['Estrategia'] },
    { id: 't3', titulo: 'Actualizar política de viáticos', prioridad: 'ALTA', estado: 'PENDIENTE', fechaCreacion: new Date(), etiquetas: ['RRHH'] },
    { id: 't4', titulo: 'Validar contratos con proveedor logístico', prioridad: 'MEDIA', estado: 'PENDIENTE', fechaCreacion: new Date(), fechaVencimiento: new Date(Date.now() + 5 * 86400000) },
    { id: 't5', titulo: 'Enviar informe mensual a accionistas', prioridad: 'ALTA', estado: 'PENDIENTE', fechaCreacion: new Date(), fechaVencimiento: new Date(Date.now() + 86400000), etiquetas: ['Reporting'] },
    { id: 't6', titulo: 'Revisar KPIs de servicio al cliente', prioridad: 'MEDIA', estado: 'COMPLETADA', fechaCreacion: new Date(), etiquetas: ['Operaciones'] },
    { id: 't7', titulo: 'Actualizar organigrama ejecutivo', prioridad: 'BAJA', estado: 'PENDIENTE', fechaCreacion: new Date() },
    { id: 't8', titulo: 'Agendar reunión de retrospectiva', prioridad: 'BAJA', estado: 'COMPLETADA', fechaCreacion: new Date() },
];

const mockCompromisos: Compromiso[] = [
    { id: 'c1', titulo: 'Reunión de planeación estratégica', inicio: d(9), fin: d(10, 30), estado: 'CONFIRMADO', ubicacion: 'Sala Ejecutiva A', participantes: [{ id: 'p1', nombre: 'Ana Rodríguez' }, { id: 'p2', nombre: 'Carlos Mejía' }] },
    { id: 'c2', titulo: 'Revisión financiera Q3', inicio: d(11), fin: d(12), estado: 'PROGRAMADO', ubicacion: 'Dirección Financiera', participantes: [{ id: 'p3', nombre: 'María López' }] },
    { id: 'c3', titulo: 'Almuerzo ejecutivo con cliente', inicio: d(13), fin: d(14, 30), estado: 'CONFIRMADO', ubicacion: 'Restaurante del hotel', participantes: [{ id: 'p4', nombre: 'Roberto Silva' }, { id: 'p5', nombre: 'Lucía Fernández' }] },
    { id: 'c4', titulo: 'Comité de riesgos', inicio: d(15), fin: d(16), estado: 'PROGRAMADO', ubicacion: 'Sala de Juntas B', participantes: [{ id: 'p6', nombre: 'Diego Vargas' }] },
    { id: 'c5', titulo: 'Sesión de coaching ejecutivo', inicio: d(17), fin: d(18), estado: 'CANCELADO', participantes: [] },
];

interface AgendaState {
    tareas: Tarea[];
    compromisos: Compromiso[];
    vistaActiva: Vista;
    filtroPrioridad: Prioridad | 'TODAS';
    // Acciones
    setVistaActiva: (v: Vista) => void;
    setFiltroPrioridad: (p: Prioridad | 'TODAS') => void;
    toggleTareaPrioridad: (id: string, prioridad: Prioridad) => void;
    setEstadoTarea: (id: string, estado: EstadoTarea) => void;
    agregarCompromiso: (c: Omit<Compromiso, 'id'>) => void;
    cancelarCompromiso: (id: string) => void;
}

export const useAgendaStore = create<AgendaState>((set) => ({
    tareas: mockTareas,
    compromisos: mockCompromisos,
    vistaActiva: 'dashboard',
    filtroPrioridad: 'TODAS',

    setVistaActiva: (vistaActiva) => set({ vistaActiva }),
    setFiltroPrioridad: (filtroPrioridad) => set({ filtroPrioridad }),

    toggleTareaPrioridad: (id, prioridad) =>
        set((s) => ({
            tareas: s.tareas.map((t) => (t.id === id ? { ...t, prioridad } : t)),
        })),

    setEstadoTarea: (id, estado) =>
        set((s) => ({
            tareas: s.tareas.map((t) => (t.id === id ? { ...t, estado } : t)),
        })),

    agregarCompromiso: (c) =>
        set((s) => ({
            compromisos: [...s.compromisos, { ...c, id: `c${Date.now()}` }],
        })),

    cancelarCompromiso: (id) =>
        set((s) => ({
            compromisos: s.compromisos.map((c) =>
                c.id === id ? { ...c, estado: 'CANCELADO' } : c
            ),
        })),
}));
