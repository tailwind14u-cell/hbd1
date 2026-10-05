import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, Sparkles, Music, Share2, Mail, Check } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface NavbarProps {
  onTriggerConfetti: () => void;
  onResetToEnvelope: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTriggerConfetti, onResetToEnvelope }) => {
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());
  const [isPlayingTune, setIsPlayingTune] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleToggleSound = () => {
    const nextMuted = soundEngine.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      soundEngine.playMeow();
    }
  };

  const handlePlayBirthdaySong = () => {
    if (isPlayingTune) return;
    setIsPlayingTune(true);
    soundEngine.playBirthdayMelody(() => {
      setIsPlayingTune(false);
    });
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.1 },
        colors: ['#F59E0B', '#EC4899', '#3B82F6', '#10B981', '#8B5CF6'],
      });
    } catch {
      // fallback
    }
  };

  const handleCopyShareLink = () => {
    soundEngine.playPop();
    const url = window.location.origin + window.location.pathname;
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2200);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7DFD5] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <a
          href="#top"
          className="text-lg font-bold tracking-tight text-[#2D2A26] font-display hover:text-amber-800 transition-colors whitespace-nowrap"
        >
          Happy Birthday RB 🎂🐾
        </a>

        {/* Zone 2: Navigation links without categories */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#6B655D]">
          <a href="#greeting" className="hover:text-[#2D2A26] transition-colors">
            Message
          </a>
          <a href="#scripture" className="hover:text-[#2D2A26] transition-colors font-semibold text-amber-900">
            Bible Blessing
          </a>
          <a href="#cake" className="hover:text-[#2D2A26] transition-colors">
            Birthday Cake
          </a>
          <a href="#cats" className="hover:text-[#2D2A26] transition-colors">
            Cats
          </a>
          <a href="#sketchpad" className="hover:text-[#2D2A26] transition-colors">
            Drawing
          </a>
          <a href="#wishes" className="hover:text-[#2D2A26] transition-colors">
            Wishes
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onResetToEnvelope}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            title="View the sealed envelope"
          >
            <Mail className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">Envelope</span>
          </button>

          <button
            onClick={handleCopyShareLink}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            title="Copy link to send to RB"
          >
            {linkCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-emerald-800 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-amber-800" />
                <span className="hidden sm:inline">Share Link</span>
              </>
            )}
          </button>

          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            className="p-2 text-[#6B655D] hover:text-[#2D2A26] hover:bg-[#EFE8DD] rounded-lg transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-700" />}
          </button>

          <button
            onClick={handlePlayBirthdaySong}
            disabled={isPlayingTune}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              isPlayingTune
                ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                : 'bg-[#2D2A26] text-[#FAF7F2] hover:bg-[#433E37]'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isPlayingTune ? 'Playing...' : 'Tune'}</span>
          </button>

          <button
            onClick={onTriggerConfetti}
            className="p-2 text-amber-900 bg-amber-200/80 hover:bg-amber-300 border border-amber-300/80 rounded-lg transition-colors cursor-pointer"
            title="Confetti"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
