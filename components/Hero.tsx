import React from 'react';
import { ShieldIcon, ZapIcon, CheckCircleIcon, WandIcon } from './icons';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="text-center flex flex-col items-center pt-16 pb-24">
      <div className="inline-flex items-center gap-3 bg-brand-secondary/80 backdrop-blur-md border border-brand-border px-5 py-2 rounded-full text-sm font-medium text-gray-200 mb-8 shadow-lg shadow-purple-500/5 hover:border-purple-500/30 transition-all duration-300 cursor-default group">
        <div className="bg-purple-500/10 p-1.5 rounded-full group-hover:bg-purple-500/20 transition-colors">
            <WandIcon className="w-4 h-4 text-purple-400" />
        </div>
        <span className="tracking-wide">High-Fidelity AI OCR + Summarization</span>
      </div>

      <h1 className="text-6xl md:text-8xl font-black mb-4">
        <span className="bg-gradient-to-r from-brand-orange via-amber-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
          DevaScan
        </span>
      </h1>

      <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
        Digitize handwritten Devanagari scripts with near-perfect accuracy using advanced AI vision, then instantly generate concise English summaries.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
        <button
          onClick={onGetStarted}
          className="bg-gradient-to-r from-brand-orange to-amber-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform"
        >
          Get Started
        </button>
        <button className="bg-brand-secondary border border-brand-border text-gray-300 font-semibold px-8 py-3 rounded-lg hover:bg-brand-border transition-colors duration-200">
          Learn More
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-gray-400">
        <FeatureItem icon={<ShieldIcon />} text="Secure Processing" />
        <FeatureItem icon={<CheckCircleIcon />} text="Spatial Coordinate Mapping" />
        <FeatureItem icon={<ZapIcon />} text="Instant English Summary" />
      </div>
    </div>
  );
};

interface FeatureItemProps {
    icon: React.ReactNode;
    text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text }) => (
    <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{text}</span>
    </div>
);

export default Hero;