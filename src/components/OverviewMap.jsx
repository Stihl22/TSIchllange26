import { useEffect, useState } from 'react';
import { Bell, MapPinned, Wind } from 'lucide-react';

const alertStyles = {
  critical: {
    badge: 'Crítico',
    accent: 'bg-red-500',
    card: 'bg-red-50 border-red-200 text-red-800',
  },
  warning: {
    badge: 'Aviso',
    accent: 'bg-amber-500',
    card: 'bg-amber-50 border-amber-200 text-amber-800',
  },
  infoBlue: {
    badge: 'Informação',
    accent: 'bg-sky-500',
    card: 'bg-sky-50 border-sky-200 text-sky-800',
  },
  infoGreen: {
    badge: 'Informação',
    accent: 'bg-emerald-500',
    card: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  },
};

export default function OverviewMap({ activeAlert, isAlertVisible }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
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
      <section className="space-y-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-stone-100 p-4">
          <div>
            <h3 className="text-base font-semibold text-stone-800 sm:text-lg">
              Dashboard de Gestão - Quinta da Roêda (Douro)
            </h3>
            <p className="mt-1 text-sm text-stone-500">Visão operacional central da exploração</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-stone-600">
            <span className="rounded-lg bg-white px-3 py-1.5 font-medium">32ºC</span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 font-medium">
              <Wind size={14} />
              Vento 15km/h
            </span>
          </div>
        </div>

        <div className="flex min-h-[430px] flex-col items-center justify-center rounded-2xl bg-stone-100 text-center">
          <div className="mb-4 rounded-full bg-white p-4 text-emerald-600 shadow-sm">
            <MapPinned size={34} />
          </div>
          <h3 className="text-lg font-semibold text-stone-700">Área central de mapa</h3>
          <p className="mt-2 max-w-md text-sm text-stone-500">
            [Inserir Imagem Mapa Quinta da Roêda aqui]
          </p>
        </div>
      </section>

      <aside className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Bell size={16} className="text-emerald-600" />
          <h4 className="text-sm font-semibold text-stone-700">Avisos Recentes</h4>
        </div>

        <div
          className={`rounded-xl border p-4 transition-opacity duration-300 ${
            isAlertVisible ? 'opacity-100' : 'opacity-0'
          } ${
            activeAlert ? alertStyles[activeAlert.level].card : 'bg-stone-100 border-stone-200 text-stone-600'
          }`}
        >
          {activeAlert ? (
            <>
              <div className="mb-3 flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${alertStyles[activeAlert.level].accent}`} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  {alertStyles[activeAlert.level].badge}
                </span>
              </div>
              <p className="text-sm leading-relaxed">{activeAlert.message}</p>
            </>
          ) : (
            <p className="text-sm">A aguardar notificações do sistema.</p>
          )}
        </div>
      </aside>
    </div>
  );
}
