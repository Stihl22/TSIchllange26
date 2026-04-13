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

const roedaCenter = { lat: 41.1924, lng: -7.5456 };
const mapPolygon = [
  { lat: 41.1936, lng: -7.548 },
  { lat: 41.1942, lng: -7.5439 },
  { lat: 41.1918, lng: -7.5414 },
  { lat: 41.1901, lng: -7.5442 },
  { lat: 41.1907, lng: -7.5482 },
];

export default function OverviewMap({ activeAlert, isAlertVisible, onSendDrone }) {
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    let isMounted = true;
    const mapElement = document.getElementById('vitibrain-google-map');
    if (!mapElement) return;

    const initializeMap = () => {
      if (!window.google?.maps || !isMounted) return;

      const map = new window.google.maps.Map(mapElement, {
        center: roedaCenter,
        zoom: 15,
        mapTypeId: 'satellite',
      });

      new window.google.maps.Marker({
        position: roedaCenter,
        map,
        title: 'Quinta da Roêda',
      });

      new window.google.maps.Polygon({
        paths: mapPolygon,
        strokeColor: '#10b981',
        strokeOpacity: 0.9,
        strokeWeight: 2,
        fillColor: '#10b981',
        fillOpacity: 0.2,
        map,
      });
    };

    if (window.google?.maps) {
      initializeMap();
      return () => {
        isMounted = false;
      };
    }

    const existingScript = document.querySelector('script[data-map="vitibrain-google-maps"]');
    if (existingScript) {
      existingScript.addEventListener('load', initializeMap);
      existingScript.addEventListener('error', () => setMapError(true));
      return () => {
        isMounted = false;
        existingScript.removeEventListener('load', initializeMap);
      };
    }

    const script = document.createElement('script');
    script.src =
      // Google Maps API Key: AIzaSyB2YzDb8YdUG0a90eYJogkIdyzcCKtk2tE
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyB2YzDb8YdUG0a90eYJogkIdyzcCKtk2tE';
    script.async = true;
    script.defer = true;
    script.dataset.map = 'vitibrain-google-maps';
    script.addEventListener('load', initializeMap);
    script.addEventListener('error', () => setMapError(true));
    document.body.appendChild(script);

    return () => {
      isMounted = false;
      script.removeEventListener('load', initializeMap);
    };
  }, [isLoading]);

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

        <div className="relative min-h-[430px] overflow-hidden rounded-2xl bg-stone-100">
          <div id="vitibrain-google-map" className="h-full min-h-[430px] w-full" />
          {mapError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-100/95 text-center">
              <div className="mb-4 rounded-full bg-white p-4 text-emerald-600 shadow-sm">
                <MapPinned size={34} />
              </div>
              <h3 className="text-lg font-semibold text-stone-700">Google Maps indisponível</h3>
              <p className="mt-2 max-w-md text-sm text-stone-500">
                Verifique a chave da API e a ligação de rede.
              </p>
            </div>
          )}
        </div>
      </section>

      <aside className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Bell size={16} className="text-emerald-600" />
          <h4 className="text-sm font-semibold text-stone-700">Painel de Alertas</h4>
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
              <button
                type="button"
                onClick={onSendDrone}
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-700"
              >
                Mandar o Drone →
              </button>
            </>
          ) : (
            <p className="text-sm">A aguardar notificações do sistema.</p>
          )}
        </div>
      </aside>
    </div>
  );
}
