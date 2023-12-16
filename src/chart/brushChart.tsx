import { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { BrushChartProps, BrushChartState } from "../utils/interface";
import { BrushChartContainer } from "./brushChartStyle";
import { dateRangeSelector, lineColor, white } from "../color/color";

class BrushChart extends Component<BrushChartProps, BrushChartState> {
  constructor(props: any) {
    super(props);

    console.log("brush: ", props.data);
    this.state = {
      series: [
        {
          data: props.data.map((item: any) => ({
            x: item.date,
            y: item.avgSentiment,
            tooltipContent: item.tooltipContent,
          })),
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
          events: {
            click: () => {
              props.openModal();
            },
          },
        },
        colors: [lineColor],
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
            return `<div class="apexcharts-tooltip-title" style="font-size: 12px;"> ${data.tooltipContent} </div>`;
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
          // onClick: () => {
          //   console.log("clicking");
          //   props.openModal();
          // }, (not working)
        },
        xaxis: {
          type: "datetime",
          labels: {
            style: {
              colors: white,
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
              colors: white,
              fontSize: "11px",
              fontWeight: 900,
              cssClass: "apexcharts-yaxis-label",
            },
          },
          title: {
            text: "Sentiment Score",
            style: {
              color: white,
              fontSize: "14px",
              fontWeight: "bold",
              cssClass: "apexcharts-yaxis-title",
            },
          },
        },
      },

      seriesLine: [
        {
          data: props.data.map((item: any) => ({
            x: new Date(item.date),
            y: item.avgSentiment,
          })),
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
            type: "x",
            fill: {
              color: dateRangeSelector,
              opacity: 0.1,
            },
            xaxis: {
              min: props.data.date ? new Date(props.data[0].date) : undefined,
              max: props.data.date
                ? new Date(props.data[props.data.length - 1].date)
                : undefined,
            },
          },
        },
        colors: [white],
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
              colors: white,
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
            colors: white,
          },
        },
        yaxis: {
          min: -1,
          max: 1,
          tickAmount: 2,
          labels: {
            formatters: (val: number) => val.toFixed(0),
            style: {
              colors: white,
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
            data: this.props.data.map((item) => ({
              x: item.date,
              y: item.avgSentiment,
              tooltipContent: item.tooltipContent,
            })),
          },
        ],
        seriesLine: [
          {
            data: this.props.data.map((item) => ({
              x: new Date(item.date),
              y: item.avgSentiment,
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