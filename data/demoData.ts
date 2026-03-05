export type EmissionSource = {
  name: string;
  value: number;
};

export type BuildingEmission = {
  name: string;
  value: number;
};

export type MonthlyEmission = {
  month: string;
  total: number;
};

export type InstitutionData = {
  institution: string;
  totalCO2: number;
  scope1: number;
  scope2: number;
  scope3: number;
  sources: EmissionSource[];
  buildings: BuildingEmission[];
  monthlyTrend: MonthlyEmission[];
};

export const demoData: InstitutionData = {
  institution: "Tech University",
  totalCO2: 1240,
  scope1: 220,
  scope2: 770,
  scope3: 250,
  sources: [
    { name: "Electricity", value: 769 },
    { name: "Transport", value: 201 },
    { name: "Waste", value: 120 },
    { name: "Diesel", value: 150 },
  ],
  buildings: [
    { name: "Library", value: 310 },
    { name: "Engineering Block", value: 540 },
    { name: "Hostel", value: 390 },
  ],
  monthlyTrend: [
    { month: "Jan", total: 122 },
    { month: "Feb", total: 116 },
    { month: "Mar", total: 109 },
    { month: "Apr", total: 102 },
    { month: "May", total: 98 },
    { month: "Jun", total: 94 },
    { month: "Jul", total: 90 },
    { month: "Aug", total: 95 },
    { month: "Sep", total: 101 },
    { month: "Oct", total: 105 },
    { month: "Nov", total: 108 },
    { month: "Dec", total: 100 },
  ],
};
