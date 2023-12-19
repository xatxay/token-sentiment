import { Component } from "react";
import { StackedChartProps, StackedChartState } from "../utils/interface";
import ReactApexChart from "react-apexcharts";
import { BrushChartContainer } from "./brushChartStyle";
import { white } from "../color/color";

class StackedChart extends Component<StackedChartProps, StackedChartState> {
  constructor(props: any) {
    super(props);

    this.state = {
      series: [
        {
          name: "Bearish",
          data: [27.8, 22.4, 54.1, 43.9],
        },
        {
          name: "Bullish",
          data: [51.6, 55.2, 29.7, 26.3],
        },
        {
          name: "Neutral",
          data: [20.6, 22.3, 16.2, 29.8],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          stackType: "100%",
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },
        title: {
          text: "100% Stacked Bar",
          style: {
            color: white,
          },
        },
        xaxis: {
          categories: [
            "Will the price of #Bitcoin first go to $32,000 or to $36,000? Current price: $34,460",
            "Q2",
            "Q3",
            "Q4",
          ],
          labels: {
            style: {
              color: white,
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: white,
            },
          },
        },
        // tooltip: {
        //   y: {
        //     formatter: function (val) {
        //       return val + "K";
        //     },
        //   },
        // },
        fill: {
          opacity: 1,
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40,
          labels: {
            colors: white,
            useSeriesColors: false,
          },
        },
      },
    };
  }

  render() {
    return (
      <BrushChartContainer id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
        />
      </BrushChartContainer>
    );
  }
}

export default StackedChart;
