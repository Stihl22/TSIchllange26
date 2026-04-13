import { useEffect, useState } from 'react';
import { Bell, MapPinned } from 'lucide-react';

export default function OverviewMap() {
  const [isLoading, setIsLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);

      // Integrar aqui: fetch('/api/alerts/recent').then(...)
      setAlerts([]);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-500 shadow-sm">
        A carregar dados do terreno...
      </div>
    );
  }

  return (
    <div className="grid h-full grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex min-h-[430px] flex-col items-center justify-center rounded-2xl bg-stone-100 text-center">
          <div className="mb-4 rounded-full bg-white p-4 text-emerald-600 shadow-sm">
            <MapPinned size={34} />
          </div>
          <h3 className="text-lg font-semibold text-stone-700">Mapa da vinha</h3>
          <p className="mt-2 max-w-sm text-sm text-stone-500">
            Espaço reservado para o mapa interativo. Podes integrar `react-leaflet` ou `iframe` nesta área.
          </p>
        </div>
      </section>

      <aside className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Bell size={16} className="text-emerald-600" />
          <h4 className="text-sm font-semibold text-stone-700">Avisos Recentes</h4>
        </div>

        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="rounded-xl bg-stone-100 p-4 text-sm text-stone-500">
              Sem avisos recentes de momento.
            </div>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className="rounded-xl bg-stone-100 p-4 text-sm text-stone-600">
                {alert.message}
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}
