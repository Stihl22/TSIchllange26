import { useState } from 'react';
import { Pause, Play, Radar } from 'lucide-react';

function VideoPanel({ title }) {
  return (
    <div className="space-y-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold tracking-wide text-stone-700">{title}</p>
      <div className="aspect-video rounded-2xl bg-stone-100">
        <div className="flex h-full items-center justify-center text-stone-400">
          <div className="rounded-full bg-white p-4 shadow-sm">
            <Radar size={28} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DroneTelemetry() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="grid h-full grid-cols-1 gap-6 rounded-2xl border border-stone-200 bg-stone-50 p-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <VideoPanel title="Câmara Normal" />
        <VideoPanel title="Filtro Térmico" />
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-stone-200 pt-4">
        <button
          onClick={() => setIsPlaying((value) => !value)}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
}
