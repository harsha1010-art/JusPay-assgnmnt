import React from 'react';

const WorldMap = () => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-primary">Revenue by Location</h2>
        <div className="flex items-center space-x-4">
          <select className="bg-transparent text-secondary text-sm border-none focus:ring-0">
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>
      
      <div className="relative h-[300px] w-full">
        <img 
          src="/world-map.svg" 
          alt="World Map"
          className="w-full h-full object-cover opacity-70 dark:opacity-50"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--chart-primary)]"></div>
              <span className="text-sm text-secondary">United States</span>
            </div>
            <span className="text-sm font-medium text-primary">$23.4k</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--chart-primary)]"></div>
              <span className="text-sm text-secondary">Canada</span>
            </div>
            <span className="text-sm font-medium text-primary">$12.8k</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-sm text-secondary">India</span>
            </div>
            <span className="text-sm font-medium text-primary">$19.2k</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--chart-primary)]"></div>
              <span className="text-sm text-secondary">Australia</span>
            </div>
            <span className="text-sm font-medium text-primary">$15.6k</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;