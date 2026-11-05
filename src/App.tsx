// src/App.tsx
import { ShellHeader } from './components/layout/ShellHeader';
import { TabNavigation } from './components/layout/TabNavigation';
import { DashboardView } from './views/DashboardView';
import { TareasView } from './views/TareasView';
import { CompromisosView } from './views/CompromisosView';
import { CalendarioView } from './views/CalendarioView';
import { useAgendaStore } from './store/useAgendaStore';

function App() {
  const vistaActiva = useAgendaStore((s) => s.vistaActiva);

  const vistas = {
    dashboard: <DashboardView />,
    tareas: <TareasView />,
    compromisos: <CompromisosView />,
    calendario: <CalendarioView />,
  };

  return (
    <div className="min-h-dvh flex flex-col bg-surface-base">
      {/* Header sticky */}
      <ShellHeader />

      {/* Layout principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (desktop) */}
        <TabNavigation />

        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto pb-[72px] md:pb-0">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
            {vistas[vistaActiva]}
          </div>
        </main>
      </div>

      {/* Bottom nav (mobile) — renderizado dentro de TabNavigation como fixed */}
    </div>
  );
}

export default App;
