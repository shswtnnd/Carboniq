export type CguBuilding = {
  name: string;
  electricityKwh: number;
  emissionsTco2: number;
};

export type CguRecommendation = {
  title: string;
  impact: "High" | "Medium" | "Low";
  reduction: string;
  description: string;
};

export const cguOverview = {
  university: "CV Raman Global University",
  location: "Bhubaneswar, Odisha",
  tier: "Enterprise",
  totalEmissions: 2169,
  totalBuildings: 9,
  primarySource: "Electricity",
  score: 68,
  grade: "B",
};

export const cguSourceBreakdown = {
  labels: ["Electricity", "Transport", "Generators", "Waste"],
  values: [1960, 80, 59, 70],
};

export const cguMonthlyTrend = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  values: [145, 150, 185, 205, 192, 132, 118, 126, 142, 156, 138, 128],
};

export const cguBuildings: CguBuilding[] = [
  { name: "Basic Science Building", electricityKwh: 306000, emissionsTco2: 308 },
  { name: "Electrical Engineering Building", electricityKwh: 348000, emissionsTco2: 350 },
  { name: "Diploma Building", electricityKwh: 201000, emissionsTco2: 201 },
  { name: "RIHC Auditorium", electricityKwh: 286000, emissionsTco2: 288 },
  { name: "New Boys Hostel", electricityKwh: 263000, emissionsTco2: 265 },
  { name: "Girls Hostel", electricityKwh: 251000, emissionsTco2: 252 },
  { name: "Library", electricityKwh: 219000, emissionsTco2: 220 },
  { name: "Mess", electricityKwh: 161000, emissionsTco2: 162 },
  { name: "Cafeterias", electricityKwh: 122000, emissionsTco2: 123 },
];

export const cguRecommendations: CguRecommendation[] = [
  {
    title: "Solar panel installation",
    impact: "High",
    reduction: "Up to 24%",
    description: "Install rooftop solar across the engineering cluster and hostels.",
  },
  {
    title: "LED lighting upgrades",
    impact: "Medium",
    reduction: "Up to 8%",
    description: "Replace legacy fixtures with campus-wide LED retrofits.",
  },
  {
    title: "EV campus transport",
    impact: "Medium",
    reduction: "Up to 5%",
    description: "Transition shuttle routes to EVs and optimize route scheduling.",
  },
  {
    title: "Waste segregation",
    impact: "Medium",
    reduction: "Up to 3%",
    description: "Introduce source-level segregation and organics processing units.",
  },
  {
    title: "Energy monitoring systems",
    impact: "High",
    reduction: "Up to 9%",
    description: "Deploy smart metering for granular building-level usage tracking.",
  },
  {
    title: "HVAC optimization",
    impact: "High",
    reduction: "Up to 11%",
    description: "Optimize HVAC schedules and controls for load balancing.",
  },
  {
    title: "Bicycle program",
    impact: "Low",
    reduction: "Up to 2%",
    description: "Encourage bicycle commute with dedicated parking and incentives.",
  },
  {
    title: "Carbon neutrality pledge",
    impact: "Medium",
    reduction: "Long-term roadmap",
    description: "Establish institutional targets with annual progress review.",
  },
];
