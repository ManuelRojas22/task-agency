// src/utils/dateHelpers.ts
import { format, isToday, isTomorrow, isYesterday, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export function formatFecha(date: Date): string {
    return format(date, 'dd MMM yyyy', { locale: es });
}

export function formatHora(date: Date): string {
    return format(date, 'HH:mm');
}

export function formatSlot(inicio: Date, fin: Date): string {
    return `${formatHora(inicio)} – ${formatHora(fin)}`;
}

export function formatDiaSemana(date: Date): string {
    return format(date, 'EEEE, d MMMM', { locale: es });
}

export function etiquetaDia(date: Date): string {
    if (isToday(date)) return 'Hoy';
    if (isTomorrow(date)) return 'Mañana';
    if (isYesterday(date)) return 'Ayer';
    return formatFecha(date);
}

export function tiempoRelativo(date: Date): string {
    return formatDistanceToNow(date, { addSuffix: true, locale: es });
}

export function formatISO(date: Date): string {
    return format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
}
