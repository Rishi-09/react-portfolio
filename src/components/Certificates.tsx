import React from 'react';
import { CERTIFICATES } from '../constants';
import { InfiniteMovingCards } from './InfiniteMovingCards';

export const Certificates: React.FC = () => {
  return (
    <div className="w-full py-20 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-24 mb-16">
        <div className="reveal-child">
          <h2 className="text-[10px] font-bold text-[#6D7CFF] uppercase tracking-[0.5em] mb-4">Credentials</h2>
          <p className="text-4xl md:text-6xl font-semibold text-[#F0F2F5] tracking-tighter">Certifications</p>
        </div>
      </div>

      <div className="reveal-child">
        <InfiniteMovingCards
          items={CERTIFICATES}
          direction="right"
          speed="slow"
          className="w-full"
        />
      </div>
    </div>
  );
};