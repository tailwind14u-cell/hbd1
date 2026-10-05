import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

interface FooterProps {
  onTriggerConfetti: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTriggerConfetti }) => {
  const handleFinalCheer = () => {
    soundEngine.playPop();
    soundEngine.playMeow();
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.85 },
      });
    } catch {
      // safe fallback
    }
    onTriggerConfetti();
  };

  return (
    <footer className="bg-[#FAF7F2] border-t border-[#E8DEC0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-display font-bold text-lg text-[#2D2A26]">
              Studio RB · Birthday Celebration 2026
            </div>
            <p className="text-xs text-[#7D756C]">
              Created with watercolor swatches, cotton sketchbooks, and endless cat purrs for RB.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleFinalCheer}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-amber-950 bg-amber-200/80 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Send Extra Birthday Cheer to RB</span>
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#EFE8DD] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C847A]">
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for RB’s special day · May all your art dreams come true!</span>
          </div>
          <div>🐾 Dedicated to all artists & cat companions</div>
        </div>
      </div>
    </footer>
  );
};
