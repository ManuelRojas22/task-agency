// Tipos de dominio: Tarea, Compromiso, Prioridad, SlotHorario

export type Prioridad = 'CRITICA' | 'ALTA' | 'MEDIA' | 'BAJA';
export type EstadoTarea = 'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADA';
export type EstadoCompromiso = 'PROGRAMADO' | 'CONFIRMADO' | 'CANCELADO';
export type Vista = 'dashboard' | 'tareas' | 'compromisos' | 'calendario';

export interface Tarea {
    id: string;
    titulo: string;
    descripcion?: string;
    prioridad: Prioridad;
    estado: EstadoTarea;
    fechaCreacion: Date;
    fechaVencimiento?: Date;
    etiquetas?: string[];
}

export interface SlotHorario {
    inicio: Date;
    fin: Date;
}

export interface Participante {
    id: string;
    nombre: string;
    avatar?: string;
}

export interface Compromiso extends SlotHorario {
    id: string;
    titulo: string;
    descripcion?: string;
    estado: EstadoCompromiso;
    ubicacion?: string;
    participantes?: Participante[];
}

export interface ResultadoConflicto {
    hayConflicto: boolean;
    compromisoColision: Compromiso | null;
    minutosSolape: number;
    sugerenciaProximoSlotLibre?: Date;
}
