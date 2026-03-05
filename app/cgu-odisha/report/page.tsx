"use client";

import { useState } from "react";
import { Button, Card, CardBody } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import { jsPDF } from "jspdf";
import { cguOverview, cguBuildings, cguRecommendations } from "@/data/cguOdishaData";
import { motion } from "framer-motion";

export default function CguReportPage() {
  const [exporting, setExporting] = useState(false);

  const generateReport = () => {
    setExporting(true);

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    doc.setFontSize(20);
    doc.text("Carboniq Sustainability Report", 40, 56);
    doc.setFontSize(12);
    doc.text(`${cguOverview.university} - ${cguOverview.location}`, 40, 80);
    doc.text(`Total Emissions: ${cguOverview.totalEmissions} tCO/year`, 40, 100);
    doc.text(`Sustainability Score: ${cguOverview.score}/100 (${cguOverview.grade})`, 40, 118);

    doc.text("Top Building Emitters:", 40, 154);
    cguBuildings
      .slice()
      .sort((a, b) => b.emissionsTco2 - a.emissionsTco2)
      .slice(0, 5)
      .forEach((b, i) => doc.text(`${i + 1}. ${b.name} - ${b.emissionsTco2} tCO/year`, 50, 176 + i * 18));

    doc.text("Priority Recommendations:", 40, 292);
    cguRecommendations.slice(0, 5).forEach((r, i) => doc.text(`- ${r.title} (${r.reduction})`, 50, 314 + i * 18));

    doc.save("cgu-odisha-sustainability-report.pdf");
    setExporting(false);
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-2xl border border-white/10 bg-[#111827]">
        <CardBody className="items-center space-y-6 p-10 text-center">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#E5E7EB]">
            Generate Sustainability Report
          </h2>
          <p className="text-[#cbd5e1]">
            Export a clean PDF report with campus summary, top building emitters, and key recommendations.
          </p>
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.28, ease: "easeOut" }}>
            <Button
              onPress={generateReport}
              isLoading={exporting}
              className="group h-16 rounded-full bg-[#22C55E] px-14 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#020617] shadow-[0_10px_24px_rgba(34,197,94,0.22)] transition-all duration-300 hover:shadow-[0_16px_34px_rgba(34,197,94,0.28)]"
              endContent={
                !exporting ? (
                  <motion.span
                    className="transition-transform duration-150 ease-out group-hover:translate-x-2"
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight size={24} strokeWidth={2.8} />
                  </motion.span>
                ) : null
              }
            >
              Generate Sustainability Report
            </Button>
          </motion.div>
        </CardBody>
      </Card>
    </div>
  );
}
