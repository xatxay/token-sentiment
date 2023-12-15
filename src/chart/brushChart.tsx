import { Component } from "react";
import ReactApexChart from "react-apexcharts";
import {
  BrushChartProps,
  BrushChartState,
  SentimentValidJson,
} from "../utils/interface";
import { BrushChartContainer } from "./brushChartStyle";

class BrushChart extends Component<BrushChartProps, BrushChartState> {
  constructor(props: any, data: SentimentValidJson[]) {
    super(props);

    this.state = {
      series: [
        {
          data:
            props.data && props.data.length > 0
              ? props.data.map((item: SentimentValidJson) => ({
                  x: new Date(item.date),
                  y: Object.values(item.coin_sentiment)[0],
                  username: item.username,
                }))
              : [],
        },
      ],
      options: {
        chart: {
          id: "chart2",
          type: "line",
          height: 230,
          toolbar: {
            autoSelected: "pan",
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        colors: ["#AF2655"],
        stroke: {
          width: 3,
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
          y: {
            formatter: (value: number) => `Score: ${value}`,
          },
          custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
            const data =
              w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            if (!data) return;
            return `<div class="apexcharts-tooltip-title" style="font-size: 12px;">${data.username}<br></div>
            <div class="apexcharts-tooltip-series-group" style="display: flex; justify-content: space-between; align-items: center;">
              <span class="apexcharts-tooltip-marker" style="background-color: ${w.globals.colors[seriesIndex]};"></span>
              <div class="apexcharts-tooltip-text" style="font-size: 12px; padding: 2px;">Score: ${series[seriesIndex][dataPointIndex]}</div>
            </div>`;
          },
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 1,
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: "datetime",
          labels: {
            style: {
              colors: "#FFFFFF",
              fontSize: "11px",
              fontWeight: 900,
              cssClass: "apexchart-xaxis-label",
            },
          },
        },
        yaxis: {
          min: -1,
          max: 1,
          tickAmount: 2,
          labels: {
            formatter: (val: number) => val.toFixed(0),
            style: {
              colors: "#FFFFFF",
              fontSize: "11px",
              fontWeight: 900,
              cssClass: "apexcharts-yaxis-label",
            },
          },
          title: {
            text: "Sentiment Score",
            style: {
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: "bold",
              cssClass: "apexcharts-yaxis-title",
            },
          },
        },
      },

      seriesLine: [
        {
          data:
            props.data && props.data.length > 0
              ? data.map((item) => ({
                  x: new Date(item.date),
                  y: 0,
                }))
              : [],
        },
      ],
      optionsLine: {
        chart: {
          id: "chart1",
          height: 130,
          type: "area",
          brush: {
            target: "chart2",
            enabled: true,
          },
          selection: {
            enabled: true,
            xaxis: {
              min: props.data.date ? new Date(data[0].date) : undefined,
              max: props.data.date
                ? new Date(data[data.length - 1].date)
                : undefined,
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.91,
            opacityTo: 0.1,
          },
        },
        xaxis: {
          labels: {
            style: {
              colors: "#FFFFFF",
              fontSize: "11px",
              fontWeight: 900,
              cssClass: "apexcharts-xaxis-label",
            },
          },
          type: "datetime",
          tooltip: {
            enabled: false,
          },
          axisBorder: {
            colors: "#FFFFFF",
          },
        },
        colors: ["#FFFFFF"],
        yaxis: {
          min: -1,
          max: 1,
          tickAmount: 2,
          labels: {
            formatters: (val: number) => val.toFixed(0),
            style: {
              colors: "#FFFFFF",
              fontSize: "11px",
              fontWeight: 900,
              cssClass: "apexcharts-yaxis-label",
            },
          },
        },
      },
    };
  }
  componentDidUpdate(prevProps: BrushChartProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        series: [
          {
            data: this.props.data.map((item: SentimentValidJson) => ({
              x: new Date(item.date),
              y: Object.values(item.coin_sentiment)[0],
              username: item.username,
            })),
          },
        ],
        seriesLine: [
          {
            data: this.props.data.map((item: SentimentValidJson) => ({
              x: new Date(item.date),
              y: 0,
            })),
          },
        ],
      });
    }
  }

  render() {
    return (
      <>
        <BrushChartContainer id="chart-line2">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={280}
          />
        </BrushChartContainer>
        <BrushChartContainer id="chart-line">
          <ReactApexChart
            options={this.state.optionsLine}
            series={this.state.seriesLine}
            type="area"
            height={150}
          />
        </BrushChartContainer>
      </>
    );
  }
}

export default BrushChart;
