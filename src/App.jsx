import { useState } from 'react';
import { Bot, Droplets, Grape, Map, Plane } from 'lucide-react';
import OverviewMap from './components/OverviewMap';
import DiseaseAI from './components/DiseaseAI';
import DroneTelemetry from './components/DroneTelemetry';
import IoTSensor from './components/IoTSensor';

const views = {
  overview: { component: OverviewMap, title: 'Visão Geral', icon: Map },
  disease: { component: DiseaseAI, title: 'Diagnóstico Visual', icon: Bot },
  drone: { component: DroneTelemetry, title: 'Imagens Aéreas', icon: Plane },
  iot: { component: IoTSensor, title: 'Sensores no Terreno', icon: Droplets },
};

export default function App() {
  const [activeView, setActiveView] = useState('overview');

  const CurrentView = views[activeView];
  const ViewComponent = CurrentView.component;

  return (
    <div className="h-svh w-full overflow-hidden bg-stone-50 text-stone-900">
      <div className="flex h-full flex-col">
        <header className="border-b border-stone-200/80 bg-white/90 px-4 py-4 backdrop-blur sm:px-5 md:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                <Grape size={20} />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-stone-800">VitiBrain</h1>
                <p className="text-xs text-stone-500">Plataforma de gestão agrícola para vinhas</p>
              </div>
            </div>

            <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
              {Object.entries(views).map(([key, view]) => {
                const isActive = activeView === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveView(key)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition md:px-4 ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    <view.icon size={16} />
                    {view.title}
                  </button>
                );
              })}
            </nav>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-5 md:p-8">
          <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-4 md:gap-5">
            <h2 className="text-lg font-semibold text-stone-800 sm:text-xl">{CurrentView.title}</h2>
            <section className="min-h-0 flex-1">
              <ViewComponent />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
