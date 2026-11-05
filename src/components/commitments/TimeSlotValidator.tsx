// src/components/commitments/TimeSlotValidator.tsx
import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { useAgendaStore } from '../../store/useAgendaStore';
import { useConflictDetector } from '../../hooks/useConflictDetector';
import { ConflictBanner } from '../common/ConflictBanner';
import { BotonAccion } from '../common/BotonAccion';

export function TimeSlotValidator() {
    const hoy = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const fechaHoy = `${hoy.getFullYear()}-${pad(hoy.getMonth() + 1)}-${pad(hoy.getDate())}`;

    const [titulo, setTitulo] = useState('');
    const [fecha, setFecha] = useState(fechaHoy);
    const [horaInicio, setHoraInicio] = useState('09:00');
    const [horaFin, setHoraFin] = useState('10:00');
    const [ubicacion, setUbicacion] = useState('');
    const [exito, setExito] = useState(false);

    const agregarCompromiso = useAgendaStore((s) => s.agregarCompromiso);

    const slot = useMemo(() => {
        try {
            const inicio = new Date(`${fecha}T${horaInicio}`);
            const fin = new Date(`${fecha}T${horaFin}`);
            if (isNaN(inicio.getTime()) || isNaN(fin.getTime()) || inicio >= fin) return null;
            return { inicio, fin };
        } catch {
            return null;
        }
    }, [fecha, horaInicio, horaFin]);

    const resultado = useConflictDetector(slot);

    const handleSugerencia = (sugerencia: Date) => {
        const h = String(sugerencia.getHours()).padStart(2, '0');
        const m = String(sugerencia.getMinutes()).padStart(2, '0');
        const nuevaHoraInicio = `${h}:${m}`;
        setHoraInicio(nuevaHoraInicio);
        // Mantener la misma duración
        if (slot) {
            const duracion = slot.fin.getTime() - slot.inicio.getTime();
            const nuevaFin = new Date(sugerencia.getTime() + duracion);
            const hf = String(nuevaFin.getHours()).padStart(2, '0');
            const mf = String(nuevaFin.getMinutes()).padStart(2, '0');
            setHoraFin(`${hf}:${mf}`);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!slot || !titulo.trim() || resultado.hayConflicto) return;
        agregarCompromiso({
            titulo: titulo.trim(),
            inicio: slot.inicio,
            fin: slot.fin,
            estado: 'PROGRAMADO',
            ubicacion: ubicacion.trim() || undefined,
        });
        setTitulo('');
        setUbicacion('');
        setExito(true);
        setTimeout(() => setExito(false), 3000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Título */}
            <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5" htmlFor="titulo-compromiso">
                    Título del compromiso
                </label>
                <input
                    id="titulo-compromiso"
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Reunión de dirección…"
                    className="input-field"
                    required
                />
            </div>

            {/* Fecha */}
            <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5" htmlFor="fecha-compromiso">
                    Fecha
                </label>
                <input
                    id="fecha-compromiso"
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="input-field [color-scheme:dark]"
                    required
                />
            </div>

            {/* Horario */}
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5" htmlFor="hora-inicio">
                        Inicio
                    </label>
                    <input
                        id="hora-inicio"
                        type="time"
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                        className="input-field [color-scheme:dark]"
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5" htmlFor="hora-fin">
                        Fin
                    </label>
                    <input
                        id="hora-fin"
                        type="time"
                        value={horaFin}
                        onChange={(e) => setHoraFin(e.target.value)}
                        className="input-field [color-scheme:dark]"
                        required
                    />
                </div>
            </div>

            {/* Ubicación */}
            <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5" htmlFor="ubicacion-compromiso">
                    Ubicación (opcional)
                </label>
                <input
                    id="ubicacion-compromiso"
                    type="text"
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                    placeholder="Sala de juntas…"
                    className="input-field"
                />
            </div>

            {/* Conflict Banner — en tiempo real */}
            {resultado.hayConflicto && (
                <ConflictBanner resultado={resultado} onUsarSugerencia={handleSugerencia} />
            )}

            {/* Éxito */}
            {exito && (
                <p className="text-xs text-brand-500 font-semibold">
                    ✓ Compromiso registrado correctamente
                </p>
            )}

            {/* Submit */}
            <BotonAccion
                type="submit"
                variante="primary"
                full
                icono={<Plus size={16} />}
                disabled={resultado.hayConflicto || !titulo.trim() || !slot}
            >
                Agendar compromiso
            </BotonAccion>
        </form>
    );
}
