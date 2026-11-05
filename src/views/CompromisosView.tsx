// src/views/CompromisosView.tsx
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAgendaStore } from '../store/useAgendaStore';
import { CommitmentCard } from '../components/commitments/CommitmentCard';
import { TimeSlotValidator } from '../components/commitments/TimeSlotValidator';
import { ModalContainer } from '../components/common/ModalContainer';
import { BotonAccion } from '../components/common/BotonAccion';

export function CompromisosView() {
    const [modalOpen, setModalOpen] = useState(false);
    const compromisos = useAgendaStore((s) => s.compromisos);

    const activos = compromisos.filter((c) => c.estado !== 'CANCELADO');
    const cancelados = compromisos.filter((c) => c.estado === 'CANCELADO');

    return (
        <div className="space-y-5">
            {/* Cabecera */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                    <h1 className="text-h1 font-bold text-gray-50">Compromisos</h1>
                    <p className="text-xs text-gray-500 mt-0.5">
                        {activos.length} activos · {cancelados.length} cancelados
                    </p>
                </div>
                <BotonAccion
                    id="btn-nuevo-compromiso"
                    variante="primary"
                    icono={<Plus size={16} />}
                    onClick={() => setModalOpen(true)}
                >
                    Nuevo compromiso
                </BotonAccion>
            </div>

            {/* Lista activos */}
            {activos.length > 0 ? (
                <section className="space-y-2">
                    {activos.map((c) => (
                        <CommitmentCard key={c.id} compromiso={c} />
                    ))}
                </section>
            ) : (
                <div className="flex flex-col items-center py-12 text-gray-500 gap-2">
                    <p className="text-sm">Sin compromisos activos</p>
                </div>
            )}

            {/* Cancelados (colapsados) */}
            {cancelados.length > 0 && (
                <details className="group">
                    <summary className="text-xs text-gray-600 hover:text-gray-400 cursor-pointer select-none font-medium">
                        Cancelados ({cancelados.length})
                    </summary>
                    <div className="space-y-2 mt-2">
                        {cancelados.map((c) => (
                            <CommitmentCard key={c.id} compromiso={c} />
                        ))}
                    </div>
                </details>
            )}

            {/* Modal nuevo compromiso */}
            <ModalContainer
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                titulo="Agendar compromiso"
            >
                <TimeSlotValidator />
            </ModalContainer>
        </div>
    );
}
