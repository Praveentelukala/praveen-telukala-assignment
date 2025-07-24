import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import CitizenPortal from './components/CitizenPortal';
import AdminPortal from './components/AdminPortal';

function App() {
  const [activeView, setActiveView] = useState<'citizen' | 'admin'>('citizen');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Pradhan Mantri Ujjwala Yojana"
        subtitle="Providing clean cooking fuel to rural and deprived households across India"
      />
      
      <Navigation 
        activeView={activeView} 
        onViewChange={setActiveView} 
      />

      <main className="py-8">
        {activeView === 'citizen' ? <CitizenPortal /> : <AdminPortal />}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2025 Government of India. All rights reserved. | Ministry of Petroleum & Natural Gas
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;