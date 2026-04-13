import { useEffect, useMemo, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Droplets } from 'lucide-react';

export default function IoTSensor() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentHumidity, setCurrentHumidity] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);

      // Integrar aqui: fetch('/api/iot/humidity') ou stream WebSocket do Arduino
      setData([]);
      setCurrentHumidity(null);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  const status = useMemo(() => {
    if (currentHumidity == null) return 'A aguardar leitura';
    return currentHumidity <= 35 ? 'Seco' : 'Estável';
  }, [currentHumidity]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-500 shadow-sm">
        A conectar aos sensores...
      </div>
    );
  }

  return (
    <div className="grid h-full grid-cols-1 gap-6">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-stone-500">Humidade Atual</p>
        <h3 className="mt-2 text-2xl font-semibold text-stone-800">
          {currentHumidity == null ? '--' : `${currentHumidity}%`}
        </h3>
        <p className="mt-1 text-sm text-stone-500">{status}</p>
      </div>

      <div className="min-h-[420px] rounded-2xl border border-stone-200 bg-white p-5 shadow-sm md:p-7">
        <div className="mb-6 flex items-center gap-2">
          <Droplets size={18} className="text-emerald-700" />
          <h4 className="text-sm font-semibold text-stone-700">Monitorização do solo</h4>
        </div>

        {data.length === 0 ? (
          <div className="flex h-[330px] items-center justify-center rounded-xl bg-stone-100 text-sm text-stone-500">
            A aguardar dados do Arduino para iniciar o gráfico.
          </div>
        ) : (
          <div className="h-[330px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 12, left: -12, bottom: 6 }}>
                <XAxis
                  dataKey="time"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'Tempo (min)', position: 'insideBottom', offset: -4, fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'Nível de Humidade', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: '1px solid #d6dbd8', fontSize: 12 }}
                  formatter={(value) => [`${value}%`, 'Humidade']}
                />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#059669"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5, fill: '#059669' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
