import React, { useState } from 'react';
import { Sparkles, BookmarkCheck } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export interface BibleVerse {
  id: string;
  reference: string;
  text: string;
  blessingNote: string;
}

export const BIRTHDAY_VERSES: BibleVerse[] = [
  {
    id: 'num6',
    reference: 'Numbers 6:24–26',
    text: 'The Lord bless you and keep you; the Lord make His face shine upon you and be gracious to you; the Lord turn His face toward you and give you peace.',
    blessingNote: 'May God’s peace, grace, and guiding light fill your heart, RB, through every single day of this new year.',
  },
  {
    id: 'ps20',
    reference: 'Psalm 20:4',
    text: 'May He give you the desire of your heart and make all your plans succeed.',
    blessingNote: 'Praying that every dream, creative goal, and aspiration in your heart flourishes with joy and success.',
  },
  {
    id: 'jer29',
    reference: 'Jeremiah 29:11',
    text: '“For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.”',
    blessingNote: 'Walk into this new year with peace and confidence, RB, knowing your steps are guided and filled with hope.',
  },
  {
    id: 'ps139',
    reference: 'Psalm 139:14',
    text: 'I praise You because I am fearfully and wonderfully made; Your works are wonderful, I know that full well.',
    blessingNote: 'A beautiful reminder of your unique gifts, your gentle spirit, and how wonderful you are.',
  },
  {
    id: 'zeph3',
    reference: 'Zephaniah 3:17',
    text: 'The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in His love He will no longer rebuke you, but will rejoice over you with singing.',
    blessingNote: 'May you always feel cherished, deeply loved, and surrounded by songs of joy today and always.',
  },
];

export const BibleVerseCard: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const activeVerse = BIRTHDAY_VERSES[selectedIdx];

  const handleNextVerse = () => {
    soundEngine.playNote(523.25, 0.2);
    setSelectedIdx((prev) => (prev + 1) % BIRTHDAY_VERSES.length);
  };

  const handleCopyVerse = () => {
    soundEngine.playPop();
    const shareText = `"${activeVerse.text}" — ${activeVerse.reference} (Blessed for RB)`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="scripture" className="py-14 md:py-20 bg-[#F8F4EC] border-b border-[#E8DEC0] relative overflow-hidden">
      {/* Decorative ambient watercolor glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pure Heading */}
        <div className="text-center mb-8 space-y-2">
          <span className="font-handwriting text-2xl sm:text-3xl text-amber-800 block">
            A Birthday Blessing for RB
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2A26] font-display">
            God's Word Over Your Life
          </h2>
        </div>

        {/* Illuminated Parchment Card */}
        <div className="relative bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border border-[#E2D5C3] shadow-md">
          {/* Subtle gold corner borders */}
          <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-amber-600/30 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-amber-600/30 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-amber-600/30 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-amber-600/30 rounded-br-sm pointer-events-none" />

          {/* Main Scripture Text - Pure and Uncluttered */}
          <div className="text-center max-w-2xl mx-auto space-y-5 py-4">
            <span className="text-3xl text-amber-700/40 font-serif block leading-none">❝</span>
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-display font-medium text-[#2D2A26] leading-relaxed text-balance">
              {activeVerse.text}
            </blockquote>
            <cite className="block font-semibold text-base sm:text-lg text-amber-900 font-sans not-italic">
              — {activeVerse.reference}
            </cite>

            {/* Pure prayer & blessing note for RB */}
            <div className="pt-4 max-w-xl mx-auto">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E9DFD0] text-center space-y-1">
                <p className="font-handwriting text-xl sm:text-2xl text-[#4A433A] leading-relaxed">
                  "{activeVerse.blessingNote}"
                </p>
              </div>
            </div>
          </div>

          {/* Action Row without category clutter */}
          <div className="pt-6 mt-6 border-t border-[#EFE5D6] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyVerse}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg transition-colors cursor-pointer"
                title="Copy verse"
              >
                <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{copied ? 'Copied!' : 'Copy Blessing'}</span>
              </button>
            </div>

            <button
              onClick={handleNextVerse}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-amber-900 bg-amber-200/80 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Read Another Scripture ↻</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
