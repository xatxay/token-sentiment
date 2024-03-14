import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { formatYAxisValue } from "../utils/utils";
import { chartBackgroundColor, white } from "../color/color";

interface HighChartsProps {
  seriesData: Highcharts.SeriesLineOptions[];
  title: {
    title: string;
    subtitle: string;
  };
  handleChartPointClick?: (event: Highcharts.PointClickEventObject) => void;
}

const HighChartData = ({
  seriesData,
  title,
  handleChartPointClick,
}: HighChartsProps) => {
  const [options, setOptions] = React.useState({});
  const isSentimentByCoins = "Sentiment By Coins";
  const mostRecentDate = new Date();
  const ninetyDaysAgo = new Date(mostRecentDate);
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  const maxDate = new Date();
  const minDate = ninetyDaysAgo;

  React.useEffect(() => {
    const fetchData = async () => {
      setOptions({
        title: {
          text: title.title === isSentimentByCoins ? "" : title.title,
          style: {
            color: white,
          },
        },
        subtitle: {
          text: title.subtitle,
          style: {
            color: white,
          },
        },
        rangeSelector: {
          enabled: false,
        },
        xAxis: {
          lineColor: white,
          type: "datetime",
          min: minDate.getTime(),
          max: maxDate.getTime(),
          labels: {
            style: {
              color: white,
            },
          },
        },
        navigator: {
          enabled: true,
        },
        yAxis: {
          lineColor: white,
          labels: {
            style: {
              color: white,
            },
            formatter: function (this: any): string {
              return title.title === isSentimentByCoins
                ? Highcharts.numberFormat(this.value, 1)
                : formatYAxisValue(this.value as number);
            },
            allowOverlap: true,
          },
          showLastLabel: true,
          opposite: false,
          tickAmount: 4,
          min: title.title === isSentimentByCoins ? -1 : undefined,
          max: title.title === isSentimentByCoins ? 1 : undefined,
          tickPositions:
            title.title === isSentimentByCoins
              ? [-1, -0.5, 0, 0.5, 1]
              : undefined,
        },
        chart: {
          style: {
            fontFamily: "sans-serif",
            color: white,
          },
          backgroundColor: chartBackgroundColor,
        },
        tooltip: {
          split: false,
        },
        series: seriesData,
        plotOptions: {
          series: {
            cursor: "pointer",
            point: {
              events: {
                click: handleChartPointClick,
              },
            },
          },
        },
      });
    };

    fetchData();
  }, [seriesData, title.subtitle, title.title]);

  return (
    <div className="w-full">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
};

export default HighChartData;
