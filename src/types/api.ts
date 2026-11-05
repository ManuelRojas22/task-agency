// Tipos para respuestas de API simuladas

import type { Tarea, Compromiso } from './domain';

export interface ApiResponse<T> {
    data: T;
    ok: boolean;
    mensaje?: string;
    timestamp: string;
}

export type TareasResponse = ApiResponse<Tarea[]>;
export type CompromisosResponse = ApiResponse<Compromiso[]>;
