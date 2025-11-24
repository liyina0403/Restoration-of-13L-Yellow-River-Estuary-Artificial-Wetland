
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Loader2, Upload, Wand2, Image as ImageIcon, Droplets, Leaf, Waves, RefreshCcw, ArrowDown, BarChart as BarChartIcon, FlaskConical, Timer, Maximize2, Download, History, MoveHorizontal } from 'lucide-react';
import { editImageWithGemini } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

interface HistoryItem {
  id: string;
  imageUrl: string;
  prompt: string;
  timestamp: number;
}

const ImageEditor: React.FC = () => {
  const { t, language } = useLanguage();
  
  // AI Image State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Comparison Slider State
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Tabs State
  const [activeTab, setActiveTab] = useState<'habitat' | 'wetland'>('habitat');

  // --- Habitat Simulation State (Birds) ---
  const [waterLevel, setWaterLevel] = useState(30); // cm
  const [salinity, setSalinity] = useState(25); // ppt
  const [vegetation, setVegetation] = useState(40); // %

  // --- Wetland Simulation State (Purification) ---
  const [hrt, setHrt] = useState(5.0); // days
  const [hydraulicLoad, setHydraulicLoad] = useState(0.1); // m3/(m2.d)
  const [wetlandArea, setWetlandArea] = useState(1500); // m2

  // --- Habitat Logic ---
  const habitatData = useMemo(() => {
    const wadingScore = Math.max(10, 100 - Math.abs(waterLevel - 15) * 2.5 - Math.abs(salinity - 20) * 0.5);
    const swimmingScore = Math.max(10, 100 - Math.abs(waterLevel - 80) * 1.5);
    
    let benthosScore = 0;
    if (salinity < 40) {
      benthosScore = Math.max(20, 100 - Math.abs(salinity - 15) * 2);
    } else {
      benthosScore = Math.max(20, 80 - Math.abs(salinity - 80) * 1.5);
    }

    const wadingAdjusted = wadingScore * (1 - vegetation / 200);
    const swimmingAdjusted = swimmingScore * (0.8 + vegetation / 150);

    return [
      { name: t.ai_lab.wading, value: Math.round(wadingAdjusted), color: '#818cf8' },
      { name: t.ai_lab.swimming, value: Math.round(swimmingAdjusted), color: '#3b82f6' },
      { name: t.ai_lab.benthos, value: Math.round(benthosScore), color: '#fbbf24' },
    ];
  }, [waterLevel, salinity, vegetation, t]);

  // --- Wetland Logic ---
  const wetlandData = useMemo(() => {
    const timeEfficiency = (hrt - 2) / (12 - 2); 
    const loadEfficiency = 1 - ((hydraulicLoad - 0.02) / (0.2 - 0.02));
    const efficiencyScore = (timeEfficiency * 0.6 + loadEfficiency * 0.4);

    const codRemoval = 0.5 + (5.0 - 0.5) * efficiencyScore;
    const nh3Removal = 0.02 + (0.3 - 0.02) * efficiencyScore;
    const tnRemoval = 0.05 + (0.5 - 0.05) * efficiencyScore;
    const tpRemoval = 0.008 + (0.05 - 0.008) * efficiencyScore;

    return [
      { name: 'COD', value: Number(codRemoval.toFixed(2)), max: 5.0, unit: 'g/m²·d', color: '#94a3b8' },
      { name: 'NH3-N', value: Number(nh3Removal.toFixed(3)), max: 0.3, unit: 'g/m²·d', color: '#38bdf8' },
      { name: 'TN', value: Number(tnRemoval.toFixed(2)), max: 0.5, unit: 'g/m²·d', color: '#818cf8' },
      { name: 'TP', value: Number(tpRemoval.toFixed(3)), max: 0.05, unit: 'g/m²·d', color: '#f472b6' },
    ];
  }, [hrt, hydraulicLoad]);

  const applySimulationToPrompt = () => {
    let desc = "";
    
    if (language === 'zh') {
      desc = "修改图片以展示";
      if (activeTab === 'habitat') {
        if (waterLevel < 20) desc += "暴露的滩涂和非常浅的水坑，";
        else if (waterLevel < 60) desc += "适合涉禽的中等深度湿地，";
        else desc += "深水湖泊环境，";

        if (vegetation < 20) desc += "几乎没有植物的裸露土壤，";
        else if (vegetation < 60) desc += "零星分布的芦苇和盐沼植物，";
        else desc += "茂密的湿地植被和芦苇丛，";

        if (salinity > 60) desc += "边缘带有结晶盐，显示高盐度。";
        else desc += "代表健康的咸淡水生态系统。";
      } else {
        desc += "一个表面流人工湿地。";
        if (hydraulicLoad > 0.15) desc += "展示非常茂密的芦苇和香蒲以处理高水流量。";
        else desc += "展示平衡的湿地植物斑块和开阔水路。";

        if (hrt > 8) desc += "水体应显得清澈平静（高停留时间）。";
        else if (hrt < 4) desc += "水体应略显浑浊，有明显流动。";
        else desc += "水体看起来清洁，有自然波纹。";

        desc += `场景是一个 ${wetlandArea} 平方米的处理区，有混凝土或土堤分隔。`;
      }
    } else {
      desc = "Modify the image to show ";
      if (activeTab === 'habitat') {
        if (waterLevel < 20) desc += "exposed mudflats with very shallow water puddles, ";
        else if (waterLevel < 60) desc += "a wetland with moderate water depth suitable for wading, ";
        else desc += "a deep water lake environment, ";

        if (vegetation < 20) desc += "barren soil with almost no plants, ";
        else if (vegetation < 60) desc += "scattered patches of reeds and saltmarsh plants, ";
        else desc += "dense, lush wetland vegetation and reed beds, ";

        if (salinity > 60) desc += "with crystalline salt edges indicating high salinity.";
        else desc += "representing a healthy brackish ecosystem.";
      } else {
        desc += "a Surface Flow Constructed Wetland. ";
        if (hydraulicLoad > 0.15) desc += "Show extremely dense, lush reed beds and cattails processing high water flow. ";
        else desc += "Show balanced patches of wetland plants and open water channels. ";

        if (hrt > 8) desc += "The water should appear crystal clear and calm (high retention time). ";
        else if (hrt < 4) desc += "The water should appear slightly turbid with visible flow currents. ";
        else desc += "The water should look clean with natural ripples. ";

        desc += `The scene is a wide angle view of a ${wetlandArea} square meter treatment zone with concrete or earth berm dividers.`;
      }
    }

    setPrompt(desc);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        setSelectedImage(base64Data);
        setMimeType(file.type);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage || !prompt) return;

    setLoading(true);
    setError(null);
    try {
      const result = await editImageWithGemini(selectedImage, mimeType, prompt);
      if (result) {
        setResultImage(result);
        setSliderPosition(50); // Reset slider to center
        
        const newItem: HistoryItem = {
          id: Date.now().toString(),
          imageUrl: result,
          prompt: prompt,
          timestamp: Date.now()
        };
        setHistory(prev => [newItem, ...prev].slice(0, 10));
      } else {
        setError(t.ai_lab.error_gen);
      }
    } catch (err) {
      setError(t.ai_lab.error_ai);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${resultImage}`;
    link.download = `eco-restoration-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const restoreFromHistory = (item: HistoryItem) => {
    setResultImage(item.imageUrl);
    setPrompt(item.prompt);
    setShowHistory(false);
    setSliderPosition(50);
  };

  // Slider Mouse/Touch Handling
  const handleMouseDown = () => setIsResizing(true);
  const handleMouseUp = () => setIsResizing(false);
  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isResizing || !imageContainerRef.current) return;
    
    const rect = imageContainerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(percentage);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="space-y-6 relative">
      
      {/* Simulation Control Panel */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('habitat')}
            className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'habitat' 
                ? 'bg-white text-indigo-600 border-b-2 border-indigo-600' 
                : 'bg-slate-50 text-slate-500 hover:text-slate-700'
            }`}
          >
            <BarChartIcon size={18} />
            {t.ai_lab.title_habitat}
          </button>
          <button
            onClick={() => setActiveTab('wetland')}
            className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'wetland' 
                ? 'bg-white text-teal-600 border-b-2 border-teal-600' 
                : 'bg-slate-50 text-slate-500 hover:text-slate-700'
            }`}
          >
            <FlaskConical size={18} />
            {t.ai_lab.title_wetland}
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {activeTab === 'habitat' ? t.ai_lab.title_habitat : t.ai_lab.title_wetland}
              </h2>
              <p className="text-slate-500 text-sm">
                {activeTab === 'habitat' ? t.ai_lab.subtitle_habitat : t.ai_lab.subtitle_wetland}
              </p>
            </div>
            <button 
              onClick={applySimulationToPrompt}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                activeTab === 'habitat' 
                  ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' 
                  : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
              }`}
            >
              <RefreshCcw size={16} />
              {t.ai_lab.apply_btn}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Controls */}
            <div className="space-y-6 lg:col-span-1">
              
              {activeTab === 'habitat' ? (
                <>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <Waves className="w-4 h-4 text-blue-500" /> {t.ai_lab.ctrl_water}
                      </label>
                      <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">{waterLevel} cm</span>
                    </div>
                    <input 
                      type="range" min="0" max="120" value={waterLevel} 
                      onChange={(e) => setWaterLevel(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-amber-500" /> {t.ai_lab.ctrl_salinity}
                      </label>
                      <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">{salinity} ppt</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" value={salinity} 
                      onChange={(e) => setSalinity(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-green-500" /> {t.ai_lab.ctrl_veg}
                      </label>
                      <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">{vegetation} %</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" value={vegetation} 
                      onChange={(e) => setVegetation(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Wetland Controls */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <Timer className="w-4 h-4 text-teal-500" /> {t.ai_lab.ctrl_hrt}
                      </label>
                      <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">{hrt} d</span>
                    </div>
                    <input 
                      type="range" min="2.0" max="12.0" step="0.1" value={hrt} 
                      onChange={(e) => setHrt(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>2.0 d</span>
                      <span>{t.ai_lab.range}: 2.0 ~ 12.0</span>
                      <span>12.0 d</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <Waves className="w-4 h-4 text-blue-500" /> {t.ai_lab.ctrl_load}
                      </label>
                      <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">{hydraulicLoad}</span>
                    </div>
                    <input 
                      type="range" min="0.02" max="0.2" step="0.01" value={hydraulicLoad} 
                      onChange={(e) => setHydraulicLoad(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>0.02</span>
                      <span>m³/(m²·d)</span>
                      <span>0.2</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <Maximize2 className="w-4 h-4 text-purple-500" /> {t.ai_lab.ctrl_area}
                      </label>
                      <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">{wetlandArea} m²</span>
                    </div>
                    <input 
                      type="range" min="100" max="3000" step="50" value={wetlandArea} 
                      onChange={(e) => setWetlandArea(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                    <p className="text-xs text-slate-400 text-right">{t.ai_lab.max_limit}: 3000 m²</p>
                  </div>
                </>
              )}
            </div>

            {/* Charts */}
            <div className="lg:col-span-2 h-72 bg-slate-50 rounded-xl border border-slate-100 p-4">
              {activeTab === 'habitat' ? (
                <>
                  <h4 className="text-sm font-semibold text-slate-600 mb-4 text-center">{t.ai_lab.chart_habitat}</h4>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={habitatData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 11}} />
                      <Tooltip cursor={{fill: 'transparent'}} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                        {habitatData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </>
              ) : (
                <>
                  <h4 className="text-sm font-semibold text-slate-600 mb-4 text-center">{t.ai_lab.chart_pollutant}</h4>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={wetlandData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" tick={{fontSize: 12}} />
                      <YAxis tick={{fontSize: 12}} />
                      <Tooltip 
                        cursor={{fill: 'transparent'}} 
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-3 border border-slate-100 shadow-lg rounded-lg">
                                <p className="font-bold text-slate-700">{label}</p>
                                <p className="text-sm text-teal-600">Removal: {data.value} {data.unit}</p>
                                <p className="text-xs text-slate-400">Max Capacity: {data.max}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={50}>
                        {wetlandData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <ArrowDown className="text-slate-300 animate-bounce" />
      </div>

      {/* AI Visualizer */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100 relative">
        {/* History Toggle */}
        {history.length > 0 && (
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-purple-600 transition-colors rounded-full hover:bg-purple-50"
            title={t.ai_lab.history_btn}
          >
            <History size={20} />
          </button>
        )}

        {/* History Panel */}
        {showHistory && (
          <div className="absolute top-16 right-6 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-10 max-h-96 overflow-y-auto">
            <h3 className="text-sm font-bold text-slate-700 mb-3">{t.ai_lab.history_btn}</h3>
            <div className="space-y-3">
              {history.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => restoreFromHistory(item)}
                  className="flex gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors group"
                >
                  <img 
                    src={`data:image/png;base64,${item.imageUrl}`} 
                    className="w-12 h-12 object-cover rounded border border-slate-200" 
                    alt="History thumbnail"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 line-clamp-2 group-hover:text-slate-700">{item.prompt}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{new Date(item.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Wand2 className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{t.ai_lab.visual_title}</h2>
            <p className="text-slate-500 text-sm">{t.ai_lab.visual_desc}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-4">
            <div 
              className={`border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden ${
                selectedImage ? 'border-purple-300 bg-purple-50' : 'border-slate-200 hover:border-purple-400 hover:bg-slate-50'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              {selectedImage ? (
                <img 
                  src={`data:${mimeType};base64,${selectedImage}`} 
                  alt="Original" 
                  className="h-full w-full object-contain" 
                />
              ) : (
                <div className="text-center p-6">
                  <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600">{t.ai_lab.upload_title}</p>
                  <p className="text-xs text-slate-400 mt-1">{t.ai_lab.upload_desc}</p>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">{t.ai_lab.prompt_label}</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t.ai_lab.prompt_placeholder}
                className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[100px] resize-none text-sm"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!selectedImage || !prompt || loading}
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                !selectedImage || !prompt || loading
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-200'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t.ai_lab.gen_loading}
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  {t.ai_lab.gen_btn}
                </>
              )}
            </button>
            
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </div>

          {/* Output Section */}
          <div className="h-full min-h-[300px] bg-slate-50 rounded-xl border border-slate-200 p-4 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                {t.ai_lab.result_title}
              </h3>
              {resultImage && (
                <button 
                  onClick={handleDownload}
                  className="text-slate-400 hover:text-purple-600 transition-colors"
                  title="Download Image"
                >
                  <Download size={16} />
                </button>
              )}
            </div>
            
            <div className="flex-1 flex items-center justify-center bg-white rounded-lg border border-slate-100 overflow-hidden relative">
              {resultImage && selectedImage ? (
                // Before/After Comparison Slider
                <div 
                  ref={imageContainerRef}
                  className="relative w-full h-full select-none"
                  style={{ cursor: 'ew-resize' }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleMouseDown}
                >
                  {/* Result Image (Bottom layer, full visibility but covered by clip path) */}
                  <img 
                    src={`data:image/png;base64,${resultImage}`} 
                    alt="AI Restoration" 
                    className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
                  />
                  
                  {/* Original Image (Top layer, clipped) */}
                  <div 
                    className="absolute top-0 left-0 w-full h-full overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <img 
                      src={`data:${mimeType};base64,${selectedImage}`} 
                      alt="Original" 
                      className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
                    />
                  </div>

                  {/* Slider Handle Line */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-200">
                      <MoveHorizontal size={16} className="text-slate-600" />
                    </div>
                  </div>

                  {/* Labels */}
                  <div className={`absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-bold transition-opacity ${isResizing ? 'opacity-0' : 'opacity-100'}`}>
                    Original
                  </div>
                  <div className={`absolute top-4 right-4 bg-purple-600/80 text-white px-2 py-1 rounded text-xs font-bold transition-opacity ${isResizing ? 'opacity-0' : 'opacity-100'}`}>
                    AI Restoration
                  </div>

                </div>
              ) : resultImage ? (
                // Just Result (Fallback if no selectedImage for some reason)
                <img 
                  src={`data:image/png;base64,${resultImage}`} 
                  alt="AI Generated" 
                  className="w-full h-full object-contain"
                />
              ) : (
                // Empty State
                <div className="text-center text-slate-400 p-8">
                  <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Wand2 className="w-8 h-8 text-slate-300" />
                  </div>
                  <p>{t.ai_lab.result_empty}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
