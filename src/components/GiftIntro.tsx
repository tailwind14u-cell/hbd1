import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface GiftIntroProps {
  onOpen: () => void;
}

export const GiftIntro: React.FC<GiftIntroProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenCard = () => {
    if (isOpening) return;
    setIsOpening(true);

    soundEngine.playPop();
    soundEngine.playMeow();
    soundEngine.playNote(523.25, 0.4, 'sine', 0.25);

    try {
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'],
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      onOpen();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] paper-texture flex flex-col items-center justify-center p-4 sm:p-6 select-none relative overflow-hidden">
      {/* Decorative ambient watercolor glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Sealed Greeting Envelope */}
      <div
        onClick={handleOpenCard}
        className={`w-full max-w-lg bg-[#FFFDF9] rounded-3xl p-8 sm:p-12 border border-[#E3D7C5] shadow-2xl shadow-stone-300/60 relative cursor-pointer group transition-all duration-500 transform ${
          isOpening ? 'scale-105 opacity-0 -translate-y-8' : 'hover:-translate-y-1 hover:shadow-amber-900/10'
        }`}
      >
        {/* Washi tape decoration */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-amber-200/70 rotate-[-1deg] border-dashed border-white/60 shadow-xs" />

        {/* Top greeting note */}
        <div className="text-center pt-2 pb-6">
          <span className="font-handwriting text-2xl text-amber-800 block">
            A special birthday message for you
          </span>
          <div className="text-4xl sm:text-5xl font-bold font-display text-[#2D2A26] mt-1 tracking-tight">
            Dear RB
          </div>
        </div>

        {/* Card front preview box */}
        <div className="text-center py-7 px-6 bg-[#FAF7F2] rounded-2xl border border-[#EAE0D2] mb-8 space-y-3">
          <div className="flex justify-center items-center gap-3 text-2xl mb-1">
            <span>🎂</span>
            <span>🐱</span>
            <span>📖</span>
          </div>
          <p className="font-handwriting text-xl sm:text-2xl text-[#3D372E] leading-relaxed italic">
            “The LORD bless thee, and keep thee: The LORD make his face shine upon thee, and be gracious unto thee.”
          </p>
        </div>

        {/* Wax Seal & Tap prompt */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-700 via-amber-600 to-amber-500 shadow-md flex items-center justify-center text-white border-2 border-amber-300 group-hover:scale-110 transition-transform">
            <span className="text-2xl">🐾</span>
          </div>

          <div className="text-center space-y-1">
            <div className="text-base font-bold text-[#2D2A26] flex items-center justify-center gap-1.5 group-hover:text-amber-800 transition-colors">
              <span>Tap to Open Birthday Card</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
