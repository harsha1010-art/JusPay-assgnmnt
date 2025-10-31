import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatsCard = ({ title, value, change, isPositive }) => {
  return (
    <div className="bg-card rounded-xl border border-default p-6 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm text-secondary font-medium">{title}</span>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          isPositive ? 'text-success' : 'text-error'
        }`}>
          {isPositive ? (
            <ArrowUpRight size={16} strokeWidth={2.5} />
          ) : (
            <ArrowDownRight size={16} strokeWidth={2.5} />
          )}
          {change}
        </div>
      </div>
      <div className="text-2xl font-semibold text-primary">{value}</div>
    </div>
  );
};

export default StatsCard;