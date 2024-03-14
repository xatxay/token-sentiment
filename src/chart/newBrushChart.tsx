import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { YoutubeStat } from "../utils/interface";
import {
  extractYtKeyword,
  formatYAxisValue,
  formattedChartData,
} from "../utils/utils";

interface HighChartsProps {
  data: YoutubeStat[];
}

const HighChartData = ({ data }: HighChartsProps) => {
  const [options, setOptions] = React.useState({});
  const mostRecentDate = new Date();
  const ninetyDaysAgo = new Date(mostRecentDate);
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  const maxDate = new Date();
  const minDate = ninetyDaysAgo;

  React.useEffect(() => {
    const fetchData = async () => {
      setOptions({
        title: {
          enabled: false,
        },
        subtitle: {
          enabled: false,
        },
        rangeSelector: {
          enabled: false,
        },
        xAxis: {
          type: "datetime",
          min: minDate.getTime(),
          max: maxDate.getTime(),
        },
        navigator: {
          enabled: true,
        },
        yAxis: {
          labels: {
            formatter: function (this: any): string {
              return formatYAxisValue(this.value as number);
            },
          },
          opposite: false,
        },
        series: [
          {
            type: "line",
            name: "Views",
            data: formattedChartData(data),
            tooltip: {
              pointFormatter: function (this: any): string {
                // Use extractYtKeyword to process common_words for the tooltip
                const keyword = extractYtKeyword(this.options.common_words);
                return `<strong>Views: ${this.y.toLocaleString(
                  "en-US"
                )}</strong><br><strong>Top Keywords: ${keyword}</strong>`;
              },
            },
          },
        ],
      });
    };

    fetchData();
  }, [data]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options}
    />
  );
};

export default HighChartData;
