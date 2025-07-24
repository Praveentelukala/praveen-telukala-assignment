import React from 'react';
import { Flame } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="bg-gradient-to-r from-orange-500 to-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-3 mb-2">
          <Flame className="h-8 w-8" />
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        </div>
        {subtitle && (
          <p className="text-orange-100 text-sm md:text-base">{subtitle}</p>
        )}
      </div>
    </header>
  );
};

export default Header