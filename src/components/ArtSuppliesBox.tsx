import React, { useState } from 'react';
import { Sparkles, Check, Gift } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface SupplyItem {
  id: string;
  name: string;
  category: string;
  description: string;
  whyRbLovesIt: string;
  catResistanceRating: string;
  badge: string;
  icon: string;
}

const ART_SUPPLIES: SupplyItem[] = [
  {
    id: 'paper',
    name: '300gsm Cold-Pressed 100% Cotton Block',
    category: 'Paper & Substrate',
    description: 'Heavyweight archival paper that drinks up watercolor washes without buckling or warping.',
    whyRbLovesIt: 'Perfect tooth for luminous blends and textured graphite sketching.',
    catResistanceRating: 'High · Heavy gummed edges keep curious claws from turning pages prematurely.',
    badge: 'Archival Grade',
    icon: '📜',
  },
  {
    id: 'watercolors',
    name: 'Artisan Honey-Bound Watercolor Half-Pans',
    category: 'Pigments',
    description: 'Rich mineral pigments mixed with natural gum arabic and wildflower honey for buttery rewetting.',
    whyRbLovesIt: 'Glowing transparency, velvety granulations, and luscious gradients.',
    catResistanceRating: 'Medium · Closed metal tin keeps rogue paw dips at bay.',
    badge: 'Pure Pigment',
    icon: '🎨',
  },
  {
    id: 'brushes',
    name: 'Kolinsky Sable & Synthetic Mop Brushes',
    category: 'Brushes',
    description: 'Razor-sharp needle points with massive water reservoirs for effortless expressive strokes.',
    whyRbLovesIt: 'Springy snap that responds to the subtlest wrist flick and pressure change.',
    catResistanceRating: 'Caution! · Looks suspiciously like a feather teaser toy to Picasso the cat.',
    badge: 'Hand-Tied',
    icon: '🖌️',
  },
  {
    id: 'pencils',
    name: 'Luminance Wax-Based Artist Colored Pencils',
    category: 'Drawing & Line',
    description: 'Buttery smooth cedar wood pencils with maximum lightfastness and vibrant blendability.',
    whyRbLovesIt: 'Layering highlights on top of dark washes without waxy sheen.',
    catResistanceRating: 'Safe · Packaged in a solid hinged collector box.',
    badge: 'Lightfast 100%',
    icon: '✏️',
  },
  {
    id: 'ceramic-palette',
    name: 'Porcelain Sleeping Kitten Mixing Well',
    category: 'Studio Accessories',
    description: 'Heavy, cool glazed ceramic palette with 12 petal wells and a sculptured snoozing kitten brush rest.',
    whyRbLovesIt: 'Colors do not bead up like plastic; cleans off with one quick wipe.',
    catResistanceRating: 'Maximum · Too heavy for any cat to bat off the table!',
    badge: 'Artisan Crafted',
    icon: '🐱',
  },
  {
    id: 'decoy-cup',
    name: 'Dual Spill-Proof Brush Rinse & Cat Decoy Cup',
    category: 'Studio Lifesaver',
    description: 'Two-chamber heavy glass jar: one chamber for pure water, one with filtered catnip-water decoy.',
    whyRbLovesIt: 'Guarantees your pristine painting water is never sampled by thirsty felines.',
    catResistanceRating: 'Genius Tier · Keeps cat satisfied and artwork sparkling clean.',
    badge: 'Studio Secret',
    icon: '🍵',
  },
];

export const ArtSuppliesBox: React.FC = () => {
  const [selectedSupply, setSelectedSupply] = useState<SupplyItem>(ART_SUPPLIES[0]);
  const [unboxedItems, setUnboxedItems] = useState<Record<string, boolean>>({
    paper: true,
    watercolors: true,
  });

  const handleToggleUnbox = (id: string) => {
    soundEngine.playPop();
    setUnboxedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="supplies" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-[#E8DEC0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Anti-slop clean metadata */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#7D756C] tracking-wide mb-3">
          <span>The Atelier Toolkit</span>
          <span aria-hidden="true">·</span>
          <span>Drawing Materials</span>
          <span aria-hidden="true">·</span>
          <span>Curated for RB</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#2D2A26] font-display">
              RB's Birthday Art & Cat Kit
            </h2>
            <p className="text-sm sm:text-base text-[#6B6358] mt-2 max-w-xl">
              An inventory of essential materials, pigment pans, and cat-proof studio accessories assembled for RB's next creative chapter.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#7D756C]">
            <Gift className="w-4 h-4 text-amber-700" />
            <span>Click items to inspect studio specs</span>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ART_SUPPLIES.map((supply) => {
            const isSelected = selectedSupply.id === supply.id;
            const isGiftOpened = unboxedItems[supply.id];

            return (
              <div
                key={supply.id}
                onClick={() => {
                  setSelectedSupply(supply);
                  soundEngine.playNote(420, 0.08);
                }}
                className={`p-6 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-amber-400 shadow-md ring-2 ring-amber-300/40'
                    : 'bg-[#F5EFE6]/50 border-[#E8DEC0] hover:bg-white/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{supply.icon}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleUnbox(supply.id);
                      }}
                      className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                        isGiftOpened
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      }`}
                    >
                      {isGiftOpened ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Packed in Bag</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3" />
                          <span>Pack for RB</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-900/80 mb-1">
                    {supply.category}
                  </div>
                  <h3 className="text-lg font-bold font-display text-[#2D2A26] mb-2">
                    {supply.name}
                  </h3>
                  <p className="text-xs text-[#5A5248] leading-relaxed mb-4">
                    {supply.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EFE8DD] space-y-1.5 text-[11px] text-[#70685F]">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-700">Studio Fit:</span>
                    <span className="text-right text-[#453E35]">{supply.whyRbLovesIt.slice(0, 38)}...</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-amber-800">Cat Safety:</span>
                    <span className="text-right text-stone-600 truncate max-w-[170px]">
                      {supply.catResistanceRating.split('·')[0]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Spotlight Detail View */}
        <div className="mt-8 p-6 sm:p-8 bg-white rounded-2xl border border-[#E6DDD0] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
                <span>Selected Material Detail</span>
                <span aria-hidden="true">·</span>
                <span>{selectedSupply.category}</span>
              </div>
              <h4 className="text-2xl font-bold font-display text-[#2D2A26]">
                {selectedSupply.name}
              </h4>
              <p className="text-sm text-[#524B43] leading-relaxed">
                {selectedSupply.description}
              </p>
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DEC0] text-xs space-y-1">
                <div>
                  <strong className="text-amber-900 font-semibold">Why this is indispensable for RB:</strong>{' '}
                  <span className="text-[#433D35]">{selectedSupply.whyRbLovesIt}</span>
                </div>
                <div>
                  <strong className="text-stone-800 font-semibold">Cat Studio Advisory:</strong>{' '}
                  <span className="text-[#5C554C]">{selectedSupply.catResistanceRating}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-[#FAF7F2] rounded-xl border border-[#E8DEC0] text-center space-y-3">
              <span className="text-5xl">{selectedSupply.icon}</span>
              <div className="font-handwriting text-2xl text-amber-900 font-bold">
                "Blessed by Studio Paws"
              </div>
              <button
                onClick={() => handleToggleUnbox(selectedSupply.id)}
                className="w-full py-2 px-4 text-xs font-semibold text-white bg-[#2D2A26] hover:bg-[#433E37] rounded-lg transition-colors cursor-pointer"
              >
                {unboxedItems[selectedSupply.id] ? 'Item in RB’s Gift Bag ✓' : 'Add to RB’s Gift Bag 🎁'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
