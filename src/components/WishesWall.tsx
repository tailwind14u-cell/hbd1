import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Send, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface BirthdayWish {
  id: string;
  author: string;
  message: string;
  date: string;
  likes: number;
}

const INITIAL_WISHES: BirthdayWish[] = [
  {
    id: '1',
    author: 'Sam & Maya',
    message: 'Happy Birthday RB! May your lines be steady, your days filled with sunshine, and your heart filled with joy!',
    date: 'Today',
    likes: 18,
  },
  {
    id: '2',
    author: 'Picasso the Cat',
    message: 'Mrrrrow! Sending you warm headbutts, cozy lap purrs, and the happiest birthday wishes, RB!',
    date: 'Today',
    likes: 27,
  },
  {
    id: '3',
    author: 'Elena',
    message: 'To wonderful RB: Wishing you boundless peace, good health, and God’s abundant blessings on your birthday!',
    date: 'Today',
    likes: 15,
  },
  {
    id: '4',
    author: 'Leo',
    message: 'Cheers to RB on your special day! Keep shining, keep smiling, and enjoy every single slice of cake!',
    date: 'Today',
    likes: 22,
  },
];

export const WishesWall: React.FC = () => {
  const [wishes, setWishes] = useState<BirthdayWish[]>(() => {
    try {
      const saved = localStorage.getItem('rb_pure_birthday_wishes');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_WISHES;
  });

  const [authorName, setAuthorName] = useState('');
  const [wishText, setWishText] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('rb_pure_birthday_wishes', JSON.stringify(wishes));
    } catch {
      // safe fallback
    }
  }, [wishes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !wishText.trim()) return;

    soundEngine.playPop();
    soundEngine.playMeow();

    const newWish: BirthdayWish = {
      id: Date.now().toString(),
      author: authorName.trim(),
      message: wishText.trim(),
      date: 'Just now',
      likes: 1,
    };

    setWishes([newWish, ...wishes]);
    setAuthorName('');
    setWishText('');

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // safe fallback
    }
  };

  const handleLike = (id: string) => {
    soundEngine.playNote(587.33, 0.1);
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    );
  };

  return (
    <section id="wishes" className="py-14 md:py-20 bg-[#FAF7F2] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pure Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="font-handwriting text-2xl sm:text-3xl text-amber-800 block">
            From Friends & Loved Ones
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2A26] font-display">
            Birthday Messages for RB
          </h2>
          <p className="text-sm sm:text-base text-[#6B6358]">
            Leave a loving birthday note for RB!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-[#E6DDD0] shadow-xs space-y-4">
            <h3 className="text-lg font-bold font-display text-[#2D2A26]">
              Write a Note for RB
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-amber-900 block mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E3D9C9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-amber-900 block mb-1">
                  Birthday Message
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Dear RB, wishing you the happiest birthday..."
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E3D9C9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#2D2A26] hover:bg-[#433E37] text-white rounded-xl text-xs font-bold tracking-wide shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Birthday Message</span>
              </button>
            </form>
          </div>

          {/* Messages Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {wishes.map((w) => (
              <div
                key={w.id}
                className="p-5 bg-white rounded-2xl border border-[#E6DDD0] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-amber-900">💌 Note</span>
                    <button
                      onClick={() => handleLike(w.id)}
                      className="flex items-center gap-1 text-xs text-rose-700 hover:text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full transition-colors cursor-pointer"
                    >
                      <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                      <span>{w.likes}</span>
                    </button>
                  </div>

                  <p className="font-handwriting text-xl text-[#2D2A26] leading-relaxed mb-4">
                    "{w.message}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EFE8DD] flex items-center justify-between text-xs text-[#7D756C]">
                  <span className="font-bold text-[#2D2A26]">— {w.author}</span>
                  <span className="text-[11px]">{w.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
