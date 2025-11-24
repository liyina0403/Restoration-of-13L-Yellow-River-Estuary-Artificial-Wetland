
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  onSelectZone: (zone: string) => void;
}

const ConceptMap: React.FC<Props> = ({ onSelectZone }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const { t } = useLanguage();

  const zones = [
    { 
      id: 'production', 
      name: t.overview.zones.production, 
      x: 60, y: 70, 
      width: 200, height: 100,
      baseColor: '#eff6ff',
      accentColor: '#3b82f6'
    },
    { 
      id: 'roost', 
      name: t.overview.zones.roost, 
      x: 270, y: 70, 
      width: 140, height: 100,
      baseColor: '#fffbeb',
      accentColor: '#f59e0b'
    },
    { 
      id: 'wetland', 
      name: t.overview.zones.wetland, 
      x: 60, y: 180, 
      width: 200, height: 90,
      baseColor: '#f0fdf4',
      accentColor: '#10b981'
    },
    { 
      id: 'foraging', 
      name: t.overview.zones.foraging, 
      x: 270, y: 180, 
      width: 140, height: 90,
      baseColor: '#fafaf9',
      accentColor: '#a87953'
    },
    { 
      id: 'shoreline', 
      name: t.overview.zones.shoreline, 
      x: 420, y: 40, 
      width: 40, height: 230,
      baseColor: '#f1f5f9',
      accentColor: '#475569'
    },
  ];

  // Icons for visual flair
  const BirdSilhouette = ({ x, y, scale = 1, flip = false }: {x: number, y: number, scale?: number, flip?: boolean}) => (
    <path 
      d="M10,15 C10,15 12,5 18,5 C22,5 25,10 25,12 C25,12 28,11 30,13 C30,13 28,18 25,18 L15,18 C15,18 10,22 10,15 Z" 
      fill="currentColor" 
      transform={`translate(${x},${y}) scale(${scale}) ${flip ? 'scale(-1, 1)' : ''}`}
      opacity="0.8"
    />
  );

  const FishIcon = ({ x, y }: {x: number, y: number}) => (
    <path 
      d="M5,5 Q10,0 15,5 T25,5 L22,8 L25,11 Q20,16 15,11 T5,11 Z" 
      fill="currentColor" 
      transform={`translate(${x},${y}) scale(0.6)`} 
      opacity="0.6"
    />
  );

  const ReedIcon = ({ x, y }: {x: number, y: number}) => (
    <g transform={`translate(${x},${y})`} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M5,20 Q5,10 2,0" opacity="0.7" />
      <path d="M10,20 Q10,8 12,2" />
      <path d="M15,20 Q15,12 18,5" opacity="0.8" />
      <path d="M8,4 L12,0 L16,4" fill="currentColor" stroke="none" />
    </g>
  );

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-video bg-blue-50/30 rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          {t.overview.map_title}
        </h3>
        <p className="text-xs text-slate-500">{t.overview.map_hint}</p>
      </div>
      
      <svg viewBox="0 0 500 300" className="w-full h-full select-none">
        <defs>
          <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
          </pattern>
          <linearGradient id="water-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </linearGradient>
          <filter id="shadow-hover">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.15"/>
          </filter>
        </defs>

        {/* Global Background */}
        <rect width="100%" height="100%" fill="url(#water-grad)" />
        <rect width="100%" height="100%" fill="url(#grid-pattern)" opacity="0.5" />

        {/* Connecting flows (Abstract arrows) */}
        <path d="M160,150 L160,180" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" opacity="0.5"/>
        <path d="M260,100 L270,100" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" opacity="0.5"/>
        <path d="M260,220 L270,220" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" opacity="0.5"/>

        {zones.map((zone) => {
          const isHovered = hovered === zone.id;
          
          return (
            <motion.g 
              key={zone.id}
              onClick={() => onSelectZone(zone.id)}
              onMouseEnter={() => setHovered(zone.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Container Shape with BioRender style visuals */}
              <motion.rect
                x={zone.x}
                y={zone.y}
                width={zone.width}
                height={zone.height}
                rx="12"
                fill={zone.baseColor}
                stroke={isHovered ? zone.accentColor : '#cbd5e1'}
                strokeWidth={isHovered ? 3 : 1}
                filter={isHovered ? "url(#shadow-hover)" : ""}
                animate={{
                  scale: isHovered ? 1.02 : 1,
                }}
                className="transition-all duration-300"
              />

              {/* Zone Specific Illustrations */}
              <g style={{ pointerEvents: 'none' }}>
                
                {/* 1. Eco-Production: Arranged Ponds & Salt Pans */}
                {zone.id === 'production' && (
                  <>
                    {/* Aquaculture Ponds (Blue Grids) - Left 2/3 */}
                    <g>
                      {/* Top Left Pond */}
                      <rect x={zone.x + 10} y={zone.y + 10} width="55" height="35" rx="2" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1" />
                      <path d={`M${zone.x + 10},${zone.y + 20} H${zone.x + 65}`} stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 3"/>
                      
                      {/* Top Middle Pond */}
                      <rect x={zone.x + 70} y={zone.y + 10} width="55" height="35" rx="2" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1" />
                      
                      {/* Bottom Left Pond */}
                      <rect x={zone.x + 10} y={zone.y + 55} width="55" height="35" rx="2" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1" />
                      
                      {/* Bottom Middle Pond */}
                      <rect x={zone.x + 70} y={zone.y + 55} width="55" height="35" rx="2" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1" />
                    </g>

                    {/* Salt Pans (Yellow Grids) - Right 1/3 */}
                    <g>
                      {/* Top Right Salt Pan */}
                      <rect x={zone.x + 135} y={zone.y + 10} width="55" height="35" rx="2" fill="#fef08a" stroke="#eab308" strokeWidth="1" />
                      {/* Crystal visual */}
                      <path d={`M${zone.x+162},${zone.y+35} L${zone.x+155},${zone.y+42} L${zone.x+170},${zone.y+42} Z`} fill="#ca8a04" opacity="0.6" />
                      
                      {/* Bottom Right Salt Pan */}
                      <rect x={zone.x + 135} y={zone.y + 55} width="55" height="35" rx="2" fill="#fef08a" stroke="#eab308" strokeWidth="1" />
                      {/* Crystal visual */}
                      <path d={`M${zone.x+162},${zone.y+80} L${zone.x+155},${zone.y+87} L${zone.x+170},${zone.y+87} Z`} fill="#ca8a04" opacity="0.6" />
                    </g>
                    
                    <g className="text-blue-600">
                       <FishIcon x={zone.x + 28} y={zone.y + 18} />
                       <FishIcon x={zone.x + 88} y={zone.y + 63} />
                    </g>
                  </>
                )}

                {/* 2. Roost: Island & Birds */}
                {zone.id === 'roost' && (
                  <>
                    {/* Organic Island Shape */}
                    <path 
                      d={`M${zone.x+20},${zone.y+70} Q${zone.x+50},${zone.y+20} ${zone.x+80},${zone.y+50} T${zone.x+120},${zone.y+60} V${zone.y+80} H${zone.x+20} Z`} 
                      fill="#fcd34d" 
                      opacity="0.5"
                    />
                    <path 
                      d={`M${zone.x+10},${zone.y+80} Q${zone.x+70},${zone.y+40} ${zone.x+130},${zone.y+80} Z`} 
                      fill="#dbeafe" 
                    />
                    <g className="text-slate-600">
                      <BirdSilhouette x={zone.x + 50} y={zone.y + 40} scale={0.7} />
                      <BirdSilhouette x={zone.x + 80} y={zone.y + 50} scale={0.8} flip />
                      <BirdSilhouette x={zone.x + 30} y={zone.y + 55} scale={0.6} />
                    </g>
                  </>
                )}

                {/* 3. Wetland: Reeds & Cleaning */}
                {zone.id === 'wetland' && (
                  <>
                    {/* Water flow lines */}
                    <path d={`M${zone.x+10},${zone.y+70} Q${zone.x+50},${zone.y+60} ${zone.x+90},${zone.y+70} T${zone.x+190},${zone.y+70}`} stroke="#6ee7b7" strokeWidth="2" fill="none" opacity="0.6" />
                    <path d={`M${zone.x+10},${zone.y+80} Q${zone.x+60},${zone.y+90} ${zone.x+100},${zone.y+80} T${zone.x+190},${zone.y+80}`} stroke="#34d399" strokeWidth="2" fill="none" opacity="0.6" />
                    
                    {/* Reed patches */}
                    <g className="text-green-600">
                      <ReedIcon x={zone.x + 20} y={zone.y + 30} />
                      <ReedIcon x={zone.x + 50} y={zone.y + 40} />
                      <ReedIcon x={zone.x + 90} y={zone.y + 25} />
                      <ReedIcon x={zone.x + 130} y={zone.y + 35} />
                      <ReedIcon x={zone.x + 170} y={zone.y + 30} />
                    </g>
                  </>
                )}

                {/* 4. Foraging: Mudflat & Benthos */}
                {zone.id === 'foraging' && (
                  <>
                    <rect x={zone.x+10} y={zone.y+10} width={zone.width-20} height={zone.height-20} fill="url(#grid-pattern)" opacity="0.3" />
                    {/* Mud texture dots */}
                    <g fill="#a87953" opacity="0.4">
                      <circle cx={zone.x+30} cy={zone.y+30} r="1.5" />
                      <circle cx={zone.x+50} cy={zone.y+60} r="2" />
                      <circle cx={zone.x+80} cy={zone.y+40} r="1.5" />
                      <circle cx={zone.x+110} cy={zone.y+70} r="2" />
                      <circle cx={zone.x+120} cy={zone.y+25} r="1.5" />
                    </g>
                    {/* Small foraging birds */}
                    <g className="text-amber-700">
                      <BirdSilhouette x={zone.x + 40} y={zone.y + 50} scale={0.5} />
                      <BirdSilhouette x={zone.x + 90} y={zone.y + 60} scale={0.5} flip />
                    </g>
                  </>
                )}

                {/* 5. Shoreline: Double Dike Visualization */}
                {zone.id === 'shoreline' && (
                  <>
                    {/* Inner Dike (Flood defense) */}
                    <rect x={zone.x + 8} y={zone.y + 10} width="6" height="210" fill="#cbd5e1" rx="1" />
                    
                    {/* Middle Wetland Zone (Green Buffer) */}
                    <rect x={zone.x + 16} y={zone.y + 10} width="10" height="210" fill="#dcfce7" />
                    <g className="text-green-500">
                      <path d={`M${zone.x+18},${zone.y+40} v10 m2,-5 h4`} stroke="currentColor" strokeWidth="1" />
                      <path d={`M${zone.x+18},${zone.y+90} v10 m2,-5 h4`} stroke="currentColor" strokeWidth="1" />
                      <path d={`M${zone.x+18},${zone.y+150} v10 m2,-5 h4`} stroke="currentColor" strokeWidth="1" />
                    </g>
                    
                    {/* Outer Dike (Wave break) */}
                    <rect x={zone.x + 28} y={zone.y + 10} width="4" height="210" fill="#94a3b8" rx="1" />
                    
                    {/* Sea Interaction */}
                    <path d={`M${zone.x+34},${zone.y+10} Q${zone.x+38},${zone.y+30} ${zone.x+34},${zone.y+50} T${zone.x+34},${zone.y+90} V${zone.y+220}`} stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.4" />
                  </>
                )}
              </g>

              {/* Text Label Background */}
              <rect 
                x={zone.x + 10} 
                y={zone.y + 10} 
                width={zone.id === 'shoreline' ? 20 : 24} 
                height={24} 
                rx="6" 
                fill={isHovered ? zone.accentColor : 'white'} 
                className="transition-colors duration-300"
              />
              
              {/* ID Badge */}
              <text 
                x={zone.x + (zone.id === 'shoreline' ? 20 : 22)} 
                y={zone.y + 27} 
                textAnchor="middle"
                fill={isHovered ? 'white' : zone.accentColor} 
                fontSize="14" 
                fontWeight="bold"
                className="pointer-events-none font-mono"
              >
                {zone.name.split(':')[0]}
              </text>
              
              {/* Main Label */}
              {zone.id !== 'shoreline' && (
                <text 
                  x={zone.x + 40} 
                  y={zone.y + 27} 
                  fill="#475569" 
                  fontSize="12" 
                  fontWeight="bold" 
                  className="pointer-events-none"
                >
                  {zone.name.split(':')[1]}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>

      {hovered && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md text-slate-700 px-6 py-3 rounded-full text-sm font-medium shadow-xl border border-slate-200 flex items-center gap-2 animate-fade-in-up">
           <span className="w-2 h-2 rounded-full bg-blue-500"></span>
           {t.overview.map_hint}
        </div>
      )}
    </div>
  );
};

export default ConceptMap;
