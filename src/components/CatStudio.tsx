import React, { useState } from 'react';
import { Heart, MessageSquareQuote } from 'lucide-react';
import { soundEngine } from '../utils/audio';

import catsPartyImg from '../assets/images/cats_party_studio_1791163620585.jpg';
import catSketchbookImg from '../assets/images/cat_sketchbook_art_1791163602545.jpg';

interface CatProfile {
  id: string;
  name: string;
  birthdayWish: string;
  avatarEmoji: string;
}

const CAT_CHARACTERS: CatProfile[] = [
  {
    id: 'picasso',
    name: 'Picasso the Ginger',
    birthdayWish:
      'Purrrr! Happy Birthday RB! I promise not to knock over your brush water cup today... unless you really need an avant-garde watercolor splash!',
    avatarEmoji: '🐱🎨',
  },
  {
    id: 'monet',
    name: 'Monet the Calico',
    birthdayWish:
      'Happy birthday RB! May your days be soft, dreamy, and filled with warm sunshine and cozy cuddle breaks.',
    avatarEmoji: '🌸😸',
  },
  {
    id: 'davinci',
    name: 'Da Vinci the Tuxedo',
    birthdayWish:
      'Salutations RB! I inspected your sketchbook and gave it five claws up. Your linework and your heart are pure beauty.',
    avatarEmoji: '🐾🎩',
  },
  {
    id: 'matisse',
    name: 'Matisse the Tortie',
    birthdayWish:
      'MEOW! Happy birthday RB!! I brought you bright colors, boundless curiosity, and extra warm purrs!',
    avatarEmoji: '✨🐈',
  },
];

export const CatStudio: React.FC = () => {
  const [activeCat, setActiveCat] = useState<CatProfile>(CAT_CHARACTERS[0]);
  const [pettedCats, setPettedCats] = useState<Record<string, number>>({
    picasso: 12,
    monet: 18,
    davinci: 9,
    matisse: 15,
  });

  const handleSelectCat = (cat: CatProfile) => {
    setActiveCat(cat);
    soundEngine.playNote(440, 0.15);
  };

  const handlePetCat = (catId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playMeow();
    soundEngine.playPurr();
    setPettedCats((prev) => ({
      ...prev,
      [catId]: (prev[catId] || 0) + 1,
    }));
  };

  return (
    <section id="cats" className="py-14 md:py-20 bg-[#FAF7F2] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pure Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="font-handwriting text-2xl sm:text-3xl text-amber-800 block">
            From the Studio Cats
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2A26] font-display">
            Cats Celebrating RB
          </h2>
          <p className="text-sm sm:text-base text-[#6B6358]">
            Click any cat to read their personal birthday message to RB and give them gentle pats!
          </p>
        </div>

        {/* Cat Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {CAT_CHARACTERS.map((cat) => {
            const isSelected = activeCat.id === cat.id;
            const petCount = pettedCats[cat.id] || 0;
            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCat(cat)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-center ${
                  isSelected
                    ? 'bg-white border-amber-400 shadow-md ring-2 ring-amber-300/40'
                    : 'bg-[#F5EFE6]/60 border-[#E8DEC0] hover:bg-white/80'
                }`}
              >
                <span className="text-4xl block mb-2">{cat.avatarEmoji}</span>
                <h3 className="text-sm font-bold font-display text-[#2D2A26]">
                  {cat.name}
                </h3>
                <div className="mt-2 flex justify-center">
                  <button
                    onClick={(e) => handlePetCat(cat.id, e)}
                    className="flex items-center gap-1 text-[11px] px-2 py-0.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-full border border-rose-200 transition-colors cursor-pointer"
                  >
                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                    <span>{petCount}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Cat Birthday Letter & Photos */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DDD0] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#E8DEC0] relative">
              <MessageSquareQuote className="w-7 h-7 text-amber-700/20 absolute top-3 right-3" />
              <p className="font-handwriting text-xl sm:text-2xl text-[#2D2A26] leading-relaxed">
                "{activeCat.birthdayWish}"
              </p>
              <div className="mt-4 pt-3 border-t border-[#E8DEC0]/80 flex items-center justify-between text-xs text-[#7D756C]">
                <span>With purrs & paw prints 🐾</span>
                <span className="font-semibold text-amber-900">— {activeCat.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={(e) => handlePetCat(activeCat.id, e)}
                className="flex items-center gap-2 px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Pet {activeCat.name.split(' ')[0]}</span>
              </button>

              <button
                onClick={() => soundEngine.playPurr()}
                className="flex items-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Listen to Purr 🎵</span>
              </button>
            </div>
          </div>

          {/* Cat Studio Photos */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-amber-50 border border-stone-200 shadow-xs">
              <img
                src={catsPartyImg}
                alt="Studio cats celebrating RB"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-amber-50 border border-stone-200 shadow-xs">
              <img
                src={catSketchbookImg}
                alt="Sketchbook and cat paw prints for RB"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
