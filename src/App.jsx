import { useEffect, useRef, useState } from 'react';
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

const alertSimulation = [
  {
    level: 'critical',
    message: 'Aviso: Deteção de Míldio na Parcela Norte.',
    targetView: 'disease',
  },
  {
    level: 'warning',
    message: 'Alerta: Stress Hídrico detetado. Humidade a 15%.',
    targetView: 'iot',
  },
  {
    level: 'critical',
    message: 'Alerta: Risco extremo de escaldão nas uvas.',
    targetView: 'iot',
  },
  {
    level: 'infoBlue',
    message: 'Análise: O voo multiespectral terminou.',
    targetView: 'drone',
  },
  {
    level: 'warning',
    message: 'Aviso: Possível foco de Cigarrinha-Verde.',
    targetView: 'drone',
  },
  {
    level: 'infoGreen',
    message: 'Maturação Ideal Atingida.',
    targetView: 'overview',
  },
];

export default function App() {
  const [activeView, setActiveView] = useState('overview');
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const [isTransmissionOpen, setIsTransmissionOpen] = useState(false);
  const nextAlertTimerRef = useRef(null);

  const CurrentView = views[activeView];
  const ViewComponent = CurrentView.component;
  const activeAlert = alertSimulation[activeAlertIndex];

  useEffect(() => () => {
    if (nextAlertTimerRef.current) {
      clearTimeout(nextAlertTimerRef.current);
    }
  }, []);

  const handleSendDrone = () => {
    if (!activeAlert) return;
    setActiveView(activeAlert.targetView);
    setIsTransmissionOpen(true);
  };

  const handleCloseTransmission = () => {
    setIsTransmissionOpen(false);
    setIsAlertVisible(false);

    if (nextAlertTimerRef.current) {
      clearTimeout(nextAlertTimerRef.current);
    }

    nextAlertTimerRef.current = setTimeout(() => {
      setActiveAlertIndex((previous) => (previous + 1) % alertSimulation.length);
      setIsAlertVisible(true);
    }, 3000);
  };

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
              <ViewComponent
                activeAlert={activeAlert}
                isAlertVisible={isAlertVisible}
                onSendDrone={handleSendDrone}
              />
            </section>
          </div>
        </main>
      </div>

      {isTransmissionOpen && (
        <div className="transmission-overlay">
          <div className="transmission-modal">
            <div className="transmission-header">
              <div className="transmission-live">
                <span className="transmission-live-dot" />
                <p className="transmission-title">LIVE: Câmara do Drone</p>
              </div>
              <button
                type="button"
                onClick={handleCloseTransmission}
                className="transmission-close-icon"
                aria-label="Fechar transmissão"
              >
                X
              </button>
            </div>

            <video
              src="/drone.mp4"
              autoPlay
              loop
              muted
              style={{ width: '100%', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}
            />

            <button
              type="button"
              onClick={handleCloseTransmission}
              className="transmission-close-button"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
