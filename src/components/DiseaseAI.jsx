import { useRef, useState } from 'react';
import { FileUp, Microscope } from 'lucide-react';

export default function DiseaseAI() {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imageName, setImageName] = useState('');
  const [result, setResult] = useState(null);

  const handleFile = (file) => {
    if (!file) return;

    setImageName(file.name);
    setIsAnalyzing(true);
    setResult(null);

    // Integrar aqui: fetch('/api/diagnosis', { method: 'POST', body: formData })
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        status: 'Processado',
        diagnosis: 'Possível presença de fungo foliar',
        guidance: 'Recomendamos validação no campo e tratamento localizado.',
      });
    }, 1400);
  };

  return (
    <div className="grid h-full grid-cols-1 gap-6">
      <section
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFile(event.dataTransfer.files[0]);
        }}
        className={`cursor-pointer rounded-2xl border-2 border-dashed bg-white p-10 transition ${
          isDragging ? 'border-emerald-500 bg-emerald-50/50' : 'border-stone-300'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
        <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-full bg-emerald-50 p-4 text-emerald-600">
            <FileUp size={32} />
          </div>
          <h3 className="text-lg font-semibold text-stone-700">Arraste uma fotografia da folha aqui para analisar</h3>
          <p className="mt-2 text-sm text-stone-500">Clique também funciona para selecionar a imagem no computador.</p>
          {imageName && <p className="mt-3 text-xs text-stone-500">Imagem selecionada: {imageName}</p>}
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Microscope size={16} className="text-emerald-600" />
          <h4 className="text-sm font-semibold text-stone-700">Resultados da análise</h4>
        </div>

        {isAnalyzing && <p className="text-sm text-stone-500">A analisar imagem...</p>}

        {!isAnalyzing && !result && (
          <p className="text-sm text-stone-500">Carregue uma imagem para visualizar o diagnóstico.</p>
        )}

        {!isAnalyzing && result && (
          <div className="rounded-xl bg-stone-100 p-4 text-sm text-stone-700">
            <p><span className="font-semibold">Estado:</span> {result.status}</p>
            <p><span className="font-semibold">Diagnóstico:</span> {result.diagnosis}</p>
            <p><span className="font-semibold">Recomendação:</span> {result.guidance}</p>
          </div>
        )}
      </section>
    </div>
  );
}
