import React, { useState } from 'react';
import { 
  Bird, 
  Factory, 
  Waves, 
  ShieldCheck, 
  Droplets, 
  Menu, 
  X, 
  ArrowRight, 
  Info, 
  Leaf,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import ConceptMap from './components/ConceptMap';
import ImageEditor from './components/ImageEditor';
import { Section } from './types';

// --- Data for Charts ---
const biodiversityData = [
  { name: 'Before', species: 45, biomass: 120 },
  { name: 'Phase 1', species: 85, biomass: 250 },
  { name: 'Phase 2', species: 140, biomass: 480 },
  { name: 'Target', species: 200, biomass: 600 },
];

const waterQualityData = [
  { name: 'Inflow', value: 100 },
  { name: 'Treatment A', value: 75 },
  { name: 'Treatment B', value: 40 },
  { name: 'Outflow', value: 15 },
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.OVERVIEW);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: Section.OVERVIEW, label: 'Overview', icon: Info },
    { id: Section.PRODUCTION, label: '1: Eco-Production', icon: Factory },
    { id: Section.FUNCTION, label: '3: Eco-Functions', icon: Bird },
    { id: Section.SHORELINE, label: 'L: Shoreline', icon: Waves },
    { id: Section.AI_LAB, label: 'AI Vision Lab', icon: ShieldCheck },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case Section.OVERVIEW:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-8 md:p-12 text-white shadow-xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Yellow River Delta <br/>Ecological Restoration</h1>
              <p className="text-blue-50 text-lg md:text-xl max-w-2xl leading-relaxed">
                Solving the "People Retreat, Birds Advance" conflict through the innovative 
                <span className="font-bold text-yellow-300 mx-2">"1+3+L"</span> 
                model. A Nature-based Solution (NbS) for global coastal wetland management.
              </p>
              <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => setActiveSection(Section.PRODUCTION)}
                  className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  Explore Model <ArrowRight size={20}/>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Droplets className="text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">The Conflict</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Massive loss of coastal wetlands due to salt pans and aquaculture. Simple abandonment leads to high salinity and habitat degradation.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">The Solution (1+3+L)</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  <span className="font-semibold text-slate-900">1</span> Eco-Production Set + 
                  <span className="font-semibold text-slate-900"> 3</span> Functional Uplifts + 
                  <span className="font-semibold text-slate-900"> L</span>-shaped Eco-Shoreline.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <Activity className="text-yellow-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">The Goal</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Transform from a passive "no-human zone" to an active "Bird-Friendly" ecosystem that balances biodiversity and sustainable use.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold mb-6 text-slate-800">Interactive Zoning Map</h2>
              <ConceptMap 
                onSelectZone={(zoneId) => {
                  if (zoneId === 'production') setActiveSection(Section.PRODUCTION);
                  if (['roost', 'wetland', 'foraging'].includes(zoneId)) setActiveSection(Section.FUNCTION);
                  if (zoneId === 'shoreline') setActiveSection(Section.SHORELINE);
                }} 
              />
            </div>
          </div>
        );

      case Section.PRODUCTION:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-4 mb-4">
                <Factory className="w-10 h-10 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-800">1: Eco-Production Mode</h2>
              </div>
              <p className="text-slate-700 text-lg">
                Transforming aquaculture ponds and salt pans into bird-friendly habitats without completely stopping production.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Key Strategies
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="mt-1 text-blue-500 font-bold">01</div>
                    <div>
                      <h4 className="font-medium text-slate-900">Micro-topography Modification</h4>
                      <p className="text-sm text-slate-500">Creating islands and varied depths within ponds for different bird species.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 text-blue-500 font-bold">02</div>
                    <div>
                      <h4 className="font-medium text-slate-900">Water Level Regulation</h4>
                      <p className="text-sm text-slate-500">Seasonal adjustments: Lower levels for wading birds during migration, deeper for swimming birds.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 text-blue-500 font-bold">03</div>
                    <div>
                      <h4 className="font-medium text-slate-900">Salinity Gradient</h4>
                      <p className="text-sm text-slate-500">Managing salt concentrations to support diverse brine shrimp and microorganisms (bird food).</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-lg mb-4">Ecological Recovery Projection</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={biodiversityData}>
                      <defs>
                        <linearGradient id="colorBio" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area type="monotone" dataKey="species" stroke="#10b981" fillOpacity={1} fill="url(#colorBio)" name="Bird Species Count" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        );

      case Section.FUNCTION:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-4 mb-4">
                <Bird className="w-10 h-10 text-emerald-600" />
                <h2 className="text-2xl font-bold text-slate-800">3: Ecological Function Uplift</h2>
              </div>
              <p className="text-slate-700 text-lg">
                Establishing three critical functional zones: High-tide Roosts, Foraging Areas, and Purification Wetlands.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-t-emerald-500">
                <h3 className="font-bold text-lg mb-2">High-tide Roosts</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Safe resting islands that remain above water during high tides when mudflats are submerged.
                </p>
                <div className="h-32 bg-emerald-100 rounded-lg flex items-center justify-center overflow-hidden relative">
                   {/* Abstract visualization of roost */}
                   <div className="absolute bottom-0 w-full h-1/2 bg-blue-200"></div>
                   <div className="absolute bottom-2 w-2/3 h-16 bg-amber-200 rounded-t-full mx-auto left-0 right-0"></div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-t-amber-500">
                <h3 className="font-bold text-lg mb-2">Foraging Zones</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Managed areas with optimized benthos populations to supplement food for migratory birds.
                </p>
                <div className="h-32 bg-amber-50 rounded-lg flex items-center justify-center">
                   <div className="grid grid-cols-4 gap-2 p-4">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-amber-400"></div>
                      ))}
                   </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-t-blue-500">
                <h3 className="font-bold text-lg mb-2">Purification Wetlands</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Using wetland plants to filter tail water from aquaculture before it enters the sea.
                </p>
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={waterQualityData}>
                      <XAxis dataKey="name" hide />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Pollutant Level" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        );

      case Section.SHORELINE:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-slate-100 p-8 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-4 mb-4">
                <Waves className="w-10 h-10 text-slate-600" />
                <h2 className="text-2xl font-bold text-slate-800">L: Ecological Shoreline</h2>
              </div>
              <p className="text-slate-700 text-lg">
                Implementing a "Living Shoreline" concept. Moving away from hard concrete seawalls to resilient, bio-diverse barriers.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
              <div className="p-8 md:w-1/2 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4 text-slate-800">Double-Dike System</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  A tiered defense system. The outer dike dissipates wave energy through salt marshes and mangroves, while the inner dike provides final flood protection. This space between dikes becomes a rich habitat.
                </p>
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-bold">Storm Protection</div>
                  <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-bold">Carbon Sequestration</div>
                </div>
              </div>
              <div className="md:w-1/2 bg-gradient-to-b from-sky-100 to-blue-200 min-h-[300px] relative">
                {/* Abstract visual of double dike */}
                <div className="absolute bottom-0 w-full h-full">
                   <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="none">
                      <path d="M0,250 Q100,240 200,220 T400,200 V300 H0 Z" fill="#a87953" />
                      <path d="M0,260 Q100,250 200,230 T400,210" fill="none" stroke="#10b981" strokeWidth="10" strokeDasharray="5,5" />
                      <path d="M0,300 L400,300 L400,250 L0,300 Z" fill="#3b82f6" opacity="0.5" />
                   </svg>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-slate-500 font-bold text-lg">
                  Cross-section Visualization
                </div>
              </div>
            </div>
          </div>
        );

      case Section.AI_LAB:
        return <ImageEditor />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* Sidebar Navigation */}
      <aside className={`fixed md:sticky top-0 left-0 z-30 w-64 h-screen bg-white border-r border-slate-200 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
            <Leaf className="text-green-500" />
            <span>EcoRestore</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Yellow River Delta</p>
        </div>
        
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeSection === item.id 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-slate-100 bg-slate-50/50">
          <p className="text-xs text-slate-400 text-center">
            © 2024 Eco-Project<br/>Based on "1+3+L" Model
          </p>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white z-20 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <div className="font-bold text-slate-800 flex items-center gap-2">
          <Leaf className="text-green-500 w-5 h-5" />
          EcoRestore
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 pt-20 md:pt-12 overflow-y-auto bg-slate-50">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;