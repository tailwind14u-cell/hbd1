import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Wind } from 'lucide-react';
import { soundEngine } from '../utils/audio';

const BIRTHDAY_WISHES_RB = [
  'May every blank page bring you peace, joy, and fearless creative inspiration.',
  'May your home and studio always be warmed by soft purrs, gentle laughter, and loving companions.',
  'May your colors stay luminous and bright, painting beautiful days ahead.',
  'Wishing you good health, strength, and God’s grace in every step you take.',
  'May the coming year be your happiest, kindest, and most blessed chapter yet!',
];

export const CakeCeremony: React.FC = () => {
  const [candles, setCandles] = useState<boolean[]>([true, true, true, true, true]);
  const [allBlown, setAllBlown] = useState<boolean>(false);

  const handleBlowCandle = (index: number) => {
    if (!candles[index]) return;

    soundEngine.playBlow();
    const updated = [...candles];
    updated[index] = false;
    setCandles(updated);

    const remaining = updated.filter(Boolean).length;
    if (remaining === 0) {
      triggerCakeCelebration();
    } else {
      soundEngine.playNote(400 + (5 - remaining) * 70, 0.25);
    }
  };

  const handleBlowAll = () => {
    soundEngine.playBlow();
    setCandles([false, false, false, false, false]);
    triggerCakeCelebration();
  };

  const triggerCakeCelebration = () => {
    setAllBlown(true);
    soundEngine.playPop();
    soundEngine.playMeow();

    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleRelight = () => {
    soundEngine.playNote(523.25, 0.3);
    setCandles([true, true, true, true, true]);
    setAllBlown(false);
  };

  return (
    <section id="cake" className="py-14 md:py-20 bg-[#F5EFE6]/60 border-y border-[#E8DEC0]/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pure Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="font-handwriting text-2xl sm:text-3xl text-amber-800 block">
            Make a Birthday Wish
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2A26] font-display">
            Birthday Cake for RB
          </h2>
          <p className="text-sm sm:text-base text-[#6B6358]">
            Click the candles to blow them out and make your heart's wish!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Cake Display */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-72 sm:w-88 flex flex-col items-center pt-16 pb-4 select-none">
              {/* Candles Row */}
              <div className="absolute top-0 flex items-end justify-center gap-5 sm:gap-7 z-20">
                {candles.map((isLit, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleBlowCandle(idx)}
                    className="group flex flex-col items-center focus:outline-none cursor-pointer"
                    title={isLit ? `Blow out candle #${idx + 1}` : 'Candle blown out!'}
                  >
                    {/* Flame or Smoke */}
                    <div className="h-9 flex items-center justify-center relative">
                      {isLit ? (
                        <div className="relative">
                          <div className="w-4 h-6 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 rounded-full animate-bounce shadow-md shadow-amber-300/80 group-hover:scale-125 transition-transform" />
                          <div className="absolute top-1 left-1.5 w-1 h-2 bg-white/80 rounded-full blur-[0.5px]" />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <span className="w-1.5 h-1.5 bg-stone-400/80 rounded-full animate-ping" />
                          <span className="w-0.5 h-3 bg-stone-400/60 rounded-full -mt-1" />
                        </div>
                      )}
                    </div>

                    <div className="w-0.5 h-2 bg-stone-700" />

                    {/* Striped candle */}
                    <div
                      className={`w-3.5 sm:w-4 h-12 rounded-t-sm shadow-xs ${
                        idx === 0
                          ? 'bg-rose-400'
                          : idx === 1
                          ? 'bg-sky-400'
                          : idx === 2
                          ? 'bg-amber-400'
                          : idx === 3
                          ? 'bg-emerald-400'
                          : 'bg-purple-400'
                      } border-x border-t border-black/10`}
                    />
                  </button>
                ))}
              </div>

              {/* Cake Top Tier */}
              <div className="relative w-44 sm:w-52 h-16 bg-[#FFF9F2] rounded-t-2xl border-2 border-[#E3D6C5] shadow-md flex items-center justify-center z-10">
                <div className="absolute -top-2 left-0 right-0 flex justify-around px-3">
                  <span className="text-xs">🍓</span>
                  <span className="text-xs">🐾</span>
                  <span className="text-xs">🍒</span>
                  <span className="text-xs">🐾</span>
                  <span className="text-xs">🍓</span>
                </div>
                <div className="w-full flex justify-around px-2">
                  <span className="font-handwriting text-base font-bold text-amber-800">
                    Happy Birthday
                  </span>
                </div>
              </div>

              {/* Cake Middle Tier */}
              <div className="relative w-58 sm:w-68 h-20 bg-[#FCECD8] rounded-t-xl border-2 border-[#DFCDB9] shadow-md flex items-center justify-center -mt-1 z-5">
                <div className="text-center pt-2">
                  <span className="font-display font-extrabold text-2xl text-amber-900 tracking-wider">
                    ★ RB ★
                  </span>
                </div>
              </div>

              {/* Cake Bottom Tier */}
              <div className="relative w-68 sm:w-80 h-22 bg-[#F9E5C9] rounded-t-xl border-2 border-[#DFC4A6] shadow-lg flex items-center justify-between px-5 -mt-1">
                <div className="text-sm">🎨</div>
                <div className="flex gap-1.5 items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400/80 inline-block" />
                </div>
                <div className="text-sm">🐱</div>
              </div>

              {/* Platter */}
              <div className="w-76 sm:w-92 h-5 bg-[#ECE3D4] rounded-full border-2 border-[#D6CBB8] shadow-md -mt-1" />
              <div className="w-24 sm:w-32 h-6 bg-[#DFD5C2] border-x-2 border-b-2 border-[#D6CBB8] rounded-b-md" />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 mt-6">
              {!allBlown ? (
                <button
                  onClick={handleBlowAll}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#FAF7F2] bg-amber-800 hover:bg-amber-900 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Wind className="w-4 h-4" />
                  <span>Blow Candles & Make a Wish</span>
                </button>
              ) : (
                <button
                  onClick={handleRelight}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#2D2A26] bg-white hover:bg-stone-50 border border-stone-300 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-amber-700" />
                  <span>Relight Candles</span>
                </button>
              )}

              <button
                onClick={triggerCakeCelebration}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-amber-900 bg-amber-200/80 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Cheer for RB</span>
              </button>
            </div>
          </div>

          {/* Birthday Wishes for RB */}
          <div className="lg:col-span-6 space-y-3">
            <h3 className="text-xl font-bold font-display text-[#2D2A26] mb-4">
              Wishes for RB's New Year
            </h3>

            {BIRTHDAY_WISHES_RB.map((wish, index) => {
              const isBlown = !candles[index];
              return (
                <div
                  key={index}
                  onClick={() => handleBlowCandle(index)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isBlown
                      ? 'bg-white border-amber-300 shadow-xs'
                      : 'bg-[#EDE4D6]/50 border-dashed border-[#D6CBB8]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl shrink-0">{isBlown ? '✨' : '🕯️'}</span>
                    <p className="text-sm text-[#433D35] leading-relaxed">
                      {wish}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
