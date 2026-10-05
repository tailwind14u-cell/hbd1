import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Music, Volume2, VolumeX, Share2, Check, RotateCcw, Wind } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface BirthdayCardProps {
  onReopenEnvelope: () => void;
}

export const BirthdayCard: React.FC<BirthdayCardProps> = ({ onReopenEnvelope }) => {
  const [candles, setCandles] = useState<boolean[]>([true, true, true]);
  const [allBlown, setAllBlown] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.getMuted());
  const [isPlayingTune, setIsPlayingTune] = useState<boolean>(false);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const [catPetCount, setCatPetCount] = useState<number>(1);
  const [purred, setPurred] = useState<boolean>(false);

  // Candle blowing
  const handleBlowCandle = (idx: number) => {
    if (!candles[idx]) return;
    soundEngine.playBlow();
    const updated = [...candles];
    updated[idx] = false;
    setCandles(updated);

    const remaining = updated.filter(Boolean).length;
    if (remaining === 0) {
      setAllBlown(true);
      soundEngine.playPop();
      soundEngine.playMeow();
      try {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#EC4899'],
        });
      } catch {
        // fallback
      }
    } else {
      soundEngine.playNote(400 + (3 - remaining) * 80, 0.2);
    }
  };

  const handleBlowAll = () => {
    soundEngine.playBlow();
    setCandles([false, false, false]);
    setAllBlown(true);
    soundEngine.playPop();
    soundEngine.playMeow();
    try {
      confetti({
        particleCount: 110,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'],
      });
    } catch {
      // fallback
    }
  };

  const handleRelight = () => {
    soundEngine.playNote(523.25, 0.3);
    setCandles([true, true, true]);
    setAllBlown(false);
  };

  const handlePetCat = () => {
    soundEngine.playMeow();
    soundEngine.playPurr();
    setCatPetCount((c) => c + 1);
    setPurred(true);
    setTimeout(() => setPurred(false), 1200);
  };

  const handlePlayTune = () => {
    if (isPlayingTune) return;
    setIsPlayingTune(true);
    soundEngine.playBirthdayMelody(() => {
      setIsPlayingTune(false);
    });
  };

  const handleToggleSound = () => {
    const next = soundEngine.toggleMute();
    setIsMuted(next);
    if (!next) soundEngine.playMeow();
  };

  const handleCopyLink = () => {
    soundEngine.playPop();
    const url = window.location.origin + window.location.pathname;
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2200);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] paper-texture py-6 sm:py-10 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Top minimal bar (no choices, no menu tabs) */}
      <div className="w-full max-w-xl flex items-center justify-between mb-4 sm:mb-6">
        <button
          onClick={onReopenEnvelope}
          className="text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white/80 hover:bg-white px-3 py-1.5 rounded-lg border border-stone-200 transition-colors cursor-pointer"
        >
          ✉️ Envelope
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-950 bg-amber-100/90 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors cursor-pointer"
            title="Copy link to send to RB"
          >
            {linkCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-emerald-800 font-semibold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-amber-800" />
                <span>Share Link</span>
              </>
            )}
          </button>

          <button
            onClick={handleToggleSound}
            className="p-1.5 text-stone-600 hover:text-stone-900 bg-white/80 rounded-lg border border-stone-200 transition-colors cursor-pointer"
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-700" />}
          </button>

          <button
            onClick={handlePlayTune}
            disabled={isPlayingTune}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              isPlayingTune
                ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                : 'bg-[#2D2A26] text-white hover:bg-[#433E37]'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>{isPlayingTune ? 'Playing...' : 'Birthday Song'}</span>
          </button>
        </div>
      </div>

      {/* The Pure Birthday Card */}
      <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-10 border border-[#E3D7C5] shadow-xl shadow-amber-900/5 relative">
        {/* Subtle washi tape accent */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-amber-200/70 rotate-[-1deg] border-dashed border-white/60 shadow-xs" />

        {/* Card Header Title */}
        <div className="text-center pt-2 pb-6 space-y-1">
          <span className="font-handwriting text-2xl sm:text-3xl text-amber-800 block">
            Happy Birthday
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-[#2D2A26] tracking-tight">
            RB
          </h1>
        </div>

        {/* Pure Message Replaced with Bible Verse (King James Version - KJV) */}
        <div className="text-center py-7 px-5 sm:px-8 bg-[#FAF7F2] rounded-2xl border border-[#EAE0D2] mb-8 space-y-5">
          <div className="space-y-3">
            <blockquote className="text-xl sm:text-2xl font-display font-medium text-[#2D2A26] leading-relaxed text-balance">
              “The LORD bless thee, and keep thee: The LORD make his face shine upon thee, and be gracious unto thee: The LORD lift up his countenance upon thee, and give thee peace.”
            </blockquote>
            <cite className="block font-semibold text-sm sm:text-base text-amber-900 font-sans not-italic">
              — Numbers 6:24–26 (KJV)
            </cite>
          </div>

          <div className="pt-4 border-t border-[#E8DEC0]/80 space-y-2">
            <blockquote className="text-base sm:text-lg font-display text-[#4A433A] italic leading-relaxed text-balance">
              “Grant thee according to thine own heart, and fulfil all thy counsel.”
            </blockquote>
            <cite className="block font-semibold text-xs sm:text-sm text-amber-900 font-sans not-italic">
              — Psalm 20:4 (KJV)
            </cite>
          </div>
        </div>

        {/* Birthday Cake with Candles (RB can blow out) */}
        <div className="text-center py-6 border-t border-b border-[#EAE0D2] mb-8 space-y-4">
          <span className="font-handwriting text-2xl text-amber-800 block">
            Make a Wish & Blow the Candles
          </span>

          <div className="flex flex-col items-center select-none">
            {/* 3 Candles */}
            <div className="flex items-end justify-center gap-6 z-10 -mb-2">
              {candles.map((isLit, i) => (
                <button
                  key={i}
                  onClick={() => handleBlowCandle(i)}
                  className="flex flex-col items-center cursor-pointer focus:outline-none"
                  title={isLit ? 'Click to blow out' : 'Blown out'}
                >
                  <div className="h-7 flex items-center justify-center">
                    {isLit ? (
                      <div className="w-3.5 h-5 bg-gradient-to-t from-amber-500 to-yellow-200 rounded-full animate-bounce shadow-md shadow-amber-300" />
                    ) : (
                      <span className="w-1 h-3 bg-stone-400 rounded-full" />
                    )}
                  </div>
                  <div className="w-0.5 h-1.5 bg-stone-700" />
                  <div className={`w-3.5 h-8 rounded-t-sm ${i === 0 ? 'bg-rose-400' : i === 1 ? 'bg-amber-400' : 'bg-sky-400'}`} />
                </button>
              ))}
            </div>

            {/* Cake layers */}
            <div className="w-36 h-10 bg-[#FFF9F2] rounded-t-xl border border-[#DFCDB9] flex items-center justify-center shadow-xs">
              <span className="font-handwriting text-xs font-bold text-amber-900">Happy Birthday</span>
            </div>
            <div className="w-48 h-12 bg-[#FCECD8] rounded-t-xl border border-[#DFC4A6] flex items-center justify-center shadow-sm -mt-0.5">
              <span className="font-display font-extrabold text-lg text-amber-950 tracking-wider">★ RB ★</span>
            </div>
            <div className="w-56 h-3 bg-[#E8DEC0] rounded-full border border-[#D6CBB8] shadow-xs -mt-0.5" />
          </div>

          <div className="pt-2">
            {!allBlown ? (
              <button
                onClick={handleBlowAll}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Wind className="w-3.5 h-3.5" />
                <span>Blow All Candles</span>
              </button>
            ) : (
              <button
                onClick={handleRelight}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
                <span>Relight Candles</span>
              </button>
            )}
          </div>
        </div>

        {/* Cats & Petting */}
        <div className="text-center py-4 bg-[#FAF7F2] rounded-2xl border border-[#EAE0D2] mb-6 space-y-3">
          <div className="text-3xl">🐱🐾</div>
          <p className="font-handwriting text-xl text-[#3D372E]">
            "Sending you warm purrs and happiness, RB!"
          </p>
          <button
            onClick={handlePetCat}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <Heart className={`w-3.5 h-3.5 ${purred ? 'fill-rose-600 text-rose-600 scale-125' : 'text-rose-500'} transition-transform`} />
            <span>Pet the Cat ({catPetCount} purrs)</span>
          </button>
        </div>

        {/* Warm closing footer */}
        <div className="pt-4 text-center text-xs text-[#8C847A]">
          With all our love and warmest prayers for you, RB. Happy Birthday! 🎂
        </div>
      </div>
    </div>
  );
};
