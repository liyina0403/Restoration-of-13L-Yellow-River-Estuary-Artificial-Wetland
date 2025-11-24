import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onSelectZone: (zone: string) => void;
}

const ConceptMap: React.FC<Props> = ({ onSelectZone }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const zones = [
    { id: 'production', name: '1: Ecological Production', color: '#3b82f6', path: 'M50,50 L250,50 L250,150 L50,150 Z', x: 60, y: 70 },
    { id: 'roost', name: '3: Bird Roosts', color: '#10b981', path: 'M260,50 L400,50 L400,150 L260,150 Z', x: 270, y: 70 },
    { id: 'wetland', name: '3: Purification Wetland', color: '#eab308', path: 'M50,160 L250,160 L250,250 L50,250 Z', x: 60, y: 180 },
    { id: 'foraging', name: '3: Foraging Area', color: '#10b981', path: 'M260,160 L400,160 L400,250 L260,250 Z', x: 270, y: 180 },
    { id: 'shoreline', name: 'L: Ecological Shoreline', color: '#64748b', path: 'M410,40 L450,40 L450,260 L410,260 Z', x: 415, y: 100 },
  ];

  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-video bg-blue-50/50 rounded-xl overflow-hidden border border-blue-100 shadow-inner">
      <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur p-3 rounded-lg shadow-sm">
        <h3 className="font-bold text-slate-800">Spatial Layout: "1+3+L"</h3>
        <p className="text-xs text-slate-500">Click areas to explore zones</p>
      </div>
      
      <svg viewBox="0 0 500 300" className="w-full h-full">
        {/* Background Water */}
        <path d="M460,0 L500,0 L500,300 L460,300 Z" fill="#93c5fd" opacity="0.5" />
        
        {zones.map((zone) => (
          <g 
            key={zone.id}
            onClick={() => onSelectZone(zone.id)}
            onMouseEnter={() => setHovered(zone.id)}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer transition-all duration-300"
          >
            <motion.path
              d={zone.path}
              fill={zone.color}
              initial={{ opacity: 0.6 }}
              animate={{ 
                opacity: hovered === zone.id ? 0.9 : 0.6,
                scale: hovered === zone.id ? 1.02 : 1,
              }}
              stroke="white"
              strokeWidth="2"
              className="drop-shadow-md"
            />
            <text 
              x={zone.x} 
              y={zone.y} 
              fill="white" 
              fontSize="12" 
              fontWeight="bold" 
              className="pointer-events-none"
            >
              {zone.name.split(':')[0]}
            </text>
          </g>
        ))}
      </svg>

      {hovered && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          {zones.find(z => z.id === hovered)?.name}
        </div>
      )}
    </div>
  );
};

export default ConceptMap;