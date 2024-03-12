import PieChart from "../chart/pieChart";
import { PieChartData } from "../utils/interface";

export const TwitterPieChart = ({ series, labels }: PieChartData) => {
  return (
    <div className="flex-1 flex items-center justify-center flex-col space-y-6">
      <h3 className="font-extrabold text-xl md:text-2xl">
        Top Coins By Day (Pie Chart)
      </h3>
      <PieChart series={series} labels={labels} />
    </div>
  );
};
