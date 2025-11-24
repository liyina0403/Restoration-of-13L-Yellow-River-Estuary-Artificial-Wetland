
import { Language } from './types';

export const translations = {
  en: {
    title: "Yellow River Delta Eco-Restoration",
    subtitle: "Solving the \"People Retreat, Birds Advance\" conflict through the innovative \"1+3+L\" model. A Nature-based Solution (NbS) for global coastal wetland management.",
    nav: {
      overview: "Overview",
      production: "1: Eco-Production",
      function: "3: Eco-Functions",
      shoreline: "L: Shoreline",
      ai_lab: "AI Vision Lab"
    },
    overview: {
      conflict_title: "The Conflict",
      conflict_desc: "Massive loss of coastal wetlands due to salt pans and aquaculture. Simple abandonment leads to high salinity and habitat degradation.",
      solution_title: "The Solution (1+3+L)",
      solution_desc: "1 Eco-Production Set + 3 Functional Uplifts + L-shaped Eco-Shoreline.",
      goal_title: "The Goal",
      goal_desc: "Transform from a passive \"no-human zone\" to an active \"Bird-Friendly\" ecosystem that balances biodiversity and sustainable use.",
      explore_btn: "Explore Model",
      map_title: "Interactive Zoning Map",
      map_hint: "Click areas to explore zones",
      zones: {
        production: "1: Eco-Production",
        roost: "3: Bird Roosts",
        wetland: "3: Purification Wetland",
        foraging: "3: Foraging Area",
        shoreline: "L: Eco-Shoreline"
      }
    },
    production: {
      title: "1: Eco-Production Mode",
      desc: "Transforming aquaculture ponds and salt pans into bird-friendly habitats without completely stopping production.",
      strategies: "Key Strategies",
      s1_title: "Micro-topography Modification",
      s1_desc: "Creating islands and varied depths within ponds for different bird species.",
      s2_title: "Water Level Regulation",
      s2_desc: "Seasonal adjustments: Lower levels for wading birds during migration, deeper for swimming birds.",
      s3_title: "Salinity Gradient",
      s3_desc: "Managing salt concentrations to support diverse brine shrimp and microorganisms (bird food).",
      chart_title: "Ecological Recovery Projection"
    },
    function: {
      title: "3: Ecological Function Uplift",
      desc: "Establishing three critical functional zones: High-tide Roosts, Foraging Areas, and Purification Wetlands.",
      roost_title: "High-tide Roosts",
      roost_desc: "Safe resting islands that remain above water during high tides when mudflats are submerged.",
      foraging_title: "Foraging Zones",
      foraging_desc: "Managed areas with optimized benthos populations to supplement food for migratory birds.",
      wetland_title: "Purification Wetlands",
      wetland_desc: "Using wetland plants to filter tail water from aquaculture before it enters the sea."
    },
    shoreline: {
      title: "L: Ecological Shoreline",
      desc: "Implementing a \"Living Shoreline\" concept. Moving away from hard concrete seawalls to resilient, bio-diverse barriers.",
      dike_title: "Double-Dike System",
      dike_desc: "A tiered defense system. The outer dike dissipates wave energy through salt marshes and mangroves, while the inner dike provides final flood protection. This space between dikes becomes a rich habitat.",
      tag_storm: "Storm Protection",
      tag_carbon: "Carbon Sequestration",
      visual_title: "Cross-section Visualization"
    },
    ai_lab: {
      title_habitat: "Bird Habitat Simulation",
      title_wetland: "Water Purification Wetland",
      subtitle_habitat: "Adjust environmental variables to predict biodiversity support.",
      subtitle_wetland: "Configure engineering parameters to simulate pollutant reduction.",
      apply_btn: "Apply to AI Vision",
      
      ctrl_water: "Water Level",
      ctrl_salinity: "Salinity",
      ctrl_veg: "Vegetation Cover",
      ctrl_hrt: "HRT (Retention Time)",
      ctrl_load: "Surface Hydraulic Load",
      ctrl_area: "Wetland Area",
      range: "Range",
      max_limit: "Max Limit",

      chart_habitat: "Habitat Suitability Index",
      chart_pollutant: "Pollutant Reduction Load (g/m²·d)",
      
      visual_title: "Visual Reconstruction",
      visual_desc: "Use Gemini AI to visualize the simulated scenario on real site photos",
      history_btn: "Generation History",
      upload_title: "Upload Site Photo",
      upload_desc: "Supports JPG, PNG",
      prompt_label: "AI Prompt (Auto-generated from simulation)",
      prompt_placeholder: "Configure simulation above and click 'Apply to AI Vision'...",
      gen_btn: "Generate Visualization",
      gen_loading: "Generating...",
      error_gen: "Failed to generate image. Please try again.",
      error_ai: "An error occurred while communicating with the AI.",
      result_title: "AI Result",
      result_empty: "The AI-enhanced restoration simulation will appear here",
      
      // Data Labels
      wading: "Wading Birds",
      swimming: "Swimming Birds",
      benthos: "Benthic Biomass"
    }
  },
  zh: {
    title: "黄河三角洲生态修复",
    subtitle: "通过创新的“1+3+L”模式解决“人退鸟进”的矛盾。为全球滨海湿地管理提供基于自然的解决方案（NbS）。",
    nav: {
      overview: "项目概况",
      production: "1: 生态化生产",
      function: "3: 生态功能提升",
      shoreline: "L: 生态岸线",
      ai_lab: "AI 视觉实验室"
    },
    overview: {
      conflict_title: "矛盾冲突",
      conflict_desc: "盐田和水产养殖导致滨海湿地大量丧失。简单废弃会导致高盐度和生境退化。",
      solution_title: "解决方案 (1+3+L)",
      solution_desc: "1套生态化生产模式 + 3种功能提升 + L型生态岸线。",
      goal_title: "建设目标",
      goal_desc: "从被动的“无人区”转变为兼顾生物多样性和可持续利用的主动“水鸟友好型”生态系统。",
      explore_btn: "探索模式",
      map_title: "交互式分区地图",
      map_hint: "点击区域探索分区",
      zones: {
        production: "1: 生态化生产",
        roost: "3: 高潮位栖息地",
        wetland: "3: 水质净化湿地",
        foraging: "3: 鸟类补充觅食区",
        shoreline: "L: 生态岸线"
      }
    },
    production: {
      title: "1: 生态化生产模式",
      desc: "在不完全停止生产的情况下，将养殖塘和盐田转化为水鸟友好型栖息地。",
      strategies: "关键策略",
      s1_title: "微地形改造",
      s1_desc: "在池塘内建造岛屿和不同深度的区域，以适应不同鸟类。",
      s2_title: "水位调控",
      s2_desc: "季节性调整：迁徙期降低水位供涉禽栖息，深水区供游禽栖息。",
      s3_title: "盐度梯度管理",
      s3_desc: "管理盐浓度以支持多样化的丰年虫和微生物（鸟类食物）。",
      chart_title: "生态恢复预测"
    },
    function: {
      title: "3: 生态功能提升",
      desc: "建立三个关键功能区：高潮位栖息地、补充觅食区和水质净化湿地。",
      roost_title: "高潮位栖息地",
      roost_desc: "在潮滩被淹没的高潮期间，为鸟类提供露出水面的安全休息岛屿。",
      foraging_title: "补充觅食区",
      foraging_desc: "通过管理优化底栖生物种群，为候鸟提供食物补充。",
      wetland_title: "水质净化湿地",
      wetland_desc: "利用湿地植物在养殖尾水排入大海前进行过滤净化。"
    },
    shoreline: {
      title: "L: 生态岸线",
      desc: "实施“生态海堤”概念。从坚硬的混凝土海堤转向具有韧性的生物多样性屏障。",
      dike_title: "双重堤坝系统",
      dike_desc: "分层防御系统。外堤通过盐沼和红树林消散波浪能量，内堤提供最终的防洪保护。两堤之间的空间成为丰富的栖息地。",
      tag_storm: "风暴防护",
      tag_carbon: "碳汇功能",
      visual_title: "横断面可视化"
    },
    ai_lab: {
      title_habitat: "水鸟栖息地模拟",
      title_wetland: "水质净化湿地设计",
      subtitle_habitat: "调整环境参数以预测生物多样性支持能力。",
      subtitle_wetland: "配置工程参数以模拟污染物削减效果。",
      apply_btn: "应用至 AI 视觉",
      
      ctrl_water: "水位",
      ctrl_salinity: "盐度",
      ctrl_veg: "植被覆盖度",
      ctrl_hrt: "水力停留时间 (HRT)",
      ctrl_load: "表面水力负荷",
      ctrl_area: "湿地面积",
      range: "范围",
      max_limit: "最大限制",

      chart_habitat: "栖息地适宜性指数",
      chart_pollutant: "污染物削减负荷 (g/m²·d)",
      
      visual_title: "视觉重构",
      visual_desc: "使用 Gemini AI 在真实场景照片上可视化模拟方案",
      history_btn: "生成历史",
      upload_title: "上传现场照片",
      upload_desc: "支持 JPG, PNG 格式",
      prompt_label: "AI 提示词 (根据模拟参数自动生成)",
      prompt_placeholder: "在上调整模拟参数并点击“应用至 AI 视觉”...",
      gen_btn: "生成可视化效果",
      gen_loading: "正在生成...",
      error_gen: "生成图片失败，请重试。",
      error_ai: "与 AI 通信时发生错误。",
      result_title: "AI 生成结果",
      result_empty: "AI 增强的恢复模拟效果将显示在这里",

      // Data Labels
      wading: "涉禽",
      swimming: "游禽",
      benthos: "底栖生物量"
    }
  }
};
