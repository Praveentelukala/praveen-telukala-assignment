import React from 'react';
import { Users, Shield } from 'lucide-react';

interface NavigationProps {
  activeView: 'citizen' | 'admin';
  onViewChange: (view: 'citizen' | 'admin') => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeView, onViewChange }) => {
  return (
    <nav className="bg-white shadow-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8">
          <button
            onClick={() => onViewChange('citizen')}
            className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
              activeView === 'citizen'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-600 hover:text-orange-600'
            }`}
          >
            <Users className="h-5 w-5" />
            <span className="font-medium">Citizen Portal</span>
          </button>
          <button
            onClick={() => onViewChange('admin')}
            className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
              activeView === 'admin'
                ? 'border-green-600 text-green-700'
                : 'border-transparent text-gray-600 hover:text-green-600'
            }`}
          >
            <Shield className="h-5 w-5" />
            <span className="font-medium">Government Portal</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;