/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GiftIntro } from './components/GiftIntro';
import { BirthdayCard } from './components/BirthdayCard';

export default function App() {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('opened') === 'true';
    }
    return false;
  });

  const handleOpenGift = () => {
    setIsOpen(true);
  };

  const handleResetToEnvelope = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2A26] selection:bg-amber-200 selection:text-amber-900">
      {!isOpen ? (
        <GiftIntro onOpen={handleOpenGift} />
      ) : (
        <BirthdayCard onReopenEnvelope={handleResetToEnvelope} />
      )}
    </div>
  );
}
