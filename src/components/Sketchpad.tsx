import React, { useRef, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  PenTool,
  Paintbrush,
  Eraser,
  RotateCcw,
  Download,
  Sparkles,
  Highlighter,
  Trash2,
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

type ToolType = 'pencil' | 'watercolor' | 'pen' | 'marker' | 'paw' | 'eraser';

interface ColorOption {
  name: string;
  hex: string;
}

const PALETTE: ColorOption[] = [
  { name: 'Charcoal', hex: '#262422' },
  { name: 'Burnt Sienna', hex: '#9A3412' },
  { name: 'Warm Amber', hex: '#D97706' },
  { name: 'Rose Red', hex: '#E11D48' },
  { name: 'Ultramarine', hex: '#2563EB' },
  { name: 'Viridian Green', hex: '#059669' },
  { name: 'Lavender', hex: '#8B5CF6' },
  { name: 'Blush Pink', hex: '#F472B6' },
];

export const Sketchpad: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedTool, setSelectedTool] = useState<ToolType>('watercolor');
  const [selectedColor, setSelectedColor] = useState<string>('#9A3412');
  const [brushSize, setBrushSize] = useState<number>(14);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);

  const initBlankCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FAF7F2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Warm card border
    ctx.save();
    ctx.strokeStyle = '#E0D4C3';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Friendly greeting note on canvas
    ctx.font = '28px Caveat, cursive';
    ctx.fillStyle = '#8C7E6C';
    ctx.textAlign = 'left';
    ctx.fillText('Happy Birthday RB! ✨ Draw, paint & stamp paws here', 40, 60);

    // Starting paws
    drawPawPrint(ctx, 45, 95, '#F59E0B', 0.6);
    drawPawPrint(ctx, 80, 105, '#EC4899', 0.6);
    drawPawPrint(ctx, 115, 95, '#3B82F6', 0.6);

    ctx.restore();

    const initialData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([initialData]);
  }, []);

  useEffect(() => {
    initBlankCanvas();
  }, [initBlankCanvas]);

  const drawPawPrint = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    scale: number = 1
  ) => {
    ctx.save();
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.ellipse(x, y + 4 * scale, 12 * scale, 9 * scale, 0, 0, Math.PI * 2);
    ctx.fill();

    const toes = [
      { dx: -11 * scale, dy: -9 * scale, rx: 4 * scale, ry: 6 * scale, angle: -0.3 },
      { dx: -4 * scale, dy: -13 * scale, rx: 4.5 * scale, ry: 6.5 * scale, angle: -0.1 },
      { dx: 4 * scale, dy: -13 * scale, rx: 4.5 * scale, ry: 6.5 * scale, angle: 0.1 },
      { dx: 11 * scale, dy: -9 * scale, rx: 4 * scale, ry: 6.5 * scale, angle: 0.3 },
    ];

    toes.forEach((t) => {
      ctx.beginPath();
      ctx.ellipse(x + t.dx, y + t.dy, t.rx, t.ry, t.angle, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e);
    setIsDrawing(true);
    setLastPoint(coords);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (selectedTool === 'paw') {
      soundEngine.playMeow();
      drawPawPrint(ctx, coords.x, coords.y, selectedColor, brushSize / 14);
    } else {
      soundEngine.playNote(300, 0.05, 'triangle', 0.03);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCanvasCoords(e);
    if (!lastPoint) {
      setLastPoint(coords);
      return;
    }

    ctx.save();

    if (selectedTool === 'paw') {
      const dist = Math.hypot(coords.x - lastPoint.x, coords.y - lastPoint.y);
      if (dist > 35) {
        drawPawPrint(ctx, coords.x, coords.y, selectedColor, brushSize / 14);
        setLastPoint(coords);
      }
      ctx.restore();
      return;
    }

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(coords.x, coords.y);

    if (selectedTool === 'pencil') {
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = Math.max(1, brushSize * 0.25);
      ctx.lineCap = 'round';
      ctx.globalAlpha = 0.85;
      ctx.stroke();
    } else if (selectedTool === 'watercolor') {
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize * 1.8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = 0.18;
      ctx.stroke();
    } else if (selectedTool === 'pen') {
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = Math.max(1.5, brushSize * 0.4);
      ctx.lineCap = 'round';
      ctx.globalAlpha = 0.95;
      ctx.stroke();
    } else if (selectedTool === 'marker') {
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize * 1.4;
      ctx.lineCap = 'square';
      ctx.globalAlpha = 0.6;
      ctx.stroke();
    } else if (selectedTool === 'eraser') {
      ctx.strokeStyle = '#FAF7F2';
      ctx.lineWidth = brushSize * 2.2;
      ctx.lineCap = 'round';
      ctx.globalAlpha = 1.0;
      ctx.stroke();
    }

    ctx.restore();
    setLastPoint(coords);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setLastPoint(null);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setHistory((prev) => [...prev.slice(-14), snapshot]);
      }
    }
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    soundEngine.playNote(350, 0.1);
    const newHistory = [...history];
    newHistory.pop();
    const previous = newHistory[newHistory.length - 1];

    const canvas = canvasRef.current;
    if (canvas && previous) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.putImageData(previous, 0, 0);
        setHistory(newHistory);
      }
    }
  };

  const handleClear = () => {
    soundEngine.playBlow();
    initBlankCanvas();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    soundEngine.playPop();
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.7 },
      });
    } catch {
      // safe fallback
    }

    const link = document.createElement('a');
    link.download = `Birthday_Doodle_for_RB_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <section id="sketchpad" className="py-14 md:py-20 bg-[#F2ECE1] border-b border-[#E3D9C9] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pure Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <span className="font-handwriting text-2xl sm:text-3xl text-amber-800 block">
            Drawing Materials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2A26] font-display">
            RB's Birthday Sketchpad
          </h2>
          <p className="text-sm sm:text-base text-[#6B6358]">
            Pick a drawing tool, choose a watercolor shade, stamp cat paws, and doodle for RB!
          </p>
        </div>

        {/* Workspace */}
        <div className="bg-[#FAF7F2] rounded-3xl p-4 sm:p-6 border border-[#E3D9C9] shadow-md grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Tools & Palette */}
          <div className="lg:col-span-3 space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-amber-900 block">
                Drawing Tools
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedTool('pencil')}
                  className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    selectedTool === 'pencil'
                      ? 'bg-amber-100 text-amber-950 border-amber-400'
                      : 'bg-white text-stone-700 border-stone-200'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Pencil</span>
                </button>

                <button
                  onClick={() => setSelectedTool('watercolor')}
                  className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    selectedTool === 'watercolor'
                      ? 'bg-amber-100 text-amber-950 border-amber-400'
                      : 'bg-white text-stone-700 border-stone-200'
                  }`}
                >
                  <Paintbrush className="w-3.5 h-3.5 text-amber-700" />
                  <span>Watercolor</span>
                </button>

                <button
                  onClick={() => setSelectedTool('pen')}
                  className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    selectedTool === 'pen'
                      ? 'bg-amber-100 text-amber-950 border-amber-400'
                      : 'bg-white text-stone-700 border-stone-200'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Ink Pen</span>
                </button>

                <button
                  onClick={() => setSelectedTool('marker')}
                  className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    selectedTool === 'marker'
                      ? 'bg-amber-100 text-amber-950 border-amber-400'
                      : 'bg-white text-stone-700 border-stone-200'
                  }`}
                >
                  <Highlighter className="w-3.5 h-3.5 text-rose-600" />
                  <span>Marker</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedTool('paw');
                    soundEngine.playMeow();
                  }}
                  className={`col-span-2 flex items-center justify-center gap-2 p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedTool === 'paw'
                      ? 'bg-amber-500 text-white border-amber-600'
                      : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <span>🐾 Stamp Cat Paws</span>
                </button>

                <button
                  onClick={() => setSelectedTool('eraser')}
                  className={`col-span-2 flex items-center justify-center gap-1.5 p-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    selectedTool === 'eraser'
                      ? 'bg-stone-200 text-stone-900 border-stone-400'
                      : 'bg-white text-stone-600 border-stone-200'
                  }`}
                >
                  <Eraser className="w-3.5 h-3.5" />
                  <span>Eraser</span>
                </button>
              </div>
            </div>

            {/* Pigment Pans */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-amber-900 block">
                Watercolor Pigments
              </span>
              <div className="grid grid-cols-4 gap-2">
                {PALETTE.map((color) => {
                  const isSelected = selectedColor === color.hex;
                  return (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color.hex)}
                      title={color.name}
                      style={{ backgroundColor: color.hex }}
                      className={`w-8 h-8 rounded-lg border shadow-xs transition-transform cursor-pointer ${
                        isSelected
                          ? 'scale-110 ring-2 ring-stone-900 ring-offset-2'
                          : 'hover:scale-105 border-stone-300'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Brush Width */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-[#6B6358]">
                <span>Width</span>
                <span className="font-mono">{brushSize}px</span>
              </div>
              <input
                type="range"
                min="2"
                max="32"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full accent-amber-700 cursor-pointer"
              />
            </div>

            {/* Undo / Clear */}
            <div className="pt-2 border-t border-[#E8DEC0] flex items-center justify-between gap-2">
              <button
                onClick={handleUndo}
                disabled={history.length <= 1}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg disabled:opacity-40 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Undo</span>
              </button>

              <button
                onClick={handleClear}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-rose-700 bg-white hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-9 flex flex-col items-center">
            <div className="w-full relative rounded-2xl overflow-hidden shadow-md border-2 border-[#D8C7B0] bg-[#FAF7F2] touch-none">
              <canvas
                ref={canvasRef}
                width={760}
                height={480}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-auto max-h-[480px] cursor-crosshair block"
              />
            </div>

            <div className="mt-4 w-full flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  const canvas = canvasRef.current;
                  if (!canvas) return;
                  const ctx = canvas.getContext('2d');
                  if (!ctx) return;
                  soundEngine.playMeow();
                  drawPawPrint(ctx, Math.random() * (canvas.width - 80) + 40, Math.random() * (canvas.height - 80) + 40, selectedColor, 1);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Add Cute Paw</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#2D2A26] hover:bg-[#433E37] rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Artwork (PNG)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
