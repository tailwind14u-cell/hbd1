import React, { useState } from 'react';
import { Sparkles, Palette, Flame, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audio';

import heroCatImg from '../assets/images/hero_cat_artist_rb_1791163589161.jpg';

interface HeroProps {
  onTriggerConfetti: () => void;
  onScrollTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onTriggerConfetti, onScrollTo }) => {
  const [purrCount, setPurrCount] = useState(1);
  const [purredJustNow, setPurredJustNow] = useState(false);

  const handlePetHeroCat = () => {
    soundEngine.playMeow();
    soundEngine.playPurr();
    setPurrCount((c) => c + 1);
    setPurredJustNow(true);
    setTimeout(() => setPurredJustNow(false), 1200);
    onTriggerConfetti();
  };

  return (
    <section id="greeting" className="relative pt-6 pb-14 md:pt-10 md:pb-20 overflow-hidden">
      {/* Decorative ambient watercolor glow */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Pure Message Letter Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="font-handwriting text-2xl sm:text-3xl text-amber-800 block">
                Happy Birthday with all our love...
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#2D2A26] font-display">
                Dear <span className="text-amber-800 underline decoration-amber-400/60 decoration-wavy underline-offset-8">RB</span>
              </h1>
            </div>

            {/* Pure, Heartfelt Birthday Message */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#FAF7F2] border border-[#E6DDD0] shadow-xs space-y-4">
              <p className="text-base sm:text-lg text-[#3D372E] leading-relaxed font-sans">
                May your special day be surrounded by laughter, warm sunshine, and sweet memories. May this new year bring you overflowing peace, radiant joy, and the fulfillment of every good desire in your heart.
              </p>
              <p className="text-base sm:text-lg text-[#3D372E] leading-relaxed font-sans">
                Like pure colors coming together on fresh paper, may every day ahead be filled with creative strokes of happiness, cozy cuddles from loving cats, and the enduring grace of God over all that you do.
              </p>
              <div className="pt-2 border-t border-[#EAE0D2] flex items-center justify-between">
                <span className="font-handwriting text-xl text-amber-900 font-bold">
                  Wishing you the happiest birthday, RB! 🎂🐾🎨
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onScrollTo('cake')}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#FAF7F2] bg-[#2D2A26] hover:bg-[#433E37] rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Blow Birthday Candles</span>
              </button>

              <button
                onClick={() => onScrollTo('scripture')}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition-colors cursor-pointer"
              >
                <span>📖 Read Bible Blessing</span>
              </button>

              <button
                onClick={() => onScrollTo('sketchpad')}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#2D2A26] bg-white hover:bg-stone-50 border border-stone-300 rounded-xl transition-colors cursor-pointer"
              >
                <Palette className="w-4 h-4 text-amber-700" />
                <span>Open Sketchbook</span>
              </button>

              <button
                onClick={handlePetHeroCat}
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-rose-900 bg-rose-100/70 hover:bg-rose-200 border border-rose-200 rounded-xl transition-colors cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${purredJustNow ? 'text-rose-600 scale-125' : 'text-rose-500'} transition-transform`} />
                <span>Pet Cat ({purrCount})</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Cat Artist Illustration */}
          <div className="lg:col-span-5">
            <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-xl shadow-stone-200/60 border border-[#E5DDD2] transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-amber-50">
                <img
                  src={heroCatImg}
                  alt="Cute fluffy cat artist painting birthday banner for RB"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={handlePetHeroCat}
                  className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-[#2D2A26] shadow-md border border-stone-200 hover:scale-105 transition-transform flex items-center gap-1.5 cursor-pointer"
                >
                  <span>🐾 Tap to Pet Cat</span>
                </button>
              </div>

              <div className="pt-4 text-center">
                <div className="font-handwriting text-2xl text-[#2D2A26] font-bold">
                  "Painting this birthday banner for RB!"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
